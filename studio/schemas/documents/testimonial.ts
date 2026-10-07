import { defineField, defineType } from 'sanity';
import { CommentIcon } from '@sanity/icons';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      description: 'The customer’s words, exactly as given. Quotation marks are added by you (use “ ”).',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'name',
      title: 'Reviewer name',
      type: 'string',
      description: 'e.g. “John M.”',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'detail',
      title: 'Vehicle / source / date',
      type: 'string',
      description: 'Shown under the name, e.g. “Mazda owner, Carwise Review” or “Google Review, 2026”.',
    }),
    defineField({
      name: 'featured',
      title: 'Show on homepage',
      type: 'boolean',
      description:
        'The homepage shows 3 testimonials. Tick up to 3 here; if fewer are ticked it fills from the top of the display order.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first on /reviews/. Leave a gap (10, 20, 30…) so new ones can slot in.',
      initialValue: 1000,
      validation: (r) => r.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: '_createdAt', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'detail', quote: 'quote', featured: 'featured' },
    prepare({
      title,
      subtitle,
      quote,
      featured,
    }: {
      title?: string;
      subtitle?: string;
      quote?: string;
      featured?: boolean;
    }) {
      return {
        title: `${featured ? '★ ' : ''}${title || 'Unnamed reviewer'}`,
        subtitle: [subtitle, quote?.slice(0, 60)].filter(Boolean).join(' · '),
      };
    },
  },
});
