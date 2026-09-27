/**
 * Canonical host + HTTPS enforcement, plus path aliases served without redirects.
 *
 * Host variants (www / http / *.workers.dev) 301 to the apex HTTPS URL.
 * Pretty paths are rewritten to */index.html with 200 so GSC does not see
 * "Page with redirect" from assets html_handling.
 *
 * Requires assets.html_handling = "none".
 */
const CANONICAL_HOST = 'creativeaudiotechnologysolutions.com';
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

interface Env {
  ASSETS: Fetcher;
}

function isAlternateHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return (
    host === `www.${CANONICAL_HOST}` ||
    host.endsWith('.workers.dev') ||
    host.endsWith('.pages.dev')
  );
}

function assetRequest(request: Request, pathname: string): Request {
  const url = new URL(request.url);
  url.pathname = pathname;
  return new Request(url.toString(), request);
}

function withHeaders(response: Response, extra: Record<string, string>, status?: number): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(extra)) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: status ?? response.status,
    statusText: status && status !== response.status ? '' : response.statusText,
    headers,
  });
}

function canonicalizePath(path: string): string | null {
  if (path === '/' || path === '/index' || path === '/index.html') {
    return '/index.html';
  }

  // /acquire → /acquire/index.html ; /acquire/ → /acquire/index.html
  if (!path.includes('.') && path !== '/') {
    const base = path.endsWith('/') ? path : `${path}/`;
    return `${base}index.html`;
  }

  return null;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const url = new URL(request.url);
      const needsHttps = url.protocol === 'http:';
      const needsHostRedirect = isAlternateHost(url.hostname);

      if (needsHttps || needsHostRedirect) {
        const canonical = new URL(url.pathname + url.search, CANONICAL_ORIGIN);
        return Response.redirect(canonical.toString(), 301);
      }

      const path = url.pathname;

      if (path === '/sitemap.xml') {
        return env.ASSETS.fetch(assetRequest(request, '/sitemap-index.xml'));
      }

      if (path === '/404' || path === '/404/' || path === '/404.html') {
        const response = await env.ASSETS.fetch(assetRequest(request, '/404.html'));
        return withHeaders(response, { 'X-Robots-Tag': 'noindex, follow' }, 404);
      }

      const assetPath = canonicalizePath(path);
      if (assetPath) {
        const response = await env.ASSETS.fetch(assetRequest(request, assetPath));
        if (response.ok) {
          const canonicalPath =
            path === '/' || path === '/index' || path === '/index.html'
              ? '/'
              : path.endsWith('/')
                ? path
                : `${path}/`;
          return withHeaders(response, {
            Link: `<${CANONICAL_ORIGIN}${canonicalPath === '/' ? '/' : canonicalPath}>; rel="canonical"`,
          });
        }
        // Fall through to ASSETS/not_found_handling for unknown pretty paths
      }

      return env.ASSETS.fetch(request);
    } catch {
      return new Response('Service temporarily unavailable', {
        status: 503,
        headers: {
          'content-type': 'text/plain; charset=utf-8',
          'retry-after': '60',
          'x-robots-tag': 'noindex',
        },
      });
    }
  },
};
