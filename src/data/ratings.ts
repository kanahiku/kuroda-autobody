/**
 * Ratings bar (<RatingsBar />) — the aggregate review scores shown on any page that uses the widget.
 *
 * Shape of the Sanity `ratingsBar` document AND its built-in fallback. The site renders Sanity's values
 * field by field and falls back to these when a field is empty or Sanity is unreachable
 * (see `src/lib/content/ratings.ts`). `scripts/seed-pages.mjs` reads this to fill the Studio once.
 * Platform names, logos and star artwork live in the widget — only the numbers are edited.
 */
export type RatingPlatform = 'carwise' | 'google' | 'yelp';

export interface RatingItem {
  platform: RatingPlatform;
  /** e.g. "4.9" — stars are derived from it (rounded to the nearest half). */
  score: string;
  /** Desktop count line, e.g. "5,416 verified surveys". */
  count: string;
  /** Shorter mobile count line, e.g. "5,416 surveys". */
  countMobile: string;
}

export interface RatingsContent {
  items: RatingItem[];
}

export const ratingsFallback: RatingsContent = {
  items: [
    { platform: 'carwise', score: '4.9', count: '5,416 verified surveys', countMobile: '5,416 surveys' },
    { platform: 'google', score: '4.6', count: '182 reviews', countMobile: '182 reviews' },
    { platform: 'yelp', score: '4.5', count: '180 reviews', countMobile: '180 reviews' },
  ],
};
