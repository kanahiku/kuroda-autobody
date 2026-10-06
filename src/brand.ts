/**
 * Brand tokens — Kuroda Autobody
 * Design system: https://www.figma.com/design/IhaXmbZBwO7sVdtJ5LXfC0/Kuroda-Autobody
 *
 * Palette: Navy (#08296C) + Blue (#047BC1) + clean neutrals.
 * Fonts: Unbounded (headings) + Lato (body).
 * Radius: 4px base.
 *
 * Flow:
 * 1. Paste values extracted from Figma (MCP `get_variable_defs`).
 * 2. `CustomStyles.astro` and `astro.config.ts` read this file at build time.
 * 3. Components never hardcode hex — they use Tailwind tokens backed by these CSS vars.
 *
 * Do not put contact data, GTM, nav links, or page copy here.
 * Those live in `src/config/site.ts`, `src/config/contact.ts`, and siblings.
 */

export const brand = {
  fonts: {
    /**
     * Unbounded — headings, display, numeric, quotes.
     * Source: src/assets/fonts/Unbounded-VariableFont_wght.ttf (variable, wght 100–900).
     * Covers all weights (Light 300, Regular 400, Medium 500, SemiBold 600, Bold 700).
     */
    heading: {
      name: 'Unbounded',
      cssVariable: '--font-unbounded',
      provider: 'local' as const,
      weights: ['300', '400', '500', '600', '700'] as string[],
      styles: ['normal'] as string[],
      subsets: [] as string[],
      fallbacks: ['sans-serif'] as string[],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/Unbounded-VariableFont_wght.ttf'],
            weight: '100 900', // variable font — covers all weights
            style: 'normal',
          },
        ],
      },
    },
    /**
     * Lato — body copy, labels, captions, metadata, buttons.
     * Source: src/assets/fonts/Lato-Regular.ttf + Lato-Bold.ttf (static).
     */
    body: {
      name: 'Lato',
      cssVariable: '--font-lato',
      provider: 'local' as const,
      weights: ['400', '700'] as string[],
      styles: ['normal'] as string[],
      subsets: [] as string[],
      fallbacks: ['sans-serif'] as string[],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/Lato-Regular.ttf'],
            weight: '400',
            style: 'normal',
          },
          {
            src: ['./src/assets/fonts/Lato-Bold.ttf'],
            weight: '700',
            style: 'normal',
          },
        ],
      },
    },
  },

  /**
   * Kuroda Autobody design system palette (Figma node 152:109).
   *
   * Brand:    Kuroda Navy #08296C · Kuroda Blue #047BC1 · Sky #7DBFED
   * Neutrals: Ink #231F20 · Slate #9EACB5 · Mist #F3F5F7 · White #FFFFFF
   * Silver:   50/#F8F9FA · 100/#EEF0F2 · 200/#E3E7EA · 400/#AEB7BF · 500/#9AA5AF
   * Stops:    Blue Hover #1A8FD6 · Navy Pressed #061F52 · Mist Hover #E6EDF5
   */
  colors: {
    // ── Primary brand ──────────────────────────────────────────────────────
    accent: '#047BC1',        // Kuroda Blue (blue/600) — links, icons, primary CTAs
    accentHover: '#1A8FD6',   // Blue Hover (blue/500) — button hover
    heading: '#08296C',       // Kuroda Navy (navy/900) — headings, nav text

    // ── Body text ──────────────────────────────────────────────────────────
    muted: '#9EACB5',         // Slate (slate/400) — secondary body text
    eyebrow: '#047BC1',       // Kuroda Blue — eyebrow accent labels

    // ── Page & announcement bar ────────────────────────────────────────────
    page: '#FFFFFF',          // White — page background
    banner: '#F8F9FA',        // Silver 50 — top utility bar bg
    bannerLine: '#E3E7EA',    // Silver 200 — bar border / divider
    bannerText: '#231F20',    // Ink — bar text
    bannerDot: '#9EACB5',     // Slate — bar separator dot
    bannerNote: '#231F20',    // Ink — bar note copy

    // ── Nav ────────────────────────────────────────────────────────────────
    navCta: '#047BC1',        // Kuroda Blue — nav "Get a Quote" button

    // ── Section backgrounds ────────────────────────────────────────────────
    sectionGrey: '#F3F5F7',   // Mist (mist/50) — alternating light section
    sectionDark: '#08296C',   // Kuroda Navy — dark sections

    // ── Cards ──────────────────────────────────────────────────────────────
    card: '#F8F9FA',          // Silver 50 — card surface
    cardMist: '#E3E7EA',      // Silver 200 — card border / shadow accent
    cardDark: '#061F52',      // Navy Pressed (navy/950) — dark card surface
    featureCard: '#FFFFFF',   // White — feature / outlined card bg

    // ── CTA band (gradient: Kuroda Blue → Kuroda Navy) ─────────────────────
    ctaBg: '#047BC1',         // Gradient start (Kuroda Blue)
    ctaEnd: '#08296C',        // Gradient end (Kuroda Navy)

    // ── Secondary / outline button on light surfaces ───────────────────────
    ctaTan: '#08296C',        // Navy bg for secondary buttons on white pages
    tanText: '#061F52',       // Navy Pressed hover bg
    tanBody: '#FFFFFF',       // White text on navy secondary buttons

    // ── Semantic aliases ───────────────────────────────────────────────────
    primary: '#047BC1',       // Kuroda Blue
    secondary: '#9EACB5',     // Slate
    navy: '#08296C',          // Kuroda Navy (used in button hover, dark surfaces)
    black: '#231F20',         // Ink (near-black for body text)
    white: '#FFFFFF',
    cream: '#FFFFFF',         // White — button text on coloured backgrounds
    nav: '#08296C',           // Navy — nav glass tint

    // ── Footer ─────────────────────────────────────────────────────────────
    footerBg: '#061F52',      // Navy Pressed (navy/950) — darkest surface

    // ── Extended palette (gradient stops, hover states, icons) ─────────────
    navyPressed: '#061F52',   // navy/950 — pressed state
    navyMid: '#0A3F8C',       // navy/800 — gradient mid
    heroTint: '#0B3F8F',      // navy/700 — hero overlay tint
    blueDeep: '#0B4F9E',      // blue/700 — dark blue accent
    blueLight: '#3A9BE0',     // blue/400 — light blue for icons / highlights
    sky: '#7DBFED',           // sky/300 — lightest blue accent
    skyIcon: '#7CBFEE',       // sky/400 — icon accent
    ink: '#231F20',           // ink/900 — darkest neutral
    slate: '#9EACB5',         // slate/400 — muted grey-blue
    mist: '#F3F5F7',          // mist/50 — subtle surface
    mistHover: '#E6EDF5',     // mist/100 — hover on mist surface
    silver50: '#F8F9FA',      // silver/50
    silver100: '#EEF0F2',     // silver/100
    silver200: '#E3E7EA',     // silver/200
    silver400: '#AEB7BF',     // silver/400
    silver500: '#9AA5AF',     // silver/500
  },

  type: {
    /**
     * Type scale — confirmed from Figma nodes:
     *   153:82   Desktop type styles
     *   153:1975 Mobile type styles (390 px frame)
     *   153:613  Type Scale Variables table  ← authoritative desktop vs mobile
     *
     * Figma CSS variable name → internal key → desktop / mobile sizes.
     *
     * Weight convention — Unbounded (font-display):
     *   Light  300 → display, h1, h2, h3 headings (default `font-display`)
     *   Regular 400 → quotes, taglines
     *   SemiBold 600 → card titles (h4)
     *
     * Weight convention — Lato (font-body):
     *   Regular 400 → all body copy, quote
     *   Bold    700 → buttons, labels, eyebrows, nav
     */

    /** var(--type-font-size-display)   Desktop: 64px  Mobile: 38px
     *  Figma: Display/Hero · Unbounded Light, lh 1.1, tracking -3% */
    display: { size: '64px', mobile: '38px', lineHeight: '1.1', tracking: '-0.03em' },

    /** var(--type-font-size-h1)        Desktop: 52px  Mobile: 32px
     *  Figma: Heading/H1 · Unbounded Light, lh 1.12, tracking -2% */
    h1: { size: '52px', mobile: '32px', lineHeight: '1.12', tracking: '-0.02em' },

    /** var(--type-font-size-h2)        Desktop: 48px  Mobile: 34px
     *  Figma: Heading/H2 · Unbounded Light, lh 1.12, tracking -2% */
    h2: { size: '48px', mobile: '34px', lineHeight: '1.12', tracking: '-0.02em' },

    /** var(--type-font-size-h3)        Desktop: 42px  Mobile: 30px
     *  Figma: Heading/H3 · Unbounded Light, lh 1.12, tracking -2% */
    h3: { size: '42px', mobile: '30px', lineHeight: '1.12', tracking: '-0.02em' },

    /** var(--type-font-size-title-card) Desktop: 17px  Mobile: 15px
     *  Figma: Title/Card · Unbounded SemiBold 600, lh 1.3 */
    h4: { size: '17px', mobile: '15px', lineHeight: '1.3', tracking: '0' },

    /** var(--type-font-size-body)      Desktop: 15px  Mobile: 14px
     *  Figma: Body/Default · Lato Regular, lh 1.6 */
    body: { size: '15px', mobile: '14px', lineHeight: '1.6', tracking: '0' },

    /** var(--type-font-size-body-lead) Desktop: 18px  Mobile: 16px
     *  Figma: Body/Lead · Lato Regular, lh 1.55 */
    bodyLg: { size: '18px', mobile: '16px', lineHeight: '1.55', tracking: '0' },

    /** var(--type-font-size-button)    Desktop: 12px  Mobile: 12px
     *  Figma: Button/Label · Lato Bold, tracking 10% */
    button: { size: '12px', mobile: '12px', lineHeight: '1', tracking: '0.1em' },

    /** var(--type-font-size-eyebrow)   Desktop: 11px  Mobile: 11px
     *  Figma: Label/Eyebrow · Lato Bold, tracking 14% */
    eyebrow: { size: '11px', mobile: '11px', lineHeight: '1', tracking: '0.14em' },

    /** Body/Small (no Figma variable — internal utility).
     *  Lato Regular 14px, lh 22px, unchanged mobile. */
    small: { size: '14px', mobile: '14px', lineHeight: '22px', tracking: '0' },

    /** var(--type-font-size-caption)   Desktop: 12px  Mobile: 11.5px
     *  Figma: Caption/Default · Lato Regular */
    caption: { size: '12px', mobile: '11.5px', lineHeight: '1.4', tracking: '0' },

    /** Label/Footer Heading (internal utility).
     *  Lato Bold 11px, tracking 12% — footer column heads, nav labels. */
    label: { size: '11px', mobile: '11px', lineHeight: '1', tracking: '0.12em' },

    /** var(--type-font-size-numeric-step)   Desktop: 88px  Mobile: 56px
     *  Figma: Numeric/Step · Unbounded Light, lh 1.05, tracking -4% */
    ticker: { size: '88px', mobile: '56px', lineHeight: '1.05', tracking: '-0.04em' },

    /** var(--type-font-size-numeric-rating) Desktop: 44px  Mobile: 28px
     *  Figma: Numeric/Rating · Unbounded Light, lh 1.1, tracking -2% */
    numericRating: { size: '44px', mobile: '28px', lineHeight: '1.1', tracking: '-0.02em' },

    /** var(--type-font-size-quote)     Desktop: 18px  Mobile: 16px
     *  Figma: Quote/Pull · Unbounded Regular, lh 1.6, tracking -1% */
    quote: { size: '18px', mobile: '16px', lineHeight: '1.6', tracking: '-0.01em' },
  },

  /**
   * Page layout — THE single source of truth for the content container.
   * Every page and section renders through <MaxWidthContainer> (src/components/ui),
   * which reads these values via CSS variables. Change them here → whole site updates.
   *
   * Figma viewport 1280px − 2 × 64px padding = 1152px content area.
   */
  layout: {
    /** Max width of the page frame (padding included). */
    maxWidth: '1440px',
    /** Horizontal padding from the md breakpoint (768px) up. */
    paddingX: '64px',
    /** Horizontal padding below md (mobile / small tablet). */
    paddingXMobile: '24px',
  },

  /**
   * Border radius — Figma node 153:1678 "Radius & Shadows".
   * Kuroda is crisp and engineered — corners stay tight.
   */
  radius: {
    /** 2px — tags, small chips */
    xs:   '2px',
    /** 3px — pager dots */
    sm:   '3px',
    /** 4px — buttons, cards, menu toggle (main base radius) */
    md:   '4px',
    /** 9999px — slider handle, fully-round pills */
    full: '9999px',

    /* Backward-compat aliases kept so existing --aw-radius usage still compiles. */
    base: '4px',
    lg:   '6px',
    xl:   '8px',
    hero: '0px',
  },

  /**
   * Elevation / shadows — Figma node 153:1678.
   * Named exactly as they appear in Figma.
   */
  shadows: {
    /** General card / surface shadow (existing homepage usage). */
    soft:         '0px 4px 16px 0px rgba(0,0,0,0.18)',
    /** Sticky/scrolled navbar elevation. */
    stickyHeader: '0px 4px 20px 0px rgba(8,41,108,0.10)',
    /** Hover state for cards and interactive tiles. */
    cardHover:    '0px 12px 32px -4px rgba(8,41,108,0.14)',
    /** Keyboard focus ring — 3px sky blue (#7DBFED). */
    focusRing:    '0 0 0 3px #7DBFED',
  },

} as const;

