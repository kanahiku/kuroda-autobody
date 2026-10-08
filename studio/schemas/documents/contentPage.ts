import { defineArrayMember, defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';
import { ctaCopy, heading, items, line, paragraph, photo, section } from '../fields';

/**
 * Copy-driven interior page (Our Story, and — as they are migrated — the collision-repair / had-an-accident
 * pages). One document per route, id `contentPage-<route>` (e.g. `contentPage-about`); created by
 * `scripts/seed-pages.mjs`, never from the Studio, because a new page also needs a route and sitemap entry.
 *
 * The page layout is fixed (hero → blocks → related links → closing call to action); the middle is an
 * ordered list of blocks the team can add, remove and reorder. Field names match the mapping in
 * `src/lib/content/contentPageDoc.ts` — keep them in sync. Block kinds the Studio does not have yet
 * (features, tables, steps, FAQs …) stay in the code until that kind is added here.
 */

const GROUPS = [
  { name: 'seo', title: 'SEO', default: true },
  { name: 'hero', title: '1 · Hero' },
  { name: 'sections', title: '2 · Page blocks' },
  { name: 'faqs', title: '3 · FAQ' },
  { name: 'related', title: '4 · Related links' },
  { name: 'cta', title: '5 · Closing call to action' },
];

/** Same keys as `CREDENTIAL_LOGOS` in src/lib/content/contentPageDoc.ts — the PNGs live in public/oem/. */
const LOGOS: [string, string][] = [
  ['', 'No logo yet (grey box)'],
  ['icar-gold-class', 'I-CAR Gold Class'],
  ['honda', 'Honda'],
  ['acura', 'Acura'],
  ['nissan', 'Nissan'],
  ['gm', 'GM'],
  ['fca', 'Chrysler'],
];

/** Same names as the site's icon set (public/icons/). */
const ICONS: [string, string][] = [
  ['alignment', 'Alignment'],
  ['calibration', 'Calibration'],
  ['camera', 'Camera'],
  ['chat', 'Chat'],
  ['check', 'Check'],
  ['claims', 'Insurance claims'],
  ['clock', 'Clock'],
  ['collision', 'Collision repair'],
  ['document', 'Document'],
  ['paint', 'Paint'],
  ['rental', 'Rental'],
  ['shield', 'Shield'],
  ['verified', 'Verified'],
  ['walk-around', 'Walk-around'],
];

const BOLD = 'Tip: wrap words in **double asterisks** to make them bold.';

/** A site page, a phone / email link, a full web address, or a site-settings token ({phoneHref}, {directionsHref}). */
const SITE_LINK = /^(\/|https?:\/\/|tel:|mailto:|\{phoneHref\}|\{directionsHref\})/;

/** Optional pinned background for a block. */
const surfaceField = defineField({
  name: 'surface',
  title: 'Background',
  type: 'string',
  options: {
    list: [
      { value: '', title: 'Automatic (alternates down the page)' },
      { value: 'page', title: 'White' },
      { value: 'subtle', title: 'Light grey' },
    ],
    layout: 'dropdown',
  },
  description: 'Leave on Automatic unless this block needs a specific background.',
});

/** Optional single line. */
const optionalLine = (name: string, title: string, max: number, description?: string) =>
  defineField({ name, title, type: 'string', description, validation: (r) => r.max(max) });

/** Optional multi-line text. */
const optionalText = (name: string, title: string, max: number, description?: string) =>
  defineField({ name, title, type: 'text', rows: 3, description, validation: (r) => r.max(max) });

/** Heading whose accent part is optional (a heading may be all one weight). */
const headingOptionalAccent = (leadMax = 60, accentMax = 40) => [
  line(
    'headingLead',
    'Heading — normal text',
    leadMax,
    'First part of the heading in regular weight. No trailing space needed.'
  ),
  optionalLine(
    'headingAccent',
    'Heading — accent text (gradient)',
    accentMax,
    'Optional. Last part of the heading, shown in the accent style.'
  ),
];

const eyebrowField = (
  required = false,
  description = 'A few words in capitals above the heading, e.g. “Our services”.'
) =>
  required
    ? line('eyebrow', 'Small label above the heading', 40, description)
    : optionalLine('eyebrow', 'Small label above the heading', 40, `Optional. ${description}`);

/** A list of paragraphs. */
const paragraphList = (name: string, title: string, max: number, count: [number, number], rows = 3) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [defineArrayMember({ type: 'text', rows, validation: (r) => r.required().max(max) })],
    description: 'One entry per paragraph.',
    validation: (r) => r.required().min(count[0]).max(count[1]),
  });

const pair = (a: unknown, b: unknown) => [a, b].filter(Boolean).join(' ');

