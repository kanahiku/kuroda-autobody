import { CLOSING_CTA_SUBTITLE, PRIMARY_CTA_HREF, SCHEDULE_CTA_LABEL } from '../../config/cta.ts';
import type {
  ActionSection,
  ContentPage,
  ContentSection,
  CredentialsSection,
  FeatureItem,
  FaqItem,
  FeaturesSection,
  PagePhoto,
  QuoteSection,
  StepsSection,
  StorySection,
  TableSection,
} from '../../data/contentPage';

/**
 * Mapping between the site's `ContentPage` (src/data/contentPage.ts — what `ContentPageView` renders) and
 * the Sanity `contentPage` document the content team edits. No runtime imports, so the seed script
 * (scripts/seed-pages.mjs) can use `toDoc` directly.
 *
 * Differences by design: Sanity headings are `headingLead` + `headingAccent` with NO trailing space (the
 * site adds the space back, and only when there is an accent); the hero body is always a list of
 * paragraphs; table rows are `{ cells }` objects (Sanity has no arrays of arrays); credential logos are a
 * dropdown key; sections are typed objects (`storySection`, `featuresSection`, …).
 *
 * Only the block kinds in `EDITABLE_SECTION_TYPES` exist in the Studio. A page that uses any other kind
 * (reviews …) keeps its built-in sections until the Studio gains that block.
 */

export const CONTENT_PAGE_TYPE = 'contentPage';

/** Section kinds that exist in the Studio. Add a kind here + a schema member when a page needs it. */
export const EDITABLE_SECTION_TYPES = [
  'story',
  'features',
  'table',
  'steps',
  'action',
  'credentials',
  'quote',
] as const;

/** Document id for a route, e.g. `/about/` → `contentPage-about`. (Mirrored in studio/structure.ts.) */
export const contentPageId = (path: string): string =>
  `contentPage-${path.replace(/^\/+|\/+$/g, '').replace(/\//g, '-')}`;

/**
 * Credential logos the Studio offers (client PNGs in public/oem/) — the dropdown key → file + size.
 * Keep the keys in sync with `LOGOS` in studio/schemas/documents/contentPage.ts.
 */
export const CREDENTIAL_LOGOS: Record<string, { src: string; w: number; h: number }> = {
  'icar-gold-class': { src: '/oem/icar-gold-class.png', w: 220, h: 110 },
  honda: { src: '/oem/honda.png', w: 141, h: 110 },
  acura: { src: '/oem/acura.png', w: 141, h: 110 },
  nissan: { src: '/oem/nissan.png', w: 141, h: 110 },
  gm: { src: '/oem/gm.png', w: 141, h: 110 },
  fca: { src: '/oem/fca.png', w: 141, h: 110 },
};

/** Pinned block background; omitted = alternates automatically down the page. */
export type Surface = 'page' | 'subtle';

interface HeadingDoc {
  headingLead: string;
  /** Optional on most blocks — a heading may be all one weight. */
  headingAccent?: string;
}

export interface StorySectionDoc extends HeadingDoc {
  _type: 'storySection';
  surface?: Surface;
  _key?: string;
  eyebrow?: string;
  headingAccent: string;
  paragraphs: string[];
  quote?: string;
  quoteAttribution?: string;
  isReversed: boolean;
  imageAlt?: string;
  /** Uploaded photo — attached by the loader from Sanity, never written by the seed. */
  image?: PagePhoto;
  caption?: string;
  stats?: { value: string; label: string }[];
}

export interface FeaturesSectionDoc extends HeadingDoc {
  _type: 'featuresSection';
  surface?: Surface;
  _key?: string;
  eyebrow?: string;
  lead?: string;
  columns: 2 | 3;
  items: { icon: FeatureItem['icon']; title: string; description: string; link?: string }[];
  note?: string;
  noteLinkText?: string;
  noteLinkHref?: string;
}

export interface TableSectionDoc extends HeadingDoc {
  _type: 'tableSection';
  surface?: Surface;
  _key?: string;
  eyebrow?: string;
  lead?: string;
  columns: string[];
  rows: { cells: string[] }[];
}

