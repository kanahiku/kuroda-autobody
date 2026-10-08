import { sanityClient } from '../sanity/client';
import { resolveContentImage, type SanityImageFields } from '../sanity/image';
import type { BlogContentBlock, BlogPost, ContentImage, Testimonial } from './types';

type FetchedImage = ContentImage & SanityImageFields;

// ─── Blog ─────────────────────────────────────────────────────────────────────

type SanityMarkDef = {
  _type: string;
  _key: string;
  href?: string;
  blank?: boolean;
};

type SanitySpan = {
  _type: string;
  _key?: string;
  text?: string;
  marks?: string[];
};

type SanityPortableBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  listItem?: 'bullet' | 'number';
  level?: number;
  children?: SanitySpan[];
  markDefs?: SanityMarkDef[];
  // image fields
  src?: string;
  alt?: string;
  caption?: string;
  // table fields
  headerRow?: string[];
  rows?: Array<{ _key?: string; cells?: string[] }>;
  // callout fields (projected as calloutType from the "type" Sanity field)
  calloutType?: string;
  text?: string;
} & SanityImageFields;

type SanityBlogPost = Omit<BlogPost, 'image' | 'contentBlocks' | 'tags'> & {
  image?: ContentImage;
  tags?: string[] | null;
  body?: SanityPortableBlock[] | null;
};