/** Preview for any block with a two-part heading. */
const headingPreview = (kind: string) => ({
  select: { lead: 'headingLead', accent: 'headingAccent', eyebrow: 'eyebrow' },
  prepare: ({ lead, accent, eyebrow }: Record<string, string | undefined>) => ({
    title: pair(lead, accent),
    subtitle: eyebrow ? `${kind} · ${eyebrow}` : kind,
  }),
});

const storySection = defineArrayMember({
  type: 'object',
  name: 'storySection',
  title: 'Story block (photo + text)',
  fields: [
    eyebrowField(),
    ...heading(60, 40),
    paragraphList('paragraphs', 'Paragraphs', 700, [1, 8], 4),
    optionalText('quote', 'Pull quote', 260, 'Optional. Shown under the paragraphs.'),
    optionalLine(
      'quoteAttribution',
      'Pull quote — line underneath',
      140,
      'Optional. Only shown when there is a quote.'
    ),
    defineField({
      name: 'isReversed',
      title: 'Photo on the right (desktop)',
      type: 'boolean',
      description: 'Off = photo on the left. Alternate blocks down the page for a nice rhythm.',
      initialValue: false,
    }),
    ...photo('', 'Photo', false),
    optionalLine('caption', 'Photo caption', 90, 'Optional. Shown under the photo.'),
    defineField({
      name: 'stats',
      title: 'Headline numbers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            line('value', 'Number or word', 16, 'Short and bold, e.g. “1938” or “28,000 SQ FT”.'),
            line('label', 'Label', 40),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
            prepare: ({ title, subtitle }: Record<string, string | undefined>) => ({ title, subtitle }),
          },
        }),
      ],
      description: 'Optional. Exactly 3 fits the layout; leave empty for none.',
      validation: (r) => r.max(3),
    }),
    surfaceField,
  ],
  preview: headingPreview('Story block'),
});

const featuresSection = defineArrayMember({
  type: 'object',
  name: 'featuresSection',
  title: 'Feature list (icon + title + text)',
  fields: [
    eyebrowField(),
    ...headingOptionalAccent(60, 40),
    optionalText('lead', 'Intro paragraph', 320, `Optional. Shown under the heading. ${BOLD}`),
    defineField({
      name: 'columns',
      title: 'Columns (desktop)',
      type: 'number',
      options: {
        list: [
          { value: 2, title: '2 columns' },
          { value: 3, title: '3 columns' },
        ],
        layout: 'radio',
      },
      initialValue: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'items',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: { list: ICONS.map(([value, title]) => ({ value, title })), layout: 'dropdown' },
              validation: (r) => r.required(),
            }),
            line('title', 'Title', 50),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: BOLD,
              validation: (r) => r.required().max(320),
            }),
            defineField({
              name: 'link',
              title: 'Link (optional)',
              type: 'string',
              description: 'Makes the title a link to another page, e.g. /collision-repair/dent-repair/.',
              validation: (r) => r.regex(SITE_LINK, { name: 'a page address like /warranty/ or a full web address' }),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
            prepare: ({ title, subtitle }: Record<string, string | undefined>) => ({ title, subtitle }),
          },
        }),
      ],
      description: 'Between 2 and 8. Add, remove or drag to reorder.',
      validation: (r) => r.required().min(2).max(8),
    }),
    optionalLine(
      'note',
      'Closing sentence under the list',
      120,
      'Optional. e.g. “For complete directions, hours, and map details, visit our”.'
    ),
    optionalLine(
      'noteLinkText',
      'Closing sentence — link text',
      40,
      'Optional. Shown as a link at the end of the sentence, e.g. “Location Page”.'
    ),
    defineField({
      name: 'noteLinkHref',
      title: 'Closing sentence — link address',
      type: 'string',
      description: 'A page on this site, e.g. /location/. Needed when there is link text.',
      validation: (r) => r.regex(SITE_LINK, { name: 'a page address like /location/ or a full web address' }),
    }),
    surfaceField,
  ],
  preview: headingPreview('Feature list'),
});

