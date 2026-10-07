import { defineArrayMember, defineField, defineType } from 'sanity';
import { StarIcon } from '@sanity/icons';

/**
 * Ratings bar — the aggregate review scores in the navy band (<RatingsBar /> on the site).
 * One site-wide document: change a number here and every page that shows the bar updates.
 * Field names match `src/data/ratings.ts` (`RatingsContent`) — keep them in sync.
 * Platform names, logos and star artwork live in the code; only the numbers are edited.
 */
export const ratingsBar = defineType({
  name: 'ratingsBar',
  title: 'Ratings bar',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Platforms',
      type: 'array',
      description: 'The bar is built for exactly three platforms, shown in this order.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { value: 'carwise', title: 'CARWISE' },
                  { value: 'google', title: 'Google' },
                  { value: 'yelp', title: 'Yelp' },
                ],
                layout: 'dropdown',
              },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'score',
              title: 'Score (out of 5)',
              type: 'string',
              description: 'e.g. 4.9 — the stars are drawn from this.',
              validation: (r) => r.required().regex(/^[0-5](\.\d)?$/, { name: 'a score like 4.9' }),
            }),
            defineField({
              name: 'count',
              title: 'Count — desktop',
              type: 'string',
              description: 'e.g. “5,416 verified surveys”.',
              validation: (r) => r.required().max(40),
            }),
            defineField({
              name: 'countMobile',
              title: 'Count — mobile',
              type: 'string',
              description: 'Shorter version, e.g. “5,416 surveys”.',
              validation: (r) => r.required().max(30),
            }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'score' },
          },
        }),
      ],
      validation: (r) => r.required().length(3),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Ratings bar', subtitle: 'Shown wherever the bar appears' }),
  },
});
