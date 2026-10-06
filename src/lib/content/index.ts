import type { BlogPost } from './types';
import { isSanityConfigured } from '../sanity/client';
import { getSanityBlogPost, getSanityBlogPosts, getSanityBlogPostSlugs } from './sanity';
import { getSitemapRoutes, normalizePath } from '../sitemap';

/**
 * Sanity holds only the blog (`blogPost`).
 * Every other page is composed from local data in `src/data/` — no CMS images or page copy.
 */

export async function getBlogPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];
  return getSanityBlogPostSlugs().catch(() => [] as string[]);
}

/**
 * Public static paths = sitemap routes (src/data/sitemap.ts) that have a dedicated page file.
 * Sitemap routes without a page file resolve to the 404 page, so they stay out of sitemap.xml.
 */
const PAGE_FILES = import.meta.glob('/src/pages/**/index.astro');
const BUILT_PATHS = new Set(
  Object.keys(PAGE_FILES).map((file) => normalizePath(file.replace('/src/pages', '').replace(/index\.astro$/, '')))
);
const STATIC_PATHS = getSitemapRoutes()
  .map((route) => route.path)
  .filter((path) => BUILT_PATHS.has(path));

export async function getPublicContentPaths(): Promise<string[]> {
  const postSlugs = await getBlogPostSlugs();
  return [...STATIC_PATHS, ...postSlugs.map((slug) => `/blog/${slug.replace(/^\/+/, '')}`)];
}

export function getBlogPermalink(slug: string): string {
  return `/blog/${slug}`;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured) return [];
  try {
    return await getSanityBlogPosts();
  } catch (error) {
    console.warn('Sanity blog posts unavailable.', error);
  }
  return [];
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  if (!isSanityConfigured) return undefined;
  try {
    return (await getSanityBlogPost(slug)) ?? undefined;
  } catch (error) {
    console.warn(`Sanity blog post "${slug}" unavailable.`, error);
  }
  return undefined;
}

export type { BlogPost };
