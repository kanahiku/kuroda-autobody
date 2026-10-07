import { defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons';
import { RatingsBarNotice } from '../components/RatingsBarNotice';
import { ctaCopy, heading, icon, items, line, paragraph, photo, section } from '../fields';

/**
 * Homepage (/) — one document, one tab per section, in page order.
 *
 * Layout, section order, icon artwork and button destinations live in the code; this document only
 * holds the words. (The ratings bar is its own site-wide document, `ratingsBar`.) Field names match `src/data/home.ts` (`HomeContent`) — keep them in sync.
 * Photos: the site still shows grey placeholders, so photo fields only store the file and alt text
 * for the day the real images go live.
 */

const GROUPS = [
  { name: 'seo', title: 'SEO', default: true },
  { name: 'hero', title: '1 · Hero' },
  { name: 'ratings', title: '2 · Ratings bar (shared)' },
  { name: 'services', title: '3 · Services' },
  { name: 'why', title: '4 · Why Kuroda' },
  { name: 'beforeAfter', title: '5 · Before & after' },
  { name: 'heritage', title: '6 · Heritage' },
  { name: 'protection', title: '7 · Consumer protection' },
  { name: 'reviews', title: '8 · Reviews' },
  { name: 'credentials', title: '9 · OEM certifications' },
  { name: 'cta', title: '10 · Final call to action' },
];

const SERVICE_ICONS: [string, string][] = [
  ['collision', 'Collision repair'],
  ['calibration', 'Calibration'],
  ['paint', 'Paint'],
  ['alignment', 'Alignment'],
  ['claims', 'Insurance claims'],
  ['rental', 'Rental'],
];
const WHY_ICONS: [string, string][] = [
  ['shield', 'Shield'],
  ['clock', 'Clock'],
  ['chat', 'Chat'],
  ['check', 'Check'],
];
const PROOF_ICONS: [string, string][] = [
  ['document', 'Document'],
  ['camera', 'Camera'],
  ['walk-around', 'Walk-around'],
];
const TRUST_ICONS: [string, string][] = [
  ['icar', 'I-CAR badge'],
  ['target', 'Target'],
  ['shield', 'Shield'],
  ['home', 'Home'],
];
const LOGOS: [string, string][] = [
  ['icar-gold-class', 'I-CAR Gold Class'],
  ['honda', 'Honda'],
  ['acura', 'Acura'],
  ['nissan', 'Nissan'],
  ['gm', 'General Motors'],
  ['fca', 'FCA US'],
];

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
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
      ...heading(60, 40),
      line('tagline', 'Tagline', 50, 'Uppercase line under the headline.'),
      paragraph('body', 'Intro paragraph', 200),
      line('primaryCtaText', 'Main button label', 30, 'The button links to the estimate page.'),
      line('callLabel', 'Call button label', 30, 'The phone number is added automatically: “CALL KURODA (808) …”.'),
      ...photo('', 'Hero photo'),
      items('trustItems', 'Credentials bar', 4, [icon(TRUST_ICONS), line('text', 'Text', 40)], 'text', 'icon'),
    ]),

    // ── 2 · Ratings bar (shared, edited in its own document) ─────────────────
    defineField({
      name: 'ratingsBarNotice',
      title: 'Ratings bar',
      type: 'string',
      group: 'ratings',
      readOnly: true,
      components: { input: RatingsBarNotice },
    }),

    // ── 3 · Services ─────────────────────────────────────────────────────────
    section('services', 'Services', 'services', [
      line('eyebrow', 'Eyebrow', 50),
      ...heading(40, 40),
      ...photo('', 'Photo'),
      line('caption', 'Photo caption', 80),
      line('figLabel', 'Figure label', 20, 'Small label under the caption, e.g. “FIG. 01”.'),
      items(
        'items',
        'Services',
        6,
        [icon(SERVICE_ICONS), line('title', 'Title', 30), line('description', 'Description', 60)],
        'title',
        'description'
      ),
    ]),

    // ── 4 · Why Kuroda ───────────────────────────────────────────────────────
    section('why', 'Why Kuroda', 'why', [
      line('eyebrow', 'Eyebrow', 50),
      ...heading(40, 40),
      ...photo('', 'Photo'),
      line('caption', 'Photo caption', 80),
      items(
        'items',
        'Reasons',
        4,
        [icon(WHY_ICONS), line('title', 'Title', 30), line('description', 'Description', 70)],
        'title',
        'description'
      ),
    ]),

    // ── 5 · Before & after ───────────────────────────────────────────────────
    section('beforeAfter', 'Before & after', 'beforeAfter', [
      line('eyebrow', 'Eyebrow', 50),
      ...heading(50, 30),
      paragraph('body', 'Paragraph', 200),
      line('beforeLabel', '“Before” tag', 15),
      line('afterLabel', '“After” tag', 15),
      ...photo('before', 'Before photo'),
      ...photo('after', 'After photo'),
      items(
        'points',
        'Proof points',
        3,
        [icon(PROOF_ICONS), line('title', 'Title', 30), line('description', 'Description', 70)],
        'title',
        'description'
      ),
    ]),

    // ── 6 · Heritage ─────────────────────────────────────────────────────────
    section('heritage', 'Heritage', 'heritage', [
      line('eyebrow', 'Eyebrow', 50),
      ...heading(30, 20),
      paragraph('body', 'Paragraph', 240),
      paragraph('quote', 'Pull quote', 160, 'Include the quotation marks “ ”.'),
      line('quoteAttribution', 'Quote attribution', 60, 'e.g. “— The Kuroda family principle”.'),
      ...photo('', 'Archive photo'),
      line('caption', 'Photo caption', 80),
      items(
        'stats',
        'Stats',
        3,
        [line('value', 'Value', 14, 'Big number or word, e.g. “1938”.'), line('label', 'Label', 30)],
        'value',
        'label'
      ),
    ]),

    // ── 7 · Consumer protection ──────────────────────────────────────────────
    section('protection', 'Consumer protection', 'protection', [
      line('eyebrow', 'Eyebrow', 50),
      ...heading(30, 30),
      paragraph('lead', 'Legal lead paragraph', 220),
      paragraph('note', 'Note under the lead', 100),
      items(
        'steps',
        'Steps',
        3,
        [line('title', 'Title', 40), paragraph('description', 'Description', 100)],
        'title',
        'description',
        'Exactly 3. The 01 / 02 / 03 numerals are added automatically.'
      ),
    ]),

    // ── 8 · Reviews ──────────────────────────────────────────────────────────
    section(
      'reviews',
      'Reviews',
      'reviews',
      [line('eyebrow', 'Eyebrow', 50), ...heading(30, 30), paragraph('note', 'Note beside the heading', 100)],
      'The three review cards are pulled from Testimonials marked “Show on homepage”.'
    ),

    // ── 9 · OEM certifications ───────────────────────────────────────────────
    section('credentials', 'OEM certifications', 'credentials', [
      line('eyebrow', 'Eyebrow', 50),
      ...heading(30, 30),
      paragraph('lede', 'Paragraph', 160),
      line('linkText', 'Link text', 40, 'Links to the certifications page.'),
      items(
        'items',
        'Certifications',
        6,
        [
          line('name', 'Name', 30),
          line('descriptor', 'Description', 50),
          defineField({
            name: 'logo',
            title: 'Logo',
            type: 'string',
            options: { list: LOGOS.map(([value, title]) => ({ value, title })), layout: 'dropdown' },
            description: 'Logos are the client’s supplied files; new logos are added by a developer.',
            validation: (r) => r.required(),
          }),
        ],
        'name',
        'descriptor'
      ),
    ]),

    // ── 10 · Final CTA ───────────────────────────────────────────────────────
    section('cta', 'Final call to action', 'cta', [
      line('eyebrow', 'Eyebrow — desktop', 70),
      line('eyebrowMobile', 'Eyebrow — mobile', 40, 'Shorter version shown on phones.'),
      ...heading(40, 30),
      ...ctaCopy(160),
      line('hours', 'Opening hours line', 60),
      ...photo('', 'Team photo'),
    ]),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage', subtitle: '/' }),
  },
});