const tableSection = defineArrayMember({
  type: 'object',
  name: 'tableSection',
  title: 'Table',
  fields: [
    eyebrowField(),
    ...headingOptionalAccent(60, 40),
    optionalText('lead', 'Intro paragraph', 320, 'Optional. Shown under the heading.'),
    defineField({
      name: 'columns',
      title: 'Column headings',
      type: 'array',
      of: [defineArrayMember({ type: 'string', validation: (r) => r.required().max(30) })],
      description: 'The first column is the row label. Every row below needs one cell per column heading.',
      validation: (r) => r.required().min(2).max(4),
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'tableRow',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [defineArrayMember({ type: 'text', rows: 2, validation: (r) => r.required().max(140) })],
              description: 'One entry per column, in the same order as the column headings.',
            }),
          ],
          preview: {
            select: { first: 'cells.0', second: 'cells.1' },
            prepare: ({ first, second }: Record<string, string | undefined>) => ({ title: first, subtitle: second }),
          },
        }),
      ],
      validation: (r) =>
        r
          .required()
          .min(1)
          .max(10)
          .custom((rows, context) => {
            const columns = (context.parent as { columns?: unknown[] } | undefined)?.columns ?? [];
            const bad = ((rows as { cells?: unknown[] }[] | undefined) ?? []).findIndex(
              (row) => (row.cells?.length ?? 0) !== columns.length
            );
            return bad === -1 ? true : `Row ${bad + 1} needs exactly ${columns.length} cells — one per column heading.`;
          }),
    }),
    surfaceField,
  ],
  preview: headingPreview('Table'),
});

const stepsSection = defineArrayMember({
  type: 'object',
  name: 'stepsSection',
  title: 'Numbered steps',
  fields: [
    eyebrowField(),
    ...headingOptionalAccent(60, 40),
    optionalText('lead', 'Intro paragraph', 220, 'Optional. Shown under the heading.'),
    items(
      'steps',
      'Steps',
      [1, 10],
      [line('title', 'Title', 60), paragraph('description', 'Description', 240)],
      'title',
      'description',
      'Numbered automatically, in this order. Between 1 and 10.'
    ),
    ...photo('', 'Photo (optional)', false),
    surfaceField,
  ],
  preview: headingPreview('Numbered steps'),
});

const actionSection = defineArrayMember({
  type: 'object',
  name: 'actionSection',
  title: 'Navy band with one button',
  fields: [
    eyebrowField(),
    ...headingOptionalAccent(40, 30),
    paragraph('body', 'Paragraph', 320),
    line('ctaText', 'Button text', 30),
    defineField({
      name: 'ctaHref',
      title: 'Button link',
      type: 'string',
      description: 'A page on this site (e.g. /warranty/), a phone link (tel:…) or a full web address (https://…).',
      validation: (r) =>
        r.required().regex(SITE_LINK, { name: 'a page address like /warranty/ or a full web address' }),
    }),
  ],
  preview: headingPreview('Navy band'),
});

/** A FAQ entry with an optional button under the answer. */
const faqItem = defineArrayMember({
  type: 'object',
  name: 'faqItem',
  fields: [
    line('question', 'Question', 120),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (r) => r.required().max(500),
    }),
    optionalLine('ctaText', 'Button text', 30, 'Optional. Adds an outline button under the answer.'),
    defineField({
      name: 'ctaHref',
      title: 'Button link',
      type: 'string',
      description:
        'A page on this site (e.g. /contact/), a phone link (tel:…), {directionsHref} for Google Maps directions, or a full web address (https://…). Needed when there is button text.',
      validation: (r) =>
        r
          .regex(SITE_LINK, { name: 'a page address like /contact/ or a full web address' })
          .custom((value, context) =>
            (context.parent as { ctaText?: string } | undefined)?.ctaText && !value
              ? 'Add a link for the button, or clear the button text.'
              : true
          ),
    }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'answer' },
    prepare: ({ title, subtitle }: Record<string, string | undefined>) => ({ title, subtitle }),
  },
});

const quoteSection = defineArrayMember({
  type: 'object',
  name: 'quoteSection',
  title: 'Customer quote',
  fields: [
    eyebrowField(),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      description: 'Include the quotation marks if you want them shown.',
      validation: (r) => r.required().max(320),
    }),
    optionalLine('attribution', 'Who said it', 120, 'Optional. e.g. “— Darcie M., Kuroda Customer Survey, July 2026”.'),
    surfaceField,
  ],
  preview: {
    select: { title: 'quote', subtitle: 'attribution' },
    prepare: ({ title, subtitle }: Record<string, string | undefined>) => ({
      title,
      subtitle: subtitle ? `Customer quote · ${subtitle}` : 'Customer quote',
    }),
  },
});

const credentialsSection = defineArrayMember({
  type: 'object',
  name: 'credentialsSection',
  title: 'Credentials (text + logo row)',
  fields: [
    eyebrowField(true),
    ...headingOptionalAccent(60, 40),
    paragraphList('paragraphs', 'Paragraphs', 420, [1, 4]),
    items(
      'credentials',
      'Credentials',
      [1, 6],
      [
        line('name', 'Name', 40),
        defineField({
          name: 'logo',
          title: 'Logo',
          type: 'string',
          options: { list: LOGOS.map(([value, title]) => ({ value, title })), layout: 'dropdown' },
          description: 'The logos supplied by the client. New logos are added by the developers.',
        }),
        optionalLine('descriptor', 'Small line under the name', 60, 'Optional.'),
      ],
      'name',
      'descriptor',
      'The row of logo tiles. Between 1 and 6.'
    ),
    surfaceField,
  ],
  preview: headingPreview('Credentials'),
});

