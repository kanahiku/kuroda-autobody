/**
 * Insurance Companies We Work With — hub (/had-an-accident/insurance-companies/) and its carrier pages
 * GEICO, State Farm, Progressive, USAA, Allstate (copy: Kuroda – Had An Accident Pages,
 * `_had-an-accident_insurance-companies_*.docx`). Rendered by `ContentPageView`.
 * Wording rule: Kuroda is independent — never a DRP / preferred / approved shop for any carrier.
 */
import type { ContentPage, FaqItem, FeatureItem } from '~/data/contentPage';

const EYEBROW = 'Had an Accident?';

type Four<T> = [T, T, T, T];

interface CarrierCopy {
  slug: string;
  name: string;
  /** "a" / "an" in the first FAQ question. */
  article: 'a' | 'an';
  seoTitle: string;
  metaDescription: string;
  /** Right-to-choose block: the carrier's network program, then the shared "never required" paragraph. */
  rightToChoose: string[];
  expectLead: string;
  expect: Four<{ title: string; description: string }>;
  /** First paragraph of the manufacturer-procedures block (second paragraph is shared). */
  manufacturerLead?: string;
  /** Heading of that block when it differs from "Why Manufacturer Procedures Matter". */
  manufacturerHeading?: { lead: string; accent: string };
  /** Warranty bullet when it differs from the standard wording. */
  warranty?: string;
  adjustmentsFaq: { title: string; description: string };
  /** Hero notice when it differs from the standard non-affiliation wording. */
  notice?: string;
  /** Overrides for the shared "Advantage" band / FAQ wording. */
  rental?: string;
  advantageLead?: string;
  choiceAnswer?: string;
  warrantyAnswer?: string;
  /** Order of the "Explore other providers" grid (unpublished pages are dropped automatically). */
  relatedSlugs?: string[];
  /** Full replacement of the manufacturer-procedures paragraphs / the FAQ list. */
  manufacturerParagraphs?: string[];
  faqs?: FaqItem[];
  /** Hero title lead when it is not "<name> Insurance Claims". */
  heroTitle?: string;
}

const MANUFACTURER_LEAD =
  "Initial insurance evaluations frequently omit critical manufacturer-specified operations, such as computerized 3D measuring, structural re-welding, or electronic sensor calibrations. Skipping these steps can compromise your vehicle's structural crashworthiness and safety systems.";
const MANUFACTURER_TAIL =
  'Our technicians work strictly from official factory repair guidelines, advocating for the exact procedures and parts your vehicle requires so the repair plan reflects what the manufacturer requires.';

const nonAffiliation = (who: string, work: string) =>
  `Non-Affiliation Notice: Kuroda Autobody is an independent, family-owned collision repair facility. We are not an official direct repair program (DRP) facility, preferred partner, or exclusive approved shop for ${who}. We ${work} to help process your claim, but we always work for you, not the insurance carrier.`;

const EXPECT_ICONS: Four<FeatureItem['icon']> = ['claims', 'collision', 'chat', 'check'];

const advantage = (warranty?: string, rental?: string): FeatureItem[] => [
  {
    icon: 'rental',
    title: 'On-Site Rental Support',
    description:
      rental ?? 'Eligible customers have access to on-site Enterprise rental car convenience right at our location.',
  },
  {
    icon: 'shield',
    title: 'Limited Lifetime Warranty',
    description:
      warranty ??
      'Qualifying metalwork and refinishing repairs are backed by our Limited Lifetime Warranty for as long as you own the vehicle.',
  },
  {
    icon: 'check',
    title: 'Detailed Handover Review',
    description:
      'Before delivery, we walk you through your completed repairs using an annotated work order and before-and-after photos.',
  },
];

function carrierPage(c: CarrierCopy, others: { name: string; path: string }[]): ContentPage {
  const { name } = c;
  const faqs: FaqItem[] = c.faqs ?? [
    {
      title: `Do I have to use ${c.article} ${name} network shop?`,
      description:
        c.choiceAnswer ?? 'No. Hawaiʻi law protects your right to select any independent repair shop of your choice.',
    },
    c.adjustmentsFaq,
    {
      title: 'Will my repairs be guaranteed?',
      description:
        c.warrantyAnswer ??
        'Yes. All qualifying repairs completed at Kuroda Autobody are backed by our written lifetime warranty.',
    },
  ];
  return {
    path: `/had-an-accident/insurance-companies/${c.slug}/`,
    seoTitle: c.seoTitle,
    metaDescription: c.metaDescription,
    eyebrow: EYEBROW,
    hero: {
      titleLead: c.heroTitle ?? `${name} Insurance Claims `,
      titleAccent: 'at Kuroda Autobody',
      body: c.notice ?? nonAffiliation(name, `work with ${name}`),
      photoLabel: `Kuroda Autobody team member reviewing a ${name} claim with a customer`,
    },
    sections: [
      {
        type: 'story',
        eyebrow: 'Your right to choose',
        headingLead: 'Your Right to Choose Kuroda Autobody ',
        headingAccent: `for Your ${name} Claim`,
        paragraphs: c.rightToChoose,
        photoLabel: 'Kuroda Autobody front desk in Waipahu',
      },
      {
        type: 'features',
        columns: 2,
        eyebrow: `${name} claims`,
        headingLead: 'What to Expect During ',
        headingStrong: `Your ${name} Claim Process`,
        lead: c.expectLead,
        items: c.expect.map((item, i) => ({ icon: EXPECT_ICONS[i], ...item })),
      },
      {
        type: 'story',
        eyebrow: 'Factory procedures',
        headingLead: c.manufacturerHeading?.lead ?? 'Why Manufacturer ',
        headingAccent: c.manufacturerHeading?.accent ?? 'Procedures Matter',
        paragraphs: c.manufacturerParagraphs ?? [c.manufacturerLead ?? MANUFACTURER_LEAD, MANUFACTURER_TAIL],
        photoLabel: 'Kuroda Autobody technician following factory repair procedures',
        isReversed: true,
      },
      {
        type: 'features',
        columns: 3,
        eyebrow: 'Why Kuroda',
        headingLead: 'The Kuroda Autobody ',
        headingStrong: 'Advantage',
        lead:
          c.advantageLead ??
          'Operating in Waipahu since 1938, our family-owned facility combines decades of local experience with modern technical capabilities:',
        items: advantage(c.warranty, c.rental),
      },
    ],
    faqs: {
      eyebrow: `${name} FAQ`,
      titleLead: 'Frequently Asked Questions ',
      titleStrong: `About ${name} Claims`,
      items: faqs,
    },
    related: {
      eyebrow: 'Insurance providers',
      headingLead: 'Explore Other ',
      headingStrong: 'Insurance Providers',
      paths: others.map((o) => o.path),
      viewAll: { label: 'View All Insurance Companies', href: HUB_PATH },
    },
    cta: { title: `Start Your ${name} Claim `, titleStrong: 'With Confidence' },
  };
}

