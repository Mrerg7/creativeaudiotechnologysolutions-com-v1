/**
 * Canonical host + HTTPS enforcement for static assets.
 * Runs before assets (run_worker_first) so www / http / workers.dev variants
 * 301 to the apex HTTPS URL instead of serving duplicate HTML — which GSC
 * reports as "Alternate page with proper canonical tag" / duplicates.
 */
const CANONICAL_HOST = 'creativeaudiotechnologysolutions.com';

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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const needsHttps = url.protocol === 'http:';
    const needsHostRedirect = isAlternateHost(url.hostname);

    if (needsHttps || needsHostRedirect) {
      const canonical = new URL(
        url.pathname + url.search,
        `https://${CANONICAL_HOST}`,
      );
      return Response.redirect(canonical.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
