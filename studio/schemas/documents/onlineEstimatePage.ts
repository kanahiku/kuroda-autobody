import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons';
import { heading, icon, items, line, paragraph, photo, section } from '../fields';

/**
 * Online Estimate page (/online-estimate/) — one document, one tab per section, in page order.
 *
 * Layout and section order live in the code; the two Carwise button links come from site settings. This
 * document only holds the words and the hero photo. Field names match `src/data/onlineEstimate.ts`
 * (`OnlineEstimateContent`) — keep them in sync.
 */

const GROUPS = [
  { name: 'seo', title: 'SEO', default: true },
  { name: 'hero', title: '1 · Hero' },
  { name: 'options', title: '2 · Two ways to start' },
  { name: 'visit', title: '3 · In-person visit' },
  { name: 'launch', title: '4 · Closing band' },
];

/** Same names as the site's icon set (public/icons/). */
const ICONS: [string, string][] = [
  ['camera', 'Camera'],
  ['walk-around', 'Walk-around'],
  ['rental', 'Rental'],
  ['claims', 'Insurance claims'],
  ['check', 'Check'],
  ['clock', 'Clock'],
  ['document', 'Document'],
  ['shield', 'Shield'],
  ['verified', 'Verified'],
];

const TOKENS = 'Tip: type {phone} to insert the shop phone number from the site settings.';

/** Two icon / title / description columns, shared by both feature sections. */
const columns = (title: string) =>
  items(
    'items',
    title,
    2,
    [
      icon(ICONS),
      line('title', 'Title', 50),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
        rows: 4,
        validation: (r) => r.required().max(420),
      }),
    ],
    'title',
    'description'
  );

export const onlineEstimatePage = defineType({
  name: 'onlineEstimatePage',
  title: 'Online Estimate page',
  type: 'document',
  icon: CalendarIcon,
  groups: GROUPS,
  fields: [
    section('seo', 'SEO', 'seo', [
      line('title', 'Page title', 80, 'Shown in the browser tab and Google results. Aim for under 70 characters.'),
      paragraph(
        'description',
        'Meta description',
        200,
        `Shown under the title in Google results. Aim for 120–160 characters. ${TOKENS}`
      ),
    ]),

    section('hero', 'Hero', 'hero', [
      line('eyebrow', 'Eyebrow', 50, 'Small uppercase label above the headline.'),
      ...heading(40, 40),
      paragraph('body', 'Intro paragraph', 360),
      ...photo('', 'Hero photo'),
    ]),

    section('options', 'Two ways to start', 'options', [
      line('eyebrow', 'Eyebrow', 50),
      ...heading(40, 40),
      columns('Options (photo estimate, in-person appointment)'),
    ]),

    section('visit', 'In-person visit', 'visit', [
      line('eyebrow', 'Eyebrow', 50),
      ...heading(40, 40),
      columns('What happens during the visit'),
    ]),

    section(
      'launch',
      'Closing band',
      'launch',
      [
        line('eyebrow', 'Eyebrow', 50),
        ...heading(40, 40),
        paragraph('body', 'Paragraph', 200),
        line('photoCtaText', 'Photo estimate button label', 40, 'Opens the Carwise photo estimate.'),
        line('appointmentCtaText', 'Appointment button label', 40, 'Opens the Carwise appointment booking.'),
        line('callLead', 'Phone line — text before the number', 80, 'The shop phone number is added after this text.'),
        line('callTrail', 'Phone line — text after the number', 60),
      ],
      "The navy band at the bottom. The two buttons' links are set up by the developers."
    ),
  ],
  preview: {
    prepare: () => ({ title: 'Online Estimate page', subtitle: '/online-estimate/' }),
  },
});
