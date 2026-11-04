/**
 * Shared crawler for seo-check / links-check.
 * The site is server-rendered (no HTML in dist/), so we crawl a live URL.
 *
 * BASE_URL (env) or --url=<origin> picks the target. Default: http://localhost:4321
 * Pages are discovered from <BASE_URL>/sitemap.xml (paths only; the sitemap's own origin is ignored).
 */

export const BASE_URL = (
  process.argv.find((a) => a.startsWith('--url='))?.slice(6) ||
  process.env.BASE_URL ||
  'http://localhost:4321'
).replace(/\/$/, '');

export const isLocalBase = /^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/i.test(BASE_URL);

export interface Page {
  path: string;
  status: number;
  html: string;
}

export async function fetchText(path: string): Promise<{ status: number; body: string } | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, { redirect: 'follow' });
    return { status: res.status, body: await res.text() };
  } catch {
    return null;
  }
}

export async function pool<T, R>(items: T[], size: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(size, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i]);
    }
  });
  await Promise.all(workers);
  return out;
}

export async function sitemapPaths(): Promise<string[] | null> {
  const res = await fetchText('/sitemap.xml');
  if (!res || res.status !== 200) return null;
  const locs = [...res.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const paths = locs.map((loc) => {
    try {
      const u = new URL(loc);
      return u.pathname + u.search;
    } catch {
      return loc;
    }
  });
  return [...new Set(paths)];
}

export async function crawlPages(paths: string[]): Promise<Page[]> {
  return pool(paths, 6, async (path) => {
    const res = await fetchText(path);
    return { path, status: res?.status ?? 0, html: res?.body ?? '' };
  });
}

/** Exits with a clear message if the target is unreachable. */
export async function assertReachable(): Promise<void> {
  const res = await fetchText('/');
  if (!res) {
    console.error(`❌ Cannot reach ${BASE_URL}. Start the site (or pass --url=https://…) and retry.`);
    process.exit(2);
  }
}