export interface StepsSectionDoc extends HeadingDoc {
  _type: 'stepsSection';
  surface?: Surface;
  _key?: string;
  eyebrow?: string;
  lead?: string;
  steps: { title: string; description: string }[];
  imageAlt?: string;
  image?: PagePhoto;
}

export interface ActionSectionDoc extends HeadingDoc {
  _type: 'actionSection';
  _key?: string;
  eyebrow?: string;
  body: string;
  ctaText: string;
  ctaHref: string;
}

export interface CredentialsSectionDoc extends HeadingDoc {
  _type: 'credentialsSection';
  surface?: Surface;
  _key?: string;
  eyebrow: string;
  paragraphs: string[];
  credentials: { name: string; descriptor?: string; logo?: string }[];
}

export interface QuoteSectionDoc {
  _type: 'quoteSection';
  surface?: Surface;
  _key?: string;
  eyebrow?: string;
  quote: string;
  attribution?: string;
}

export type SectionDoc =
  | StorySectionDoc
  | FeaturesSectionDoc
  | TableSectionDoc
  | StepsSectionDoc
  | ActionSectionDoc
  | CredentialsSectionDoc
  | QuoteSectionDoc;

export interface FaqItemDoc {
  question: string;
  answer: string;
  /** Optional outline button under the answer. */
  ctaText?: string;
  ctaHref?: string;
}

/** A flat list of questions (`items`) or titled categories (`groups`) — whichever the page uses. */
export interface FaqsDoc {
  eyebrow: string;
  headingLead: string;
  headingAccent: string;
  items?: FaqItemDoc[];
  groups?: { title: string; items: FaqItemDoc[] }[];
}

export interface ContentPageDoc {
  _type?: typeof CONTENT_PAGE_TYPE;
  path: string;
  seo: { title: string; description: string };
  hero: { eyebrow: string; headingLead: string; headingAccent: string; paragraphs: string[]; imageAlt: string };
  sections?: SectionDoc[];
  faqs?: FaqsDoc;
  related?: { eyebrow: string; headingLead: string; headingAccent: string; paths: string[] };
  cta: {
    headingLead: string;
    headingAccent: string;
    description: string;
    ctaOne: { text: string; href: string };
    ctaTwo: { text: string; href: string };
    imageAlt: string;
  };
}

/** True when every section of the page is a kind the Studio can edit. */
export const sectionsAreEditable = (sections: ContentSection[]): boolean =>
  sections.every((section) => (EDITABLE_SECTION_TYPES as readonly string[]).includes(section.type));

/** True when the page has a FAQ the Studio can hold (a flat list or titled groups). */
export const faqsAreEditable = (faqs: ContentPage['faqs']): boolean =>
  Boolean(faqs?.items?.length || faqs?.groups?.length);

const faqItemToDoc = ({ title, description, cta }: FaqItem): FaqItemDoc => ({
  question: title,
  answer: description,
  ...(cta ? { ctaText: cta.text, ctaHref: cta.href } : {}),
});

export const faqItemFromDoc = (item: FaqItemDoc): FaqItem => ({
  title: item.question,
  description: item.answer,
  ...(item.ctaText && item.ctaHref ? { cta: { text: item.ctaText, href: item.ctaHref } } : {}),
});

const opt = <K extends string>(key: K, value: string | undefined): Partial<Record<K, string>> =>
  value ? ({ [key]: value } as Record<K, string>) : {};

const head = (lead: string, accent?: string) => ({ headingLead: lead.trim(), ...opt('headingAccent', accent) });

/** Adds the space between the two heading parts back — only when there is an accent. */
const joinLead = (text: string, accent?: string) => (accent ? `${text.trim()} ` : text.trim());

const logoKey = (src?: string): string | undefined =>
  Object.entries(CREDENTIAL_LOGOS).find(([, logo]) => logo.src === src)?.[0];

type PageHero = ContentPage['hero'];
type PageFaqs = NonNullable<ContentPage['faqs']>;
type PageRelated = NonNullable<ContentPage['related']>;
type PageCta = ContentPage['cta'];

// ─── ContentPage → document ──────────────────────────────────────────────────

