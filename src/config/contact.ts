/**
 * Phone, email, address, and hours.
 * Business name comes from `src/config/site.ts` so it is not duplicated.
 */
import { site } from './site';

export const CONTACT = {
  /** Legal / display business name used in footer, legal pages, CTABanner. */
  businessName: site.name,

  /** Year the business was founded — shown in utility bar. */
  established: '1938',

  /** Short location label — shown in utility bar alongside the est. year. */
  locationShort: 'Waipahu, HI',

  /** Human-readable hours — shown in utility bar. */
  hoursDisplay: 'MON TO FRI, 7AM TO 5PM',

  /** Same hours spelled out — shown in the footer's "Visit Us" column. */
  hoursLine: 'Monday to Friday, 7am to 5pm',

  /** Contractor license shown in footer or legal copy (set null if none). */
  license: null,

  phone: {
    /** Human-readable label — used in nav, footer, CTABanner, CTA buttons. */
    display: '(808) 676-1941',
    /** HTML tel: href — used in all anchor href attributes. */
    href: 'tel:+18086761941',
    /** E.164 format — used in schema.org telephone field. */
    schema: '+18086761941',
  },

  fax: {
    display: '(808) 680-0200',
    href: 'tel:+18086800200',
  },

  /** Primary contact email shown in legal pages and schema.org. */
  email: '',

  address: {
    street: '94-518 Puahi St.',
    city: 'Waipahu',
    state: 'HI',
    zip: '96797',
    country: 'US',
    /** Business park / suite label — shown in utility bar address. */
    landmark: 'Gentry Waipiʻo Business Park',
    /** "City, ST ZIP" — used in footer and CTABanner one-liner. */
    get cityLine() {
      const zip = this.zip ? ` ${this.zip}` : '';
      return `${this.city}, ${this.state}${zip}`;
    },
    /** Full one-line address — used as Google Maps query string. */
    get oneLiner() {
      return [this.street, this.city, this.state, this.zip].filter(Boolean).join(', ');
    },
    /** Google Maps embed URL. */
    get mapsEmbedSrc() {
      return `https://maps.google.com/maps?q=${encodeURIComponent(this.oneLiner)}&z=16&output=embed`;
    },
    /** Google Maps directions URL. */
    get mapsDirectionsHref() {
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(this.oneLiner)}`;
    },
  },

  hours: [
    {
      '@type': 'OpeningHoursSpecification' as const,
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '17:00',
    },
  ],

  areaServed: 'Oʻahu, Hawaiʻi',
} as const;

/**
 * Careers page (/careers/) — where résumé applications are emailed, and the upload limits.
 * The server (src/pages/api/careers.ts) and the browser (src/scripts/careers-form.ts) both read these.
 */
export const CAREERS = {
  /** Every application is sent to all of these addresses. */
  recipients: ['cori@kurodaautobody.com', 'info@kurodaautobody.com'],
  /** Shown on the page as the "prefer email?" fallback. */
  publicEmail: 'info@kurodaautobody.com',
  /** Vercel Functions cap a request body at 4.5 MB, so the résumé limit stays under that. */
  maxResumeBytes: 4 * 1024 * 1024,
  /** Accepted résumé file extensions (PDF or Word). */
  resumeExtensions: ['pdf', 'doc', 'docx'],
} as const;

/**
 * Carwise portal links used by /online-estimate/. Leave empty until the client supplies them — the
 * buttons then fall back to the estimate form on /contact/.
 */
export const CARWISE = {
  /** Photo-based online estimate tool. */
  photoEstimateUrl: '',
  /** In-person appointment scheduler. */
  appointmentUrl: '',
};
