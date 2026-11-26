export const prerender = false;

import type { APIRoute } from 'astro';
import { timingSafeEqual } from 'node:crypto';
import { getPublicContentPaths } from '~/lib/content';

/**
 * Sanity webhook (Manage → API → Webhooks):
 * URL: https://www.YOUR_DOMAIN/api/revalidate.json   (the canonical host — a redirect (apex → www) breaks a POST)
 * Method: POST
 * Header: Authorization: Bearer <SANITY_REVALIDATE_SECRET>
 * Trigger: Create / Update / Delete
 * Filter: !(_id in path("drafts.**"))
 * Projection: {_id,_type,"slug": slug.current}
 *
 * On publish, this refreshes cached HTML (ISR) so new blogs and CMS pages
 * go live without a Vercel rebuild.
 *
 * Why `.json`: with `trailingSlash: 'always'` the Vercel adapter only routes extension-less API paths through
 * its ISR cache (`/api/revalidate/` hit the catch-all page route), so the first successful POST response was
 * cached and every later webhook call got that cached 200 without running this code. Paths with a file
 * extension (like sitemap.xml) are routed straight to the function. Keep the extension.
 */

function secretsEqual(provided: string, expected: string) {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || a.length === 0) return false;
  return timingSafeEqual(a, b);
}

function bearerToken(request: Request) {
  const header = request.headers.get('authorization') || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || '';
}

/** Never cacheable — a cached response would skip the revalidation entirely. */
function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

function asPath(path: string) {
  const trimmed = path.trim();
  if (!trimmed) return '/';
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

async function revalidatePath(origin: string, path: string, bypassToken: string) {
  const url = new URL(asPath(path), origin).toString();
  const response = await fetch(url, {
    // GET, not HEAD: a HEAD revalidation can leave the previously cached body in place.
    method: 'GET',
    headers: { 'x-prerender-revalidate': bypassToken },
    redirect: 'manual',
  });
  await response.arrayBuffer(); // drain the body so the connection is released
  return {
    path: asPath(path),
    status: response.status,
    cache: response.headers.get('x-vercel-cache'),
  };
}

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.SANITY_REVALIDATE_SECRET || '';
  const bypassToken = import.meta.env.ISR_BYPASS_TOKEN || '';

  if (!secret || !secretsEqual(bearerToken(request), secret)) return json({ error: 'Unauthorized' }, 401);
  if (!bypassToken) return json({ error: 'ISR_BYPASS_TOKEN is not configured' }, 500);

  const origin = new URL(request.url).origin;
  // The RSS feed is ISR-cached too but is not a page route.
  const paths = [...new Set([...(await getPublicContentPaths()), '/rss.xml'])];

  const results = await Promise.all(
    paths.map(async (path) => {
      try {
        return await revalidatePath(origin, path, bypassToken);
      } catch (error) {
        return { path, status: 0, error: error instanceof Error ? error.message : 'revalidate failed' };
      }
    })
  );

  // Any page that did not refresh → non-2xx, so Sanity's webhook retries instead of silently going stale.
  const failed = results.filter((result) => result.status < 200 || result.status >= 400);
  return json({ revalidated: results.length - failed.length, failed, results }, failed.length ? 502 : 200);
};