const storyToDoc = (section: StorySection): StorySectionDoc => ({
  _type: 'storySection',
  ...opt('eyebrow', section.eyebrow),
  headingLead: section.headingLead.trim(),
  headingAccent: section.headingAccent,
  paragraphs: section.paragraphs,
  ...opt('quote', section.quote),
  ...opt('quoteAttribution', section.quoteAttribution),
  isReversed: Boolean(section.isReversed),
  ...opt('imageAlt', section.photoLabel),
  ...opt('caption', section.caption),
  ...(section.stats?.length ? { stats: section.stats } : {}),
});

const featuresToDoc = (section: FeaturesSection): FeaturesSectionDoc => ({
  _type: 'featuresSection',
  ...opt('eyebrow', section.eyebrow),
  ...head(section.headingLead, section.headingStrong),
  ...opt('lead', section.lead),
  columns: section.columns === 3 ? 3 : 2,
  items: section.items.map(({ href, ...item }) => ({ ...item, ...opt('link', href) })),
  ...opt('note', section.note),
  ...opt('noteLinkText', section.noteLinkText),
  ...opt('noteLinkHref', section.noteLinkHref),
});

const tableToDoc = (section: TableSection): TableSectionDoc => ({
  _type: 'tableSection',
  ...opt('eyebrow', section.eyebrow),
  ...head(section.headingLead, section.headingStrong),
  ...opt('lead', section.lead),
  columns: section.columns,
  rows: section.rows.map((cells) => ({ cells })),
});

const stepsToDoc = (section: StepsSection): StepsSectionDoc => ({
  _type: 'stepsSection',
  ...opt('eyebrow', section.eyebrow),
  ...head(section.headingLead, section.headingStrong),
  ...opt('lead', section.lead),
  steps: section.steps,
});

const actionToDoc = (section: ActionSection): ActionSectionDoc => ({
  _type: 'actionSection',
  ...opt('eyebrow', section.eyebrow),
  ...head(section.headingLead, section.headingStrong),
  body: section.body,
  ctaText: section.ctaText,
  ctaHref: section.ctaHref,
});

const credentialsToDoc = (section: CredentialsSection): CredentialsSectionDoc => ({
  _type: 'credentialsSection',
  eyebrow: section.eyebrow,
  ...head(section.headingLead, section.headingStrong),
  paragraphs: section.paragraphs,
  credentials: section.credentials.map((credential) => ({
    name: credential.name,
    ...opt('descriptor', credential.descriptor),
    ...opt('logo', logoKey(credential.logo)),
  })),
});

const quoteToDoc = (section: QuoteSection): QuoteSectionDoc => ({
  _type: 'quoteSection',
  ...opt('eyebrow', section.eyebrow),
  quote: section.quote,
  ...opt('attribution', section.attribution),
});

function sectionToDoc(section: ContentSection): SectionDoc {
  switch (section.type) {
    case 'story':
      return storyToDoc(section);
    case 'features':
      return featuresToDoc(section);
    case 'table':
      return tableToDoc(section);
    case 'steps':
      return stepsToDoc(section);
    case 'action':
      return actionToDoc(section);
    case 'credentials':
      return credentialsToDoc(section);
    case 'quote':
      return quoteToDoc(section);
    default:
      throw new Error(`The Studio has no "${section.type}" block yet.`);
  }
}

const heroToDoc = (hero: PageHero, eyebrow: string): ContentPageDoc['hero'] => ({
  eyebrow,
  headingLead: hero.titleLead.trim(),
  headingAccent: hero.titleAccent ?? '',
  paragraphs: Array.isArray(hero.body) ? hero.body : [hero.body],
  imageAlt: hero.photoLabel ?? '',
});

const faqsToDoc = (faqs: PageFaqs): FaqsDoc => ({
  eyebrow: faqs.eyebrow,
  headingLead: faqs.titleLead.trim(),
  headingAccent: faqs.titleStrong,
  ...(faqs.groups
    ? { groups: faqs.groups.map((g) => ({ title: g.title, items: g.items.map(faqItemToDoc) })) }
    : { items: faqs.items!.map(faqItemToDoc) }),
});

