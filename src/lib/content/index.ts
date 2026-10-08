import type { BlogPost, Testimonial } from './types';
import { isSanityConfigured } from '../sanity/client';
import {
  getSanityBlogPost,
  getSanityBlogPosts,
  getSanityBlogPostSlugs,
  getSanityFeaturedTestimonials,
  getSanityTestimonials,
} from './sanity';
import { getSitemapRoutes, normalizePath } from '../sitemap';

/**
 * Sanity holds the blog (`blogPost`) and the customer testimonials (`testimonial`).
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
  return [...STATIC_PATHS, ...postSlugs.map((slug) => getBlogPermalink(slug))];
}

/** Article URL — trailing slash included (the site uses `trailingSlash: 'always'`). */
export function getBlogPermalink(slug: string): string {
  return `/blog/${slug.replace(/^\/+|\/+$/g, '')}/`;
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

/**
 * Testimonials for /reviews/. Returns [] when Sanity is unconfigured or unreachable so the caller
 * can fall back to the copy in `src/data/reviews.ts`.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSanityConfigured) return [];
  try {
    return await getSanityTestimonials();
  } catch (error) {
    console.warn('Sanity testimonials unavailable.', error);
  }
  return [];
}

/** Three testimonials for the homepage ("Show on homepage" first). [] → caller keeps its built-in copy. */
export async function getFeaturedTestimonials(limit = 3): Promise<Testimonial[]> {
  if (!isSanityConfigured) return [];
  try {
    return await getSanityFeaturedTestimonials(limit);
  } catch (error) {
    console.warn('Sanity featured testimonials unavailable.', error);
  }
  return [];
}

export { getHomeContent } from './home';
export { getPagePhotos } from './photos';
export { getContentPageContent } from './contentPage';
export { getContactContent } from './contact';
export { getLocationContent } from './location';
export { getRatingsContent } from './ratings';

export type { BlogPost, Testimonial };
