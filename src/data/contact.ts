/**
 * Contact page (/contact/) — the shape of the Sanity `contactPage` document AND its built-in fallback.
 *
 * `contactFallback` is the ONLY copy of this page's text kept in code. The site renders Sanity's values
 * field by field and falls back to these when a field is empty or Sanity is unreachable
 * (see `src/lib/content/contact.ts`). `scripts/seed-pages.mjs` also reads it to fill the Studio once.
 *
 * The estimate FORM itself (its fields, validation and where it posts) stays in code — only the heading
 * above it is editable. Headings are `headingLead` (normal weight) + `headingAccent` (accent style).
 * Any text may use `{phone}`, `{fax}`, `{cityLine}`, `{landmark}`, `{addressLine}` (and `{phoneHref}` in
 * links) — filled in from site config so those details stay defined in one place.
 */

/** Where a facts-row value links to. */
export type RowLink = 'none' | 'directions' | 'phone';

export interface ContactContent {
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    body: string;
    imageAlt: string;
  };
  /** Heading above the estimate form (the form's fields stay in code). */
  form: { headingLead: string; headingAccent: string };
  details: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    rows: { label: string; value: string; link: RowLink }[];
    /** Opens Google Maps directions. */
    ctaText: string;
    mapTitle: string;
  };
  /** Navy band under the map — its button scrolls back up to the estimate form. */
  band: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    body: string;
    ctaText: string;
  };
}

export const contactFallback: ContactContent = {
  seo: {
    title: 'Contact Kuroda Autobody | Collision Repair in Waipahu, Oʻahu',
    description:
      'Visit Kuroda Autobody in Gentry Waipio Business Park, Waipahu. Call {phone}, get directions, or request a collision repair estimate.',
  },

  hero: {
    eyebrow: 'Contact',
    headingLead: 'Auto Body & Collision Repair',
    headingAccent: 'in Waipio',
    body: 'Kuroda Auto Body is conveniently located in Gentry Waipio Business Park, just off the freeway and easily accessible from Aiea, Pearl City, Waipahu, Mililani and communities throughout Central and West Oahu.',
    imageAlt: 'Kuroda Auto Body, Gentry Waipio Business Park',
  },

  form: { headingLead: 'Request an', headingAccent: 'Estimate' },

  details: {
    eyebrow: 'Easy to find. Easy to get to.',
    headingLead: 'Location &',
    headingAccent: 'Directions',
    rows: [
      {
        label: 'Location',
        value: 'Kuroda Auto Body\nGentry Waipio Business Park\n94-518 Puahi Street\n{cityLine}',
        link: 'none',
      },
      { label: 'Monday–Friday', value: '7:00 AM–5:00 PM', link: 'none' },
      { label: 'Saturday–Sunday', value: 'Closed', link: 'none' },
      { label: 'Phone', value: '{phone}', link: 'phone' },
      { label: 'Fax', value: '{fax}', link: 'none' },
    ],
    ctaText: 'Get Directions',
    mapTitle: 'Map of Kuroda Auto Body, {addressLine}',
  },

  band: {
    eyebrow: 'Contact',
    headingLead: 'Have Questions',
    headingAccent: 'About a Repair?',
    body: 'Give us a call and our team will be happy to help. Ready to bring your vehicle in?',
    ctaText: 'Schedule an Estimate',
  },
};
