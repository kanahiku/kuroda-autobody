import { ratingsFallback, type RatingsContent } from '../../data/ratings';
import { getSingleton } from './singleton';

/**
 * Ratings bar numbers = Sanity `ratingsBar` document merged over `ratingsFallback` (src/data/ratings.ts).
 * Used by <RatingsBar /> itself, so any page can drop the widget in with no props.
 */
export const getRatingsContent = (): Promise<RatingsContent> => getSingleton('ratingsBar', ratingsFallback);
