import type { ContentPage, FeatureItem } from '../../data/contentPage';
import { getContentPage } from '../../data/contentPages';
import { sitemapLabel } from '../sitemap';
import {
  contentPageId,
  EDITABLE_SECTION_TYPES,
  fromDoc,
  toDoc,
  type ContentPageDoc,
  type FaqItemDoc,
  type FaqsDoc,
  type SectionDoc,
  type Surface,
} from './contentPageDoc';
import { applyTokens, mergeValue } from './merge';
import { getPagePhotos } from './photos';
import { getSanityContentPageImages } from './sanity';
import { isSanityConfigured } from '../sanity/client';
import { fetchDocument } from './singleton';
import type { ContentImage } from './types';
import { siteTokens } from './tokens';

/**
 * A copy-driven interior page (rendered by `ContentPageView`) = its Sanity `contentPage` document merged
 * over the built-in page in src/data/*.ts. Single fields fall back individually; the section list is taken
 * from Sanity as a whole (editors add / remove / reorder blocks) when it has at least one valid block and
 * the page only uses block kinds the Studio has. Anything missing keeps the built-in copy.
 */

type FeatureIcon = FeatureItem['icon'];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const filled = (value: unknown): value is string => typeof value === 'string' && value.trim() !== '';

const texts = (value: unknown): string[] => (Array.isArray(value) ? value.filter(filled) : []);
const records = (value: unknown): Record<string, unknown>[] => (Array.isArray(value) ? value.filter(isRecord) : []);
const optional = <K extends string>(key: K, value: unknown): Partial<Record<K, string>> =>
  filled(value) ? ({ [key]: value } as Record<K, string>) : {};

type Block = Record<string, unknown>;
/** Heading fields shared by every section except the quote band. */
type CommonFields = { eyebrow?: string; headingLead: string; headingAccent?: string };

function readQuote(block: Block): SectionDoc | null {
  if (!filled(block.quote)) return null;
  return {
    _type: 'quoteSection',
    ...optional('eyebrow', block.eyebrow),
    quote: block.quote,
    ...optional('attribution', block.attribution),
  };
}

function readStory(block: Block, common: CommonFields): SectionDoc | null {
  const paragraphs = texts(block.paragraphs);
  if (!filled(block.headingAccent) || paragraphs.length === 0) return null;
  const stats = records(block.stats).flatMap((stat) =>
    filled(stat.value) && filled(stat.label) ? [{ value: stat.value, label: stat.label }] : []
  );
  return {
    _type: 'storySection',
    ...common,
    headingAccent: block.headingAccent,
    paragraphs,
    ...optional('quote', block.quote),
    ...optional('quoteAttribution', block.quoteAttribution),
    isReversed: block.isReversed === true,
    ...optional('imageAlt', block.imageAlt),
    ...optional('caption', block.caption),
    ...(stats.length ? { stats } : {}),
  };
}

function readFeatures(block: Block, common: CommonFields): SectionDoc | null {
  const items = records(block.items).flatMap((item) =>
    filled(item.icon) && filled(item.title) && filled(item.description)
      ? [
          {
            icon: item.icon as FeatureIcon,
            title: item.title,
            description: item.description,
            ...optional('link', item.link),
          },
        ]
      : []
  );
  if (items.length === 0) return null;
  return {
    _type: 'featuresSection',
    ...common,
    ...optional('lead', block.lead),
    columns: block.columns === 3 ? 3 : 2,
    items,
    ...optional('note', block.note),
    ...optional('noteLinkText', block.noteLinkText),
    ...optional('noteLinkHref', block.noteLinkHref),
  };
}

function readTable(block: Block, common: CommonFields): SectionDoc | null {
  const columns = texts(block.columns);
  const rows = records(block.rows)
    .map((row) => ({ cells: Array.isArray(row.cells) ? row.cells.map((cell) => (filled(cell) ? cell : '')) : [] }))
    .filter((row) => row.cells.length === columns.length);
  if (columns.length === 0 || rows.length === 0) return null;
  return { _type: 'tableSection', ...common, ...optional('lead', block.lead), columns, rows };
}

function readSteps(block: Block, common: CommonFields): SectionDoc | null {
  const steps = records(block.steps).flatMap((step) =>
    filled(step.title) && filled(step.description) ? [{ title: step.title, description: step.description }] : []
  );
  if (steps.length === 0) return null;
  return {
    _type: 'stepsSection',
    ...common,
    ...optional('lead', block.lead),
    steps,
    ...optional('imageAlt', block.imageAlt),
  };
}

function readAction(block: Block, common: CommonFields): SectionDoc | null {
  if (!filled(block.body) || !filled(block.ctaText) || !filled(block.ctaHref)) return null;
  return { _type: 'actionSection', ...common, body: block.body, ctaText: block.ctaText, ctaHref: block.ctaHref };
}

function readCredentials(block: Block, common: CommonFields): SectionDoc | null {
  const paragraphs = texts(block.paragraphs);
  const credentials = records(block.credentials).flatMap((credential) =>
    filled(credential.name)
      ? [
          {
            name: credential.name,
            ...optional('descriptor', credential.descriptor),
            ...optional('logo', credential.logo),
          },
        ]
      : []
  );
  if (!filled(block.eyebrow) || paragraphs.length === 0 || credentials.length === 0) return null;
  return { _type: 'credentialsSection', ...common, eyebrow: block.eyebrow, paragraphs, credentials };
}

