/** Shown under every primary conversion CTA sitewide. Empty hides the note. */
export const PRIMARY_CTA_NOTE = '';

/** Primary conversion button label + destination sitewide. */
export const PRIMARY_CTA_LABEL = 'GET A FREE ESTIMATE';
export const PRIMARY_CTA_HREF = '/contact/';

/** Interior-page hero + closing CTA band — label of the primary button. */
export const SCHEDULE_CTA_LABEL = 'SCHEDULE AN ESTIMATE';

/**
 * Every “Schedule an Estimate” button, sitewide. Carwise’s shop page, opened in a new tab.
 * The label match is what the widgets key off, so a Sanity document that still points the
 * button at /contact/ still lands here.
 */
export const SCHEDULE_CTA_HREF = 'https://www.carwise.com/auto-body-shops/kuroda-auto-body-waipahu-hi-96797/505458';

/** True only for that button label, any casing. */
export const isScheduleEstimateCta = (text: unknown): text is string =>
  typeof text === 'string' && text.replace(/\s+/g, ' ').trim().toLowerCase() === 'schedule an estimate';

/** Default subtitle of the closing CTA band on interior pages. */
export const CLOSING_CTA_SUBTITLE =
  'Get expert guidance and reliable collision repair from a family-owned shop rooted in Hawaiʻi since 1938.';

export const LOCATION_CTA_LABEL = 'VIEW ALL SERVICES';
export const LOCATION_CTA_HREF = '/collision-repair/';

export const CATERING_CTA_LABEL = 'GET A FREE ESTIMATE';
export const CATERING_CTA_HREF = '/contact/';

/** Footer / CTA Banner conversion section. */
export const FOOTER_CTA_EYEBROW = 'Get Started';
export const FOOTER_CTA_TITLE = 'GET YOUR VEHICLE BACK TO PERFECT';
export const FOOTER_CTA_BODY =
  'Contact Kuroda Autobody for expert collision repair, paint, and auto body services. We make the process simple and stress-free.';
export const FOOTER_CTA_LABEL = 'GET A FREE ESTIMATE';
export const FOOTER_CTA_HREF = '/contact/';
