import { defineArrayMember, defineField, defineType } from 'sanity';
import { ImagesIcon } from '@sanity/icons';
import { photo } from '../fields';

/**
 * Page photos — the hero and closing-call-to-action photos of pages that have no document of their own
 * (Reviews, the legal pages, the blog list and every blog article). One row per page, created by
 * `scripts/upload-page-images.mjs`; the page address is fixed. Read by `getPagePhotos()` in
 * src/lib/content/photos.ts. Pages with their own document (Homepage, Our Story, …) hold their photos there.
 */

/** Same routes the site looks up with `getPagePhotos(path)`. */
const PAGES: [string, string][] = [
  ['/reviews/', 'Reviews'],
  ['/privacy-policy/', 'Privacy Policy'],
  ['/terms/', 'Terms'],
  ['/accessibility/', 'Accessibility Statement'],
  ['/blog/', 'Blog list'],
  ['/blog/*', 'Blog articles (all posts — closing photo only)'],
];

export const pagePhotos = defineType({
  name: 'pagePhotos',
  title: 'Page photos',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'pages',
      title: 'Pages',
      type: 'array',
      description:
        'The top photo (hero) and closing photo of pages that have no document of their own. Open a page and upload; the page list is fixed.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pagePhotoRow',
          fields: [
            defineField({
              name: 'path',
              title: 'Page',
              type: 'string',
              options: { list: PAGES.map(([value, title]) => ({ value, title })), layout: 'dropdown' },
              validation: (r) => r.required(),
            }),
            ...photo('hero', 'Hero photo', false),
            ...photo('cta', 'Closing photo', false),
          ],
          preview: {
            select: { path: 'path', hero: 'heroImage', cta: 'ctaImage' },
            prepare: ({ path, hero, cta }: { path?: string; hero?: unknown; cta?: unknown }) => ({
              title: PAGES.find(([value]) => value === path)?.[1] ?? path,
              subtitle: [hero && 'hero photo', cta && 'closing photo'].filter(Boolean).join(' · ') || 'no photos yet',
            }),
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Page photos', subtitle: 'Reviews, legal pages, blog' }) },
});
