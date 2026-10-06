/**
 * Legal pages — copy only. Rendered by `LegalPageView`; route files are 3 lines.
 * Business name, host, phone and email come from `src/config/*`, never hardcoded here.
 * Have counsel review before launch.
 */
import { site } from '~/config/site';

const host = new URL(site.url).host;

export interface LegalSection {
  heading?: string;
  body: string;
  /** Append "Call {phone}" (and "or email {email}" when set) after the body. */
  showContact?: boolean;
}

export interface LegalPage {
  path: string;
  seoTitle: string;
  metaDescription: string;
  /** H1 split into a light lead and a gradient accent. */
  titleLead: string;
  titleAccent: string;
  sections: LegalSection[];
  cta: { title: string; titleStrong: string };
}

export const legalPages: LegalPage[] = [
  {
    path: '/privacy-policy/',
    seoTitle: `Privacy Policy | ${site.name}`,
    metaDescription: `Learn how ${site.name} collects and protects your personal information on our website.`,
    titleLead: 'Privacy ',
    titleAccent: 'Policy',
    sections: [
      {
        body: `${site.name} respects your privacy. This policy outlines how we handle the information collected through ${host}.`,
      },
      {
        heading: 'Information Collection',
        body: 'We collect personal data when you submit an estimate request or contact our team directly. This information includes your name, phone number, email address and details about your vehicle. Our website also collects basic browsing analytics to monitor site performance.',
      },
      {
        heading: 'Data Usage',
        body: 'We use your submitted information to review your repair request and schedule your estimate. We do not sell your personal data to marketing agencies or third parties.',
      },
      {
        heading: 'Contact Us',
        body: 'For questions regarding your data or to request record removal, contact us directly.',
        showContact: true,
      },
    ],
    cta: { title: 'Questions About ', titleStrong: 'Your Data?' },
  },
  {
    path: '/terms/',
    seoTitle: `Terms of Use | ${site.name}`,
    metaDescription: `Read the website terms of use for ${site.name}.`,
    titleLead: 'Terms of ',
    titleAccent: 'Use',
    sections: [
      {
        body: `These terms govern your access to ${host}. By browsing this website, you agree to these operational conditions.`,
      },
      {
        heading: 'Website Content',
        body: `All text, photography and branding on this site belong to ${site.name}. Unauthorized reproduction is strictly prohibited.`,
      },
      {
        heading: 'Service Estimates and Agreements',
        body: 'Online estimate requests do not constitute binding contracts. Repair scope, timelines and pricing are confirmed in writing following an in-person vehicle inspection.',
      },
      {
        heading: 'Liability',
        body: `${site.name} provides website information for general reference. We are not liable for decisions made based solely on web content prior to an in-person vehicle inspection.`,
      },
    ],
    cta: { title: 'Ready to ', titleStrong: 'Get Started?' },
  },
  {
    path: '/accessibility/',
    seoTitle: `Accessibility Statement | ${site.name}`,
    metaDescription: `${site.name} is committed to ensuring digital accessibility for all website visitors.`,
    titleLead: 'Accessibility ',
    titleAccent: 'Statement',
    sections: [
      {
        body: `${site.name} is committed to digital accessibility. We are working toward conformance with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA on ${host}.`,
      },
      {
        heading: 'Ongoing Improvements',
        body: 'The site is built with semantic headings, keyboard navigation, alt text on images and color contrast in mind. We review pages as they are added, and we fix issues as they are reported to us.',
      },
      {
        heading: 'Feedback and Assistance',
        body: 'If you encounter any barriers while using our website or require assistance reading our service information, contact us directly.',
        showContact: true,
      },
    ],
    cta: { title: 'Need Help ', titleStrong: 'Accessing Our Site?' },
  },
];

export function getLegalPage(path: string): LegalPage {
  const page = legalPages.find((item) => item.path === path);
  if (!page) throw new Error(`No legal page defined for "${path}".`);
  return page;
}
