import type { FooterColumn, FooterLink, NavigationContent, NavLink, NavSubLink } from './types';
import { isSitemapPath, normalizePath } from '../sitemap.ts';

/**
 * Mapping between the site's `NavigationContent` (src/data/navigation.ts — what Header / Footer render) and
 * the Sanity `siteNavigation` document the content team edits. Only `../sitemap.ts` is imported at runtime, so
 * the seed script (scripts/seed-pages.mjs) can use `toDoc` directly.
 *
 * A link is stored as `{ href, customHref }`: `href` is one of the site's pages (picked from a list), `none`
 * (label only — a dropdown heading) or `custom` (a typed address such as `tel:` or `https://…`, kept in `customHref`).
 */

export const NAVIGATION_ID = 'siteNavigation';

export interface LinkDoc {
  href?: string;
  customHref?: string;
}
export interface LabelledLinkDoc extends LinkDoc {
  text?: string;
}
export interface DropdownItemDoc extends LabelledLinkDoc {
  /** Optional right-hand flyout. */
  flyout?: LabelledLinkDoc[];
}
export interface HeaderItemDoc extends LabelledLinkDoc {
  dropdown?: DropdownItemDoc[];
}
export interface FooterColumnDoc {
  title?: string;
  links?: LabelledLinkDoc[];
}

export interface NavigationDoc {
  header: {
    items: HeaderItemDoc[];
    cta: LabelledLinkDoc;
  };
  footer: {
    tagline: string;
    columns: FooterColumnDoc[];
    visit: { title: string; mobileTitle: string; linkText: string };
    family: { eyebrow: string; name: string; description: string };
    copyright: string;
    legalLinks: LabelledLinkDoc[];
  };
}

// ─── Fallback → document (seeding) ────────────────────────────────────────────

function linkToDoc(href?: string): LinkDoc {
  if (!href) return { href: 'none' };
  return isSitemapPath(href) ? { href: normalizePath(href) } : { href: 'custom', customHref: href };
}

const labelled = (text: string, href?: string): LabelledLinkDoc => ({ text, ...linkToDoc(href) });

export function toDoc(base: NavigationContent): NavigationDoc {
  return {
    header: {
      items: base.header.links.map((item) => ({
        ...labelled(item.text, item.href),
        dropdown: (item.links ?? []).map((child) => ({
          ...labelled(child.text, child.href),
          flyout: (child.links ?? []).map((grandchild) => labelled(grandchild.text, grandchild.href)),
        })),
      })),
      cta: labelled(base.header.cta.text, base.header.cta.href),
    },
    footer: {
      tagline: base.footer.tagline,
      columns: base.footer.links.map((column) => ({
        title: column.title,
        links: column.links.map((link) => labelled(link.text, link.href)),
      })),
      visit: base.footer.visit,
      family: base.footer.family,
      copyright: base.footer.footNote,
      legalLinks: base.footer.secondaryLinks.map((link) => labelled(link.text, link.href)),
    },
  };
}

// ─── Document → site content (rendering) ──────────────────────────────────────

const clean = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');
const list = <T>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);
const record = (value: unknown): Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : {};

/** The address a link points at, or '' when it is label-only / unset. */
function hrefOf(link: LinkDoc | undefined): string {
  const href = clean(link?.href);
  if (href === 'custom') return clean(link?.customHref);
  return href === 'none' ? '' : href;
}

/** A text that is empty / missing in Sanity keeps the built-in one. */
const text = (value: unknown, fallback: string): string => clean(value) || fallback;

function readLinks(value: unknown): { text: string; href: string }[] {
  return list<LabelledLinkDoc>(value).flatMap((link) => {
    const label = clean(link?.text);
    const href = hrefOf(link);
    return label && href ? [{ text: label, href }] : [];
  });
}

function readHeader(value: unknown): NavLink[] {
  return list<HeaderItemDoc>(value).flatMap((item) => {
    const label = clean(item?.text);
    if (!label) return [];
    const links: NavSubLink[] = list<DropdownItemDoc>(item.dropdown).flatMap((child) => {
      const childLabel = clean(child?.text);
      const childHref = hrefOf(child);
      if (!childLabel || !childHref) return [];
      const nested = readLinks(child.flyout);
      return [{ text: childLabel, href: childHref, ...(nested.length ? { links: nested } : {}) }];
    });
    const href = hrefOf(item);
    // A top-level item needs a destination or a dropdown to be worth showing.
    if (!href && !links.length) return [];
    return [{ text: label, ...(href ? { href } : {}), ...(links.length ? { links } : {}) }];
  });
}

function readColumns(value: unknown): FooterColumn[] {
  return list<FooterColumnDoc>(value).flatMap((column) => {
    const title = clean(column?.title);
    const links: FooterLink[] = readLinks(column?.links);
    return title && links.length ? [{ title, links }] : [];
  });
}

/**
 * Merge a Sanity `siteNavigation` document over the built-in navigation. A list that is empty (or has no valid
 * item) keeps the built-in list; an empty text keeps the built-in text — so the header and footer are always complete.
 */
export function fromDoc(doc: unknown, base: NavigationContent): NavigationContent {
  const root = record(doc);
  const header = record(root.header);
  const footer = record(root.footer);
  const cta = record(header.cta) as LabelledLinkDoc;
  const visit = record(footer.visit);
  const family = record(footer.family);

  const items = readHeader(header.items);
  const columns = readColumns(footer.columns);
  const legal = readLinks(footer.legalLinks);

  return {
    header: {
      ...base.header,
      links: items.length ? items : base.header.links,
      cta: { text: text(cta.text, base.header.cta.text), href: hrefOf(cta) || base.header.cta.href },
    },
    footer: {
      links: columns.length ? columns : base.footer.links,
      secondaryLinks: legal.length ? legal : base.footer.secondaryLinks,
      tagline: text(footer.tagline, base.footer.tagline),
      footNote: text(footer.copyright, base.footer.footNote),
      visit: {
        title: text(visit.title, base.footer.visit.title),
        mobileTitle: text(visit.mobileTitle, base.footer.visit.mobileTitle),
        linkText: text(visit.linkText, base.footer.visit.linkText),
      },
      family: {
        eyebrow: text(family.eyebrow, base.footer.family.eyebrow),
        name: text(family.name, base.footer.family.name),
        description: text(family.description, base.footer.family.description),
      },
    },
  };
}
