/**
 * Homepage copy (/) — the shape of the Sanity `homePage` document AND its built-in fallback.
 *
 * `homeFallback` is the ONLY copy of the homepage text kept in code. The site renders
 * Sanity's values field by field and falls back to these when a field is empty or Sanity is
 * unreachable (see `src/lib/content/home.ts`). `scripts/seed-pages.mjs` also reads it to fill the
 * Studio the first time, so there is never a second copy to keep in sync.
 *
 * Headings are two plain fields: `headingLead` (normal weight) + `headingAccent` (brand accent /
 * gradient, styled by the widget). Do not add trailing spaces — the loader handles spacing.
 * Photos are not in this file: each section's `image` is uploaded in Sanity and attached by
 * `getHomeContent()`; the alt text (`imageAlt`) is edited next to it. No upload → grey placeholder.
 */

export type HeroTrustIcon = 'icar' | 'target' | 'shield' | 'home';
export type ServiceIcon = 'collision' | 'calibration' | 'paint' | 'alignment' | 'claims' | 'rental';
export type WhyIcon = 'shield' | 'clock' | 'chat' | 'check';
export type ProofIcon = 'document' | 'camera' | 'walk-around';
export type CredentialLogo = 'icar-gold-class' | 'honda' | 'acura' | 'nissan' | 'gm' | 'fca';

/** A photo uploaded in Sanity (`<section>.image`); absent → the page shows a grey placeholder. */
export interface HomePhoto {
  src: string;
  alt: string;
}

export interface HomeContent {
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    tagline: string;
    body: string;
    primaryCtaText: string;
    /** Phone number is appended from site config: "CALL KURODA (808) …". */
    callLabel: string;
    imageAlt: string;
    image?: HomePhoto;
    trustItems: { icon: HeroTrustIcon; text: string }[];
  };
  services: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    caption: string;
    figLabel: string;
    imageAlt: string;
    image?: HomePhoto;
    items: { title: string; description: string; icon: ServiceIcon }[];
  };
  why: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    caption: string;
    imageAlt: string;
    image?: HomePhoto;
    items: { title: string; description: string; icon: WhyIcon }[];
  };
  beforeAfter: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    body: string;
    beforeLabel: string;
    afterLabel: string;
    beforeAlt: string;
    afterAlt: string;
    beforeImage?: HomePhoto;
    afterImage?: HomePhoto;
    points: { title: string; description: string; icon: ProofIcon }[];
  };
  heritage: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    body: string;
    quote: string;
    quoteAttribution: string;
    caption: string;
    imageAlt: string;
    image?: HomePhoto;
    stats: { value: string; label: string }[];
  };
  protection: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    lead: string;
    note: string;
    /** Numerals (01, 02, …) are generated from the order. */
    steps: { title: string; description: string }[];
  };
  reviews: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    note: string;
    /** Replaced by the three featured Sanity testimonials when available. */
    items: { platform: string; count?: string; quote: string; source?: string }[];
  };
  credentials: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    lede: string;
    linkText: string;
    items: { name: string; descriptor: string; logo: CredentialLogo }[];
  };
  cta: {
    eyebrow: string;
    eyebrowMobile: string;
    headingLead: string;
    headingAccent: string;
    description: string;
    ctaOne: { text: string; href: string };
    /** `{phone}` / `{phoneHref}` are filled in from site config. */
    ctaTwo: { text: string; href: string };
    hours: string;
    imageAlt: string;
    image?: HomePhoto;
  };
}

