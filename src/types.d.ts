import type { HTMLAttributes } from 'astro/types';

export interface MetaData {
  title?: string;
  ignoreTitleTemplate?: boolean;

  canonical?: string;

  robots?: MetaDataRobots;

  description?: string;

  openGraph?: MetaDataOpenGraph;
  twitter?: MetaDataTwitter;
}

export interface MetaDataRobots {
  index?: boolean;
  follow?: boolean;
}

export interface MetaDataImage {
  url: string;
  width?: number;
  height?: number;
}

export interface MetaDataOpenGraph {
  url?: string;
  siteName?: string;
  images?: Array<MetaDataImage>;
  locale?: string;
  type?: string;
}

export interface MetaDataTwitter {
  handle?: string;
  site?: string;
  cardType?: string;
}

export interface Image {
  src: string;
  alt?: string;
}

export interface Widget {
  id?: string;
  isDark?: boolean;
  bg?: string;
  animate?: boolean;
  classes?: Record<string, string | Record<string, string>>;
}

export interface Headline {
  title?: string;
  subtitle?: string;
  tagline?: string;
  classes?: Record<string, string>;
}

export interface Item {
  title?: string;
  description?: string;
  icon?: string;
  classes?: Record<string, string>;
  callToAction?: CallToAction;
  image?: Image;
}

// COMPONENTS
export interface CallToAction extends Omit<HTMLAttributes<'a'>, 'slot'> {
  variant?: 'primary' | 'ghost' | 'secondary' | 'tertiary' | 'ghost-light' | 'ghost-dark' | 'link';
  text?: string;
  icon?: string;
  classes?: Record<string, string>;
  type?: 'button' | 'submit' | 'reset';
  /** Hide the inspection/estimate line. Use in the header and other compact chrome. */
  hideNote?: boolean;
  /** Color for the primary-CTA micro-copy. Default follows light sections + `.dark`. */
  noteTone?: 'light' | 'onDark' | 'cta';
}

// WIDGETS
export interface Faqs extends Omit<Headline, 'classes'>, Widget {
  items?: Array<Item>;
  columns?: number;
}
