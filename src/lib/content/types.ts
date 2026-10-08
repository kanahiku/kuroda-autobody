import type { CallToAction } from '~/types';

// ─── Shared primitives ────────────────────────────────────────────────────────

export interface ContentImage {
  src: string;
  alt: string;
}

export interface NavSubLink {
  text: string;
  href: string;
  /** Optional grandchildren — renders a right-side flyout on desktop, nested accordion on mobile. */
  links?: Array<{ text: string; href: string }>;
}

export interface NavColumn {
  title: string;
  links: NavSubLink[];
}

export interface NavLink {
  text: string;
  href?: string;
  links?: NavSubLink[];
  columns?: NavColumn[];
}

export interface NavPhone {
  text: string;
  href: string;
}

export interface FooterLink {
  text: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface NavigationContent {
  header: {
    links: NavLink[];
    actions: CallToAction[];
    phone?: NavPhone;
    /** The header's main button (desktop bar + mobile menu). */
    cta: { text: string; href: string };
  };
  footer: {
    /** Link columns, left to right; "Visit Us" is the last column and is not part of this list. */
    links: FooterColumn[];
    /** Legal bar links. */
    secondaryLinks: FooterLink[];
    /** Short blurb under the footer logo. */
    tagline: string;
    /** Copyright line. */
    footNote: string;
    visit: { title: string; mobileTitle: string; linkText: string };
    family: { eyebrow: string; name: string; description: string };
  };
}

export interface ServiceItem {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

export interface PageHero {
  title: string;
  visualSubheading?: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  phoneCtaText?: string;
  phoneCtaHref?: string;
  image?: ContentImage;
  imageMobile?: ContentImage;
  imagePlaceholder?: string;
}

/** A customer testimonial as stored in Sanity (`testimonial`), shown on /reviews/. */
export interface Testimonial {
  quote: string;
  /** Reviewer, e.g. "John M." */
  name: string;
  /** Vehicle / platform / date line, e.g. "Mazda owner, Carwise Review". */
  detail?: string;
}

/** A blog article as stored in Sanity (`blogPost`). Listing queries omit `contentBlocks`. */
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  /** Optional SEO overrides (article page only): title tag and meta description. */
  seoTitle?: string;
  seoDescription?: string;
  publishDate: string;
  author?: string;
  category?: string;
  tags?: string[];
  image?: ContentImage;
  /** Article body in document order, including inline images from Sanity. Empty on listing queries. */
  contentBlocks: BlogContentBlock[];
}

export type BlogContentBlock =
  | BlogContentParagraph
  | BlogContentHeading
  | BlogContentImage
  | BlogContentList
  | BlogContentTable
  | BlogContentCallout;

export interface BlogContentParagraph {
  _type: 'paragraph';
  _key: string;
  /** Plain text — used for excerpts, lead paragraphs, and TOC. */
  text: string;
  /** HTML string with inline formatting (bold, italic, links). Use set:html to render. */
  html: string;
  quote?: boolean;
}

export interface BlogContentHeading {
  _type: 'heading';
  _key: string;
  level: 2 | 3;
  text: string;
}

export interface BlogContentImage {
  _type: 'image';
  _key: string;
  image: ContentImage;
  caption?: string;
}

export interface BlogContentList {
  _type: 'list';
  _key: string;
  listType: 'bullet' | 'number';
  items: BlogContentListItem[];
}

export interface BlogContentListItem {
  _key: string;
  /** HTML string with inline formatting. Use set:html to render. */
  html: string;
  level: number;
}

export interface BlogContentTable {
  _type: 'table';
  _key: string;
  caption?: string;
  headerRow: string[];
  rows: { _key: string; cells: string[] }[];
}

export interface BlogContentCallout {
  _type: 'callout';
  _key: string;
  calloutType: 'tip' | 'info' | 'warning' | 'note';
  text: string;
}
