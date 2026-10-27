/**
 * Careers page (/careers/) — copy only. Rendered by src/pages/careers/index.astro.
 * Open positions are not here: they come from Sanity (`jobOpening` documents, see getJobOpenings()).
 * Phone and email come from `src/config/contact.ts`; the hero photo from the `pagePhotos` document.
 */
import { site } from '~/config/site';

export const careersCopy = {
  path: '/careers/',
  seo: {
    title: `Careers | ${site.name}`,
    description: `Join the ${site.name} team in Waipahu, Oʻahu. Send us your contact information and résumé — we review every application.`,
  },
  hero: {
    eyebrow: 'Careers',
    titleLead: 'Work ',
    titleAccent: 'With Us',
    body: `${site.name} is a family-owned collision repair shop in Waipahu, serving Oʻahu since 1938. We are always glad to hear from people who want to join our team. Send us your contact information and résumé below and we will review your application.`,
  },
  openings: {
    headingLead: 'Open ',
    headingStrong: 'Positions',
    applyLabel: 'Apply Now',
  },
  form: {
    heading: 'Apply Now',
    /** Option in the "Position" dropdown that is always present. */
    generalOption: 'General application',
    resumeHint: 'PDF or Word, up to 4MB.',
    submitLabel: 'Submit Application',
  },
  cta: { title: 'Questions About ', titleStrong: 'Working Here?' },
} as const;
