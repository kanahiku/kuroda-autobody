import { defineField, defineType } from 'sanity';
import { UsersIcon } from '@sanity/icons';

/**
 * A position the shop is hiring for. Published openings are listed on /careers/ and appear in the
 * "Position" dropdown of the application form. Untick "Currently hiring" (or delete) to take one down.
 * Field names match `JobOpening` in src/lib/content/types.ts — keep them in sync.
 */
export const jobOpening = defineType({
  name: 'jobOpening',
  title: 'Job opening',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Position title',
      type: 'string',
      description: 'e.g. “Auto Body Technician”.',
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: 'summary',
      title: 'Short line',
      type: 'string',
      description: 'Shown under the title, e.g. “Full time · Waipahu”.',
      validation: (r) => r.max(100),
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 4,
      description: 'A two or three sentence teaser, always visible on the page. Each line is its own paragraph.',
      validation: (r) => r.max(600),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full job description',
      type: 'text',
      rows: 20,
      description:
        'The complete job description — responsibilities, requirements, pay, schedule. Shown in a “Full job description” dropdown under the short description. Each line is its own paragraph; start lines with “- ” for a bullet list; a short line with no full stop (e.g. “Responsibilities”) becomes a sub-heading.',
      validation: (r) => r.max(10000),
    }),
    defineField({
      name: 'isOpen',
      title: 'Currently hiring',
      type: 'boolean',
      description: 'Untick to hide this position from the website without deleting it.',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first. Leave a gap (10, 20, 30…) so new ones can slot in.',
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
    select: { title: 'title', subtitle: 'summary', isOpen: 'isOpen' },
    prepare({ title, subtitle, isOpen }: { title?: string; subtitle?: string; isOpen?: boolean }) {
      return {
        title: title || 'Untitled position',
        subtitle: [isOpen === false ? 'Hidden' : 'Hiring', subtitle].filter(Boolean).join(' · '),
      };
    },
  },
});