export const homeFallback: HomeContent = {
  seo: {
    title: 'Kuroda Autobody | Collision Repair · Waipahu, Oʻahu',
    description:
      'Family-owned collision repair in Waipahu since 1938. I-CAR Gold Class certified, OEM calibration, Limited Lifetime Warranty. Schedule your estimate today.',
  },

  hero: {
    eyebrow: 'COLLISION REPAIR · WAIPAHU',
    headingLead: 'Accidents are hard enough.',
    headingAccent: 'Repairs shouldn’t be.',
    tagline: 'DO IT RIGHT. TREAT PEOPLE RIGHT.',
    body: 'Expert collision repair in Waipahu since 1938, backed by a Limited Lifetime Warranty.',
    primaryCtaText: 'SCHEDULE AN ESTIMATE',
    callLabel: 'CALL KURODA',
    imageAlt: 'Kuroda Autobody collision repair shop in Waipahu',
    trustItems: [
      { icon: 'icar', text: 'I-CAR Gold Class' },
      { icon: 'target', text: 'OEM certified calibration' },
      { icon: 'shield', text: 'Limited Lifetime Warranty' },
      { icon: 'home', text: 'Family-owned since 1938' },
    ],
  },

  services: {
    eyebrow: 'Our services',
    headingLead: 'Auto body & collision',
    headingAccent: 'services on Oʻahu.',
    caption: 'Precision check — paint booth inspection.',
    figLabel: 'FIG. 01',
    imageAlt: 'Precision check — paint booth inspection.',
    items: [
      { title: 'Collision repair', description: 'Structural, panel and frame repair.', icon: 'collision' },
      { title: 'OEM calibration', description: 'Factory-standard ADAS calibration.', icon: 'calibration' },
      { title: 'Paint & refinishing', description: 'Computer-matched OEM finishes.', icon: 'paint' },
      { title: 'Unibody alignment', description: 'Precise measuring and alignment.', icon: 'alignment' },
      { title: 'Insurance claims', description: 'We work with all carriers.', icon: 'claims' },
      { title: 'Rental coordination', description: 'On-site Enterprise rentals.', icon: 'rental' },
    ],
  },

  why: {
    eyebrow: 'Why drivers choose Kuroda',
    headingLead: 'Less stress. Fewer questions.',
    headingAccent: "A car that's right again.",
    caption: 'Our Waipahu shop, Gentry Waipio Business Park.',
    imageAlt: 'Our Waipahu shop, Gentry Waipio Business Park.',
    items: [
      { title: 'Repaired right', description: 'Backed by a written Limited Lifetime Warranty.', icon: 'shield' },
      { title: 'Kept moving', description: 'Realistic timing and efficient repairs.', icon: 'clock' },
      { title: 'Personal service', description: 'Daily updates from your estimator.', icon: 'chat' },
      { title: 'Easy experience', description: 'Insurance, rentals and paperwork handled.', icon: 'check' },
    ],
  },

  beforeAfter: {
    eyebrow: 'The Kuroda difference',
    headingLead: "We don't just tell you it's repaired.",
    headingAccent: 'We show you.',
    body: 'Every repair ends with a walk-around — your work order, before/after photos and every question answered. Proof, not promises.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeAlt: 'Vehicle before repair',
    afterAlt: 'Vehicle after repair',
    points: [
      { title: 'Documented work', description: 'An annotated record of every repair.', icon: 'document' },
      { title: 'Before & after photos', description: 'HD photos reviewed with you at delivery.', icon: 'camera' },
      { title: 'A real walk-around', description: 'An unhurried handoff in natural light.', icon: 'walk-around' },
    ],
  },

  heritage: {
    eyebrow: 'A legacy beyond the business.',
    headingLead: 'Rooted in Hawaii.',
    headingAccent: '1938.',
    body: 'Founded as a small service station in Aiea, now run by the third and fourth generations of the Kuroda family in Waipahu.',
    quote: '“Do it right, treat people right, and treat every car as if our own family were driving it.”',
    quoteAttribution: '— The Kuroda family principle',
    caption: 'Our founding family service station in Aiea, 1938.',
    imageAlt: 'Our founding family service station in Aiea, 1938.',
    stats: [
      { value: '1938', label: 'Founded in Aiea' },
      { value: 'WAIPIO', label: 'Modern business park' },
      { value: '4TH GEN', label: 'Active leadership' },
    ],
  },

  protection: {
    eyebrow: 'Hawaii consumer protection',
    headingLead: 'Your car.',
    headingAccent: 'Your repair shop.',
    lead: 'Under Hawaii law, you have the absolute legal right to choose where your vehicle is repaired — even if your insurer suggests another shop.',
    note: 'Simply tell your adjuster you choose Kuroda.',
    steps: [
      { title: 'Request Kuroda', description: 'Tell your claims rep you choose Kuroda Auto Body.' },
      {
        title: 'We handle the adjuster',
        description: 'Estimates, photos and supplements, handled directly with your carrier.',
      },
      {
        title: 'Factory spec repairs',
        description: 'Returned to OEM specifications, backed by our Limited Lifetime Warranty.',
      },
    ],
  },

  reviews: {
    eyebrow: 'Honest feedback from local drivers',
    headingLead: 'What our',
    headingAccent: 'customers say.',
    note: 'Independent ratings from every verified platform.',
    items: [
      {
        platform: 'Google verified',
        count: '182 reviews',
        quote:
          '“Kuroda Auto Body made an unfortunate situation simple. Honest communication, spotless repair, and they guided me through everything.”',
        source: 'Independent Google score',
      },
      {
        platform: 'Yelp reviews',
        count: '180 reviews',
        quote:
          '“Third time our family has had work done here over 20 years. Always fair, professional, and the paint match is undetectable.”',
        source: 'Independent Yelp score',
      },
      {
        platform: 'Carwise verified',
        count: '5,416 reviews',
        quote:
          '“Over 5,000 verified post-repair customer surveys. Consistently praised for customer service, flawless finish, and walking through every detail.”',
        source: 'Verified insurance surveys',
      },
    ],
  },

  credentials: {
    eyebrow: 'Precision OEM specifications',
    headingLead: 'Certified for',
    headingAccent: 'your vehicle.',
    lede: 'Manufacturer-approved procedures, tooling and genuine parts.',
    linkText: 'View all certifications',
    items: [
      { name: 'I-CAR Gold Class', descriptor: 'Highest level of industry training', logo: 'icar-gold-class' },
      { name: 'Honda', descriptor: 'Genuine collision certified', logo: 'honda' },
      { name: 'Acura', descriptor: 'Precision collision care', logo: 'acura' },
      { name: 'Nissan', descriptor: 'Collision repair network', logo: 'nissan' },
      { name: 'General Motors', descriptor: 'Chevrolet, GMC, Cadillac', logo: 'gm' },
      { name: 'FCA US', descriptor: 'Chrysler, Jeep, Ram, Dodge', logo: 'fca' },
    ],
  },

  cta: {
    eyebrow: 'Estimates • Claims assistance • Lifetime warranty',
    eyebrowMobile: 'Estimates • Claims • Warranty',
    headingLead: 'Ready to get your car',
    headingAccent: 'repaired right?',
    description: 'Visit us at Gentry Waipio Business Park or call for an honest estimate.',
    ctaOne: { text: 'SCHEDULE AN ESTIMATE', href: '/contact/' },
    ctaTwo: { text: 'CALL KURODA: {phone}', href: '{phoneHref}' },
    hours: 'Monday – Friday: 7:00 AM – 5:00 PM',
    imageAlt: 'The Kuroda Autobody team',
  },
};
