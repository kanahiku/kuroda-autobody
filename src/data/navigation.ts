/**
 * Header + footer navigation — derived 1:1 from the sitemap (`src/data/sitemap.ts`).
 *
 *   Category            → top-level header item / footer column
 *   Sub category one    → dropdown item (header) / footer link
 *   Sub category two    → nested flyout under its sub category one (header only)
 *
 * Labels and URLs are the Sitemap's, verbatim. Nothing is invented here: no anchors, no
 * "view all" links, no duplicate parent links. A category without a slug (e.g. "Why Kuroda")
 * is a label-only dropdown parent.
 *
 * Placement is the only decision made in this file: Home is the logo, the header button is the
 * sitewide "Schedule an Estimate", and Reviews, Contact, Blog and Legal & Utility
 * live in the footer only (the header has no room for them).
 * The header phone link comes from CONTACT in Header.astro.
 *
 * This is the built-in fallback for the Sanity `siteNavigation` document (src/lib/content/navigation.ts):
 * the Studio is seeded from it (scripts/seed-pages.mjs) and the site renders it whenever Sanity is empty.
 * Relative `.ts` imports only, so the seed script can load it under plain Node. Texts may use `{tokens}`
 * (e.g. `{year}`, see src/lib/content/tokens.ts).
 */
import type { FooterLink, NavigationContent, NavLink, NavSubLink } from '../lib/content/types';
import { getCategory, getChildPages, normalizePath, type SitemapNode } from '../lib/sitemap.ts';

const hrefOf = (node: SitemapNode): string => normalizePath(node.slug!);

/** Sub category one → dropdown items, with sub category two as nested links. */
function dropdownOf(node: SitemapNode): NavSubLink[] {
  return getChildPages(node).map((child) => {
    const nested = getChildPages(child).map((grandchild) => ({ text: grandchild.label, href: hrefOf(grandchild) }));
    return {
      text: child.label,
      href: hrefOf(child),
      ...(nested.length ? { links: nested } : {}),
    };
  });
}

/** One header item per sitemap category (dropdown when it has child pages). */
function headerItem(label: string): NavLink {
  const category = getCategory(label);
  if (!category) throw new Error(`Sitemap category "${label}" not found in src/data/sitemap.ts`);
  const links = dropdownOf(category);
  return {
    text: category.label,
    ...(category.slug ? { href: hrefOf(category) } : {}),
    ...(links.length ? { links } : {}),
  };
}

// ─── Header ───────────────────────────────────────────────────────────────────

const headerLinks: NavLink[] = [
  'Our Story',
  'Collision Repair',
  'Had an Accident?',
  'Why Kuroda',
  'Location',
  'Service Areas',
].map(headerItem);

// ─── Footer ───────────────────────────────────────────────────────────────────

/** Footer column = category page + its sub category one pages (flat, no flyouts). */
function footerColumn(label: string, title = label.toUpperCase()) {
  const category = getCategory(label)!;
  const pages = [...(category.slug ? [category] : []), ...getChildPages(category)];
  return { title, links: pages.map((node) => ({ text: node.label, href: hrefOf(node) })) };
}

const footerColumns = [
  footerColumn('Collision Repair'),
  footerColumn('Had an Accident?'),
  {
    title: 'KURODA',
    links: ['Our Story', 'Why Kuroda', 'Reviews', 'Service Areas', 'Blog', 'Contact'].flatMap((label) => {
      const category = getCategory(label)!;
      // "Why Kuroda" is label-only: its child pages go straight into the column.
      return (category.slug ? [category] : getChildPages(category)).map((node) => ({
        text: node.label,
        href: hrefOf(node),
      }));
    }),
  },
];

/** "Legal & Utility" category → bottom utility row. */
const utilityLinks: FooterLink[] = getChildPages(getCategory('Legal & Utility')).map((node) => ({
  text: node.label,
  href: normalizePath(node.slug!),
}));

export const navigationData: NavigationContent = {
  header: {
    links: headerLinks,
    actions: [],
    cta: { text: 'Schedule an Estimate', href: '/contact/' },
  },
  footer: {
    links: footerColumns,
    secondaryLinks: utilityLinks,
    tagline: 'Family-owned collision repair in Waipahu, Oʻahu since {established}.',
    footNote: '© {year} Kuroda Auto Body, Inc. All rights reserved.',
    visit: { title: 'VISIT US', mobileTitle: 'LOCATION & HOURS.', linkText: 'Our Location' },
    family: {
      eyebrow: 'OUR FAMILY OF COMPANIES.',
      name: 'Capitol Auto Service',
      description: 'Comprehensive mechanical, safety checks & automotive maintenance in Oahu.',
    },
  },
};
