/**
 * Pure helpers behind `src/components/common/Image.astro`:
 * Sanity CDN URL building, CDN-side srcset widths, sizes, and layout styles.
 */

export type ImageLayout = 'constrained' | 'full-width' | 'fixed' | 'cover' | 'none';

export interface SourceDimensions {
  width: number;
  height: number;
}

/**
 * Densified srcset breakpoints so the browser can match the actual display size
 * more closely. Free for CDN URLs (variants are computed provider-side).
 */
export const CDN_BREAKPOINTS = [320, 400, 500, 640, 720, 828, 960, 1080, 1200, 1440, 1600, 1920, 2048];

/** Tolerate stringified numbers coming from props. */
export const toNumber = (v: number | string | undefined): number | undefined =>
  typeof v === 'string' ? (Number.isFinite(Number(v)) ? Number(v) : undefined) : v;

export const isSanityCdnUrl = (url: unknown): url is string =>
  typeof url === 'string' && /^https?:\/\/cdn\.sanity\.io\//.test(url);

export const uniqueSortedWidths = (values: Array<number | undefined>): number[] =>
  [
    ...new Set(values.filter((value): value is number => value !== undefined && Number.isFinite(value) && value > 0)),
  ].sort((a, b) => a - b);

/** Reads the `-WIDTHxHEIGHT.ext` suffix Sanity puts on asset URLs. */
export const sanitySourceDimensions = (url: string): SourceDimensions | undefined => {
  const match = url.match(/-(\d+)x(\d+)\.[a-z]+(?:\?|$)/i);
  if (!match) return undefined;
  return { width: Number(match[1]), height: Number(match[2]) };
};

export const capToSourceWidth = (value: number, dimensions?: SourceDimensions): number =>
  dimensions?.width ? Math.min(value, dimensions.width) : value;

/** `object-position` declaration from the Studio hotspot (fp-x / fp-y), adjusted for the editor crop rect. */
export const sanityCoverObjectPosition = (src: string): string | undefined => {
  const url = new URL(src);
  const fpx = url.searchParams.get('fp-x');
  const fpy = url.searchParams.get('fp-y');
  if (fpx == null || fpy == null) return undefined;

  const rect = url.searchParams.get('rect');
  const dimMatch = url.pathname.match(/-(\d+)x(\d+)\.[a-z]+$/i);
  if (rect && dimMatch) {
    const assetW = Number(dimMatch[1]);
    const assetH = Number(dimMatch[2]);
    const [left, top, width, height] = rect.split(',').map(Number);
    if (width > 0 && height > 0) {
      const x = Math.min(1, Math.max(0, (Number(fpx) * assetW - left) / width));
      const y = Math.min(1, Math.max(0, (Number(fpy) * assetH - top) / height));
      return `object-position:${(x * 100).toFixed(2)}% ${(y * 100).toFixed(2)}%`;
    }
  }

  return `object-position:${Number(fpx) * 100}% ${Number(fpy) * 100}%`;
};

interface SanityUrlOptions {
  layout: ImageLayout;
  quality?: number | string;
  dimensions?: SourceDimensions;
}

/** A Sanity CDN URL for one srcset variant (`w` / `h` / `fit` / `auto=format` / `q`). */
export const sanityImageUrl = (
  src: string,
  variantWidth: number | undefined,
  variantHeight: number | undefined,
  { layout, quality, dimensions }: SanityUrlOptions
): string => {
  const url = new URL(src);
  const hasEditorCrop = url.searchParams.has('rect');
  const q = toNumber(quality);
  const nextWidth = variantWidth ? capToSourceWidth(variantWidth, dimensions) : undefined;
  const nextHeight =
    variantWidth && variantHeight && nextWidth && nextWidth !== variantWidth
      ? Math.round((variantHeight * nextWidth) / variantWidth)
      : variantHeight;

  if (nextWidth) url.searchParams.set('w', String(nextWidth));

  // Studio crop is already `rect` on the URL. Don't recrop to a different
  // aspect ratio here — CSS object-fit covers the slot from that crop.
  if (hasEditorCrop) {
    url.searchParams.set('fit', 'max');
    url.searchParams.delete('h');
  } else if (layout === 'cover' && nextWidth && nextHeight) {
    url.searchParams.set('h', String(nextHeight));
    url.searchParams.set('fit', 'crop');
  } else if (nextWidth || nextHeight) {
    if (nextHeight) url.searchParams.set('h', String(nextHeight));
    url.searchParams.set('fit', 'max');
  }
  url.searchParams.set('auto', 'format');
  if (q) url.searchParams.set('q', String(q));
  return url.toString();
};

