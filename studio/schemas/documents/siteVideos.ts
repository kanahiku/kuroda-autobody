import { defineField, defineType } from 'sanity';
import { PlayIcon } from '@sanity/icons';
import { photo } from '../fields';

/**
 * Site videos — the two films on the website. One document; the fields are fixed.
 *   • Homepage hero loop: 5–7 s, no sound, plays silently behind a blue tint.
 *   • Our Story film: the full video under the page hero, played by the visitor, always silent.
 * Read by `getSiteVideos()` in src/lib/content/videos.ts. Upload MP4 (H.264), keep the loop under ~2 MB and the
 * film under ~25 MB; `scripts/upload-site-videos.mjs` does the first upload.
 */

const video = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    type: 'file',
    options: { accept: 'video/mp4' },
    description,
  });

export const siteVideos = defineType({
  name: 'siteVideos',
  title: 'Site videos',
  type: 'document',
  icon: PlayIcon,
  fields: [
    video(
      'heroLoop',
      'Homepage hero loop',
      'MP4, 5–7 seconds, no audio. Plays on repeat behind the blue tint at the top of the homepage. Keep it under about 2 MB.'
    ),
    ...photo('heroPoster', 'Hero loop — still frame', false),
    video(
      'aboutFilm',
      'Our Story film',
      'MP4, played silently — the site mutes it, so use a file without audio (or accept that its sound is never heard). Shown under the Our Story hero; visitors click to play it. Keep it under about 25 MB.'
    ),
    ...photo('aboutPoster', 'Our Story film — cover image', false),
  ],
  preview: { prepare: () => ({ title: 'Site videos' }) },
});
