/**
 * SEO Check Script
 * Crawls a live site and validates: status codes, titles, descriptions, H1s,
 * canonicals, alt text, Open Graph, JSON-LD, sitemap, robots.txt.
 *
 * Usage:
 *   npm run seo:check                          # http://localhost:4321 (dev server must be running)
 *   npm run seo:check -- --url=https://kurodaautobody.com
 *   BASE_URL=https://staging.example.com npm run seo:check
 */

import { BASE_URL, assertReachable, crawlPages, fetchText, isLocalBase, sitemapPaths } from './lib/crawl';

interface SEOIssue {
  file: string;
  issue: string;
  severity: 'error' | 'warning';
}

const issues: SEOIssue[] = [];
const add = (file: string, issue: string, severity: 'error' | 'warning') => issues.push({ file, issue, severity });

/** Attribute value of a tag, whatever the attribute order. */
function attr(tag: string, name: string): string | undefined {
  return tag
    .match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'))
    ?.slice(1)
    .find((v) => v !== undefined);
}

/** First <tag> whose attribute `name` equals `value`. */
function findTag(html: string, tag: 'meta' | 'link', name: string, value: string): string | undefined {
  return (html.match(new RegExp(`<${tag}\\s[^>]*>`, 'gi')) ?? []).find((t) => attr(t, name)?.toLowerCase() === value);
}

function checkHead(path: string, html: string) {
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1].trim();
  if (!title) add(path, 'Missing or empty <title> tag', 'error');
  else if (title.length < 50 || title.length > 60)
    add(path, `Title is ${title.length} chars (target 50-60)`, 'warning');

  const descTag = findTag(html, 'meta', 'name', 'description');
  const desc = descTag ? (attr(descTag, 'content') ?? '').trim() : '';
  if (!desc) add(path, 'Missing or empty meta description', 'error');
  else if (desc.length < 120 || desc.length > 160)
    add(path, `Description is ${desc.length} chars (target 120-160)`, 'warning');

  const canonicalTag = findTag(html, 'link', 'rel', 'canonical');
  const canonical = canonicalTag ? (attr(canonicalTag, 'href') ?? '') : '';
  if (!canonical) add(path, 'Missing canonical link', 'error');
  else if (!canonical.startsWith(BASE_URL) && /localhost|127\.0\.0\.1|vercel\.app/i.test(canonical))
    add(path, `Canonical points to non-production URL: ${canonical}`, 'error');

  if (!findTag(html, 'meta', 'property', 'og:title') || !findTag(html, 'meta', 'property', 'og:description')) {
    add(path, 'Missing Open Graph title or description', 'warning');
  }
  if (!findTag(html, 'meta', 'property', 'og:image')) add(path, 'Missing Open Graph image', 'warning');
  if (!findTag(html, 'meta', 'name', 'twitter:card')) add(path, 'Missing twitter:card', 'warning');
  if (!/<script[^>]*type=["']application\/ld\+json["']/i.test(html)) add(path, 'Missing JSON-LD schema', 'warning');
}

function checkBody(path: string, html: string) {
  const h1s = html.match(/<h1(\s[^>]*)?>/gi) ?? [];
  if (h1s.length === 0) add(path, 'Missing <h1> tag', 'error');
  else if (h1s.length > 1) add(path, `Multiple H1 tags found (${h1s.length})`, 'error');

  const levels = [...html.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      add(path, `Heading level skipped (h${levels[i - 1]} → h${levels[i]})`, 'warning');
      break;
    }
  }

  for (const img of html.matchAll(/<img\s[^>]*>/gi)) {
    if (attr(img[0], 'alt') === undefined) {
      add(path, `Image missing alt attribute: ...${(attr(img[0], 'src') ?? 'unknown').slice(-50)}`, 'error');
    }
  }
}

function checkSitemapAndRobots(paths: string[] | null, sitemapBody: string) {
  if (!paths) return add('/sitemap.xml', 'Sitemap not reachable or empty', 'error');
  if (paths.length === 0) add('/sitemap.xml', 'Sitemap is empty', 'error');
  if (/localhost|vercel\.app/i.test(sitemapBody)) add('/sitemap.xml', 'Sitemap contains non-production URLs', 'error');
  console.log(`Sitemap contains ${paths.length} URLs`);
}

async function checkRobots() {
  const res = await fetchText('/robots.txt');
  if (!res || res.status !== 200) return add('/robots.txt', 'robots.txt not reachable', 'error');
  if (!/^Sitemap:/im.test(res.body)) add('/robots.txt', 'robots.txt missing Sitemap reference', 'warning');
  // Non-production hosts are intentionally blocked, so only flag this on a live URL.
  if (!isLocalBase && /^Disallow:\s*\/\s*$/im.test(res.body))
    add('/robots.txt', 'robots.txt blocks the whole site', 'error');
}

async function main() {
  console.log(`🔍 Running SEO checks against ${BASE_URL}\n`);
  await assertReachable();

  const sitemap = await fetchText('/sitemap.xml');
  const paths = await sitemapPaths();
  checkSitemapAndRobots(paths, sitemap?.body ?? '');
  await checkRobots();

  const pages = await crawlPages(paths ?? ['/']);
  console.log(`Crawled ${pages.length} pages`);
  for (const { path, status, html } of pages) {
    if (status !== 200) {
      add(path, `HTTP ${status || 'no response'}`, 'error');
      continue;
    }
    checkHead(path, html);
    checkBody(path, html);
  }
}

await main();

const errors = issues.filter((i) => i.severity === 'error');
const warnings = issues.filter((i) => i.severity === 'warning');

if (errors.length > 0) {
  console.log('\n❌ ERRORS:\n');
  for (const i of errors) console.log(`  ${i.file}: ${i.issue}`);
}
if (warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:\n');
  for (const i of warnings) console.log(`  ${i.file}: ${i.issue}`);
}
console.log(`\n📊 Summary: ${errors.length} errors, ${warnings.length} warnings\n`);

if (errors.length > 0) process.exit(1);
