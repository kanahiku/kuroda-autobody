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
}

const MANUFACTURER_LEAD =
  "Initial insurance evaluations frequently omit critical manufacturer-specified operations, such as computerized 3D measuring, structural re-welding, or electronic sensor calibrations. Skipping these steps can compromise your vehicle's structural crashworthiness and safety systems.";
const MANUFACTURER_TAIL =
  'Our technicians work strictly from official factory repair guidelines, advocating for the exact procedures and parts your vehicle requires so the repair plan reflects what the manufacturer requires.';

const nonAffiliation = (who: string, work: string) =>
  `Non-Affiliation Notice: Kuroda Autobody is an independent, family-owned collision repair facility. We are not an official direct repair program (DRP) facility, preferred partner, or exclusive approved shop for ${who}. We ${work} to help process your claim, but we always work for you, not the insurance carrier.`;

const EXPECT_ICONS: Four<FeatureItem['icon']> = ['claims', 'collision', 'chat', 'check'];

const advantage = (warranty?: string): FeatureItem[] => [
  {
    icon: 'rental',
    title: 'On-Site Rental Support',
    description: 'Eligible customers have access to on-site Enterprise rental car convenience right at our location.',
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
  const faqs: FaqItem[] = [
    {
      title: `Do I have to use ${c.article} ${name} network shop?`,
      description: 'No. Hawaii law protects your right to select any independent repair shop of your choice.',
    },
    c.adjustmentsFaq,
    {
      title: 'Will my repairs be guaranteed?',
      description:
        'Yes. All qualifying repairs completed at Kuroda Autobody are backed by our written lifetime warranty.',
    },
  ];
  return {
    path: `/had-an-accident/insurance-companies/${c.slug}/`,
    seoTitle: c.seoTitle,
    metaDescription: c.metaDescription,
    eyebrow: EYEBROW,
    hero: {
      titleLead: `${name} Insurance Claims `,
      titleAccent: 'at Kuroda Autobody',
      body: nonAffiliation(name, `work with ${name}`),
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
        paragraphs: [c.manufacturerLead ?? MANUFACTURER_LEAD, MANUFACTURER_TAIL],
        photoLabel: 'Kuroda Autobody technician following factory repair procedures',
        isReversed: true,
      },
      {
        type: 'features',
        columns: 3,
        eyebrow: 'Why Kuroda',
        headingLead: 'The Kuroda Autobody ',
        headingStrong: 'Advantage',
        lead: 'Operating in Waipahu since 1938, our family-owned facility combines decades of local experience with modern technical capabilities:',
        items: advantage(c.warranty),
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
    seoTitle: 'GEICO Auto Insurance Claims & Repair | Kuroda Autobody Waipahu',
    metaDescription:
      'Processing your GEICO insurance claim at Kuroda Autobody in Waipahu. We handle digital estimates, supplements, and deductibles while protecting your right to independent shop choice.',
    rightToChoose: [
      "When filing a claim through GEICO’s digital app or phone representatives, policyholders are often directed toward their network of ArX shops. Your insurance company may recommend a repair facility or provide a list of shops, but you don't have to choose a body shop simply because it appears on that list to complete your repairs, regardless of insurer suggestions.",
      'You are never obligated to use a GEICO-recommended facility, and you do not need to collect multiple estimates before bringing your car to our Waipahu shop.',
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
          'Because digital app evaluations cannot capture internal structural shifts, hidden damage, or electronic sensor misalignment, we perform a thorough teardown at our Waipahu facility.',
      },
      {
        title: 'Adjuster Supplement Submissions',
        description:
          'Once hidden requirements and OEM-mandated procedures are identified during disassembly, we submit itemized photo documentation and line-item supplement requests directly to your GEICO adjuster for approval.',
      },
      {
        title: 'Deductible Settlement',
        description:
          'Your policy deductible is paid directly to Kuroda Autobody upon completion of your repairs. What your policy covers beyond that is confirmed by your insurer.',
      },
    ],
    manufacturerLead:
      "Initial insurance evaluations are often written from exterior photos before teardown and frequently omit critical manufacturer-specified operations, such as computerized 3D measuring, structural re-welding, or electronic sensor calibrations. Skipping these steps can compromise your vehicle's structural crashworthiness and safety systems.",
    adjustmentsFaq: {
      title: 'How do supplements affect my GEICO claim timeline?',
      description:
        'When hidden damage is discovered during teardown, we submit a supplement to GEICO. While this requires adjuster approval, we handle all communication to minimize delays.',
    },
  },

  // ─── State Farm ────────────────────────────────────────────────────────────
  {
    slug: 'state-farm',
    name: 'State Farm',
    article: 'a',
    seoTitle: 'State Farm Auto Insurance Claims & Repair | Kuroda Autobody Waipahu',
    metaDescription:
      'Processing your State Farm insurance claim at Kuroda Autobody in Waipahu. We manage adjuster coordination, parts reviews, and deductibles while protecting your right to independent shop choice.',
    rightToChoose: [
      'State Farm claims representatives frequently recommend or route policyholders to shops within their Select Service program. Under Hawaii state regulations, you retain the absolute legal right to choose whichever auto body shop you trust to repair your vehicle, regardless of network suggestions.',
      'You are never required to use a State Farm-recommended facility, and you do not need to collect multiple estimates before bringing your car to Kuroda Autobody.',
    ],
    expectLead:
      'State Farm claims frequently involve traditional adjuster evaluations, detailed parts categorization, and structured review processes. We handle the administrative coordination directly with your representative:',
    expect: [
      {
        title: 'Claim File Initiation & Handover',
        description:
          "Provide us with your State Farm claim number upon arrival or during your initial estimate, and our team links it directly to your vehicle's intake file for seamless communication.",
      },
      {
        title: 'Comprehensive Shop Assessment & Teardown',
        description:
          'State Farm initial estimates are typically drafted based on surface-level visual inspections. Once your car is at our Waipahu shop, we complete a full disassembly to document internal damage and required OEM procedures.',
      },
      {
        title: 'Itemized Adjuster Submissions',
        description:
          'State Farm adjusters review repair scopes through structured parts and labor classifications. We submit detailed supplemental documentation and required factory labor operations directly to your adjuster to substantiate proper restoration.',
      },
      {
        title: 'Deductible Settlement',
        description:
          'Your policy deductible is paid directly to Kuroda Autobody when your repairs are finished, and State Farm covers the remaining balance of the approved claim.',
      },
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
    seoTitle: 'Progressive Auto Insurance Claims & Repair | Kuroda Autobody Waipahu',
    metaDescription:
      'Processing your Progressive insurance claim at Kuroda Autobody in Waipahu. We manage inspection coordination, photo documentation, and deductibles while protecting your right to independent shop choice.',
    rightToChoose: [
      "Progressive often encourages policyholders to utilize repair facilities participating in their Repair Network. Your insurance company may recommend a repair facility or provide a list of shops, but you don't have to choose a body shop simply because it appears on that list to complete your repairs, regardless of network promotions.",
      'You are never obligated to use a Progressive-recommended facility, and you do not need to collect multiple estimates before bringing your car to Kuroda Autobody.',
    ],
    expectLead:
      'Progressive claims often involve structured photo documentation standards and independent field adjuster inspections. We manage the communication and documentation workflow directly with your insurance representative:',
    expect: [
      {
        title: 'Claim File Setup & Intake',
        description:
          "Share your Progressive claim number with us when you drop off your vehicle or request an estimate, allowing us to immediately link the claim to your vehicle's file.",
      },
      {
        title: 'Shop Disassembly & Photo Evidence',
        description:
          'Progressive initial estimates generally reflect external view assessments. Once your car is at our Waipahu facility, we execute a complete teardown and capture high-resolution photo documentation of all hidden internal damage and required factory procedures.',
      },
      {
        title: 'Adjuster Supplement Submissions',
        description:
          'We compile itemized repair scopes and submit them alongside our photographic evidence directly to your Progressive adjuster to secure prompt approval for necessary labor and parts.',
      },
      {
        title: 'Deductible Settlement',
        description:
          'Your policy deductible is paid directly to Kuroda Autobody upon completion of your repairs, and Progressive covers the remaining balance of the approved claim.',
      },
    ],
    adjustmentsFaq: {
      title: 'How are insurance adjustments handled for Progressive claims?',
      description:
        'We coordinate directly with your Progressive adjuster, providing clear documentation of hidden damage and OEM requirements so adjustments are handled smoothly.',
    },
  },

  // ─── USAA ──────────────────────────────────────────────────────────────────
  {
    slug: 'usaa',
    name: 'USAA',
    article: 'a',
    seoTitle: 'USAA Auto Insurance Claims & Repair | Kuroda Autobody Waipahu',
    metaDescription:
      'Processing your USAA insurance claim at Kuroda Autobody in Waipahu. We manage military family claims coordination, estimate reviews, and deductibles while protecting your right to independent shop choice.',
    rightToChoose: [
      "When processing a claim through USAA, military members and families are sometimes guided toward shops in their preferred repair network. Your insurance company may recommend a repair facility or provide a list of shops, but you don't have to choose a body shop simply because it appears on that list to repair your vehicle, regardless of insurer routing.",
      'You are never required to use a USAA-recommended facility, and you do not need to collect multiple estimates before bringing your car to Kuroda Autobody.',
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
          'USAA initial estimates are frequently written from preliminary photo evaluations. Once your car is at our Waipahu facility, we execute a complete teardown to identify any internal structural damage or required OEM procedures.',
      },
      {
        title: 'Adjuster Supplement Coordination',
        description:
          'When additional labor or manufacturer-mandated parts are uncovered during disassembly, we submit itemized documentation and photo verification directly to your USAA adjuster for review and approval.',
      },
      {
        title: 'Deductible Settlement',
        description:
          'Your policy deductible is paid directly to Kuroda Autobody upon completion of your repairs, and USAA covers the remaining balance of the approved claim.',
      },
    ],
    adjustmentsFaq: {
      title: 'How are insurance adjustments handled for USAA claims?',
      description:
        'We coordinate directly with your USAA adjuster, submitting clear technical documentation so adjustments and supplement approvals are handled efficiently.',
    },
  },

  // ─── Allstate ──────────────────────────────────────────────────────────────
  {
    slug: 'allstate',
    name: 'Allstate',
    article: 'an',
    seoTitle: 'Allstate Auto Insurance Claims & Repair | Kuroda Autobody Waipahu',
    metaDescription:
      'Processing your Allstate insurance claim at Kuroda Autobody in Waipahu. We manage claims tracking, supplement approvals, and deductibles while protecting your right to independent shop choice.',
    rightToChoose: [
      "Allstate claims procedures frequently include recommendations for shops within their Good Hands Repair Network. Your insurance company may recommend a repair facility or provide a list of shops, but you don't have to choose a body shop simply because it appears on that list to complete your repairs, regardless of network incentives.",
      'You are never required to use an Allstate-recommended facility, and you do not need to collect multiple estimates before bringing your car to Kuroda Autobody.',
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
          'Initial Allstate estimates are frequently generated from preliminary photo reviews. Once your car is at our Waipahu facility, we execute a complete teardown to uncover any hidden damage or required factory procedures.',
      },
      {
        title: 'Adjuster Supplement Submissions',
        description:
          'When additional repair operations or OEM-mandated parts are identified during disassembly, we submit itemized documentation and photo verification directly to your Allstate adjuster for prompt review and authorization.',
      },
      {
        title: 'Deductible Settlement',
        description:
          'Your policy deductible is paid directly to Kuroda Autobody upon completion of your repairs, and Allstate covers the remaining balance of the approved claim.',
      },
    ],
    manufacturerHeading: { lead: 'Why Quality Restoration Matters ', accent: 'Over Cost-Cutting' },
    warranty: 'All qualifying workmanship is backed by our lifetime warranty for as long as you own the vehicle.',
    adjustmentsFaq: {
      title: 'How are insurance adjustments handled for Allstate claims?',
      description:
        'We coordinate directly with your Allstate adjuster, providing clear technical documentation so supplement authorizations are processed efficiently.',
    },
  },
];