const carriers: CarrierCopy[] = [
  // ─── GEICO ─────────────────────────────────────────────────────────────────
  {
    slug: 'geico',
    name: 'GEICO',
    article: 'a',
    rental:
      'Customers who need a rental car can arrange on-site pickup at our location. Rental coverage depends on your GEICO policy and applicable limits.',
    advantageLead:
      'Serving Hawaii since 1938, our family-owned business combines decades of local experience with modern technical capabilities at our Waipahu facility:',
    choiceAnswer: 'No. Hawaii law protects your right to select an independent repair shop of your choice.',
    warrantyAnswer:
      'Qualifying metalwork and refinishing repairs are backed by our Limited Lifetime Warranty for as long as you own the vehicle.',
    relatedSlugs: [
      'state-farm',
      'allstate',
      'liberty-mutual',
      'island-insurance',
      'first-insurance',
      'progressive',
      'usaa',
      'national-interstate',
      'aaa',
    ],
    seoTitle: 'GEICO Auto Insurance Claims & Repair | Kuroda Autobody Waipahu',
    metaDescription:
      'Processing your GEICO insurance claim at Kuroda Autobody in Waipahu. We handle digital estimates, supplements, and deductibles while protecting your right to independent shop choice.',
    rightToChoose: [
      "When filing a claim through GEICO’s digital app or phone representatives, policyholders may be directed toward their network of Auto Repair Xpress (ARX) shops. Your insurance company may recommend a repair facility or provide a list of shops, but you don't have to choose a body shop simply because it appears on that list to complete your repairs, regardless of insurer suggestions.",
      'You are never obligated to use a GEICO-recommended facility, and you generally do not need to collect multiple estimates before bringing your car to our Waipahu shop unless your insurer requires them.',
    ],
    expectLead:
      'GEICO claims frequently begin through their digital portal or mobile app via photo-based evaluation tools. We help bridge the gap between initial app estimates and complete, factory-compliant repairs:',
    expect: [
      {
        title: 'Digital Estimate Review',
        description:
          "If you have already completed GEICO's mobile photo submission or received an initial digital evaluation, bring that documentation with you. We review the initial figures against physical damage.",
      },
      {
        title: 'Shop-Side Teardown & Inspection',
        description:
          'Because digital app evaluations may not capture internal structural shifts, hidden damage, or electronic sensor misalignment, we inspect for additional damage during the repair process at our Waipahu facility.',
      },
      {
        title: 'Adjuster Supplement Submissions',
        description:
          'Once hidden requirements and OEM-mandated procedures are identified during disassembly, we submit itemized photo documentation and line-item supplement requests directly to your GEICO adjuster for review and approval.',
      },
      {
        title: 'Deductible Settlement',
        description:
          'Your policy deductible is generally paid directly to Kuroda Autobody upon completion of your repairs. Your insurer confirms the deductible and what your policy covers.',
      },
    ],
    manufacturerParagraphs: [
      "Initial insurance evaluations are often written from exterior photos before teardown and may omit critical manufacturer-specified operations, such as computerized 3D measuring, structural welding, or electronic sensor calibrations. Skipping required procedures can compromise your vehicle's structural crashworthiness and safety systems.",
      'Our technicians work from applicable factory repair guidelines, identifying the procedures and parts your vehicle requires so the repair plan reflects manufacturer requirements.',
    ],
    adjustmentsFaq: {
      title: 'How do supplements affect my GEICO claim timeline?',
      description:
        'When hidden damage is discovered during repairs, we submit a supplement to GEICO. Adjuster approval may affect the timeline, and we coordinate communication throughout the process.',
    },
  },

  // ─── State Farm ────────────────────────────────────────────────────────────
  {
    slug: 'state-farm',
    name: 'State Farm',
    article: 'a',
    notice:
      "Direct Repair Program (DRP) Partner: Kuroda Autobody is an independent, family-owned collision repair facility that participates in State Farm's Direct Repair Program. We work with State Farm to coordinate collision repair estimates, approvals, and supplemental damage documentation while keeping you informed throughout the repair process.",
    rental:
      'Rental car pickup is available on-site for customers who need temporary transportation during repairs. Rental coverage depends on your State Farm policy, and you can confirm any applicable limits with your insurer.',
    warranty:
      'Qualifying metalwork and refinishing repairs are backed by our Limited Lifetime Warranty for as long as you own the vehicle. Other repairs and parts may carry different warranty terms.',
    advantageLead:
      'Serving Hawaii since 1938, our family-owned business combines decades of local experience with modern technical capabilities at our Waipahu facility:',
    relatedSlugs: [
      'allstate',
      'liberty-mutual',
      'island-insurance',
      'first-insurance',
      'geico',
      'progressive',
      'usaa',
      'national-interstate',
      'aaa',
    ],
    seoTitle: 'State Farm Auto Insurance Claims & Repair | Kuroda Autobody Waipahu',
    metaDescription:
      'Kuroda Autobody in Waipahu is a State Farm DRP partner. Get help with collision repair estimates, insurance coordination, and claims.',
    rightToChoose: [
      'State Farm offers its Select Service program to help policyholders find collision repair facilities. Under Hawaii state regulations, you retain the right to choose the auto body shop you trust to repair your vehicle, regardless of network recommendations.',
      'You are not required to use a particular State Farm-recommended facility, and you generally do not need to collect multiple estimates before bringing your car to Kuroda Autobody unless your insurer requires them.',
    ],
    expectLead:
      'State Farm claims may involve adjuster evaluations, parts reviews, and repair approval procedures. As a participating DRP facility, we coordinate estimates and repair documentation with State Farm through the applicable program process:',
    expect: [
      {
        title: 'Claim File Initiation & Handover',
        description:
          'Provide us with your State Farm claim number upon arrival or during your initial estimate so our team can coordinate your repair information with your insurance representative.',
      },
      {
        title: 'Comprehensive Shop Assessment & Teardown',
        description:
          'Initial estimates may be based on visible damage. Once repairs begin, additional damage may be identified during disassembly. We document those findings along with any required manufacturer repair procedures.',
      },
      {
        title: 'Itemized Adjuster Submissions',
        description:
          "We prepare detailed repair documentation, including supplemental requests when additional accident-related damage is discovered, for State Farm's review and approval.",
      },
      {
        title: 'Deductible Settlement',
        description:
          'Your State Farm deductible is determined by your policy and confirmed by your insurer. If a deductible applies, it is generally paid to the repair shop. State Farm determines payment for covered repairs under your approved claim.',
      },
    ],
    manufacturerParagraphs: [
      'Initial insurance evaluations may not account for every manufacturer-specified operation, such as computerized 3D measuring, structural welding, or electronic sensor calibration. Depending on the damage and vehicle, these procedures may be necessary for a proper repair.',
      'Our technicians use vehicle-specific repair information and manufacturer procedures to determine the work needed. We document relevant repair requirements and coordinate with State Farm when additional approval is necessary.',
    ],
    adjustmentsFaq: {
      title: 'How are parts choices handled for State Farm claims?',
      description:
        "We advocate for repair procedures and components that align with strict manufacturer guidelines to maintain your vehicle's original safety standards.",
    },
  },

  // ─── Progressive ───────────────────────────────────────────────────────────
  {
    slug: 'progressive',
    name: 'Progressive',
    article: 'a',
    notice:
      'Non-Affiliation Notice: Kuroda Autobody is an independent, family-owned collision repair facility. We do not participate in a direct repair program (DRP) with Progressive. We work with Progressive to help process your claim, but we always work for you, not the insurance carrier.',
    rental:
      'Customers who need a rental car can arrange on-site pickup at our location. Rental coverage depends on your Progressive policy and applicable limits.',
    advantageLead:
      'Serving Hawaii since 1938, our family-owned business combines decades of local experience with modern technical capabilities at our Waipahu facility:',
    choiceAnswer:
      'No. You can choose an independent repair shop. Kuroda Autobody works with Progressive on claims outside its Direct Repair Program.',
    warrantyAnswer:
      'Qualifying metalwork and refinishing repairs are backed by our Limited Lifetime Warranty for as long as you own the vehicle.',
    relatedSlugs: [
      'state-farm',
      'allstate',
      'liberty-mutual',
      'island-insurance',
      'first-insurance',
      'geico',
      'usaa',
      'national-interstate',
    ],
    seoTitle: 'Progressive Auto Insurance Claims & Repair | Kuroda Autobody Waipahu',
    metaDescription:
      'Processing your Progressive insurance claim at Kuroda Autobody in Waipahu. We manage inspection coordination, photo documentation, and deductibles while protecting your right to independent shop choice.',
    rightToChoose: [
      "Progressive often encourages policyholders to utilize repair facilities participating in their Repair Network. Your insurance company may recommend a repair facility or provide a list of shops, but you don't have to choose a body shop simply because it appears on that list to complete your repairs, regardless of network promotions.",
      'You are never obligated to use a Progressive-recommended facility, and you generally do not need to collect multiple estimates before bringing your car to Kuroda Autobody unless your insurer requires them.',
    ],
    expectLead:
      'Progressive offers several ways to have vehicle damage assessed, including its mobile Photo Estimate option and repair shop inspections. We manage the communication and documentation workflow directly with your insurance representative:',
    expect: [
      {
        title: 'Claim File Setup & Intake',
        description:
          "Share your Progressive claim number with us when you drop off your vehicle or request an estimate, allowing us to link the claim to your vehicle's file.",
      },
      {
        title: 'Shop Disassembly & Photo Evidence',
        description:
          'Progressive initial estimates may be based on photographs or visible damage assessments. During repairs at our Waipahu facility, we inspect for additional damage and document any necessary manufacturer repair procedures.',
      },
      {
        title: 'Adjuster Supplement Submissions',
        description:
          'When additional damage or manufacturer-required repairs are identified, we provide supporting documentation and supplemental repair requests to Progressive for review and approval.',
      },
      {
        title: 'Deductible Settlement',
        description:
          'Your policy deductible is confirmed by Progressive. Payment arrangements and any remaining costs depend on your coverage and approved claim.',
      },
    ],
    adjustmentsFaq: {
      title: 'How are insurance adjustments handled for Progressive claims?',
      description:
        'We coordinate directly with your Progressive adjuster, providing documentation of additional damage and manufacturer repair requirements for review and approval.',
    },
  },

  // ─── USAA ──────────────────────────────────────────────────────────────────
  {
    slug: 'usaa',
    name: 'USAA',
    article: 'a',
    notice:
      'Non-Affiliation Notice: Kuroda Autobody is an independent, family-owned collision repair facility. We do not participate in a direct repair program (DRP) with USAA. We work with USAA to help process your claim, but we always work for you, not the insurance carrier.',
    rental:
      'Customers who need a rental car can arrange on-site pickup at our location. Rental coverage depends on your USAA policy and applicable limits.',
    advantageLead:
      'Serving Hawaii since 1938, our family-owned business combines decades of local experience with modern technical capabilities at our Waipahu facility:',
    choiceAnswer: 'No. Hawaii law protects your right to select an independent repair shop of your choice.',
    warrantyAnswer:
      'Qualifying metalwork and refinishing repairs are backed by our Limited Lifetime Warranty for as long as you own the vehicle.',
    relatedSlugs: [
      'state-farm',
      'allstate',
      'liberty-mutual',
      'island-insurance',
      'first-insurance',
      'geico',
      'progressive',
      'national-interstate',
      'aaa',
    ],
    seoTitle: 'USAA Auto Insurance Claims & Repair | Kuroda Autobody Waipahu',
    metaDescription:
      'Processing your USAA insurance claim at Kuroda Autobody in Waipahu. We manage military family claims coordination, estimate reviews, and deductibles while protecting your right to independent shop choice.',
    rightToChoose: [
      "When processing a claim through USAA, military members and families are sometimes guided toward shops in their preferred repair network. Your insurance company may recommend a repair facility or provide a list of shops, but you don't have to choose a body shop simply because it appears on that list to repair your vehicle, regardless of insurer routing.",
      'You are never required to use a USAA-recommended facility, and you generally do not need to collect multiple estimates before bringing your car to Kuroda Autobody unless your insurer requires them.',
    ],
    expectLead:
      'USAA claims often involve structured communication channels designed for military members and their families. We streamline the repair workflow directly with your assigned adjuster:',
    expect: [
      {
        title: 'Claim Logging & Intake',
        description:
          'Provide your USAA claim number when you schedule an estimate or drop off your vehicle, and our team will link it immediately to your service file.',
      },
      {
        title: 'Shop Disassembly & Hidden Damage Scopes',
        description:
          'USAA initial estimates may be written from preliminary photo evaluations. During repairs at our Waipahu facility, we inspect for hidden damage and identify any required manufacturer repair procedures.',
      },
      {
        title: 'Adjuster Supplement Coordination',
        description:
          'When additional labor or manufacturer-mandated parts are uncovered during disassembly, we submit itemized documentation and photo verification to USAA for review and approval.',
      },
      {
        title: 'Deductible Settlement',
        description:
          'Your policy deductible is confirmed by USAA and is generally paid to the repair shop. USAA determines payment for covered repairs under your approved claim.',
      },
    ],
    adjustmentsFaq: {
      title: 'How are insurance adjustments handled for USAA claims?',
      description:
        'We coordinate with USAA, submitting technical documentation for adjustments and supplemental repair approvals.',
    },
  },

  // ─── AAA ───────────────────────────────────────────────────────────────────
  {
    slug: 'aaa',
    name: 'AAA',
    article: 'an',
    seoTitle: 'AAA Auto Insurance Claims & Repair | Kuroda Autobody Waipahu',
    metaDescription:
      'Kuroda Autobody in Waipahu helps coordinate AAA auto insurance claims, collision repair estimates, and supplements. Schedule an estimate.',
    notice:
      'Non-Affiliation Notice: Kuroda Autobody is an independent, family-owned collision repair facility. We do not participate in a direct repair program (DRP) with AAA. We work with AAA insurance providers to help coordinate collision repair claims, but we always work for you, not the insurance carrier.',
    rightToChoose: [
      "AAA insurance offers access to recommended collision repair facilities through programs such as Member Preferred Repairs. However, you have the right to choose the auto body shop you trust to repair your vehicle, even if it is outside the insurer's repair network.",
      'Kuroda Autobody works with AAA insurance claims outside a Direct Repair Program. You can schedule an estimate at our Waipahu facility, and our team will help coordinate repair documentation with your insurance provider.',
    ],
    expectLead:
      "AAA auto insurance claims generally begin with reporting the accident and having a claims representative assess the damage. Specific procedures may vary depending on the company underwriting your AAA policy. Here's how we help coordinate your collision repair:",
    expect: [
      {
        title: 'Claim Reporting and Documentation',
        description:
          'Report your accident through the claims contact listed on your AAA insurance policy. Have your policy details, accident information, and any available photos ready. Share your claim number with us when scheduling an estimate.',
      },
      {
        title: 'Vehicle Inspection and Repair Estimate',
        description:
          "An insurance appraiser or repair shop may prepare the initial damage estimate. We inspect your vehicle's collision damage and identify the repairs needed, including applicable manufacturer procedures.",
      },
      {
        title: 'Additional Damage and Supplements',
        description:
          'If hidden damage or additional repair requirements are discovered during disassembly, we document the findings and submit supplemental information to your insurer for review and approval.',
      },
      {
        title: 'Claim Payments and Deductibles',
        description:
          'Your AAA insurance provider determines payment based on your policy and approved claim. Depending on the claim, your deductible may be paid to the repair shop or deducted from the insurance payment.',
      },
    ],
    manufacturerParagraphs: [
      'An initial damage estimate may not identify every repair needed after an accident. Some structural damage becomes visible only after damaged components are removed, while modern vehicle safety systems may require additional inspections or calibration.',
      'At our Waipahu facility, we use Car-O-Liner 3D electronic measuring equipment to assess structural damage and GYS spot and MIG welding equipment for applicable repairs.',
      "When collision repairs affect advanced driver assistance systems, we coordinate necessary calibration with qualified specialists or the manufacturer's dealership.",
      'Our team documents additional repair requirements and works with your AAA insurance provider when supplemental approval is needed.',
    ],
    rental:
      'Rental car pickup is available on-site for customers who need temporary transportation during repairs. Rental coverage depends on your AAA insurance policy and applicable limits.',
    advantageLead:
      'Serving Hawaii since 1938, our family-owned business combines decades of local experience with modern collision repair capabilities at our Waipahu facility:',
    relatedSlugs: [
      'state-farm',
      'allstate',
      'liberty-mutual',
      'island-insurance',
      'first-insurance',
      'geico',
      'progressive',
      'usaa',
      'national-interstate',
    ],
    faqs: [
      {
        title: 'Do I have to use an AAA network repair shop?',
        description:
          'No. You can choose your repair facility. Kuroda Autobody coordinates AAA insurance claims outside a Direct Repair Program.',
      },
      {
        title: 'How do I report an auto insurance claim to AAA?',
        description:
          'Use the claims contact listed on your insurance policy. AAA claims reporting procedures and contact numbers may vary by insurance provider.',
      },
      {
        title: 'How is my deductible handled for an AAA claim?',
        description:
          'Your deductible depends on your policy. It may be paid to the repair shop or deducted from the claim payment. Your insurer can confirm the arrangement.',
      },
    ],
    adjustmentsFaq: { title: '', description: '' },
  },

  // ─── First Insurance ───────────────────────────────────────────────────────
  {
    slug: 'first-insurance',
    name: 'First Insurance',
    article: 'a',
    heroTitle: 'First Insurance Claims ',
    seoTitle: 'First Insurance Auto Claims & Repair | Kuroda Autobody Waipahu',
    metaDescription:
      'Kuroda Autobody is a First Insurance DRP partner in Waipahu. Get help with auto insurance claims, repair estimates, and approvals.',
    notice:
      'Direct Repair Program (DRP) Partner: Kuroda Autobody is an independent, family-owned collision repair facility that participates in a Direct Repair Program with First Insurance Company of Hawaii. We work with First Insurance to coordinate collision repair estimates, approvals, and supplemental damage documentation while keeping you informed throughout the repair process.',
    rightToChoose: [
      "First Insurance Company of Hawaii offers a Direct Repair Program to help policyholders find collision repair facilities. However, you have the right to choose the auto body shop you trust, whether or not it belongs to the insurer's repair network.",
      'Kuroda Autobody participates in a Direct Repair Program with First Insurance. You can schedule an estimate at our Waipahu facility, and our team will help coordinate your repair with your insurance representative.',
    ],
    expectLead:
      "First Insurance provides a step-by-step auto claims process supported by local claims adjusters. After you report an accident, an adjuster reviews the claim, verifies coverage and liability, and explains the next steps for estimates and repairs. Here's how we help coordinate your collision repair:",
    expect: [
      {
        title: 'Claim Reporting and Documentation',
        description:
          "First Insurance accepts auto claims online, by phone, or by email. You can report your claim by calling (808) 527-7711 or using the insurer's online auto claim form. Share your claim number with us when scheduling your repair estimate.",
      },
      {
        title: 'Claim Review and Damage Assessment',
        description:
          "A First Insurance adjuster investigates the accident and determines the applicable coverage and liability. Once the claim is reviewed, we assess your vehicle's collision damage and prepare the necessary repair documentation.",
      },
      {
        title: 'Repair Estimates and Additional Damage',
        description:
          'First Insurance reviews repair estimates as part of its claims process. If additional damage is discovered during repairs, we document the findings and submit supplemental information for review and approval.',
      },
      {
        title: 'Claim Payments and Deductibles',
        description:
          'First Insurance may issue claim payments directly to the repair shop, to the policyholder, or jointly with another party, depending on the claim. Your deductible and any out-of-pocket costs depend on your policy and approved coverage.',
      },
    ],
    manufacturerHeading: { lead: 'Why a Complete ', accent: 'Repair Assessment Matters' },
    manufacturerParagraphs: [
      'An initial repair estimate may not identify every area of collision damage. Some structural damage or additional repair requirements become apparent only after affected components are removed and inspected.',
      'At our Waipahu facility, we use Car-O-Liner 3D electronic measuring equipment to identify structural damage and assess the repairs needed to restore your vehicle to proper specifications. Our team also uses manufacturer-approved GYS welding equipment for applicable repairs.',
      "When collision damage affects advanced driver assistance systems, we coordinate necessary calibration with qualified specialists or the manufacturer's dealership.",
      'We document additional repair requirements and coordinate with First Insurance when supplemental approval is needed.',
    ],
    rental:
      'Rental car pickup is available on-site for customers who need temporary transportation during repairs. Rental coverage depends on your First Insurance policy and applicable limits.',
    advantageLead:
      'Serving Hawaii since 1938, our family-owned business combines decades of local experience with modern collision repair capabilities at our Waipahu facility:',
    relatedSlugs: [
      'state-farm',
      'allstate',
      'liberty-mutual',
      'island-insurance',
      'geico',
      'progressive',
      'usaa',
      'national-interstate',
      'aaa',
    ],
    faqs: [
      {
        title: 'How do I report an auto insurance claim to First Insurance?',
        description:
          "You can report a claim through First Insurance's online auto claim form, by calling (808) 527-7711, or by email at claimsreportdesk@ficoh.com.",
      },
      {
        title: 'Do I have to use a First Insurance network repair shop?',
        description:
          'No. You can choose your repair facility. Kuroda Autobody also participates in a Direct Repair Program with First Insurance.',
      },
      {
        title: 'How does First Insurance handle repair payments?',
        description:
          'Depending on your claim, First Insurance may pay the repair shop directly or issue payment to you or another applicable party.',
      },
    ],
    adjustmentsFaq: { title: '', description: '' },
  },

  // ─── Island Insurance ──────────────────────────────────────────────────────
  {
    slug: 'island-insurance',
    name: 'Island Insurance',
    article: 'an',
    heroTitle: 'Island Insurance Claims ',
    seoTitle: 'Island Insurance Auto Claims & Repair | Kuroda Autobody Waipahu',
    metaDescription:
      'Kuroda Autobody is an Island Insurance DRP partner in Waipahu. Get help with collision repair estimates, claims, and approvals.',
    notice:
      'Direct Repair Program (DRP) Partner: Kuroda Autobody is an independent, family-owned collision repair facility that participates in a Direct Repair Program with Island Insurance. We work with Island Insurance to coordinate collision repair estimates, approvals, and supplemental damage documentation while keeping you informed throughout the repair process.',
    rightToChoose: [
      "Island Insurance offers its Island Certified Auto Repair Shop program to help policyholders find collision repair facilities in Hawaii. However, you have the right to choose the auto body shop you trust to repair your vehicle, whether or not it is part of the insurer's recommended network.",
      'Kuroda Autobody participates in a Direct Repair Program with Island Insurance. You can schedule an estimate at our Waipahu facility, and our team will help coordinate the repair process with your insurance representative.',
    ],
    expectLead:
      "Island Insurance handles auto insurance claims through its Hawaii-based claims team. Policyholders can report an accident online, by phone, by email, or through their insurance agent. Once a claim is submitted, a claims specialist is assigned to review the details and explain the next steps. Here's how we help coordinate your collision repairs:",
    expect: [
      {
        title: 'Claim Reporting and Documentation',
        description:
          'Report your accident to Island Insurance and obtain your claim number. Have your policy information, accident details, and any available police report ready. Share your claim number with us when scheduling your repair estimate.',
      },
      {
        title: 'Vehicle Damage Assessment',
        description:
          'Island Insurance may arrange an inspection or use photographs to assess vehicle damage. Our team evaluates your vehicle and prepares repair documentation based on the damage identified.',
      },
      {
        title: 'Repair Estimates and Additional Damage',
        description:
          'Island Insurance reviews repair estimates before authorizing covered repairs. If we discover additional damage during the repair process, we document the findings and submit supplemental information for review and approval.',
      },
      {
        title: 'Claim Payments and Deductibles',
        description:
          'Island Insurance may coordinate payment directly with your chosen repair facility once repairs are authorized and the necessary documentation is completed. Your coverage, deductible, and any potential out-of-pocket costs depend on your policy and approved claim.',
      },
    ],
    manufacturerHeading: { lead: 'Why Proper ', accent: 'Damage Assessment Matters' },
    manufacturerParagraphs: [
      'An initial insurance estimate may not identify every repair needed after a collision. Some damage becomes visible only after damaged panels or components are removed.',
      "At our Waipahu facility, we use Car-O-Liner 3D electronic measuring equipment to assess structural damage and GYS spot and MIG welding equipment for applicable repairs. If your vehicle requires advanced driver assistance system calibration, we coordinate that work with qualified specialists or the manufacturer's dealership.",
      'We document additional repair requirements and coordinate with Island Insurance when supplemental approval is needed.',
    ],
    rental:
      'Rental car pickup is available on-site for customers who need temporary transportation during repairs. Island Insurance rental coverage depends on your policy and applicable limits.',
    advantageLead:
      'Serving Hawaii since 1938, our family-owned business combines decades of local experience with modern collision repair capabilities at our Waipahu facility:',
    relatedSlugs: [
      'state-farm',
      'allstate',
      'liberty-mutual',
      'first-insurance',
      'geico',
      'progressive',
      'usaa',
      'national-interstate',
      'aaa',
    ],
    faqs: [
      {
        title: 'How do I file an auto insurance claim with Island Insurance?',
        description:
          'You can report a claim online, by phone, by email, or through your Island Insurance agent. Have your policy and accident information ready.',
      },
      {
        title: 'Do I have to use an Island Insurance network repair shop?',
        description:
          'No. You can choose your repair facility. Kuroda Autobody also participates in a Direct Repair Program with Island Insurance.',
      },
      {
        title: 'What happens if additional damage is discovered during repairs?',
        description:
          'We document the additional damage and submit supplemental information to Island Insurance for review and approval.',
      },
    ],
    adjustmentsFaq: { title: '', description: '' },
  },

  // ─── Liberty Mutual ────────────────────────────────────────────────────────
  {
    slug: 'liberty-mutual',
    name: 'Liberty Mutual',
    article: 'a',
    seoTitle: 'Liberty Mutual Auto Insurance Claims & Repair | Kuroda Autobody Waipahu',
    metaDescription:
      'Kuroda Autobody in Waipahu is a Liberty Mutual DRP partner. Get help with collision repair estimates, supplements, and claims.',
    notice:
      'Direct Repair Program (DRP) Partner: Kuroda Autobody is an independent, family-owned collision repair facility that participates in a Direct Repair Program with Liberty Mutual. We work with Liberty Mutual to coordinate collision repair estimates, approvals, and supplemental damage documentation while keeping you informed throughout the repair process.',
    rightToChoose: [
      "Liberty Mutual offers a Guaranteed Repair Network to help policyholders find collision repair facilities. However, you have the right to choose the auto body shop you trust, whether or not it belongs to the insurer's recommended network.",
      'Kuroda Autobody participates in a Direct Repair Program with Liberty Mutual. You can schedule an estimate at our Waipahu facility and coordinate your repair through the applicable claims process.',
    ],
    expectLead:
      "Liberty Mutual allows customers to file and track auto insurance claims online or by phone. Depending on the damage, the insurer may review photographs or arrange an inspection before preparing an initial estimate. Here's how we help once you're ready to have your vehicle repaired:",
    expect: [
      {
        title: 'Claim Number and Initial Estimate',
        description:
          'File your claim with Liberty Mutual and obtain your claim number. When scheduling your estimate with us, share the claim details and any initial repair estimate provided by the insurer.',
      },
      {
        title: 'Vehicle Inspection and Repair Planning',
        description:
          "Liberty Mutual may prepare an estimate using photographs or an in-person inspection. We assess your vehicle's collision damage and identify the repairs needed, including applicable manufacturer procedures.",
      },
      {
        title: 'Additional Damage and Updated Estimates',
        description:
          'If we discover hidden damage or additional repair requirements, we contact Liberty Mutual and provide supporting documentation. The insurer may reinspect the vehicle or update its estimate before approving additional repairs.',
      },
      {
        title: 'Repair Payments and Deductibles',
        description:
          'Liberty Mutual determines payment based on your approved claim and policy terms. Payment arrangements can depend on the repair program and whether your vehicle has a lienholder. You remain responsible for any applicable deductible or noncovered costs.',
      },
    ],
    manufacturerParagraphs: [
      "An initial Liberty Mutual estimate may not identify every repair operation needed after a collision. Some damage only becomes visible during disassembly, while other repair requirements depend on your vehicle's manufacturer specifications.",
      "At our Waipahu facility, we use Car-O-Liner 3D electronic measuring equipment to assess structural damage and GYS spot and MIG welding equipment for applicable repairs. When collision repairs affect advanced driver assistance systems, we coordinate necessary calibration with qualified specialists or a manufacturer's dealership.",
      'We document additional repair requirements and work with Liberty Mutual on supplemental approvals when needed.',
    ],
    rental:
      'Rental car pickup is available on-site for customers who need temporary transportation during repairs. Liberty Mutual rental coverage depends on your policy, including applicable daily and maximum limits.',
    advantageLead:
      'Serving Hawaii since 1938, our family-owned business combines decades of local experience with modern collision repair capabilities at our Waipahu facility:',
    relatedSlugs: [
      'state-farm',
      'allstate',
      'island-insurance',
      'first-insurance',
      'geico',
      'progressive',
      'usaa',
      'national-interstate',
      'aaa',
    ],
    faqs: [
      {
        title: 'Do I have to use a Liberty Mutual network shop?',
        description:
          'No. You can choose your repair facility. Kuroda Autobody also participates in a Direct Repair Program with Liberty Mutual.',
      },
      {
        title: "What if Liberty Mutual's initial estimate doesn't include all the damage?",
        description:
          'We document additional damage and contact Liberty Mutual to request an updated estimate and approval for the necessary repairs.',
      },
      {
        title: 'Does Liberty Mutual pay the repair shop directly?',
        description:
          'Payment arrangements depend on the repair program and claim details. Liberty Mutual may pay the repair shop directly or issue payment according to its claims procedures.',
      },
    ],
    adjustmentsFaq: { title: '', description: '' },
  },

  // ─── National Interstate ───────────────────────────────────────────────────
  {
    slug: 'national-interstate',
    name: 'National Interstate',
    article: 'a',
    seoTitle: 'National Interstate Insurance Claims & Repair | Kuroda Autobody Waipahu',
    metaDescription:
      'Have a National Interstate auto insurance claim? Kuroda Autobody in Waipahu helps coordinate collision repair estimates and approvals.',
    notice:
      'Non-Affiliation Notice: Kuroda Autobody is an independent, family-owned collision repair facility. We do not participate in a direct repair program (DRP) with National Interstate. We work with National Interstate to help coordinate eligible collision repair claims, but we always work for you, not the insurance carrier.',
    rightToChoose: [
      'National Interstate provides insurance coverage for commercial transportation businesses and other eligible policyholders. If your vehicle is involved in an accident, your insurer may provide instructions for obtaining a damage assessment or arranging repairs.',
      'You can request to have your vehicle repaired at Kuroda Autobody, even though we do not participate in a Direct Repair Program with National Interstate.',
      'Our Waipahu facility handles collision repairs for most makes and models. Contact us to discuss your vehicle and repair needs so we can determine whether the work is within our capabilities.',
    ],
    expectLead:
      "National Interstate provides dedicated claims support, including a Hawaii claims office. Its claims team can assist with new claims, additional documentation, and questions about existing claims. Here's what to expect when coordinating your collision repair:",
    expect: [
      {
        title: 'Claim Reporting and Initial Information',
        description:
          'Report the accident to National Interstate and provide your policy information, the type of loss, and incident details. The insurer may also request information about the driver, vehicle, and other parties involved.',
      },
      {
        title: 'Vehicle Inspection and Repair Estimate',
        description:
          'Once your claim is reported, contact us to schedule an estimate. We assess the collision damage and prepare repair documentation for your vehicle.',
      },
      {
        title: 'Additional Damage and Supplements',
        description:
          'If further accident-related damage is discovered during repairs, we document the findings and coordinate supplemental estimates with National Interstate for review and approval.',
      },
      {
        title: 'Claim Payments and Deductibles',
        description:
          'National Interstate determines coverage and payment arrangements according to your policy and approved claim. Any applicable deductible or additional out-of-pocket costs should be confirmed with your insurer.',
      },
    ],
    manufacturerHeading: { lead: 'Why Proper ', accent: 'Damage Assessment Matters' },
    manufacturerParagraphs: [
      'An initial damage assessment may not identify every repair required after a collision. Hidden damage can affect structural components, while certain repairs may require additional manufacturer-specified procedures.',
      'At our Waipahu facility, we use Car-O-Liner 3D electronic measuring equipment to assess structural damage and GYS spot and MIG welding equipment for applicable repairs.',
      "When repairs involve advanced driver assistance systems, we coordinate necessary calibration with qualified specialists or through the vehicle manufacturer's dealership.",
      'Our team documents additional repair requirements and works with National Interstate on supplemental approvals when needed.',
    ],
    rental:
      'Rental car pickup is available on-site for customers who need temporary transportation during repairs. Coverage depends on your National Interstate policy and applicable limits.',
    advantageLead:
      'Serving Hawaii since 1938, our family-owned business combines decades of local experience with modern collision repair capabilities at our Waipahu facility:',
    relatedSlugs: [
      'state-farm',
      'allstate',
      'liberty-mutual',
      'island-insurance',
      'first-insurance',
      'geico',
      'progressive',
      'usaa',
      'aaa',
    ],
    faqs: [
      {
        title: 'How do I report an auto insurance claim to National Interstate?',
        description:
          'You can report a claim by calling National Interstate at 800-929-0870. Its Hawaii claims office is also available at 800-316-9167.',
      },
      {
        title: 'Can Kuroda Autobody handle my National Interstate claim?',
        description:
          'We coordinate collision repair claims with National Interstate outside a Direct Repair Program. Contact us to confirm whether we can accommodate your vehicle and repair needs.',
      },
      {
        title: 'What happens if additional damage is found during repairs?',
        description:
          'We document the additional damage and submit supplemental repair information to National Interstate for review and approval.',
      },
    ],
    adjustmentsFaq: { title: '', description: '' },
  },

  // ─── Allstate ──────────────────────────────────────────────────────────────
  {
    slug: 'allstate',
    name: 'Allstate',
    article: 'an',
    notice:
      "Direct Repair Program (DRP) Partner: Kuroda Autobody is an independent, family-owned collision repair facility that participates in Allstate's Direct Repair Program (DRP). We work with Allstate to help coordinate your claim and keep you informed throughout the repair process.",
    rental:
      'Customers who need a rental car can arrange on-site pickup. Rental coverage depends on your Allstate policy, and you should confirm applicable limits with your insurer.',
    choiceAnswer:
      'No. Hawaii law protects your right to select your repair shop. Kuroda Autobody is also an Allstate DRP partner.',
    warrantyAnswer:
      'Qualifying metalwork and refinishing repairs are covered by our Limited Lifetime Warranty for as long as you own the vehicle.',
    relatedSlugs: [
      'state-farm',
      'liberty-mutual',
      'island-insurance',
      'first-insurance',
      'geico',
      'progressive',
      'usaa',
      'national-interstate',
      'aaa',
    ],
    seoTitle: 'Allstate Auto Insurance Claims & Repair | Kuroda Autobody Waipahu',
    metaDescription:
      'Processing your Allstate insurance claim at Kuroda Autobody in Waipahu. We manage claims tracking, supplement approvals, and deductibles while protecting your right to independent shop choice.',
    rightToChoose: [
      "Allstate claims procedures frequently include recommendations for shops within their Good Hands Repair Network. Your insurance company may recommend a repair facility or provide a list of shops, but you don't have to choose a body shop simply because it appears on that list to complete your repairs, regardless of network incentives.",
      'You are never required to use an Allstate-recommended facility, and you generally do not need to collect multiple estimates before bringing your car to Kuroda Autobody unless your insurer requires them.',
    ],
    expectLead:
      'Allstate claims involve structured claim logging, adjuster communication channels, and repair authorization steps. We manage the administrative workload directly with your insurance representative:',
    expect: [
      {
        title: 'Claim Number Linking',
        description:
          'Provide us with your Allstate claim number when you drop off your vehicle or schedule an estimate, and our team will link it immediately to your service file.',
      },
      {
        title: 'Shop-Side Inspection & Teardown',
        description:
          'Initial Allstate estimates may be generated from preliminary photo reviews. Once repairs begin at our Waipahu facility, we inspect for additional damage and document any required factory procedures.',
      },
      {
        title: 'Adjuster Supplement Submissions',
        description:
          'When additional repair operations or OEM-mandated parts are identified during disassembly, we submit itemized documentation and photo verification directly to your Allstate adjuster for review and authorization.',
      },
      {
        title: 'Deductible Settlement',
        description:
          'Your policy deductible is confirmed by Allstate and is generally paid to the repair shop. Allstate determines payment for covered repairs under your approved claim.',
      },
    ],
    manufacturerHeading: { lead: 'Why Quality Restoration Matters ', accent: 'Over Cost-Cutting' },
    adjustmentsFaq: {
      title: 'How are insurance adjustments handled for Allstate claims?',
      description:
        'We coordinate directly with your Allstate adjuster, providing technical documentation for supplement review and approval.',
    },
  },
];

