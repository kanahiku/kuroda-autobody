import { sitemap, type SitemapNode } from '../../src/data/sitemap';

/**
 * Every page of the site, for the link pickers in the navigation document. Read straight from the site's
 * sitemap (src/data/sitemap.ts), so a page added there shows up in the list without touching the Studio.
 */
export const PAGE_OPTIONS: { value: string; title: string }[] = [];

function walk(nodes: SitemapNode[], trail: string[]) {
  for (const node of nodes) {
    if (node.slug) {
      PAGE_OPTIONS.push({
        value: node.slug,
        title: [...trail, node.label].join(' › ') + `  (${node.slug})`,
      });
    }
    if (node.children) walk(node.children, [...trail, node.label]);
  }
}
walk(sitemap, []);