/** One Sanity block → a complete, typed block — or null when it lacks something the layout needs. */
function readSection(block: Block): SectionDoc | null {
  const type = typeof block._type === 'string' ? block._type : '';
  const kind = type.replace(/Section$/, '');
  if (!(EDITABLE_SECTION_TYPES as readonly string[]).includes(kind)) return null;
  if (type === 'quoteSection') return readQuote(block);
  if (!filled(block.headingLead)) return null;
  const heading = { headingLead: block.headingLead, ...optional('headingAccent', block.headingAccent) };
  const common = { ...optional('eyebrow', block.eyebrow), ...heading };

  switch (type) {
    case 'storySection':
      return readStory(block, common);
    case 'featuresSection':
      return readFeatures(block, common);
    case 'tableSection':
      return readTable(block, common);
    case 'stepsSection':
      return readSteps(block, common);
    case 'actionSection':
      return readAction(block, common);
    case 'credentialsSection':
      return readCredentials(block, common);
    default:
      return null;
  }
}

/** Story and numbered-steps blocks can hold an uploaded photo (found by the block's `_key`). */
function withBlockPhoto(section: SectionDoc, block: Block, photos: Record<string, ContentImage>): SectionDoc {
  const photo = typeof block._key === 'string' ? photos[block._key] : undefined;
  if (!photo || (section._type !== 'storySection' && section._type !== 'stepsSection')) return section;
  return { ...section, image: { src: photo.src, alt: filled(block.imageAlt) ? block.imageAlt : '' } };
}

/** Keep only complete blocks of a kind the site can render. */
function readSections(value: unknown, photos: Record<string, ContentImage>): SectionDoc[] | undefined {
  const sections = records(value).flatMap((block) => {
    const read = readSection(block);
    if (!read) return [];
    const section = withBlockPhoto(read, block, photos);
    const pinned: Surface | undefined =
      block.surface === 'page' || block.surface === 'subtle' ? block.surface : undefined;
    return [section._type !== 'actionSection' && pinned ? { ...section, surface: pinned } : section];
  });
  return sections.length ? sections : undefined;
}

const faqItems = (value: unknown): FaqItemDoc[] =>
  records(value).flatMap((item) =>
    filled(item.question) && filled(item.answer)
      ? [
          {
            question: item.question,
            answer: item.answer,
            ...(filled(item.ctaText) && filled(item.ctaHref) ? { ctaText: item.ctaText, ctaHref: item.ctaHref } : {}),
          },
        ]
      : []
  );

/** FAQ = heading merged field by field; the question list (or groups) replaces the built-in one when complete. */
function mergeFaqs(base: FaqsDoc, sanity: unknown): FaqsDoc {
  const source = isRecord(sanity) ? sanity : {};
  const { items, groups, ...heading } = base;
  const head = mergeValue(heading, source);
  if (groups) {
    const read = records(source.groups).flatMap((group) => {
      const groupItems = faqItems(group.items);
      return filled(group.title) && groupItems.length ? [{ title: group.title, items: groupItems }] : [];
    });
    return { ...head, groups: read.length ? read : groups };
  }
  const read = faqItems(source.items);
  return { ...head, items: read.length ? read : items };
}

type PagePhotos = { hero?: ContentImage; cta?: ContentImage; sections: Record<string, ContentImage> };

async function fetchDocPhotos(id: string): Promise<PagePhotos> {
  const none: PagePhotos = { sections: {} };
  if (!isSanityConfigured) return none;
  return getSanityContentPageImages(id).catch((error) => {
    console.warn(`Sanity photos for "${id}" unavailable — showing placeholders.`, error);
    return none;
  });
}

/** Hero / closing photos: the page document's own, else the site-wide `pagePhotos` row for pages with no document. */
async function attachPhotos(page: ContentPage, path: string, own: PagePhotos, ctaAlt: string): Promise<ContentPage> {
  const shared = own.hero && own.cta ? {} : await getPagePhotos(path);
  const hero = own.hero ?? shared.hero;
  const cta = own.cta ?? shared.cta;
  return {
    ...page,
    hero: hero ? { ...page.hero, image: { src: hero.src, alt: hero.alt || page.hero.photoLabel || '' } } : page.hero,
    cta: cta ? { ...page.cta, image: { src: cta.src, alt: cta.alt || ctaAlt } } : page.cta,
  };
}

export async function getContentPageContent(path: string): Promise<ContentPage> {
  const fallback = getContentPage(path);
  const id = contentPageId(path);
  const [sanityDoc, photos] = await Promise.all([fetchDocument(id), fetchDocPhotos(id)]);
  if (!isRecord(sanityDoc)) return attachPhotos(applyTokens(fallback, siteTokens()), path, photos, '');

  const { sections: baseSections, faqs: baseFaqs, ...baseRest } = toDoc(fallback);
  const merged = mergeValue(baseRest, sanityDoc) as Omit<ContentPageDoc, 'sections' | 'faqs'>;
  const page: ContentPageDoc = {
    ...merged,
    sections: readSections(sanityDoc.sections, photos.sections) ?? baseSections,
    ...(baseFaqs ? { faqs: mergeFaqs(baseFaqs, sanityDoc.faqs) } : {}),
  };
  const result = await attachPhotos(
    applyTokens(fromDoc(page, fallback), siteTokens()),
    path,
    {
      ...photos,
      // The alt text of the hero / closing photo is edited next to the upload.
      hero: photos.hero && { ...photos.hero, alt: merged.hero.imageAlt },
      cta: photos.cta && { ...photos.cta, alt: merged.cta.imageAlt },
    },
    merged.cta.imageAlt
  );
  // Related links must be real routes — an unknown path would otherwise break the page.
  if (result.related) {
    const paths = result.related.paths.filter((p) => {
      try {
        sitemapLabel(p);
        return true;
      } catch {
        console.warn(`contentPage ${path}: "${p}" is not in the sitemap — dropped from related links.`);
        return false;
      }
    });
    result.related = { ...result.related, paths: paths.length ? paths : (fallback.related?.paths ?? []) };
  }
  return result;
}
