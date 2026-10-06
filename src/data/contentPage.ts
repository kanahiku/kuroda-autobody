/**
 * Shape of a content page rendered by `ContentPageView` (src/components/templates).
 * Page copy lives in `src/data/*.ts` (collisionRepair, hadAnAccident, …) — one object per route.
 *
 * Fixed frame:  PageHero → blue band → `sections` → FAQs → related links → silver band → closing CTA.
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
  eyebrow: string;
  headingLead: string;
  headingAccent: string;
  paragraphs: string[];
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

export type ContentSection = FeaturesSection | TableSection | StepsSection | StorySection | QuoteSection;

export interface ContentPage {
  /** Route, e.g. `/collision-repair/dent-repair/` — must exist in src/data/sitemap.ts (label comes from there). */
  path: string;
  seoTitle: string;
  metaDescription: string;
  /** Hero eyebrow (usually the sitemap category). */
  eyebrow: string;
  /** H1 split: light-weight lead + gradient tail. */
  hero: { titleLead: string; titleAccent?: string; body: string };
  sections: ContentSection[];
  faqs: { eyebrow: string; titleLead: string; titleStrong: string; items: { title: string; description: string }[] };
  /** "Explore …" link grid — `paths` resolve to sitemap labels. */
  related: { eyebrow: string; headingLead: string; headingStrong: string; paths: string[] };
  /** Closing CTA heading (subtitle + buttons are shared defaults). */
  cta: { title: string; titleStrong: string };
}

/** What each page file supplies — group-level fields (eyebrow, related) are added by the data module. */
export type ContentPageInput = Omit<ContentPage, 'eyebrow' | 'related'>;
