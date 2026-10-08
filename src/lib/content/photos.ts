import type { ContentImage } from './types';
import { isSanityConfigured } from '../sanity/client';
import { getSanityPageImages, getSanityPagePhotos } from './sanity';

/** A content section that can carry an uploaded photo: its alt text is always present (merged with the fallback). */
type PhotoSection = { imageAlt: string; image?: ContentImage };

/**
 * Attach the photos uploaded in Sanity (`<section>.image` on a one-off page document) to the merged page
 * content. A section with no upload keeps showing its grey placeholder; Sanity being unreachable is not fatal.
 */
export async function withSanityPhotos<K extends string, T extends Record<K, PhotoSection>>(
  content: T,
  documentId: string,
  sections: readonly K[]
): Promise<T> {
  if (!isSanityConfigured) return content;
  const photos = await getSanityPageImages(documentId, sections).catch((error) => {
    console.warn(`Sanity photos for "${documentId}" unavailable — showing placeholders.`, error);
    return {} as Record<string, ContentImage>;
  });
  for (const name of sections) {
    const src = photos[name]?.src;
    if (src) content[name].image = { src, alt: content[name].imageAlt };
  }
  return content;
}

/** Hero / closing photos from the site-wide `pagePhotos` document; `{}` when none or Sanity is unavailable. */
export async function getPagePhotos(path: string): Promise<{ hero?: ContentImage; cta?: ContentImage }> {
  if (!isSanityConfigured) return {};
  return getSanityPagePhotos(path).catch((error) => {
    console.warn(`Sanity page photos for "${path}" unavailable — showing placeholders.`, error);
    return {};
  });
}