const relatedToDoc = (related: PageRelated): NonNullable<ContentPageDoc['related']> => ({
  eyebrow: related.eyebrow,
  headingLead: related.headingLead.trim(),
  headingAccent: related.headingStrong,
  paths: related.paths,
});

/**
 * The Studio shows what the site shows today — the sitewide defaults unless the page overrides them.
 * `{phone}` / `{phoneHref}` are filled in from site config when the page is rendered.
 */
const ctaToDoc = (cta: PageCta): ContentPageDoc['cta'] => ({
  headingLead: cta.title.trim(),
  headingAccent: cta.titleStrong,
  description: cta.subtitle ?? CLOSING_CTA_SUBTITLE,
  ctaOne: { text: cta.ctaText ?? SCHEDULE_CTA_LABEL, href: cta.ctaHref ?? PRIMARY_CTA_HREF },
  ctaTwo: {
    text: cta.secondaryCtaText ?? 'CALL {phone}',
    href: cta.secondaryCtaHref ?? '{phoneHref}',
  },
  imageAlt: '',
});

/** Built-in page → Sanity-shaped document (used for seeding and as the merge base). */
export function toDoc(page: ContentPage): ContentPageDoc {
  return {
    path: page.path,
    seo: { title: page.seoTitle, description: page.metaDescription },
    hero: heroToDoc(page.hero, page.eyebrow),
    ...(sectionsAreEditable(page.sections)
      ? {
          sections: page.sections.map((section) => ({
            ...sectionToDoc(section),
            ...('surface' in section && section.surface ? { surface: section.surface } : {}),
          })),
        }
      : {}),
    ...(faqsAreEditable(page.faqs) ? { faqs: faqsToDoc(page.faqs!) } : {}),
    ...(page.related ? { related: relatedToDoc(page.related) } : {}),
    cta: ctaToDoc(page.cta),
  };
}

// ─── Document → ContentPage ──────────────────────────────────────────────────

const headingFromDoc = (section: HeadingDoc) => ({
  headingLead: joinLead(section.headingLead, section.headingAccent),
  ...opt('headingStrong', section.headingAccent),
});

const quoteFromDoc = (s: QuoteSectionDoc): QuoteSection => ({
  type: 'quote',
  ...opt('eyebrow', s.eyebrow),
  quote: s.quote,
  ...opt('attribution', s.attribution),
});

const storyFromDoc = (s: StorySectionDoc): StorySection => ({
  type: 'story',
  ...opt('eyebrow', s.eyebrow),
  headingLead: joinLead(s.headingLead, s.headingAccent),
  headingAccent: s.headingAccent,
  paragraphs: s.paragraphs,
  ...opt('quote', s.quote),
  ...opt('quoteAttribution', s.quoteAttribution),
  ...opt('photoLabel', s.imageAlt),
  ...(s.image ? { image: s.image } : {}),
  ...opt('caption', s.caption),
  ...(s.stats?.length ? { stats: s.stats } : {}),
  ...(s.isReversed ? { isReversed: true } : {}),
});

const featuresFromDoc = (s: FeaturesSectionDoc): FeaturesSection => ({
  type: 'features',
  ...opt('eyebrow', s.eyebrow),
  ...headingFromDoc(s),
  ...opt('lead', s.lead),
  columns: s.columns,
  items: s.items.map(({ link, ...item }) => ({ ...item, ...opt('href', link) })),
  ...opt('note', s.note),
  ...opt('noteLinkText', s.noteLinkText),
  ...opt('noteLinkHref', s.noteLinkHref),
});

const tableFromDoc = (s: TableSectionDoc): TableSection => ({
  type: 'table',
  ...opt('eyebrow', s.eyebrow),
  ...headingFromDoc(s),
  ...opt('lead', s.lead),
  columns: s.columns,
  rows: s.rows.map((row) => row.cells),
});

const stepsFromDoc = (s: StepsSectionDoc): StepsSection => ({
  type: 'steps',
  ...opt('eyebrow', s.eyebrow),
  ...headingFromDoc(s),
  ...opt('lead', s.lead),
  steps: s.steps,
  ...opt('photoLabel', s.imageAlt),
  ...(s.image ? { image: s.image } : {}),
});

