import { defineField, defineType } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons';
import { heading, items, line, paragraph, photo, section } from '../fields';

/**
 * Contact page (/contact/) — one document, one tab per section, in page order.
 *
 * Layout, section order, the estimate form's fields, the map and the "Get directions" / phone link
 * destinations live in the code and site config; this document only holds the words. Field names match
 * `src/data/contact.ts` (`ContactContent`) — keep them in sync.
 */

const GROUPS = [
  { name: 'seo', title: 'SEO', default: true },
  { name: 'hero', title: '1 · Hero' },
  { name: 'form', title: '2 · Estimate form' },
  { name: 'details', title: '3 · Address, hours & map' },
  { name: 'band', title: '4 · Closing band' },
];

const TOKENS =
  'Tip: type {phone}, {fax}, {cityLine}, {landmark} or {addressLine} to insert that detail from the site settings — it then updates everywhere if it ever changes.';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  icon: EnvelopeIcon,
  groups: GROUPS,
  fields: [
    // ── SEO ──────────────────────────────────────────────────────────────────
    section('seo', 'SEO', 'seo', [
      line('title', 'Page title', 80, 'Shown in the browser tab and Google results. Aim for under 70 characters.'),
      paragraph(
        'description',
        'Meta description',
        200,
        `Shown under the title in Google results. Aim for 120–160 characters. ${TOKENS}`
      ),
    ]),

    // ── 1 · Hero ─────────────────────────────────────────────────────────────
    section('hero', 'Hero', 'hero', [
      line('eyebrow', 'Eyebrow', 50, 'Small uppercase label above the headline.'),
      ...heading(60, 30),
      paragraph('body', 'Intro paragraph', 320),
      ...photo('', 'Hero photo'),
    ]),

    // ── 2 · Estimate form ────────────────────────────────────────────────────
    section(
      'form',
      'Estimate form',
      'form',
      [...heading(30, 30)],
      'Only the heading above the form is edited here — the form fields and where requests are sent are set up by the developers.'
    ),

    // ── 3 · Address, hours & map ─────────────────────────────────────────────
    section('details', 'Address, hours & map', 'details', [
      line('eyebrow', 'Eyebrow', 50),
      ...heading(40, 30),
      items(
        'rows',
        'Facts list',
        [1, 10],
        [
          line('label', 'Label', 30, 'e.g. “Phone”.'),
          defineField({
            name: 'value',
            title: 'Value',
            type: 'text',
            rows: 4,
            description: `Each new line is shown on its own line. ${TOKENS}`,
            validation: (r) => r.required().max(160),
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
        'Rows of the address / hours / phone list, in order.'
      ),
      line('ctaText', 'Button label', 30, 'The button opens Google Maps directions.'),
      line('mapTitle', 'Map description (accessibility)', 140, TOKENS),
    ]),

    // ── 4 · Closing band ─────────────────────────────────────────────────────
    section(
      'band',
      'Closing band',
      'band',
      [
        line('eyebrow', 'Eyebrow', 50),
        ...heading(40, 30),
        paragraph('body', 'Paragraph', 240),
        line('ctaText', 'Button label', 30, 'The button scrolls back up to the estimate form.'),
      ],
      'The navy band under the map.'
    ),
  ],
  preview: {
    prepare: () => ({ title: 'Contact page', subtitle: '/contact/' }),
  },
});