export const contentPage = defineType({
  name: 'contentPage',
  title: 'Content page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'path',
      title: 'Page address',
      type: 'string',
      readOnly: true,
      description: 'Which page this is. Set up by the developers — it cannot be changed here.',
    }),
    section('seo', 'SEO', 'seo', [
      line(
        'title',
        'Page title',
        80,
        'Shown in the browser tab and Google results. Keep the “| Kuroda Autobody” ending. Aim for under 80 characters.'
      ),
      paragraph(
        'description',
        'Meta description',
        230,
        'The summary shown under the title in Google results. Aim for under 160 characters.'
      ),
    ]),
    section('hero', 'Hero', 'hero', [
      line('eyebrow', 'Small label above the heading', 40),
      ...heading(60, 40),
      defineField({
        name: 'paragraphs',
        title: 'Intro paragraphs',
        type: 'array',
        of: [defineArrayMember({ type: 'text', rows: 3, validation: (r) => r.required().max(600) })],
        description: 'One entry per paragraph.',
        validation: (r) => r.required().min(1).max(4),
      }),
      ...photo('', 'Hero photo', false),
    ]),
    defineField({
      name: 'sections',
      title: 'Page blocks',
      type: 'array',
      group: 'sections',
      description:
        'The blocks between the hero and the related links, in page order. Add, remove or drag to reorder. If this list is ever emptied, the site shows its built-in blocks.',
      of: [storySection, featuresSection, tableSection, stepsSection, actionSection, credentialsSection, quoteSection],
      validation: (r) => r.required().min(1).max(12),
    }),
    // FAQ + related links only appear on pages that have them (the document is seeded from the built-in page).
    defineField({
      ...section('faqs', 'FAQ', 'faqs', [
        line('eyebrow', 'Small label above the heading', 40),
        ...heading(40, 40),
        defineField({
          name: 'items',
          title: 'Questions',
          type: 'array',
          of: [faqItem],
          description: 'Between 1 and 12. Add, remove or drag to reorder.',
          hidden: ({ parent }) => Boolean(parent?.groups),
          validation: (r) => r.min(1).max(12),
        }),
        defineField({
          name: 'groups',
          title: 'Question groups',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'faqGroup',
              fields: [
                line('title', 'Group title', 50),
                defineField({
                  name: 'items',
                  title: 'Questions',
                  type: 'array',
                  of: [faqItem],
                  validation: (r) => r.required().min(1).max(12),
                }),
              ],
              preview: {
                select: { title: 'title', count: 'items.length' },
                prepare: ({ title, count }: { title?: string; count?: number }) => ({
                  title,
                  subtitle: `${count ?? 0} questions`,
                }),
              },
            }),
          ],
          description: 'The questions are shown under these titles, in this order. Between 1 and 8 groups.',
          hidden: ({ parent }) => !parent?.groups,
          validation: (r) => r.min(1).max(8),
        }),
      ]),
      hidden: ({ document }) => !document?.faqs,
    }),
    defineField({
      ...section('related', 'Related links', 'related', [
        line('eyebrow', 'Small label above the heading', 40),
        ...heading(40, 30),
        defineField({
          name: 'paths',
          title: 'Pages to link to',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'string',
              validation: (r) =>
                r.required().regex(/^\/[a-z0-9-]+(\/[a-z0-9-]+)*\/$/, { name: 'a page address like /warranty/' }),
            }),
          ],
          description:
            'Page addresses, e.g. /repair-process/ or /warranty/ (start and end with “/”). The link name comes from the site menu. Addresses that are not real pages are skipped.',
          validation: (r) => r.required().min(1).max(6),
        }),
      ]),
      hidden: ({ document }) => !document?.related,
    }),
    section('cta', 'Closing call to action', 'cta', [
      ...heading(40, 40),
      ...ctaCopy(200),
      ...photo('', 'Closing photo', false),
    ]),
  ],
  preview: {
    select: { lead: 'hero.headingLead', accent: 'hero.headingAccent', subtitle: 'path' },
    prepare: ({ lead, accent, subtitle }: Record<string, string | undefined>) => ({
      title: [lead, accent].filter(Boolean).join(' ') || 'Content page',
      subtitle,
    }),
  },
});