const actionFromDoc = (s: ActionSectionDoc): ActionSection => ({
  type: 'action',
  ...opt('eyebrow', s.eyebrow),
  ...headingFromDoc(s),
  body: s.body,
  ctaText: s.ctaText,
  ctaHref: s.ctaHref,
});

const credentialsFromDoc = (s: CredentialsSectionDoc): CredentialsSection => ({
  type: 'credentials',
  eyebrow: s.eyebrow,
  ...headingFromDoc(s),
  paragraphs: s.paragraphs,
  credentials: s.credentials.map((credential) => {
    const logo = credential.logo ? CREDENTIAL_LOGOS[credential.logo] : undefined;
    return {
      name: credential.name,
      ...opt('descriptor', credential.descriptor),
      ...(logo ? { logo: logo.src, logoW: logo.w, logoH: logo.h } : {}),
    };
  }),
});

function sectionFromDoc(s: SectionDoc): ContentSection {
  switch (s._type) {
    case 'quoteSection':
      return quoteFromDoc(s);
    case 'storySection':
      return storyFromDoc(s);
    case 'featuresSection':
      return featuresFromDoc(s);
    case 'tableSection':
      return tableFromDoc(s);
    case 'stepsSection':
      return stepsFromDoc(s);
    case 'actionSection':
      return actionFromDoc(s);
    case 'credentialsSection':
      return credentialsFromDoc(s);
  }
}

const heroFromDoc = (hero: ContentPageDoc['hero']): PageHero => ({
  titleLead: joinLead(hero.headingLead, hero.headingAccent),
  ...opt('titleAccent', hero.headingAccent),
  body: hero.paragraphs.length === 1 ? hero.paragraphs[0]! : hero.paragraphs,
  ...opt('photoLabel', hero.imageAlt),
});

const faqsFromDoc = (doc: FaqsDoc, base: PageFaqs): PageFaqs => ({
  eyebrow: doc.eyebrow,
  titleLead: joinLead(doc.headingLead, doc.headingAccent),
  titleStrong: doc.headingAccent,
  ...(base.groups && doc.groups
    ? { groups: doc.groups.map((g) => ({ title: g.title, items: g.items.map(faqItemFromDoc) })) }
    : { items: (doc.items ?? []).map(faqItemFromDoc) }),
});

const relatedFromDoc = (doc: NonNullable<ContentPageDoc['related']>): PageRelated => ({
  eyebrow: doc.eyebrow,
  headingLead: joinLead(doc.headingLead, doc.headingAccent),
  headingStrong: doc.headingAccent,
  paths: doc.paths,
});

const ctaFromDoc = (cta: ContentPageDoc['cta']): PageCta => ({
  title: joinLead(cta.headingLead, cta.headingAccent),
  titleStrong: cta.headingAccent,
  subtitle: cta.description,
  ctaText: cta.ctaOne.text,
  ctaHref: cta.ctaOne.href,
  secondaryCtaText: cta.ctaTwo.text,
  secondaryCtaHref: cta.ctaTwo.href,
});

/** Sanity-shaped document → the `ContentPage` that `ContentPageView` renders. `base` supplies what the Studio does not hold. */
export function fromDoc(doc: ContentPageDoc, base: ContentPage): ContentPage {
  const sections: ContentSection[] =
    doc.sections && sectionsAreEditable(base.sections)
      ? doc.sections.map((s) => ({
          ...sectionFromDoc(s),
          ...('surface' in s && s.surface ? { surface: s.surface } : {}),
        }))
      : base.sections;

  return {
    ...base,
    seoTitle: doc.seo.title,
    metaDescription: doc.seo.description,
    eyebrow: doc.hero.eyebrow,
    hero: heroFromDoc(doc.hero),
    sections,
    ...(base.faqs && doc.faqs && faqsAreEditable(base.faqs) ? { faqs: faqsFromDoc(doc.faqs, base.faqs) } : {}),
    ...(base.related && doc.related ? { related: relatedFromDoc(doc.related) } : {}),
    cta: ctaFromDoc(doc.cta),
  };
}
