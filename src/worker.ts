/**
 * Canonical host + HTTPS enforcement, plus path aliases served without redirects.
 *
 * Host variants (www / http / *.workers.dev) 301 to the apex HTTPS URL.
 * Path aliases (/index.html, /sitemap.xml, /404.html) are internally rewritten
 * so Google Search Console does not exclude them as "Page with redirect".
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const needsHttps = url.protocol === 'http:';
    const needsHostRedirect = isAlternateHost(url.hostname);

    if (needsHttps || needsHostRedirect) {
      const canonical = new URL(
        url.pathname + url.search,
        CANONICAL_ORIGIN,
      );
      return Response.redirect(canonical.toString(), 301);
    }

    const path = url.pathname;

    // Homepage aliases: 200 + canonical to / (no 301/307)
    if (path === '/' || path === '/index' || path === '/index.html') {
      const response = await env.ASSETS.fetch(assetRequest(request, '/index.html'));
      return withHeaders(response, {
        Link: `<${CANONICAL_ORIGIN}/>; rel="canonical"`,
      });
    }

    // Common sitemap URL: serve the generated index without a 301
    if (path === '/sitemap.xml') {
      return env.ASSETS.fetch(assetRequest(request, '/sitemap-index.xml'));
    }

    // 404 document URLs: real 404 status, never a trailing-slash 307
    if (path === '/404' || path === '/404/' || path === '/404.html') {
      const response = await env.ASSETS.fetch(assetRequest(request, '/404.html'));
      return withHeaders(
        response,
        { 'X-Robots-Tag': 'noindex, follow' },
        404,
      );
    }

    return env.ASSETS.fetch(request);
  },
};
