import type { BlogContentBlock, BlogPost } from './types';

export interface TocItem {
  id: string;
  title: string;
}

type HeadingBlock = Extract<BlogContentBlock, { _type: 'heading' }>;

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

/**
 * H2 headings (the table-of-contents entries) with a unique anchor id each.
 * One source of truth so the TOC and the rendered `<h2 id>` always match.
 */
export function getArticleHeadings(post: BlogPost): (HeadingBlock & { id: string })[] {
  const used = new Set<string>();
  return post.contentBlocks
    .filter((block): block is HeadingBlock => block._type === 'heading' && block.level === 2)
    .map((block) => {
      const base = slugifyHeading(block.text) || 'section';
      let id = base;
      for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
      used.add(id);
      return { ...block, id };
    });
}

export function getArticleToc(post: BlogPost): TocItem[] {
  return getArticleHeadings(post).map(({ id, text }) => ({ id, title: text }));
}

/** Reading time in whole minutes (≈ 200 wpm), minimum 1. */
export function getReadingMinutes(post: BlogPost): number {
  const words = post.contentBlocks.reduce((count, block) => {
    if (block._type === 'paragraph' || block._type === 'heading') return count + block.text.split(/\s+/).length;
    if (block._type === 'list') return count + block.items.reduce((n, item) => n + item.html.split(/\s+/).length, 0);
    return count;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}
