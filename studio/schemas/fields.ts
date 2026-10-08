import { defineArrayMember, defineField } from 'sanity';
import { PAGE_OPTIONS } from './pageOptions';

/**
 * Shared field builders for the page documents (`homePage`, `locationPage`, …). They encode the site's
 * editing rules once: everything the layout needs is required, with a length cap that protects the layout,
 * headings are "normal part + accent part", and item lists have a fixed or bounded size.
 */

/** Required single-line text with a length cap that protects the layout. */
export const line = (name: string, title: string, max: number, description?: string) =>
  defineField({
    name,
    title,
    type: 'string',
    description,
    validation: (r) => r.required().max(max),
  });

/** Required multi-line text. */
export const paragraph = (name: string, title: string, max: number, description?: string) =>
  defineField({
    name,
    title,
    type: 'text',
    rows: 3,
    description,
    validation: (r) => r.required().max(max),
  });

/** Two-weight heading: normal part + accent part (brand gradient / accent colour, styled by the site). */
export const heading = (leadMax = 60, accentMax = 40) => [
  line(
    'headingLead',
    'Heading — normal text',
    leadMax,
    'First part of the heading in regular weight. No trailing space needed.'
  ),
  line(
    'headingAccent',
    'Heading — accent text (gradient)',
    accentMax,
    'Last part of the heading, shown in the accent style. Together they read as one sentence.'
  ),
];

/** Photo upload + alt text. The site shows a grey placeholder wherever no photo is uploaded. */
export const photo = (prefix = '', label = 'Photo', requireAlt = true) => [
  defineField({
    name: prefix ? `${prefix}Image` : 'image',
    title: label,
    type: 'image',
    options: { hotspot: true },
    description: 'Optional — the site shows a grey placeholder until a photo is uploaded here.',
  }),
  defineField({
    name: prefix ? `${prefix}Alt` : 'imageAlt',
    title: `${label} — alt text`,
    type: 'string',
    description: requireAlt
      ? 'Describe what the photo shows, for screen readers and search engines.'
      : 'Describe what the photo shows, for screen readers and search engines. Leave blank to use the page name.',
    validation: (r) => (requireAlt ? r.required().max(140) : r.max(140)),
  }),
];

const iconList = (values: [string, string][]) => ({
  list: values.map(([value, title]) => ({ value, title })),
  layout: 'dropdown' as const,
});

export const icon = (list: [string, string][], initialValue?: string) =>
  defineField({
    name: 'icon',
    title: 'Icon',
    type: 'string',
    options: iconList(list),
    initialValue,
    validation: (r) => r.required(),
  });

/** A fixed-size list of items (the layout is built for exactly this many). */
export const items = (
  name: string,
  title: string,
  count: number | [number, number],
  fields: ReturnType<typeof defineField>[],
  previewTitle: string,
  previewSubtitle?: string,
  description?: string
) =>
  defineField({
    name,
    title,
    type: 'array',
    description:
      description ??
      (typeof count === 'number'
        ? `The layout is built for exactly ${count}.`
        : `Between ${count[0]} and ${count[1]}.`),
    of: [
      defineArrayMember({
        type: 'object',
        fields,
        preview: {
          select: previewSubtitle ? { title: previewTitle, subtitle: previewSubtitle } : { title: previewTitle },
          prepare: (value: Record<string, unknown>) => ({
            title: value.title as string | undefined,
            subtitle: value.subtitle as string | undefined,
          }),
        },
      }),
    ],
    validation: (r) =>
      typeof count === 'number' ? r.required().length(count) : r.required().min(count[0]).max(count[1]),
  });

export const section = (
  name: string,
  title: string,
  group: string,
  fields: ReturnType<typeof defineField>[],
  description?: string
) => defineField({ name, title, type: 'object', group, description, options: { collapsible: false }, fields });

/** Button destination: a site page (/contact/), a phone / email link, a site-settings token, or a full web address. */
const buttonLink = defineField({
  name: 'href',
  title: 'Button link',
  type: 'string',
  description:
    'A page on this site (e.g. /contact/), a phone link (tel:+18086761941 — or type {phoneHref} for the shop number), {directionsHref} for Google Maps directions, or a full web address (https://…).',
  validation: (r) =>
    r.required().regex(/^(\/|https?:\/\/|tel:|mailto:|\{phoneHref\}|\{directionsHref\})/, {
      name: 'a page path, tel:, mailto:, https:// or {phoneHref}',
    }),
});

const TOKEN_TIP =
  'Tip: type {phone}, {fax}, {cityLine} or {landmark} to insert that detail from the site settings — it then updates everywhere if it ever changes.';

/**
 * The closing call to action's copy fields, identical on every page: description + two buttons
 * (label and link each). Put after `...heading()` inside the page's `cta` section.
 */
export const ctaCopy = (descriptionMax = 200) => [
  paragraph('description', 'Description', descriptionMax, 'The short paragraph under the heading.'),
  defineField({
    name: 'ctaOne',
    title: 'CTA one (main button)',
    type: 'object',
    options: { collapsible: false },
    fields: [line('text', 'Button label', 30), buttonLink],
  }),
  defineField({
    name: 'ctaTwo',
    title: 'CTA two (second button)',
    type: 'object',
    options: { collapsible: false },
    fields: [line('text', 'Button label', 30, TOKEN_TIP), buttonLink],
  }),
];

const CUSTOM_LINK = /^(\/|https?:\/\/|tel:|mailto:|\{phoneHref\}|\{directionsHref\})/;

/**
 * A link picker: choose one of the site's pages from a list, or "Other" to type a web address / phone link.
 * `optional` adds "Nothing — label only" (a dropdown heading that is not a link itself). The site reads
 * `href` (page, `none` or `custom`) and `customHref` — see src/lib/content/navigationDoc.ts.
 */
export const linkPicker = (optional = false) => [
  defineField({
    name: 'href',
    title: 'Links to',
    type: 'string',
    options: {
      layout: 'dropdown',
      list: [
        ...(optional ? [{ value: 'none', title: 'Nothing — just a label' }] : []),
        ...PAGE_OPTIONS,
        { value: 'custom', title: 'Other — type a link…' },
      ],
    },
    validation: (r) => r.required(),
  }),
  defineField({
    name: 'customHref',
    title: 'Other link',
    type: 'string',
    description:
      'A web address (https://…), a phone link (tel:+18086761941 — or {phoneHref} for the shop number), mailto:, or a page path (/contact/).',
    hidden: ({ parent }) => (parent as { href?: string } | undefined)?.href !== 'custom',
    validation: (r) =>
      r.custom((value, context) => {
        if ((context.parent as { href?: string } | undefined)?.href !== 'custom') return true;
        return typeof value === 'string' && CUSTOM_LINK.test(value.trim())
          ? true
          : 'Start with /, https://, tel:, mailto: or {phoneHref}';
      }),
  }),
];

/** A label + link pair, used for every menu entry. */
export const navLink = (labelMax = 40, optionalLink = false) => [
  line('text', 'Label', labelMax),
  ...linkPicker(optionalLink),
];
