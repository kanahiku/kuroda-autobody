import { defineField, defineType } from 'sanity';
import { PinIcon } from '@sanity/icons';
import { ctaCopy, heading, icon, items, line, paragraph, photo, section } from '../fields';

/**
 * Location page (/location/) — one document, one tab per section, in page order.
 *
 * Layout, section order, the map itself and the "Get directions" / phone link destinations live in the
 * code and site config; this document only holds the words. Field names match `src/data/location.ts`
 * (`LocationContent`) — keep them in sync.
 */

const GROUPS = [
  { name: 'seo', title: 'SEO', default: true },
  { name: 'hero', title: '1 · Hero' },
  { name: 'details', title: '2 · Address & hours' },
  { name: 'map', title: '3 · Map & directions' },
  { name: 'features', title: '4 · Parking & rentals' },
  { name: 'communities', title: '5 · Communities served' },
  { name: 'faqs', title: '6 · FAQ' },
  { name: 'cta', title: '7 · Closing call to action' },
];

const TOKENS =
  'Tip: type {phone}, {fax}, {cityLine} or {landmark} to insert that detail from the site settings — it then updates everywhere if it ever changes.';

const FEATURE_ICONS: [string, string][] = [
  ['shield', 'Shield'],
  ['rental', 'Rental'],
  ['check', 'Check'],
  ['clock', 'Clock'],
  ['chat', 'Chat'],
  ['claims', 'Insurance claims'],
  ['collision', 'Collision repair'],
  ['calibration', 'Calibration'],
  ['paint', 'Paint'],
  ['alignment', 'Alignment'],
];

export const locationPage = defineType({
  name: 'locationPage',
  title: 'Location page',
  type: 'document',
  icon: PinIcon,
  groups: GROUPS,
  fields: [
    // ── SEO ──────────────────────────────────────────────────────────────────
    section('seo', 'SEO', 'seo', [
      line('title', 'Page title', 70, 'Shown in the browser tab and Google results. Aim for under 60 characters.'),
      paragraph(
        'description',
        'Meta description',
        170,
        'Shown under the title in Google results. Aim for 120–160 characters.'
      ),
    ]),

    // ── 1 · Hero ─────────────────────────────────────────────────────────────
    section('hero', 'Hero', 'hero', [
      line('eyebrow', 'Eyebrow', 50, 'Small uppercase label above the headline.'),
      ...heading(60, 30),
      paragraph('body', 'Intro paragraph', 240),
      ...photo('', 'Hero photo'),
    ]),

    // ── 2 · Address & hours ──────────────────────────────────────────────────
    section('details', 'Address & hours', 'details', [
      line('eyebrow', 'Eyebrow', 50),
      ...heading(40, 30),
      items(
        'rows',
        'Facts list',
        [1, 10],
        [
          line('label', 'Label', 30, 'e.g. “Phone”.'),
          line('value', 'Value', 120, TOKENS),
          defineField({
            name: 'note',
            title: 'Small note (optional)',
            type: 'string',
            description: 'Shown in smaller text under the value.',
            validation: (r) => r.max(120),
          }),
          defineField({
            name: 'link',
            title: 'Value links to',
            type: 'string',
            description: 'Make the value a link: Google Maps directions or a tap-to-call phone link.',
            options: {
              list: [
                { value: 'none', title: 'Nothing (plain text)' },
                { value: 'directions', title: 'Google Maps directions' },
                { value: 'phone', title: 'Phone (tap to call)' },
              ],
              layout: 'radio',
            },
            initialValue: 'none',
            validation: (r) => r.required(),
          }),
        ],
        'label',
        'value',
        'Rows of the address / phone / hours list, in order.'
      ),
    ]),

    // ── 3 · Map & directions ─────────────────────────────────────────────────
    section(
      'map',
      'Map & directions',
      'map',
      [
        line('eyebrow', 'Eyebrow', 50),
        ...heading(30, 30),
        line('mapTitle', 'Map description (accessibility)', 120, TOKENS),
        line('caption', 'Caption under the map', 120, TOKENS),
        paragraph('lead', 'Intro paragraph', 200),
        items(
          'directions',
          'Driving directions',
          [1, 6],
          [line('title', 'Title', 40), paragraph('description', 'Directions', 260)],
          'title',
          'description'
        ),
        line('ctaText', 'Button label', 30, 'The button opens Google Maps directions.'),
      ],
      'The map itself and the directions link come from the site settings (the shop address).'
    ),

    // ── 4 · Parking & rentals ────────────────────────────────────────────────
    section('features', 'Parking & rentals', 'features', [
      line('eyebrow', 'Eyebrow', 50),
      ...heading(40, 30),
      paragraph('lead', 'Intro paragraph', 200),
      items(
        'items',
        'Points',
        [2, 6],
        [icon(FEATURE_ICONS), line('title', 'Title', 40), paragraph('description', 'Description', 300)],
        'title',
        'description'
      ),
    ]),

    // ── 5 · Communities served ───────────────────────────────────────────────
    section('communities', 'Communities served', 'communities', [
      line('eyebrow', 'Eyebrow', 50),
      ...heading(30, 30),
      paragraph('lead', 'Intro paragraph', 200),
      items('items', 'Communities', [1, 16], [line('label', 'Name', 40)], 'label'),
    ]),

    // ── 6 · FAQ ──────────────────────────────────────────────────────────────
    section('faqs', 'FAQ', 'faqs', [
      line('eyebrow', 'Eyebrow', 50),
      ...heading(40, 40),
      items(
        'items',
        'Questions',
        [1, 12],
        [line('question', 'Question', 120), paragraph('answer', 'Answer', 400, TOKENS)],
        'question',
        'answer'
      ),
    ]),

    // ── 7 · Closing call to action ───────────────────────────────────────────
    section('cta', 'Closing call to action', 'cta', [
      ...heading(30, 30),
      ...ctaCopy(200),
      ...photo('', 'Closing photo', false),
    ]),
  ],
  preview: {
    prepare: () => ({ title: 'Location page', subtitle: '/location/' }),
  },
});
