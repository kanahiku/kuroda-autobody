import { homeFallback, type HomeContent } from '../../data/home';
import { isSanityConfigured } from '../sanity/client';
import { applyTokens } from './merge';
import { getSingleton } from './singleton';
import { siteTokens } from './tokens';
import { getSanityBeforeAfterImages, getSanityFeaturedTestimonials } from './sanity';
import { withSanityPhotos } from './photos';

/**
 * Homepage content = Sanity `homePage` document merged field-by-field over `homeFallback`
 * (src/data/home.ts). A field that is empty or missing in Sanity keeps the fallback text, so the
 * page is always complete — even when Sanity is unreachable.
 */

/** Sections of the homepage that carry a photo (Sanity `homePage.<section>.image`). */
const PHOTO_SECTIONS = ['hero', 'services', 'why', 'heritage', 'cta'] as const;

export async function getHomeContent(): Promise<HomeContent> {
  const [home, testimonials] = await Promise.all([
    getSingleton('homePage', homeFallback)
      .then((content) => applyTokens(content, siteTokens()))
      .then((content) => withSanityPhotos(content, 'homePage', PHOTO_SECTIONS)),
    isSanityConfigured
      ? getSanityFeaturedTestimonials(3).catch((error) => {
          console.warn('Sanity featured testimonials unavailable — using built-in copy.', error);
          return [];
        })
      : [],
  ]);

  // The before / after pair lives in two fields of one section, so it is attached separately.
  const pair = await getSanityBeforeAfterImages().catch(() => ({ before: undefined, after: undefined }));
  const { beforeAlt, afterAlt } = home.beforeAfter;
  if (pair.before?.src) home.beforeAfter.beforeImage = { src: pair.before.src, alt: beforeAlt };
  if (pair.after?.src) home.beforeAfter.afterImage = { src: pair.after.src, alt: afterAlt };

  // The review cards come from the three featured testimonials; anything less keeps the built-in cards.
  if (testimonials.length === 3) {
    const items = testimonials.map((t) => ({ platform: t.name, quote: t.quote, source: t.detail }));
    return { ...home, reviews: { ...home.reviews, items } };
  }
  return home;
}