interface LayoutBox {
  layout: ImageLayout;
  w?: number;
  h?: number;
  aspectRatio?: number;
}

/**
 * Inline style mirroring the layout intent for a raw CDN <img>. The native Astro
 * <Image /> emits responsive styles itself; a plain <img> does not.
 */
export const cdnLayoutStyle = ({ layout, w, h, aspectRatio }: LayoutBox, coverPosition?: string): string => {
  const decls: string[] = [];
  switch (layout) {
    case 'fixed':
      if (w) decls.push(`width:${w}px`);
      if (h) decls.push(`height:${h}px`);
      break;
    case 'full-width':
      decls.push('width:100%');
      if (aspectRatio) decls.push(`aspect-ratio:${aspectRatio}`);
      break;
    case 'cover':
      decls.push('width:100%', 'height:100%', 'object-fit:cover');
      if (coverPosition) decls.push(coverPosition);
      break;
    case 'none':
      break;
    case 'constrained':
    default:
      decls.push('width:100%');
      if (w) decls.push(`max-width:${w}px`);
      if (aspectRatio) decls.push(`aspect-ratio:${aspectRatio}`);
      break;
  }
  return decls.join(';');
};

interface WidthOptions {
  raw?: number[];
  layout: ImageLayout;
  w?: number;
  isRemote: boolean;
  dimensions?: SourceDimensions;
}

/** Widths for the srcset: densify caller breakpoints, or derive them for remote images. */
export const expandWidths = ({ raw, layout, w, isRemote, dimensions }: WidthOptions): number[] | undefined => {
  if (Array.isArray(raw) && raw.length > 0) {
    const min = Math.min(...raw);
    const max = Math.max(...raw);
    const extras = CDN_BREAKPOINTS.filter((bp) => bp > min && bp < max);
    return uniqueSortedWidths([...raw, ...extras]);
  }

  if (!isRemote) return raw;

  if (layout === 'fixed' && w) {
    return uniqueSortedWidths([capToSourceWidth(w, dimensions), capToSourceWidth(w * 2, dimensions)]);
  }

  const maxWidth = capToSourceWidth(
    w ?? (layout === 'cover' || layout === 'full-width' ? 1920 : undefined) ?? 0,
    dimensions
  );
  if (!maxWidth) return CDN_BREAKPOINTS;

  return uniqueSortedWidths([...CDN_BREAKPOINTS.filter((bp) => bp <= maxWidth), maxWidth]);
};

/** `sizes` attribute for a CDN srcset; an explicit `sizes` prop always wins. */
export const defaultCdnSizes = (layout: ImageLayout, w?: number, explicit?: unknown): string | undefined => {
  if (typeof explicit === 'string' && explicit.trim()) return explicit;

  switch (layout) {
    case 'fixed':
      return w ? `${w}px` : undefined;
    case 'cover':
    case 'full-width':
      return '100vw';
    case 'constrained':
      return w ? `(max-width: ${w}px) 100vw, ${w}px` : '100vw';
    case 'none':
    default:
      return undefined;
  }
};

/** Inline style for the grey placeholder, mirroring the layout the real image would take. */
export const placeholderStyle = ({ layout, w, aspectRatio }: LayoutBox, style?: unknown): string | undefined =>
  [
    layout === 'cover' ? 'width:100%;height:100%;object-fit:cover' : undefined,
    layout === 'full-width' ? 'width:100%' : undefined,
    layout === 'constrained' ? 'width:100%' : undefined,
    layout === 'constrained' && w ? `max-width:${w}px` : undefined,
    aspectRatio ? `aspect-ratio:${aspectRatio}` : undefined,
    style,
  ]
    .filter(Boolean)
    .join(';') || undefined;
