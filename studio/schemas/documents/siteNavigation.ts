import { defineArrayMember, defineField, defineType } from 'sanity';
import { MenuIcon } from '@sanity/icons';
import { line, linkPicker, navLink, paragraph, section } from '../fields';

/**
 * Header & footer — one document for the site-wide navigation, shown on every page.
 *
 * Layout and styling live in the code (Header.astro / Footer.astro); this document holds the words and the
 * links. Phone number, address and hours come from the site settings (type {phone}, {addressLine}, … in text).
 * Field names match `NavigationDoc` in src/lib/content/navigationDoc.ts — keep them in sync.
 */

const GROUPS = [
  { name: 'header', title: 'Header (menu)', default: true },
  { name: 'footer', title: 'Footer' },
];

const TOKENS =
  'Tip: type {year}, {established}, {phone}, {cityLine} or {addressLine} to insert that detail from the site settings.';

/** A list with a size range that is allowed to be empty (an optional dropdown / flyout). */
const optionalList = (
  name: string,
  title: string,
  max: number,
  fields: ReturnType<typeof defineField>[],
  description: string,
  extra?: (value: unknown, parent: unknown) => true | string
) =>
  defineField({
    name,
    title,
    type: 'array',
    description,
    of: [
      defineArrayMember({
        type: 'object',
        fields,
        preview: { select: { title: 'text', subtitle: 'href' } },
      }),
    ],
    validation: (r) => [r.max(max), r.custom((value, ctx) => extra?.(value, ctx.parent) ?? true)],
  });

/** A required list of label + link entries. */
const linkList = (name: string, title: string, range: [number, number], description: string) =>
  defineField({
    name,
    title,
    type: 'array',
    description,
    of: [
      defineArrayMember({
        type: 'object',
        fields: navLink(40),
        preview: { select: { title: 'text', subtitle: 'href' } },
      }),
    ],
    validation: (r) => r.required().min(range[0]).max(range[1]),
  });

export const siteNavigation = defineType({
  name: 'siteNavigation',
  title: 'Header & footer',
  type: 'document',
  icon: MenuIcon,
  groups: GROUPS,
  fields: [
    // ── Header ───────────────────────────────────────────────────────────────
    section(
      'header',
      'Header (menu)',
      'header',
      [
        defineField({
          name: 'items',
          title: 'Menu',
          type: 'array',
          description:
            'The main menu, left to right. An item can have a dropdown, and a dropdown link can have a flyout. Keep it to 7 items or fewer so the bar fits on a laptop screen.',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                line('text', 'Label', 30),
                ...linkPicker(true),
                optionalList(
                  'dropdown',
                  'Dropdown',
                  10,
                  [
                    ...navLink(50),
                    optionalList(
                      'flyout',
                      'Flyout (opens to the right)',
                      8,
                      navLink(50),
                      'Optional. A short list that opens beside this dropdown link.'
                    ),
                  ],
                  'Optional. The links that open under this menu item.',
                  (value, parent) =>
                    (parent as { href?: string } | undefined)?.href === 'none' &&
                    !(value as unknown[] | undefined)?.length
                      ? 'A label-only item needs at least one dropdown link.'
                      : true
                ),
              ],
              preview: { select: { title: 'text', subtitle: 'href' } },
            }),
          ],
          validation: (r) => r.required().min(3).max(7),
        }),
        defineField({
          name: 'cta',
          title: 'Main button',
          type: 'object',
          description: 'The button at the right end of the header (also shown in the mobile menu).',
          options: { collapsible: false },
          fields: [line('text', 'Button label', 30), ...linkPicker(false)],
        }),
      ],
      'The phone number in the header comes from the site settings.'
    ),

    // ── Footer ───────────────────────────────────────────────────────────────
    section(
      'footer',
      'Footer',
      'footer',
      [
        paragraph('tagline', 'Tagline (under the logo)', 120, TOKENS),
        defineField({
          name: 'columns',
          title: 'Link columns',
          type: 'array',
          description:
            'Up to three columns of links, left to right. The “Visit Us” column always follows them (below).',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                line('title', 'Column title', 24),
                linkList('links', 'Links', [1, 10], 'The links in this column.'),
              ],
              preview: { select: { title: 'title' } },
            }),
          ],
          validation: (r) => r.required().min(1).max(3),
        }),
        defineField({
          name: 'visit',
          title: '“Visit Us” column',
          type: 'object',
          description:
            'Only the labels are edited here — the address, hours and phone number come from the site settings.',
          options: { collapsible: false },
          fields: [
            line('title', 'Title', 24),
            line('mobileTitle', 'Title on phones', 30),
            line('linkText', 'Location link label', 30, 'Links to the Location page.'),
          ],
        }),
        defineField({
          name: 'family',
          title: '“Our family of companies” row',
          type: 'object',
          options: { collapsible: false },
          fields: [
            line('eyebrow', 'Label', 40),
            line('name', 'Company name', 50),
            paragraph('description', 'Description', 140),
          ],
        }),
        line('copyright', 'Copyright line', 100, TOKENS),
        linkList('legalLinks', 'Legal links', [1, 6], 'The small links next to the copyright (privacy, terms …).'),
      ],
      'The footer appears on every page.'
    ),
  ],
  preview: {
    prepare: () => ({ title: 'Header & footer', subtitle: 'Shown on every page' }),
  },
});
