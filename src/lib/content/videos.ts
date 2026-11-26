import { isSanityConfigured } from '../sanity/client';
import { getSanitySiteVideos } from './sanity';

export interface SiteVideo {
  /** MP4 on the Sanity CDN. */
  src: string;
  /** Still frame shown before the video plays (and when motion is reduced). */
  poster?: string;
}

/** The homepage hero loop and the Our Story film, uploaded in Sanity (`siteVideos`). Absent → nothing is shown. */
export async function getSiteVideos(): Promise<{ hero?: SiteVideo; about?: SiteVideo }> {
  if (!isSanityConfigured) return {};
  try {
    const v = await getSanitySiteVideos();
    return {
      hero: v.heroLoop ? { src: v.heroLoop, poster: v.heroPoster } : undefined,
      about: v.aboutFilm ? { src: v.aboutFilm, poster: v.aboutPoster } : undefined,
    };
  } catch (error) {
    console.warn('Sanity site videos unavailable — videos hidden.', error);
    return {};
  }
}
