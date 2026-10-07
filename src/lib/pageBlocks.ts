/**
 * Layout helpers for ContentPageView: ordering the page body and the page/subtle surface rhythm.
 */
import type { ContentPage, ContentSection, FaqItem } from '~/data/contentPage';

export type Surface = 'page' | 'subtle';

export type Block = { kind: 'section'; section: ContentSection } | { kind: 'faqs' } | { kind: 'related' };

export interface PlacedBlock {
  block: Block;
  surface: Surface;
}

/**
 * Body = authored sections, then FAQs, then the related grid. Surfaces alternate page / subtle
 * unless a section pins one. The navy ActionBand has its own surface and does not advance the rhythm.
 */
export function placeBlocks(page: ContentPage): PlacedBlock[] {
  const blocks: Block[] = [
    ...page.sections.map((section): Block => ({ kind: 'section', section })),
    ...(page.faqs ? [{ kind: 'faqs' } as Block] : []),
    ...(page.related ? [{ kind: 'related' } as Block] : []),
  ];

  let previous: Surface = 'subtle';
  return blocks.map((block) => {
    const ownSurface = block.kind === 'section' && block.section.type === 'action';
    const pinned = block.kind === 'section' && 'surface' in block.section ? block.section.surface : undefined;
    const surface = pinned ?? (previous === 'page' ? 'subtle' : 'page');
    if (!ownSurface) previous = surface;
    return { block, surface };
  });
}

/** The FAQs widget calls an item's link `callToAction`; the content data calls it `cta`. */
export const toFaqWidgetItems = (items: FaqItem[]) => items.map(({ cta, ...item }) => ({ ...item, callToAction: cta }));