const HUB_PATH = '/had-an-accident/insurance-companies/';
const carrierPath = (slug: string) => `${HUB_PATH}${slug}/`;

/** Provider card — linked only once its page exists (a CarrierCopy entry); otherwise left unlinked. */
const provider = (slug: string, name: string, description: string): FeatureItem => ({
  icon: 'claims',
  title: name,
  description,
  ...(carriers.some((c) => c.slug === slug) ? { href: carrierPath(slug) } : {}),
});

const hub: ContentPage = {
  path: HUB_PATH,
  seoTitle: 'Insurance Companies We Work With | Kuroda Autobody Waipahu',
  metaDescription:
    'Kuroda Autobody in Waipahu works with all major auto insurance providers to process your claim. Remember, you have the legal right to choose your repair shop.',
  eyebrow: EYEBROW,
  hero: {
    titleLead: 'Insurance Companies We Work With ',
    titleAccent: 'in Waipahu',
    body: 'Insurance Relationships Notice: Kuroda Autobody is an independent, family-owned collision repair facility. We participate in Direct Repair Programs (DRP) with select insurance carriers and work with other major insurance companies to help coordinate collision repair claims. You have the right to choose your repair shop, whether your insurer has a DRP relationship with us or not.',
    photoLabel: 'Kuroda Autobody team member reviewing an insurance claim with a customer',
  },
  sections: [
    {
      type: 'story',
      eyebrow: 'Your right to choose',
      headingLead: 'Your Right to Choose ',
      headingAccent: 'Your Repair Shop in Hawaiʻi',
      paragraphs: [
        'After an auto accident, insurance companies often suggest or direct policyholders toward specific collision shops on their preferred networks. Under Hawaiʻi insurance regulations, you have the absolute legal right to choose whichever auto body shop you trust to repair your vehicle, regardless of who is paying for the claim.',
        "You are never required to use an insurance company's recommended facility, and you do not need to collect multiple estimates before bringing your car to Kuroda Autobody.",
      ],
      photoLabel: 'Kuroda Autobody front desk in Waipahu',
    },
    {
      type: 'features',
      columns: 2,
      eyebrow: 'Insurance assistance',
      headingLead: 'How We Coordinate With ',
      headingStrong: 'Your Insurance Provider',
      lead: 'Managing an insurance claim after a collision can be stressful. Our team acts as your advocate throughout the entire repair process, ensuring your vehicle is restored according to strict manufacturer specifications and that the repair plan reflects what your vehicle requires. Our insurance assistance includes:',
      items: [
        {
          icon: 'claims',
          title: 'Claim Processing Support',
          description:
            'We help initiate and coordinate communication with your insurance adjuster, ensuring your claim number and details are properly logged.',
        },
        {
          icon: 'collision',
          title: 'Accurate Estimate Submissions',
          description:
            'We prepare comprehensive repair scopes that account for all hidden damage, required structural checks, and OEM-mandated procedures.',
        },
        {
          icon: 'chat',
          title: 'Supplement Management',
          description:
            'If additional damage or required factory procedures are uncovered during disassembly, we submit direct documentation to your insurer to secure approval.',
        },
        {
          icon: 'check',
          title: 'Deductible Guidance',
          description:
            "We help clarify your policy's deductible amount. Your deductible is paid directly to the shop upon completion of your repairs. What your policy covers beyond that is confirmed by your insurer.",
        },
      ],
    },
    {
      type: 'features',
      columns: 3,
      eyebrow: 'Insurance providers',
      headingLead: 'Major Insurance Providers ',
      headingStrong: 'We Work With',
      lead: 'Kuroda Autobody works directly with major auto insurance carriers operating in Hawaiʻi to process your claim and execute proper repairs. Depending on the provider, we participate in direct repair programs or work independently while protecting your right to choose. Select your insurance provider below to learn what to expect during your claim:',
      items: [],
      groups: [
        {
          title: 'Direct Repair Program (DRP) Partners',
          lead: 'We participate in Direct Repair Programs with the following insurance companies:',
          items: [
            provider(
              'state-farm',
              'State Farm',
              'Coordinating estimates, supplements, and deductibles for State Farm claims.'
            ),
            provider(
              'allstate',
              'Allstate',
              'Processing Allstate claims with transparent communication throughout the repair process.'
            ),
            provider(
              'liberty-mutual',
              'Liberty Mutual',
              'Managing repair estimates and claim documentation for Liberty Mutual policyholders.'
            ),
            provider(
              'island-insurance',
              'Island Insurance',
              'Collaborating with Island Insurance to coordinate collision repair claims.'
            ),
            provider(
              'first-insurance',
              'First Insurance',
              'Working with First Insurance Company of Hawaii on repair estimates and approvals.'
            ),
          ],
        },
        {
          title: 'Non-DRP Insurance Providers',
          lead: 'We regularly process claims for policyholders insured by these companies. Under Hawaii state regulations, you retain the legal right to select Kuroda Autobody regardless of network prompts or recommendations:',
          items: [
            provider(
              'geico',
              'GEICO',
              'Navigating your GEICO claim and exercising your right to independent shop choice at our Waipahu facility.'
            ),
            provider(
              'progressive',
              'Progressive',
              'Managing your Progressive claim documentation and manufacturer-specified repair procedures.'
            ),
            provider(
              'usaa',
              'USAA',
              'Assisting military members and families with USAA claim coordination and quality auto body restoration.'
            ),
            provider(
              'national-interstate',
              'National Interstate',
              'Coordinating collision repair estimates and claim documentation for National Interstate policyholders.'
            ),
            provider('aaa', 'AAA', 'Assisting AAA policyholders with clear claim coordination and expert repairs.'),
          ],
        },
      ],
    },
  ],
  faqs: {
    eyebrow: 'Insurance claims FAQ',
    titleLead: 'Frequently Asked Questions ',
    titleStrong: 'About Insurance Claims',
    items: [
      {
        title: 'Do I have to use the repair shop my insurance recommends?',
        description:
          'No. Your insurer may recommend a shop or give you a list, but the choice of repair facility is yours.',
      },
      {
        title: 'Do I need to get three estimates before my car is repaired?',
        description:
          'No. You only need to bring your vehicle to your chosen shop. We handle the estimate coordination and insurance adjustments directly.',
      },
      {
        title: 'What happens if my insurance estimate is lower than the actual repair cost?',
        description:
          'Insurance initial estimates are often written from exterior photos before teardown and do not account for hidden damage or strict OEM repair procedures. We submit direct supplements to your insurer to cover all necessary repairs.',
      },
    ],
  },
  cta: { title: 'Experience ', titleStrong: 'Expert Craftsmanship' },
};

const carrierLinks = carriers.map((c) => ({ name: c.name, path: carrierPath(c.slug) }));

const relatedFor = (c: CarrierCopy) => {
  const others = carrierLinks.filter((l) => l.path !== carrierPath(c.slug));
  if (!c.relatedSlugs) return others;
  const named = c.relatedSlugs.map((slug) => ({ name: slug, path: carrierPath(slug) }));
  return named.filter((n) => n.path !== carrierPath(c.slug));
};

export const insuranceCompanyPages: ContentPage[] = [hub, ...carriers.map((c) => carrierPage(c, relatedFor(c)))];
