/**
 * Links Check Script
 * Crawls a live site and finds: broken internal links (404/5xx), broken images,
 * staging/localhost URLs, non-HTTPS links.
 *
 * Usage:
 *   npm run links:check                          # http://localhost:4321 (dev server must be running)
 *   npm run links:check -- --url=https://kurodaautobody.com
 */

import { BASE_URL, assertReachable, crawlPages, fetchText, pool, sitemapPaths } from './lib/crawl';

interface LinkIssue {
  file: string;
  link: string;
  issue: string;
  severity: 'error' | 'warning';
}

const issues: LinkIssue[] = [];
const add = (file: string, link: string, issue: string, severity: 'error' | 'warning') =>
  issues.push({ file, link, issue, severity });

// Hostnames that should never appear in production markup.
const STAGING_HOST = /^(localhost|127\.0\.0\.1)$|\.vercel\.app$|^(staging|preview|dev)\./i;

function hostOf(url: string): string | null {
  try {
    return new URL(url, BASE_URL).hostname;
  } catch {
    return null;
  }
}

const baseHost = hostOf(BASE_URL);
// Only absolute URLs can be hardcoded staging links; relative paths are always fine.
const isStagingUrl = (url: string) => {
  const host = /^https?:\/\//i.test(url) ? hostOf(url) : null;
  // The origin being crawled is allowed to reference itself (e.g. localhost canonicals in dev).
  return !!host && host !== baseHost && STAGING_HOST.test(host);
};

const SKIP = /^(#|mailto:|tel:|javascript:|data:|sms:)/i;
const cache = new Map<string, number>();

async function statusOf(path: string): Promise<number> {
  if (!cache.has(path)) cache.set(path, (await fetchText(path))?.status ?? 0);
  return cache.get(path)!;
}

function collect(html: string, attrName: 'href' | 'src'): string[] {
  const re = new RegExp(`<[a-z][^>]*\\s${attrName}=(?:"([^"]*)"|'([^']*)')`, 'gi');
  return [...html.matchAll(re)].map((m) => (m[1] ?? m[2]).trim()).filter((v) => v && !SKIP.test(v));
}

function toInternalPath(url: string): string | null {
  if (url.startsWith('//')) return null;
  if (url.startsWith('/')) return url.split('#')[0];
  try {
    const u = new URL(url);
    return u.hostname === baseHost ? u.pathname + u.search : null;
  } catch {
    return null;
  }
}

function inspect(page: string, url: string, kind: 'href' | 'src', targets: Map<string, string[]>) {
  if (isStagingUrl(url)) {
    add(page, url, `${kind === 'src' ? 'Image/asset' : 'Link'} contains staging/development URL`, 'error');
  }
  if (kind === 'href' && /^http:\/\//i.test(url) && hostOf(url) !== baseHost && !isStagingUrl(url))
    add(page, url, 'Non-HTTPS external link', 'warning');
  const internal = toInternalPath(url);
  if (internal) targets.set(internal, [...(targets.get(internal) ?? []), `${kind}@${page}`]);
}

async function main() {
  console.log(`🔗 Running link checks against ${BASE_URL}\n`);
  await assertReachable();

  const paths = (await sitemapPaths()) ?? ['/'];
  const pages = await crawlPages(paths);
  console.log(`Crawled ${pages.length} pages`);

  const targets = new Map<string, string[]>();
  for (const { path, status, html } of pages) {
    if (status !== 200) {
      add(path, path, `Sitemap page returned HTTP ${status || 'no response'}`, 'error');
      continue;
    }
    for (const href of collect(html, 'href')) inspect(path, href, 'href', targets);
    for (const src of collect(html, 'src')) inspect(path, src, 'src', targets);
  }

  console.log(`Checking ${targets.size} unique internal URLs\n`);
  await pool([...targets.keys()], 8, async (target) => {
    const status = await statusOf(target);
    if (status >= 400 || status === 0) {
      for (const origin of targets.get(target) ?? []) {
        const [kind, page] = origin.split('@');
        add(
          page,
          target,
          `Broken ${kind === 'src' ? 'asset' : 'internal link'} (HTTP ${status || 'no response'})`,
          'error'
        );
      }
    }
  });
}

await main();

const errors = issues.filter((i) => i.severity === 'error');
const warnings = issues.filter((i) => i.severity === 'warning');

if (errors.length > 0) {
  console.log('❌ ERRORS:\n');
  for (const i of errors) console.log(`  ${i.file}\n    → ${i.link}  (${i.issue})\n`);
}
if (warnings.length > 0) {
  console.log('⚠️  WARNINGS:\n');
  for (const i of warnings) console.log(`  ${i.file}: ${i.link}\n    ${i.issue}\n`);
}
console.log(`📊 Summary: ${errors.length} errors, ${warnings.length} warnings\n`);

if (errors.length > 0) process.exit(1);