function portableBlockText(block: SanityPortableBlock): string {
  return Array.isArray(block.children) ? block.children.map((child) => child.text ?? '').join('') : '';
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function spansToHtml(children: SanitySpan[] | undefined, markDefs: SanityMarkDef[] | undefined): string {
  if (!Array.isArray(children)) return '';
  const defsMap = new Map((markDefs ?? []).map((d) => [d._key, d]));

  return children
    .map((span) => {
      if (span._type !== 'span') return '';
      let html = escapeHtml(span.text ?? '');
      for (const mark of span.marks ?? []) {
        const def = defsMap.get(mark);
        if (def?._type === 'link') {
          const targetAttr = def.blank !== false ? ' target="_blank" rel="noopener noreferrer"' : '';
          html = `<a href="${escapeHtml(def.href ?? '')}"${targetAttr}>${html}</a>`;
        } else if (mark === 'strong') {
          html = `<strong>${html}</strong>`;
        } else if (mark === 'em') {
          html = `<em>${html}</em>`;
        } else if (mark === 'underline') {
          html = `<u>${html}</u>`;
        } else if (mark === 'strike-through') {
          html = `<s>${html}</s>`;
        } else if (mark === 'code') {
          html = `<code>${html}</code>`;
        }
      }
      return html;
    })
    .join('');
}

type ListType = 'bullet' | 'number';
type PendingList = {
  listType: ListType;
  startKey: string;
  items: { _key: string; html: string; level: number }[];
};

const CALLOUT_TYPES = ['tip', 'info', 'warning', 'note'] as const;
type CalloutType = (typeof CALLOUT_TYPES)[number];

function imageBlockToContent(block: SanityPortableBlock, key: string): BlogContentBlock | null {
  const image = resolveContentImage({
    src: block.src,
    alt: block.alt,
    crop: block.crop,
    hotspot: block.hotspot,
    asset: block.asset,
  });
  if (!image?.src) return null;
  const caption = typeof block.caption === 'string' ? block.caption.trim() : '';
  return { _type: 'image', _key: key, image, ...(caption ? { caption } : {}) };
}

function tableBlockToContent(block: SanityPortableBlock, key: string): BlogContentBlock | null {
  const headerRow = (block.headerRow ?? []).filter(Boolean);
  if (headerRow.length < 2) return null;
  return {
    _type: 'table',
    _key: key,
    ...(block.caption ? { caption: block.caption } : {}),
    headerRow,
    rows: (block.rows ?? []).map((row, ri) => ({
      _key: row._key || `row-${ri}`,
      cells: row.cells ?? [],
    })),
  };
}

function calloutBlockToContent(block: SanityPortableBlock, key: string): BlogContentBlock | null {
  if (!block.text?.trim()) return null;
  const calloutType: CalloutType = CALLOUT_TYPES.includes(block.calloutType as CalloutType)
    ? (block.calloutType as CalloutType)
    : 'note';
  return { _type: 'callout', _key: key, calloutType, text: block.text.trim() };
}

/**
 * Self-contained blocks (image / table / callout).
 * Returns `undefined` when the block is not one of those types, `null` when it is but has no usable content.
 */
function atomicBlockToContent(block: SanityPortableBlock, key: string): BlogContentBlock | null | undefined {
  switch (block._type) {
    case 'image':
      return imageBlockToContent(block, key);
    case 'table':
      return tableBlockToContent(block, key);
    case 'callout':
      return calloutBlockToContent(block, key);
    default:
      return undefined;
  }
}

function headingLevel(style: string | undefined): 2 | 3 | null {
  if (style === 'h1' || style === 'h2') return 2;
  if (style === 'h3' || style === 'h4') return 3;
  return null;
}

function paragraphToContent(block: SanityPortableBlock, key: string, text: string, html: string): BlogContentBlock {
  return {
    _type: 'paragraph',
    _key: key,
    text,
    html,
    ...(block.style === 'blockquote' ? { quote: true } : {}),
  };
}

/** Collects blocks in order, merging consecutive list items of the same type into one list block. */
class BlockCollector {
  readonly blocks: BlogContentBlock[] = [];
  private pending: PendingList | null = null;

  /** Ends any open list, then appends `block` (when there is one). */
  push(block: BlogContentBlock | null): void {
    this.flushList();
    if (block) this.blocks.push(block);
  }

  addListItem(listType: ListType, startKey: string, item: PendingList['items'][number]): void {
    if (this.pending?.listType !== listType) {
      this.flushList();
      this.pending = { listType, startKey, items: [] };
    }
    this.pending.items.push(item);
  }

  flushList(): void {
    if (!this.pending) return;
    const { listType, startKey, items } = this.pending;
    this.blocks.push({ _type: 'list', _key: `list-${startKey}`, listType, items });
    this.pending = null;
  }
}

function portableTextToContentBlocks(body: SanityPortableBlock[] | null | undefined): BlogContentBlock[] {
  if (!Array.isArray(body)) return [];

  const collector = new BlockCollector();

  body.forEach((block, index) => {
    const key = block._key || `block-${index}`;

    const atomic = atomicBlockToContent(block, key);
    if (atomic !== undefined) return collector.push(atomic);

    if (block._type !== 'block') return;

    const text = portableBlockText(block).trim();
    if (!text) return;

    const level = headingLevel(block.style);
    if (level) return collector.push({ _type: 'heading', _key: key, level, text });

    const html = spansToHtml(block.children, block.markDefs) || escapeHtml(text);

    if (block.listItem === 'bullet' || block.listItem === 'number') {
      return collector.addListItem(block.listItem, key, { _key: key, html, level: block.level ?? 1 });
    }

    collector.push(paragraphToContent(block, key, text, html));
  });

  collector.flushList();
  return collector.blocks;
}

function normalizeBlogPost(post: SanityBlogPost): BlogPost {
  const contentBlocks = portableTextToContentBlocks(post.body);
  const firstParagraph = contentBlocks.find((block) => block._type === 'paragraph');
  const excerpt = post.excerpt || (firstParagraph && 'text' in firstParagraph ? firstParagraph.text : '') || '';
  return {
    title: post.title,
    slug: post.slug,
    excerpt,
    seoTitle: post.seoTitle?.trim() || undefined,
    seoDescription: post.seoDescription?.trim() || undefined,
    publishDate: post.publishDate,
    author: post.author,
    category: post.category,
    tags: (post.tags ?? []).filter((t): t is string => Boolean(t?.trim())),
    image: resolveContentImage(post.image as FetchedImage | undefined),
    contentBlocks,
  };
}

const BLOG_POST_CARD_PROJECTION = /* groq */ `
  title,
  "slug": slug.current,
  excerpt,
  publishDate,
  author,
  category,
  tags,
  "image": {
    "src": coalesce(image.asset->url, imageUrl, ""),
    "alt": coalesce(image.alt, imageAlt, title),
    "crop": image.crop,
    "hotspot": image.hotspot,
    "asset": image.asset
  }
`;

const BLOG_POST_PROJECTION = /* groq */ `
  ${BLOG_POST_CARD_PROJECTION},
  seoTitle,
  seoDescription,
  body[] {
    ...,
    _type == "image" => {
      ...,
      "src": asset->url,
      "alt": coalesce(alt, ""),
      caption,
      crop,
      hotspot,
      asset
    },
    _type == "callout" => {
      _type,
      _key,
      "calloutType": type,
      text
    },
    _type == "table" => {
      _type,
      _key,
      caption,
      headerRow,
      "rows": rows[] { _key, cells }
    }
  }
`;

const BLOG_POSTS_QUERY = /* groq */ `
  *[_type == "blogPost" && defined(slug.current)] | order(publishDate desc) {
    ${BLOG_POST_CARD_PROJECTION}
  }
`;

const BLOG_POST_BY_SLUG_QUERY = /* groq */ `
  *[_type == "blogPost" && slug.current == $slug][0] {
    ${BLOG_POST_PROJECTION}
  }
`;

export async function getSanityBlogPosts(): Promise<BlogPost[]> {
  const posts = await sanityClient.fetch<SanityBlogPost[]>(BLOG_POSTS_QUERY);
  return (posts ?? []).filter((post) => post?.slug && post?.title).map(normalizeBlogPost);
}

export async function getSanityBlogPost(slug: string): Promise<BlogPost | null> {
  const post = await sanityClient.fetch<SanityBlogPost | null>(BLOG_POST_BY_SLUG_QUERY, { slug });
  if (!post?.slug || !post.title) return null;
  return normalizeBlogPost(post);
}

const BLOG_POST_SLUGS_QUERY = /* groq */ `
  *[_type == "blogPost" && defined(slug.current)].slug.current
`;
export async function getSanityBlogPostSlugs(): Promise<string[]> {
  const slugs = await sanityClient.fetch<string[]>(BLOG_POST_SLUGS_QUERY);
  return (slugs ?? []).filter((slug): slug is string => typeof slug === 'string' && slug.length > 0);
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TESTIMONIALS_QUERY = /* groq */ `
  *[_type == "testimonial" && defined(quote) && defined(name)] | order(order asc, _createdAt asc) {
    quote,
    name,
    detail
  }
`;

export async function getSanityTestimonials(): Promise<Testimonial[]> {
  const items = await sanityClient.fetch<Array<Partial<Testimonial> | null>>(TESTIMONIALS_QUERY);
  return (items ?? [])
    .filter((item): item is Partial<Testimonial> => Boolean(item?.quote?.trim() && item?.name?.trim()))
    .map((item) => ({
      quote: item.quote!.trim(),
      name: item.name!.trim(),
      ...(item.detail?.trim() ? { detail: item.detail.trim() } : {}),
    }));
}

/** The homepage trio: ticked "Show on homepage" first, then the top of the display order. */
const FEATURED_TESTIMONIALS_QUERY = /* groq */ `
  *[_type == "testimonial" && defined(quote) && defined(name)]
    | order(coalesce(featured, false) desc, order asc, _createdAt asc)[0...$limit] {
    quote,
    name,
    detail
  }
`;

export async function getSanityFeaturedTestimonials(limit = 3): Promise<Testimonial[]> {
  const items = await sanityClient.fetch<Array<Partial<Testimonial> | null>>(FEATURED_TESTIMONIALS_QUERY, { limit });
  return (items ?? [])
    .filter((item): item is Partial<Testimonial> => Boolean(item?.quote?.trim() && item?.name?.trim()))
    .map((item) => ({
      quote: item.quote!.trim(),
      name: item.name!.trim(),
      ...(item.detail?.trim() ? { detail: item.detail.trim() } : {}),
    }));
}

// ─── Page photos ──────────────────────────────────────────────────────────────

/**
 * Photos on a one-off page document (`homePage`, …): each named section holds an `image` field.
 * Returns the sections that have a photo uploaded, with Studio crop / hotspot applied. The caller
 * supplies the alt text (the section's `imageAlt` field).
 */
export async function getSanityPageImages(documentId: string, sections: readonly string[]) {
  const projection = sections
    .map((name) => `"${name}": ${name}.image{ crop, hotspot, asset, "src": asset->url }`)
    .join(', ');
  const doc = await sanityClient.fetch<Record<string, SanityImageFields | null> | null>(
    `*[_id == $id][0]{ ${projection} }`,
    { id: documentId }
  );
  const images: Record<string, ContentImage> = {};
  for (const name of sections) {
    const image = resolveContentImage(doc?.[name]);
    if (image?.src) images[name] = image;
  }
  return images;
}

const IMAGE_PROJECTION = /* groq */ `crop, hotspot, asset, "src": asset->url`;

/**
 * Photos on a `contentPage` document: the hero, the closing call to action and any block that holds a
 * photo (story / numbered-steps blocks), keyed by the block's `_key`.
 */
export async function getSanityContentPageImages(documentId: string) {
  const doc = await sanityClient.fetch<{
    hero?: SanityImageFields | null;
    cta?: SanityImageFields | null;
    sections?: { _key: string; image?: SanityImageFields | null }[] | null;
  } | null>(
    /* groq */ `*[_id == $id][0]{
      "hero": hero.image{ ${IMAGE_PROJECTION} },
      "cta": cta.image{ ${IMAGE_PROJECTION} },
      "sections": sections[defined(image.asset)]{ _key, "image": image{ ${IMAGE_PROJECTION} } }
    }`,
    { id: documentId }
  );
  const sections: Record<string, ContentImage> = {};
  for (const block of doc?.sections ?? []) {
    const image = resolveContentImage(block.image);
    if (image?.src) sections[block._key] = image;
  }
  return {
    hero: resolveContentImage(doc?.hero),
    cta: resolveContentImage(doc?.cta),
    sections,
  };
}

/**
 * Hero + closing-CTA photos for a page that has no document of its own (reviews, legal pages, the blog
 * list …): one row per route in the site-wide `pagePhotos` document.
 */
export async function getSanityPagePhotos(path: string) {
  const row = await sanityClient.fetch<{ hero?: SanityImageFields | null; cta?: SanityImageFields | null } | null>(
    /* groq */ `*[_id == "pagePhotos"][0].pages[path == $path][0]{
      "hero": heroImage{ ${IMAGE_PROJECTION}, "alt": ^.heroAlt },
      "cta": ctaImage{ ${IMAGE_PROJECTION}, "alt": ^.ctaAlt }
    }`,
    { path }
  );
  return { hero: resolveContentImage(row?.hero), cta: resolveContentImage(row?.cta) };
}
