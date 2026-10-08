/**
 * Online Estimate page (/online-estimate/) — copy from `new-pages/_online-estimate_.docx`.
 * Composed in src/pages/online-estimate/index.astro from shared widgets (PageHero, FeatureColumns, ActionBand).
 * The two Carwise button links live in `CARWISE` (src/config/contact.ts); the phone line comes from `CONTACT`.
 */
import type { FeatureItem } from '~/data/contentPage';

export const onlineEstimate = {
  seo: {
    title: 'Get an Online Estimate or Book an Appointment | Kuroda Autobody',
    description:
      'Start your collision repair estimate online with Kuroda Autobody in Waipahu. Submit photos for a quick review or schedule an in-person appointment.',
  },

  hero: {
    eyebrow: 'Online estimate',
    titleLead: 'Get Your Estimate ',
    titleAccent: 'or Book an Appointment',
    body: 'Whether you prefer a quick photo evaluation online or a comprehensive assessment at our Waipahu shop, starting your repair with Kuroda Autobody is fast and straightforward. Choose the option that fits your needs:',
    photoLabel: 'Kuroda Autobody estimator reviewing a vehicle in Waipahu',
  },

  options: {
    eyebrow: 'Two ways to start',
    headingLead: 'Choose the Option ',
    headingStrong: 'That Fits Your Needs',
    items: [
      {
        icon: 'camera',
        title: 'Submit Photos for an Online Estimate',
        description:
          'If your vehicle is still safely drivable and you want a preliminary assessment without visiting the shop immediately, use our Carwise photo submission tool. Upload clear pictures of the damage from your phone, and our estimating team will review the external scope to outline expected next steps.',
      },
      {
        icon: 'walk-around',
        title: 'Book an In-Person Appointment',
        description:
          'For a thorough, hands-on evaluation—especially after a significant collision—schedule an in-person appointment at our 28,000-square-foot Waipahu facility. Our team will perform a physical inspection to catch hidden damage and coordinate your claim details.',
      },
    ] satisfies FeatureItem[],
  },

  visit: {
    eyebrow: 'In-person appointment',
    headingLead: 'During Your ',
    headingStrong: 'In-Person Visit',
    items: [
      {
        icon: 'rental',
        title: 'On-Site Rental Coordination',
        description: 'Pick up your Enterprise rental car directly on our lot during your visit.',
      },
      {
        icon: 'claims',
        title: 'Insurance Assistance',
        description: 'We manage estimates, approvals, and supplemental paperwork directly with your provider.',
      },
    ] satisfies FeatureItem[],
  },

  launch: {
    eyebrow: 'Launch your request',
    headingLead: 'Launch Your ',
    headingStrong: 'Request',
    body: 'Select your preferred option below through our secure Carwise portal:',
    photoCtaText: 'Submit Photos Online via Carwise',
    appointmentCtaText: 'Schedule In-Person Appointment',
    /** Closing line; the phone number is rendered as a link after it. */
    callLead: 'Questions about your claim? Call ',
    callTrail: ' for direct assistance.',
  },
};