export type Brand = typeof brand;

/** Strip # and expand 3-digit hex. */
export function hexToChannels(hex: string): string {
  const raw = hex.replace('#', '').trim();
  const h =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw;
  const n = Number.parseInt(h, 16);
  if (Number.isNaN(n)) return '0 0 0';
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

/** `rgb(237 217 116)` or `rgb(237 217 116 / 50%)`. */
export function rgb(hex: string, alpha?: number): string {
  const channels = hexToChannels(hex);
  if (alpha === undefined) return `rgb(${channels})`;
  const a = alpha <= 1 ? `${Math.round(alpha * 100)}%` : String(alpha);
  return `rgb(${channels} / ${a})`;
}

/**
 * Figma semantic color roles (node 152:248 — "Color roles.")
 * Naming follows the Figma CSS variable names exactly so components can
 * copy `var(--color-*)` references directly from Figma dev mode.
 *
 * Groups: action · border · brand · icon · surface · text
 */
function semanticColorVars(c: Brand['colors']): string {
  return `
    /* ── Action ─────────────────────────────────────────────────────── */
    --color-action-focus-ring: ${rgb(c.sky)};
    --color-action-inverse-hover: ${rgb(c.mistHover)};
    --color-action-primary-hover: ${rgb(c.accentHover)};
    --color-action-primary-pressed: ${rgb(c.navyPressed)};

    /* ── Border ─────────────────────────────────────────────────────── */
    --color-border-accent: ${rgb(c.accent)};
    --color-border-default: ${rgb(c.slate)};
    --color-border-default-35: ${rgb(c.slate, 0.35)};
    --color-border-default-40: ${rgb(c.slate, 0.40)};
    --color-border-default-50: ${rgb(c.slate, 0.50)};
    --color-border-default-60: ${rgb(c.slate, 0.60)};
    --color-border-on-dark: ${rgb(c.white)};
    --color-border-on-dark-10: ${rgb(c.white, 0.10)};
    --color-border-on-dark-12: ${rgb(c.white, 0.12)};
    --color-border-on-dark-14: ${rgb(c.white, 0.14)};
    --color-border-on-dark-15: ${rgb(c.white, 0.15)};
    --color-border-on-dark-18: ${rgb(c.white, 0.18)};
    --color-border-on-dark-20: ${rgb(c.white, 0.20)};
    --color-border-on-dark-55: ${rgb(c.white, 0.55)};
    --color-border-on-dark-60: ${rgb(c.white, 0.60)};
    --color-border-strong: ${rgb(c.heading)};
    --color-border-strong-25: ${rgb(c.heading, 0.25)};

    /* ── Brand ──────────────────────────────────────────────────────── */
    --color-brand-blue: ${rgb(c.accent)};
    --color-brand-navy: ${rgb(c.heading)};
    --color-brand-sky: ${rgb(c.sky)};

    /* ── Icon ───────────────────────────────────────────────────────── */
    --color-icon-default: ${rgb(c.accent)};
    --color-icon-on-dark: ${rgb(c.skyIcon)};
    --color-icon-on-dark-alt: ${rgb(c.sky)};

    /* ── Surface ────────────────────────────────────────────────────── */
    --color-surface-accent: ${rgb(c.accent)};
    --color-surface-hero-tint: ${rgb(c.heroTint)};
    --color-surface-hero-tint-16: ${rgb(c.heroTint, 0.16)};
    --color-surface-inverse: ${rgb(c.heading)};
    --color-surface-on-dark: ${rgb(c.white)};
    --color-surface-on-dark-4: ${rgb(c.white, 0.04)};
    --color-surface-on-dark-5: ${rgb(c.white, 0.05)};
    --color-surface-on-dark-7: ${rgb(c.white, 0.07)};
    --color-surface-page: ${rgb(c.page)};
    --color-surface-subtle: ${rgb(c.mist)};

    /* ── Text ───────────────────────────────────────────────────────── */
    --color-text-accent: ${rgb(c.accent)};
    --color-text-body: ${rgb(c.ink)};
    --color-text-body-55: ${rgb(c.ink, 0.55)};
    --color-text-body-60: ${rgb(c.ink, 0.60)};
    --color-text-body-70: ${rgb(c.ink, 0.70)};
    --color-text-body-78: ${rgb(c.ink, 0.78)};
    --color-text-body-80: ${rgb(c.ink, 0.80)};
    --color-text-heading: ${rgb(c.heading)};
    --color-text-heading-80: ${rgb(c.heading, 0.80)};
    --color-text-on-dark: ${rgb(c.white)};
    --color-text-on-dark-55: ${rgb(c.white, 0.55)};
    --color-text-on-dark-60: ${rgb(c.white, 0.60)};
    --color-text-on-dark-70: ${rgb(c.white, 0.70)};
    --color-text-on-dark-72: ${rgb(c.white, 0.72)};
    --color-text-on-dark-82: ${rgb(c.white, 0.82)};
    --color-text-on-dark-85: ${rgb(c.white, 0.85)};
    --color-text-on-dark-accent: ${rgb(c.sky)};
  `.trim();
}

/** Per-variant CTA colors. */
function ctaButtonVars(c: Brand['colors']): string {
  const primary = `
    --aw-color-btn-primary-bg: ${rgb(c.accent)};
    --aw-color-btn-primary-text: ${rgb(c.cream)};
    --aw-color-btn-primary-border: ${rgb(c.accent)};
    --aw-color-btn-primary-bg-hover: ${rgb(c.navy)};
    --aw-color-btn-primary-text-hover: ${rgb(c.cream)};
    --aw-color-btn-primary-border-hover: ${rgb(c.navy)};`;

  const secondary = `
    --aw-color-btn-secondary-bg: ${rgb(c.ctaTan)};
    --aw-color-btn-secondary-text: ${rgb(c.cream)};
    --aw-color-btn-secondary-border: ${rgb(c.ctaTan)};
    --aw-color-btn-secondary-bg-hover: ${rgb(c.tanText)};
    --aw-color-btn-secondary-text-hover: ${rgb(c.cream)};
    --aw-color-btn-secondary-border-hover: ${rgb(c.tanText)};`;

  const ghostLight = `
    --aw-color-btn-ghost-light-bg: transparent;
    --aw-color-btn-ghost-light-text: ${rgb(c.heading)};
    --aw-color-btn-ghost-light-border: ${rgb(c.heading)};
    --aw-color-btn-ghost-light-bg-hover: ${rgb(c.accent)};
    --aw-color-btn-ghost-light-text-hover: ${rgb(c.cream)};
    --aw-color-btn-ghost-light-border-hover: ${rgb(c.accent)};`;

  const ghostDark = `
    --aw-color-btn-ghost-dark-bg: transparent;
    --aw-color-btn-ghost-dark-text: ${rgb(c.cream)};
    --aw-color-btn-ghost-dark-border: ${rgb(c.cream)};
    --aw-color-btn-ghost-dark-bg-hover: ${rgb(c.cream, 0.12)};
    --aw-color-btn-ghost-dark-text-hover: ${rgb(c.cream)};
    --aw-color-btn-ghost-dark-border-hover: ${rgb(c.cream)};`;

  return [primary, secondary, ghostLight, ghostDark].join('');
}

function rootVars(b: Brand): string {
  const { colors: c, fonts: f, radius: r, type: t } = b;
  // `b` is also used directly below for b.shadows
  const accent = rgb(c.accent);
  const accentHover = rgb(c.accentHover);
  const heading = rgb(c.heading);
  const muted = rgb(c.muted);

  return `
    --aw-font-sans: var(${f.body.cssVariable});
    --aw-font-serif: var(${f.heading.cssVariable});
    --aw-font-heading: var(${f.heading.cssVariable});
    --aw-font-script: var(${f.body.cssVariable});
    --aw-font-rough: var(${f.heading.cssVariable});

    /* ── Figma CSS variable names (node 153:613 "Type Scale Variables") ─────
       Components can use var(--type-font-size-*) directly from Figma dev mode.
       Also includes --font-family-display / --font-family-body.              */
    --font-family-display: var(${f.heading.cssVariable});
    --font-family-body: var(${f.body.cssVariable});

    --type-font-size-display: ${t.display.size};
    --type-font-size-display-mobile: ${t.display.mobile};
    --type-font-size-h1: ${t.h1.size};
    --type-font-size-h1-mobile: ${t.h1.mobile};
    --type-font-size-h2: ${t.h2.size};
    --type-font-size-h2-mobile: ${t.h2.mobile};
    --type-font-size-h3: ${t.h3.size};
    --type-font-size-h3-mobile: ${t.h3.mobile};
    --type-font-size-numeric-step: ${t.ticker.size};
    --type-font-size-numeric-step-mobile: ${t.ticker.mobile};
    --type-font-size-numeric-rating: ${t.numericRating.size};
    --type-font-size-numeric-rating-mobile: ${t.numericRating.mobile};
    --type-font-size-quote: ${t.quote.size};
    --type-font-size-quote-mobile: ${t.quote.mobile};
    --type-font-size-title-card: ${t.h4.size};
    --type-font-size-title-card-mobile: ${t.h4.mobile};
    --type-font-size-body-lead: ${t.bodyLg.size};
    --type-font-size-body-lead-mobile: ${t.bodyLg.mobile};
    --type-font-size-body: ${t.body.size};
    --type-font-size-body-mobile: ${t.body.mobile};
    --type-font-size-button: ${t.button.size};
    --type-font-size-eyebrow: ${t.eyebrow.size};
    --type-font-size-caption: ${t.caption.size};
    --type-font-size-caption-mobile: ${t.caption.mobile};

    /* ── Internal --aw-text-* vars used by Tailwind utilities ──────────────── */
    --aw-text-display: ${t.display.size};
    --aw-text-display-mobile: ${t.display.mobile};
    --aw-leading-display: ${t.display.lineHeight};
    --aw-tracking-display: ${t.display.tracking};
    --aw-text-h1: ${t.h1.size};
    --aw-text-h1-mobile: ${t.h1.mobile};
    --aw-leading-h1: ${t.h1.lineHeight};
    --aw-tracking-h1: ${t.h1.tracking};
    --aw-text-h2: ${t.h2.size};
    --aw-text-h2-mobile: ${t.h2.mobile};
    --aw-leading-h2: ${t.h2.lineHeight};
    --aw-tracking-h2: ${t.h2.tracking};
    --aw-text-h3: ${t.h3.size};
    --aw-text-h3-mobile: ${t.h3.mobile};
    --aw-leading-h3: ${t.h3.lineHeight};
    --aw-tracking-h3: ${t.h3.tracking};
    --aw-text-h4: ${t.h4.size};
    --aw-text-h4-mobile: ${t.h4.mobile};
    --aw-leading-h4: ${t.h4.lineHeight};
    --aw-text-body: ${t.body.size};
    --aw-text-body-mobile: ${t.body.mobile};
    --aw-leading-body: ${t.body.lineHeight};
    --aw-tracking-body: ${t.body.tracking};
    --aw-text-body-lg: ${t.bodyLg.size};
    --aw-text-body-lg-mobile: ${t.bodyLg.mobile};
    --aw-tracking-body-lg: ${t.bodyLg.tracking};
    --aw-text-button: ${t.button.size};
    --aw-text-eyebrow: ${t.eyebrow.size};
    --aw-text-eyebrow-mobile: ${t.eyebrow.mobile};
    --aw-tracking-eyebrow: ${t.eyebrow.tracking};
    --aw-text-small: ${t.small.size};
    --aw-leading-small: ${t.small.lineHeight};
    --aw-text-caption: ${t.caption.size};
    --aw-text-caption-mobile: ${t.caption.mobile};
    --aw-text-label: ${t.label.size};
    --aw-text-label-mobile: ${t.label.mobile};
    --aw-tracking-label: ${t.label.tracking};
    --aw-text-ticker: ${t.ticker.size};
    --aw-text-ticker-mobile: ${t.ticker.mobile};
    --aw-text-numeric-rating: ${t.numericRating.size};
    --aw-text-numeric-rating-mobile: ${t.numericRating.mobile};
    --aw-text-quote: ${t.quote.size};
    --aw-text-quote-mobile: ${t.quote.mobile};
    --aw-leading-quote: ${t.quote.lineHeight};

    --aw-color-primary: ${rgb(c.primary)};
    --aw-color-secondary: ${rgb(c.secondary)};
    --aw-color-accent: ${accent};
    --aw-color-accent-hover: ${accentHover};

    --aw-color-text-heading: ${heading};
    --aw-color-text-default: ${heading};
    --aw-color-text-muted: ${muted};
    --aw-color-text-eyebrow: ${rgb(c.eyebrow)};
    --aw-color-text-page: ${rgb(c.page)};
    --aw-color-bg-banner: ${rgb(c.banner)};
    --aw-color-banner-line: ${rgb(c.bannerLine)};
    --aw-color-banner-text: ${rgb(c.bannerText)};
    --aw-color-banner-dot: ${rgb(c.bannerDot)};
    --aw-color-banner-note: ${rgb(c.bannerNote)};
    --aw-color-nav-cta: ${rgb(c.navCta)};
    --aw-color-bg-page: ${rgb(c.page)};
    --aw-color-bg-page-end: ${rgb(c.silver50)};
    --aw-color-bg-section-white: ${rgb(c.page)};
    --aw-color-bg-section-grey: ${rgb(c.sectionGrey)};
    --aw-color-bg-section-dark: ${rgb(c.sectionDark)};
    --aw-color-bg-card: ${rgb(c.card)};
    --aw-color-bg-card-dark: ${rgb(c.cardDark)};
    --aw-color-bg-card-light: ${rgb(c.mistHover)};
    --aw-color-bg-feature-card: ${rgb(c.featureCard)};
    --aw-color-bg-cta: ${rgb(c.ctaBg)};
    --aw-color-bg-cta-end: ${rgb(c.ctaEnd)};
    --aw-color-text-tan: ${rgb(c.accentHover)};
    --aw-color-text-tan-body: ${rgb(c.tanBody)};
    --aw-shadow-card-mist: 4px 4px 30px rgb(0 0 0 / 5%), 3px 3px 0 ${rgb(c.silver200)};
    --aw-color-nav-glass: ${rgb(c.navy, 0.06)};

    --aw-color-card-heading-dark: ${rgb(c.white)};
    --aw-color-card-body-dark: ${rgb(c.white, 0.7)};
    --aw-color-card-link-dark: ${rgb(c.sky)};

    --aw-color-card-heading-light: var(--aw-color-text-heading);
    --aw-color-card-body-light: var(--aw-color-text-muted);
    --aw-color-card-link-light: var(--aw-color-btn-link);

    --aw-color-card-border-dark: ${rgb(c.accent, 0.4)};
    --aw-color-card-border-light: transparent;

    --aw-color-bg-card-outlined: ${rgb(c.white)};
    --aw-color-card-border-outlined: ${rgb(c.silver200)};
    --aw-color-card-heading-outlined: var(--aw-color-text-heading);
    --aw-color-card-body-outlined: var(--aw-color-text-muted);
    --aw-color-card-link-outlined: var(--aw-color-btn-link);

    --aw-color-bg-card-glass: ${rgb(c.white, 0.08)};
    --aw-color-card-border-glass: ${rgb(c.white, 0.15)};
    --aw-color-card-heading-glass: ${rgb(c.white)};
    --aw-color-card-body-glass: ${rgb(c.white, 0.7)};
    --aw-color-card-link-glass: ${rgb(c.sky)};

    ${ctaButtonVars(c)}

    --aw-color-btn-link: ${rgb(c.accent)};
    --aw-color-btn-link-hover: ${accentHover};

    --aw-color-headline-light: var(--aw-color-text-heading);
    --aw-color-headline-dark: ${rgb(c.white)};
    --aw-color-headline-subtitle-light: var(--aw-color-text-muted);
    --aw-color-headline-subtitle-dark: ${rgb(c.white, 0.7)};

    --aw-color-timeline-icon-light: ${rgb(c.white)};
    --aw-color-timeline-icon-border-light: transparent;
    --aw-color-timeline-icon-bg-light: ${rgb(c.accent)};
    --aw-color-timeline-step-light: var(--aw-color-text-muted);
    --aw-color-timeline-title-light: var(--aw-color-text-heading);
    --aw-color-timeline-desc-light: var(--aw-color-text-muted);

    --aw-color-timeline-icon-dark: ${rgb(c.white)};
    --aw-color-timeline-icon-border-dark: transparent;
    --aw-color-timeline-icon-bg-dark: ${rgb(c.accent)};
    --aw-color-timeline-title-dark: ${rgb(c.white)};
    --aw-color-timeline-desc-dark: ${rgb(c.white, 0.65)};

    --aw-color-testimonial-card-bg-light: ${rgb(c.white)};
    --aw-color-testimonial-card-border-light: ${rgb(c.silver200)};
    --aw-color-testimonial-text-light: var(--aw-color-text-muted);
    --aw-color-testimonial-name-light: var(--aw-color-text-heading);
    --aw-color-testimonial-job-light: var(--aw-color-text-muted);
    --aw-color-testimonial-hr-light: ${rgb(c.silver200)};

    --aw-color-testimonial-card-bg-dark: ${rgb(c.white, 0.06)};
    --aw-color-testimonial-card-border-dark: ${rgb(c.white, 0.12)};
    --aw-color-testimonial-text-dark: ${rgb(c.white, 0.7)};
    --aw-color-testimonial-name-dark: ${rgb(c.white)};
    --aw-color-testimonial-job-dark: ${rgb(c.white, 0.5)};
    --aw-color-testimonial-hr-dark: ${rgb(c.white, 0.1)};

    --aw-color-faq-border-light: ${rgb(c.silver200)};
    --aw-color-faq-question-light: var(--aw-color-text-heading);
    --aw-color-faq-answer-light: var(--aw-color-text-muted);
    --aw-color-faq-toggle-border-light: ${rgb(c.silver200)};
    --aw-color-faq-toggle-text-light: ${rgb(c.slate)};
    --aw-color-faq-toggle-active-light: var(--aw-color-accent);

    --aw-color-faq-border-dark: ${rgb(c.white, 0.15)};
    --aw-color-faq-question-dark: ${rgb(c.white)};
    --aw-color-faq-answer-dark: ${rgb(c.white, 0.7)};
    --aw-color-faq-toggle-border-dark: ${rgb(c.white, 0.25)};
    --aw-color-faq-toggle-text-dark: ${rgb(c.white, 0.5)};
    --aw-color-faq-toggle-active-dark: ${rgb(c.sky)};

    --aw-color-projects-card-bg-light: ${rgb(c.white)};
    --aw-color-projects-card-border-light: ${rgb(c.silver200)};
    --aw-color-projects-title-light: var(--aw-color-text-heading);
    --aw-color-projects-desc-light: var(--aw-color-text-muted);

    --aw-color-projects-card-bg-dark: ${rgb(c.cardDark)};
    --aw-color-projects-card-border-dark: ${rgb(c.accent, 0.4)};
    --aw-color-projects-title-dark: ${rgb(c.white)};
    --aw-color-projects-desc-dark: ${rgb(c.white, 0.65)};

    --aw-color-bg-page-dark: ${rgb(c.navy)};
    --aw-color-bg-footer: ${rgb(c.footerBg)};


    --aw-shadow-card: 0 4px 24px rgb(8 41 108 / 8%), 0 1px 4px rgb(8 41 108 / 6%);
    --aw-shadow-header: 0 1px 0 ${rgb(c.silver200)};
    --aw-border-card: ${rgb(c.silver200)};

    /* Layout — <MaxWidthContainer> / .site-frame / .max-w-container all read these */
    --aw-layout-max-width: ${b.layout.maxWidth};
    --aw-layout-padding-x: ${b.layout.paddingX};
    --aw-layout-padding-x-mobile: ${b.layout.paddingXMobile};

    /* Figma radius tokens — node 153:1678 */
    --aw-radius: ${r.base};
    --aw-radius-xs: ${r.xs};
    --aw-radius-sm: ${r.sm};
    --aw-radius-md: ${r.md};
    --aw-radius-lg: ${r.lg};
    --aw-radius-xl: ${r.xl};
    --aw-radius-hero: ${r.hero};
    --aw-radius-full: ${r.full};

    /* Figma radius tokens — Figma-exact CSS var names (dev mode copy-paste) */
    --radius-xs: ${r.xs};
    --radius-sm: ${r.sm};
    --radius-md: ${r.md};
    --radius-full: ${r.full};

    /* Figma shadow/elevation tokens — node 153:1678 */
    --shadow-soft: ${b.shadows.soft};
    --shadow-sticky-header: ${b.shadows.stickyHeader};
    --shadow-card-hover: ${b.shadows.cardHover};
    --shadow-focus-ring: ${b.shadows.focusRing};

    /* ── Gradients — Figma node 152:634 "Gradients & Bands" ──────────── */
    /* Brand (Blue → Navy): buttons · eyebrow rule · CTA surfaces         */
    --gradient-brand: linear-gradient(90deg, #047bc1 0%, #08296c 100%);
    --gradient-brand-vertical: linear-gradient(180deg, #047bc1 0%, #08296c 100%);
    /* Final CTA surface — Figma 136:589 diagonal Blue → Navy */
    --gradient-cta-diagonal: linear-gradient(146.48deg, #047bc1 7.14%, #08296c 78.57%);

    /* Band · Blue  — 10px section divider, below hero & above footer     */
    --gradient-band-blue: linear-gradient(90deg, rgb(58,155,224) 0%, rgb(4,123,193) 35%, rgb(11,79,158) 70%, rgb(8,41,108) 100%);

    /* Band · Silver — 10px section divider, below services & above CTA  */
    --gradient-band-silver: linear-gradient(90deg, rgb(238,240,242) 0%, rgb(174,183,191) 22%, rgb(248,249,250) 48%, rgb(154,165,175) 74%, rgb(227,231,234) 100%);

    /* Hero · Fade left — dark navy left-side fade over photography       */
    --gradient-hero-fade-left: linear-gradient(90deg, rgba(8,41,108,0.97) 0%, rgba(8,41,108,0.88) 30%, rgba(10,63,140,0.4) 55%, rgba(4,123,193,0.05) 80%, rgba(4,123,193,0) 100%);

    /* Hero · Fade bottom — navy vignette rising from the bottom          */
    --gradient-hero-fade-bottom: linear-gradient(180deg, rgba(8,41,108,0) 0%, rgba(8,41,108,0.7) 100%);

    /* Hero · Fade top — light navy shadow pressing down from the top     */
    --gradient-hero-fade-top: linear-gradient(180deg, rgba(8,41,108,0.55) 0%, rgba(8,41,108,0) 100%);

    /* Hero · Fade mobile — Figma 140:63, photo (top 470px) melts into navy */
    --gradient-hero-fade-mobile: linear-gradient(180deg, rgba(8,41,108,0.45) 0%, rgba(11,79,158,0.25) 30%, rgba(8,41,108,0.85) 68%, rgb(8,41,108) 100%);

    /* Hero · Headline — sky-blue gradient for the bold span in the H1   */
    --gradient-hero-headline: linear-gradient(90deg, #9fd6fb 0%, #5bb2ec 100%);

    ${semanticColorVars(c)}
  `.trim();
}

function darkVars(b: Brand): string {
  const { colors: c, fonts: f } = b;
  const accent = rgb(c.accent);

  return `
    --aw-font-sans: var(${f.body.cssVariable});
    --aw-font-serif: var(${f.heading.cssVariable});
    --aw-font-heading: var(${f.heading.cssVariable});
    --aw-font-script: var(${f.body.cssVariable});
    --aw-font-rough: var(${f.heading.cssVariable});

    --aw-color-primary: ${accent};
    --aw-color-secondary: ${rgb(c.accentHover)};
    --aw-color-accent: ${accent};
    --aw-color-accent-hover: ${rgb(c.accentHover)};

    --aw-color-text-heading: rgb(247 250 252);
    --aw-color-text-default: rgb(226 232 240);
    --aw-color-text-muted: ${rgb(c.slate)};
    --aw-color-text-page: ${rgb(c.page)};
    --aw-color-bg-page: ${rgb(c.navy)};
    --aw-color-bg-page-end: ${rgb(c.navy)};
    --aw-color-bg-section-white: ${rgb(c.navy)};
    --aw-color-bg-section-grey: ${rgb(c.cardDark)};
    --aw-color-bg-section-dark: ${rgb(c.navyPressed)};
    --aw-color-bg-card-dark: ${rgb(c.cardDark)};
    --aw-color-bg-card-light: ${rgb(c.heroTint)};
    --aw-color-bg-cta: ${rgb(c.ctaBg)};

    --aw-color-card-heading-dark: ${rgb(c.white)};
    --aw-color-card-body-dark: ${rgb(c.white, 0.7)};
    --aw-color-card-link-dark: ${rgb(c.sky)};

    --aw-color-card-heading-light: rgb(247 250 252);
    --aw-color-card-body-light: ${rgb(c.slate)};
    --aw-color-card-link-light: var(--aw-color-accent);

    --aw-color-card-border-dark: ${rgb(c.accent, 0.4)};
    --aw-color-card-border-light: ${rgb(c.accent, 0.3)};

    ${ctaButtonVars(c)}
    --aw-color-btn-link: ${rgb(c.sky)};
    --aw-color-btn-link-hover: ${rgb(c.blueLight)};

  `.trim();
}

/** Full stylesheet injected by CustomStyles.astro. */
export function brandStylesheet(b: Brand = brand): string {
  const accent = rgb(b.colors.accent, 0.2);
  return `:root {
  ${rootVars(b)}

  ::selection {
    background-color: ${accent};
  }
}

.dark {
  ${darkVars(b)}

  ::selection {
    background-color: ${accent};
    color: snow;
  }
}`;
}

/** Astro Fonts API entries — consumed by astro.config.ts. */
export function brandFontConfig() {
  const { heading, body } = brand.fonts;

  const toEntry = (font: typeof heading | typeof body) => ({
    name: font.name,
    cssVariable: font.cssVariable,
    provider: font.provider,
    weights: font.weights,
    styles: font.styles,
    subsets: font.subsets,
    fallbacks: font.fallbacks,
    preload: true,
    // Passed through to fontProviders.local() — contains `options.variants`
    // when provider is 'local'. Ignored when provider is 'google'.
    options: 'options' in font ? font.options : undefined,
  });

  return [toEntry(heading), toEntry(body)];
}
