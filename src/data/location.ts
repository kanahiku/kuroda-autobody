/**
 * Location page (/location/) — the shape of the Sanity `locationPage` document AND its built-in fallback.
 *
 * `locationFallback` is the ONLY copy of this page's text kept in code. The site renders Sanity's values
 * field by field and falls back to these when a field is empty or Sanity is unreachable
 * (see `src/lib/content/location.ts`). `scripts/seed-pages.mjs` also reads it to fill the Studio once.
 *
 * Headings are two plain fields: `headingLead` (normal weight) + `headingAccent` (accent style, set by the
 * widget). Any text may use `{phone}`, `{fax}`, `{cityLine}`, `{landmark}` (and `{phoneHref}` in links) — they are filled in from
 * site config so those details stay defined in one place. Photos stay grey placeholders; only the hero
 * photo's alt text is edited in Sanity for now.
 */
import type { BrandIconName } from '../components/ui/BrandIcon.astro';

/** Where a facts-row value links to. */
export type RowLink = 'none' | 'directions' | 'phone';

export interface LocationContent {
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    body: string;
    imageAlt: string;
  };
  details: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    rows: { label: string; value: string; note?: string; link: RowLink }[];
  };
  map: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    mapTitle: string;
    caption: string;
    lead: string;
    directions: { title: string; description: string }[];
    ctaText: string;
  };
  features: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    lead: string;
    items: { icon: BrandIconName; title: string; description: string }[];
  };
  communities: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    lead: string;
    items: { label: string }[];
  };
  faqs: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    headingLead: string;
    headingAccent: string;
    description: string;
    ctaOne: { text: string; href: string };
    ctaTwo: { text: string; href: string };
  };
}

export const locationFallback: LocationContent = {
  seo: {
    title: 'Auto Body Shop in Waipahu & Waipio | Kuroda Autobody',
    description:
      'Visit Kuroda Autobody in Gentry Waipio Business Park, Waipahu. Serving Oahu with collision repair, on-site rental pickup, and easy freeway access.',
  },

  hero: {
    eyebrow: 'Location & directions',
    headingLead: 'Kuroda Autobody Location & Directions',
    headingAccent: 'in Waipahu',
    body: 'Kuroda Autobody operates out of a 28,000-square-foot facility in the Gentry Waipio Business Park, providing collision repair and insurance coordination for drivers across Oahu.',
    imageAlt: 'Kuroda Autobody shop, Gentry Waipio Business Park',
  },

  details: {
    eyebrow: 'Gentry Waipio Business Park',
    headingLead: 'Shop Location',
    headingAccent: 'and Hours',
    rows: [
      { label: 'Shop address', value: '94-518 Puahi Street, {cityLine}', link: 'directions' },
      { label: 'Business park', value: '{landmark}', link: 'none' },
      { label: 'Phone', value: '{phone}', link: 'phone' },
      { label: 'Fax', value: '{fax}', link: 'none' },
      {
        label: 'Hours',
        value: 'Monday through Friday, 7:00 AM to 5:00 PM',
        note: 'Closed Saturday and Sunday. Estimates are by appointment.',
        link: 'none',
      },
    ],
  },

  map: {
    eyebrow: 'Easy freeway access',
    headingLead: 'Map and',
    headingAccent: 'Driving Directions',
    mapTitle: 'Map of Kuroda Autobody, 94-518 Puahi Street, {cityLine}',
    caption: 'Kuroda Autobody, 94-518 Puahi Street, {cityLine}.',
    lead: 'Our Waipahu location offers easy access for drivers traveling from throughout Central and West Oahu:',
    directions: [
      {
        title: 'From the H-1 Freeway',
        description:
          'Take the exit toward Waikele/Waipahu, transition toward the Gentry Waipio Business Park area, and turn onto Puahi Street.',
      },
      {
        title: 'From the H-2 Freeway',
        description:
          'Head toward the Waipio/Mililani interchange, connect down toward the business park, and locate our facility on Puahi Street.',
      },
    ],
    ctaText: 'GET DIRECTIONS',
  },

  features: {
    eyebrow: 'On-site rentals',
    headingLead: 'Vehicle Drop-Off, Parking,',
    headingAccent: 'and On-Site Rentals',
    lead: 'Arriving at our shop for your estimate or repair is structured for efficiency:',
    items: [
      {
        icon: 'shield',
        title: 'Secure Parking',
        description: 'Pull directly into our designated customer parking area upon arrival.',
      },
      {
        icon: 'rental',
        title: 'On-Site Rentals',
        description:
          'Rental vehicles are parked right on our lot. If you need temporary transportation while your car is in the shop, we coordinate on-site pickup so you can transition smoothly without extra travel.',
      },
    ],
  },

  communities: {
    eyebrow: 'Serving Oahu',
    headingLead: 'Communities We Serve',
    headingAccent: 'Across Oahu',
    lead: 'While our shop is anchored in Waipahu, we serve drivers throughout the island, including:',
    items: [
      { label: 'Waipahu' },
      { label: 'Waipio' },
      { label: 'Waikele' },
      { label: 'Aiea' },
      { label: 'Pearl City' },
      { label: 'Mililani' },
      { label: 'Koa Ridge' },
      { label: 'Central and West Oahu' },
    ],
  },

  faqs: {
    eyebrow: 'Location FAQ',
    headingLead: 'Frequently Asked Questions',
    headingAccent: 'About Our Location',
    items: [
      {
        question: 'Where is Kuroda Autobody located?',
        answer: 'We are located at 94-518 Puahi Street in the Gentry Waipio Business Park, {cityLine}.',
      },
      {
        question: 'Do I need an appointment to visit the shop?',
        answer:
          'Yes. Estimates and vehicle inspections are handled by appointment so our team can dedicate proper time to your vehicle.',
      },
      {
        question: 'Can I pick up a rental car directly at your shop?',
        answer:
          'Yes. Rental vehicles are parked right on our lot, allowing for convenient on-site pickup and drop-off during your repair.',
      },
      {
        question: 'What are your business hours?',
        answer: 'We are open Monday through Friday from 7:00 AM to 5:00 PM, and closed on Saturday and Sunday.',
      },
      {
        question: 'How do I contact the shop?',
        answer: 'You can reach our team by phone at {phone} or by fax at {fax}.',
      },
    ],
  },

  // Same wording as the sitewide closing-CTA defaults in src/config/cta.ts.
  cta: {
    headingLead: 'Plan Your',
    headingAccent: 'Visit',
    description:
      'Get expert guidance and reliable collision repair from a family-owned shop rooted in Hawaii since 1938.',
    ctaOne: { text: 'SCHEDULE AN ESTIMATE', href: '/contact/' },
    ctaTwo: { text: 'CALL {phone}', href: '{phoneHref}' },
  },
};
