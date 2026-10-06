/**
 * Sitemap helpers — the single reader of `src/data/sitemap.ts`.
 *
 * Routes, header dropdowns, footer columns and the generic page template all
 * derive from the same tree, so adding a page = regenerating the workbook data.
 */
import { sitemap, type SitemapNode } from '~/data/sitemap';

/**
 * Pages the workbook marks ON HOLD (batch "Batch 2") are included in routes, nav and
 * footer so the full Sitemap hierarchy shows. Set to `false` to hide them again.
 */
export const INCLUDE_HELD_PAGES = true;
const HELD_BATCHES = new Set(['Batch 2']);

export type { SitemapNode };

export function isLive(node: SitemapNode): boolean {
  return INCLUDE_HELD_PAGES || !(node.batch && HELD_BATCHES.has(node.batch));
}

/** Direct children that are live (not on hold). */
export function liveChildren(node?: SitemapNode): SitemapNode[] {
  return (node?.children ?? []).filter(isLive);
}

export function normalizePath(path: string): string {
  const trimmed = path.split(/[?#]/)[0].replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

export interface SitemapRoute {
  path: string;
  node: SitemapNode;
  /** Ancestors, outermost first (category, then sub category one). */
  parents: SitemapNode[];
}

function walk(nodes: SitemapNode[], parents: SitemapNode[], out: SitemapRoute[]) {
  for (const node of nodes) {
    if (!isLive(node)) continue;
    if (node.slug) out.push({ path: normalizePath(node.slug), node, parents });
    if (node.children) walk(node.children, [...parents, node], out);
  }
}

/** Every live node that owns a URL, in workbook order. */
export function getSitemapRoutes(): SitemapRoute[] {
  const out: SitemapRoute[] = [];
  walk(sitemap, [], out);
  return out;
}

export function findSitemapRoute(path: string): SitemapRoute | undefined {
  const target = normalizePath(path);
  return getSitemapRoutes().find((route) => route.path === target);
}

/** Top-level category by label (e.g. `Collision Repair`). */
export function getCategory(label: string): SitemapNode | undefined {
  return sitemap.find((node) => node.label === label);
}

/** Live pages one level below `node`, flattening label-only groups (e.g. "Posts"). */
export function getChildPages(node?: SitemapNode): SitemapNode[] {
  return liveChildren(node).flatMap((child) => (child.slug ? [child] : getChildPages(child)));
}

function flatten(nodes: SitemapNode[], out: SitemapNode[] = []): SitemapNode[] {
  for (const node of nodes) {
    out.push(node);
    if (node.children) flatten(node.children, out);
  }
  return out;
}

/** Sitemap label for a route, regardless of batch / hold status. Throws if the route is not in the sitemap. */
export function sitemapLabel(path: string): string {
  const target = normalizePath(path);
  const node = flatten(sitemap).find((item) => item.slug && normalizePath(item.slug) === target);
  if (!node) throw new Error(`Route "${path}" is not in src/data/sitemap.ts`);
  return node.label;
}