const HUB_PATH = '/had-an-accident/insurance-companies/';
const carrierPath = (slug: string) => `${HUB_PATH}${slug}/`;

const hub: ContentPage = {
  path: HUB_PATH,
  seoTitle: 'Insurance Companies We Work With | Kuroda Autobody Waipahu',
  metaDescription:
    'Kuroda Autobody in Waipahu works with all major auto insurance providers to process your claim. Remember, you have the legal right to choose your repair shop.',
  eyebrow: EYEBROW,
  hero: {
    titleLead: 'Insurance Companies We Work With ',
    titleAccent: 'in Waipahu',
    body: nonAffiliation('any insurance carrier', 'work with all major auto insurance companies'),
    photoLabel: 'Kuroda Autobody team member reviewing an insurance claim with a customer',
  },
  sections: [
    {
      type: 'story',
      eyebrow: 'Your right to choose',
      headingLead: 'Your Right to Choose ',
      headingAccent: 'Your Repair Shop in Hawaii',
      paragraphs: [
        'After an auto accident, insurance companies often suggest or direct policyholders toward specific collision shops on their preferred networks. Under Hawaii insurance regulations, you have the absolute legal right to choose whichever auto body shop you trust to repair your vehicle, regardless of who is paying for the claim.',
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
      columns: 2,
      eyebrow: 'Insurance providers',
      headingLead: 'Major Insurance Providers ',
      headingStrong: 'We Work With',
      lead: 'Kuroda Autobody works directly with major auto insurance carriers operating in Hawaiʻi to process your claim and execute proper repairs. Select your insurance provider below to learn what to expect during your claim:',
      items: [
        {
          icon: 'claims',
          title: 'GEICO Collision Repair',
          href: carrierPath('geico'),
          description:
            'Navigating your GEICO claim and exercising your right to independent shop choice at our Waipahu facility.',
        },
        {
          icon: 'claims',
          title: 'State Farm Collision Repair',
          href: carrierPath('state-farm'),
          description: 'Coordinating estimates, supplements, and deductibles for State Farm claims.',
        },
        {
          icon: 'claims',
          title: 'Progressive Collision Repair',
          href: carrierPath('progressive'),
          description: 'Managing your Progressive claim documentation and manufacturer-specified repair procedures.',
        },
        {
          icon: 'claims',
          title: 'USAA Collision Repair',
          href: carrierPath('usaa'),
          description:
            'Assisting military members and families with USAA claim coordination and quality auto body restoration.',
        },
        {
          icon: 'claims',
          title: 'Allstate Collision Repair',
          href: carrierPath('allstate'),
          description: 'Processing Allstate claims with transparent communication and guaranteed workmanship.',
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
const hubLink = { name: 'Insurance Hub', path: HUB_PATH };

export const insuranceCompanyPages: ContentPage[] = [
  hub,
  ...carriers.map((c) => carrierPage(c, [hubLink, ...carrierLinks.filter((l) => l.path !== carrierPath(c.slug))])),
];
