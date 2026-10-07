/**
 * Shape of a content page rendered by `ContentPageView` (src/components/templates).
 * Page copy lives in `src/data/*.ts` (collisionRepair, hadAnAccident, …) — one object per route.
 *
 * Fixed frame:  PageHero → blue band → `sections` → FAQs (optional) → related links → silver band → closing CTA.
 * `sections` is the only variable part: pick the blocks a page needs, in order.
 * Background surfaces alternate automatically (page / subtle) unless a block sets `surface`.
 * Buttons, closing-CTA subtitle and band placement come from the shared widgets' defaults.
 * `**bold**` in `lead` / feature descriptions renders as <strong>.
 */
import type { BrandIconName } from '~/components/ui/BrandIcon.astro';

type Surface = 'page' | 'subtle';

export interface FeatureItem {
  icon: BrandIconName;
  title: string;
  description: string;
  /** Makes the title a link (hub → child pages). */
  href?: string;
}

/** Icon / title / description columns — FeatureColumns. */
export interface FeaturesSection {
  type: 'features';
  eyebrow?: string;
  headingLead: string;
  headingStrong?: string;
  lead?: string;
  columns?: 2 | 3;
  items: FeatureItem[];
  /** Closing sentence under the grid; `noteLinkText` renders as an inline link before the final period. */
  note?: string;
  noteLinkText?: string;
  noteLinkHref?: string;
  surface?: Surface;
}

/** Label / value table — PhaseTable. */
export interface TableSection {
  type: 'table';
  eyebrow?: string;
  headingLead: string;
  headingStrong?: string;
  lead?: string;
  /** First column is the row label. */
  columns: string[];
  rows: string[][];
  surface?: Surface;
}

/** Numbered process — ProcessSteps. */
export interface StepsSection {
  type: 'steps';
  eyebrow?: string;
  headingLead: string;
  headingStrong?: string;
  lead?: string;
  steps: { title: string; description: string }[];
  surface?: Surface;
}

/** Photo + heading + paragraph(s) — HeritageStory. */
export interface StorySection {
  type: 'story';
  /** Omit when the copy has no label above the heading. */
  eyebrow?: string;
  headingLead: string;
  headingAccent: string;
  paragraphs: string[];
  /** Optional pull quote under the paragraphs. */
  quote?: string;
  quoteAttribution?: string;
  /** Accessible label for the grey photo placeholder. */
  photoLabel?: string;
  /** Photo on the right (desktop). */
  isReversed?: boolean;
  /** Caption under the photo. */
  caption?: string;
  /** Up to three headline numbers beside the copy. */
  stats?: { value: string; label: string }[];
  surface?: Surface;
}

/** Single customer quote — QuoteBand. */
export interface QuoteSection {
  type: 'quote';
  eyebrow?: string;
  quote: string;
  attribution?: string;
  surface?: Surface;
}

/** Mid-page navy band with one button — ActionBand. */
export interface ActionSection {
  type: 'action';
  eyebrow?: string;
  headingLead: string;
  headingStrong?: string;
  body: string;
  ctaText: string;
  ctaHref: string;
}

/** Copy + credential logo row — CredentialLogos. Omit `logo` for a grey placeholder. */
export interface CredentialsSection {
  type: 'credentials';
  eyebrow: string;
  headingLead: string;
  headingStrong?: string;
  paragraphs: string[];
  credentials: { name: string; descriptor?: string; logo?: string; logoW?: number; logoH?: number }[];
  surface?: Surface;
}

/**
 * Customer quote cards — ReviewWall. Head is optional (the hero can carry the title).
 * With `source: 'sanity'` the cards come from the Studio's Testimonials; `reviews` is then only the
 * fallback shown if Sanity is unconfigured, unreachable or has no testimonials yet.
 */
export interface ReviewsSection {
  type: 'reviews';
  eyebrow?: string;
  headingLead?: string;
  headingStrong?: string;
  source?: 'sanity';
  reviews: { quote: string; name: string; detail?: string }[];
  surface?: Surface;
}

export type ContentSection =
  | FeaturesSection
  | TableSection
  | StepsSection
  | StorySection
  | QuoteSection
  | ActionSection
  | CredentialsSection
  | ReviewsSection;

export interface FaqItem {
  title: string;
  description: string;
  /** Outline button under the answer. */
  cta?: { text: string; href: string };
}

export interface ContentPage {
  /** Route, e.g. `/collision-repair/dent-repair/` — must exist in src/data/sitemap.ts (label comes from there). */
  path: string;
  seoTitle: string;
  metaDescription: string;
  /** Hero eyebrow (usually the sitemap category). */
  eyebrow: string;
  /** H1 split: light-weight lead + gradient tail. */
  hero: {
    titleLead: string;
    titleAccent?: string;
    body: string | string[];
    /** Accessible label for the grey hero photo placeholder (default: the page name). */
    photoLabel?: string;
  };
  sections: ContentSection[];
  /** Omit when the copy has no FAQs. */
  faqs?: {
    eyebrow: string;
    titleLead: string;
    titleStrong: string;
    /** Flat list… */
    items?: FaqItem[];
    /** …or titled categories (long FAQ pages). One of the two is required. */
    groups?: { title: string; items: FaqItem[] }[];
  };
  /** "Explore …" link grid — `paths` resolve to sitemap labels. Omit to end on the closing CTA. */
  related?: { eyebrow: string; headingLead: string; headingStrong: string; paths: string[] };
  /**
   * Closing CTA. Only the heading is required; the description and the two buttons default to the sitewide
   * ones (src/config/cta.ts, CONTACT) — set them to override.
   */
  cta: {
    title: string;
    titleStrong: string;
    subtitle?: string;
    ctaText?: string;
    ctaHref?: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
  };
}

/** What each page file supplies — group-level fields (eyebrow, related) are added by the data module. */
export type ContentPageInput = Omit<ContentPage, 'eyebrow' | 'related'>;
