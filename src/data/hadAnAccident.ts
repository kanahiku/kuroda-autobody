/**
 * "Had an Accident?" pages — copy from `pages-content/Kuroda - Had An Accident Pages/*.docx`.
 * Rendered by `ContentPageView` (see ./contentPage.ts for the shape).
 */
import type { ContentPage, ContentPageInput } from '~/data/contentPage';

const pages: ContentPageInput[] = [
  // ─── Your Right to Choose a Repair Shop ────────────────────────────────────
  {
    path: '/had-an-accident/your-right-to-choose/',
    seoTitle: 'Your Right to Choose an Auto Body Shop in Waipahu, Oahu | Kuroda Autobody',
    metaDescription:
      'Choose your preferred auto body shop after a collision in Hawaii. Kuroda Autobody helps you navigate insurance claims with ease.',
    hero: {
      titleLead: 'Your Right to Choose a Repair Shop ',
      titleAccent: 'in Waipahu',
      body: 'When you experience a collision, figuring out where to take your car is one of the most important decisions you will make. While insurance companies often suggest preferred collision facilities or provide a list of shops, you do not have to choose a body shop simply because it appears on that list. Kuroda Autobody empowers drivers across Oahu to make the choice that prioritizes quality and proper restoration.',
    },
    sections: [
      {
        type: 'features',
        columns: 3,
        eyebrow: 'Your choice',
        headingLead: 'Your Car, ',
        headingStrong: 'Your Choice',
        lead: 'Choosing a collision repair facility should be based on what matters most to you: quality, experience, service, and confidence that your vehicle will be repaired properly.',
        items: [
          {
            icon: 'shield',
            title: 'No Mandatory Shop Restrictions',
            description:
              'You retain the freedom to select the auto body shop you trust, regardless of insurance referral lists.',
          },
          {
            icon: 'check',
            title: 'Prioritizing Quality Repairs',
            description:
              'Independent choices ensure your vehicle receives thorough attention, skilled craftsmanship, and adherence to factory standards.',
          },
          {
            icon: 'claims',
            title: 'Seamless Insurance Partnership',
            description:
              'Once you choose Kuroda Autobody, we take over the communication and work directly with your insurance company throughout the entire repair process.',
          },
        ],
      },
      {
        type: 'features',
        columns: 3,
        eyebrow: 'After you choose',
        headingLead: 'Partnering With You ',
        headingStrong: 'After Your Choice',
        lead: 'Making your choice is only the first step. Once you bring your vehicle to our Waipahu facility, our team guides you through the next phases:',
        items: [
          {
            icon: 'collision',
            title: 'Initial Assessment',
            description: 'We inspect the vehicle thoroughly to document all collision damage.',
          },
          {
            icon: 'chat',
            title: 'Direct Insurer Communication',
            description: 'We submit our findings to your insurance adjuster to secure necessary repair approvals.',
          },
          {
            icon: 'clock',
            title: 'Transparent Updates',
            description:
              'We keep you informed throughout the repair process so you always know the status of your vehicle.',
          },
        ],
      },
    ],
    faqs: {
      eyebrow: 'Choosing a repair shop FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'About Choosing a Repair Shop',
      items: [
        {
          title: 'Do I have to use the auto body shop my insurance company recommends?',
          description:
            "No. Your insurance company may recommend a collision repair facility or provide a list of shops, but you can choose the auto body shop you trust. Once you choose Kuroda, we'll work with your insurance company throughout the repair process.",
        },
        {
          title: 'Do I need to get more than one estimate?',
          description:
            "Generally, you don't need to get multiple estimates unless your insurance company specifically requires them. You can choose the collision repair facility you trust and have your vehicle inspected there.",
        },
        {
          title: 'Will choosing my own shop cause delays with my insurance claim?',
          description:
            'No. We work with insurance adjusters every day and keep estimates, documentation and approvals moving.',
        },
      ],
    },
    cta: { title: 'Bring Your Car to ', titleStrong: 'a Shop You Trust' },
  },

  // ─── Insurance Claims ──────────────────────────────────────────────────────
  {
    path: '/had-an-accident/insurance-claims/',
    seoTitle: 'Auto Insurance Claims Support in Waipahu, Oahu | Kuroda Autobody',
    metaDescription:
      'We work with your insurance company on estimates, approvals and supplements. Kuroda Autobody in Waipahu handles estimates, approvals, and supplements.',
    hero: {
      titleLead: 'Working With Insurance Claims ',
      titleAccent: 'in Waipahu',
      body: 'Dealing with insurance after an accident can feel confusing, but you do not have to go through it alone. Kuroda Autobody works with insurance companies every day to help guide drivers across Oahu through the process, coordinate repair estimates, and secure necessary approvals.',
    },
    sections: [
      {
        type: 'features',
        columns: 2,
        eyebrow: 'Insurance coordination',
        headingLead: 'Working With ',
        headingStrong: 'Your Insurance Provider',
        lead: 'Once you have opened a claim and have your claim number ready, our team takes over the technical coordination to keep your collision repair moving forward smoothly.',
        items: [
          {
            icon: 'claims',
            title: 'Collaborative Estimates',
            description:
              'We work directly with your insurance adjuster on the initial repair estimate and required authorizations.',
          },
          {
            icon: 'collision',
            title: 'Managing Supplemental Damage',
            description:
              'If additional accident-related damage is discovered after repairs begin, we document it and handle the supplemental approval process with your insurer.',
          },
          {
            icon: 'chat',
            title: 'Transparent Communication',
            description:
              'We keep you informed throughout the repair so you always know what is happening with your vehicle and what to expect next.',
          },
          {
            icon: 'check',
            title: 'Streamlined Coordination',
            description: 'We handle the paperwork with your insurer so your claim keeps moving.',
          },
        ],
      },
      {
        type: 'table',
        eyebrow: 'Who does what',
        headingLead: 'Understanding ',
        headingStrong: 'Roles in Your Claim',
        columns: ['Responsibility Area', 'Insurer Role', 'Kuroda Autobody Role'],
        rows: [
          [
            'Claim Initiation',
            'Opens the claim and issues your official claim number',
            'Prepares your vehicle for intake once the claim is open',
          ],
          [
            'Repair Estimation',
            'Reviews initial estimates for coverage approval',
            'Inspects the vehicle and coordinates detailed estimates with your adjuster',
          ],
          [
            'Supplemental Damage',
            'Evaluates and approves additional repair costs',
            'Documents hidden damage and submits supplement requests',
          ],
          [
            'Restoration Execution',
            'Provides financial coverage per policy terms',
            'Performs structural, body and refinishing repairs',
          ],
        ],
      },
      {
        type: 'steps',
        eyebrow: 'Step by step',
        headingLead: 'Our Claims ',
        headingStrong: 'Coordination Process',
        steps: [
          {
            title: 'Open your claim',
            description: 'Contact your insurance company to report the accident and obtain your official claim number.',
          },
          {
            title: 'Visit our Waipahu shop',
            description: 'Bring your vehicle and claim details to Kuroda Autobody to schedule your repair estimate.',
          },
          {
            title: 'Leave the details to us',
            description: 'We manage adjuster communication, estimates, and supplemental documentation directly.',
          },
          {
            title: 'Complete your restoration',
            description:
              'Once approvals are finalized, our technicians restore your vehicle to proper factory standards.',
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
          title: 'Where do I get my insurance claim number?',
          description:
            'Your insurance company provides a claim number after you report the accident and open a claim. Keep it handy so we can use it to communicate effectively with your insurer.',
        },
        {
          title: 'Will Kuroda work directly with my insurance company?',
          description:
            'Yes. We work directly with your insurance provider on repair estimates, approvals, and supplemental estimates if additional accident-related damage is discovered.',
        },
        {
          title: 'What happens if hidden damage is found during repairs?',
          description:
            'Some collision damage may not become apparent until repairs are underway. If additional damage is discovered, we document it and work with your insurance company on any necessary supplemental estimates.',
        },
      ],
    },
    cta: { title: 'Let Us Help ', titleStrong: 'Simplify Your Claim' },
  },

  // ─── When the Insurance Estimate Is Different ──────────────────────────────
  {
    path: '/had-an-accident/insurance-estimate-differences/',
    seoTitle: 'Insurance Estimate Differences & Supplements | Kuroda Autobody',
    metaDescription:
      'Why do insurance estimates differ from actual collision repair costs? Kuroda Autobody in Waipahu explains supplements and works with your insurer.',
    hero: {
      titleLead: 'When the Insurance Estimate ',
      titleAccent: 'Is Different',
      body: 'Finding that your insurance estimate does not match your repair shop assessment is completely normal. Initial insurance sheets are usually quick, exterior overviews written before vehicle teardown. Kuroda Autobody works directly with your insurance provider to handle any differences and ensure your vehicle receives complete restoration.',
    },
    sections: [
      {
        type: 'features',
        columns: 3,
        eyebrow: 'Estimate differences',
        headingLead: 'Why Insurance Estimates ',
        headingStrong: 'Often Differ',
        lead: 'Initial insurance estimates are typically written from exterior photographs or quick preliminary walk-arounds before disassembly. They serve as a starting point, but they rarely capture the full scope of a collision.',
        items: [
          {
            icon: 'collision',
            title: 'Hidden Internal Damage',
            description:
              'Structural bends, sensor misalignments, and broken mounting tabs often remain hidden behind body panels until teardown begins.',
          },
          {
            icon: 'shield',
            title: 'Strict Manufacturer Guidelines',
            description:
              'Modern vehicles require specific repair procedures and diagnostic scans that initial insurance sheets may not account for.',
          },
          {
            icon: 'claims',
            title: 'Parts and Material Pricing',
            description:
              'Differences in part availability or precise factory specifications can adjust the final cost required to repair your car properly.',
          },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'Supplements',
        headingLead: 'How Supplements ',
        headingStrong: 'Bridge the Gap',
        lead: 'When our technicians discover additional repair requirements after teardown, we do not guess or cut corners. Instead, we file a **supplemental estimate**.',
        steps: [
          {
            title: 'Thorough Teardown',
            description: 'We disassemble the damaged areas to reveal all underlying structural and mechanical issues.',
          },
          {
            title: 'Detailed Documentation',
            description: 'We photograph and document every required repair step and necessary part.',
          },
          {
            title: 'Insurer Approval',
            description: 'We submit the supplement directly to your insurance adjuster for review and authorization.',
          },
          {
            title: 'Resuming Repairs',
            description: 'Once approved, we proceed with the complete repair process to factory standards.',
          },
        ],
      },
    ],
    faqs: {
      eyebrow: 'Estimate differences FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'About Estimate Differences',
      items: [
        {
          title: "Why is my insurance estimate lower than Kuroda's estimate?",
          description:
            'Initial insurance estimates are usually written as quick preliminary overviews based on external visible damage, whereas a shop estimate accounts for structural integrity and teardown discoveries.',
        },
        {
          title: 'Will I have to pay the difference if the estimate changes?',
          description:
            'We submit supplements to your insurer for approval and handle that conversation for you. Your insurance company confirms what your policy covers and what you are responsible for.',
        },
        {
          title: 'Does filing a supplement cause long delays in my repair?',
          description: 'We document and submit supplements promptly. Approval timing is set by your insurer.',
        },
      ],
    },
    cta: { title: 'Get Complete and ', titleStrong: 'Accurate Collision Repair' },
  },

  // ─── Deductibles ───────────────────────────────────────────────────────────
  {
    path: '/had-an-accident/deductibles/',
    seoTitle: 'Understanding Auto Insurance Deductibles | Kuroda Autobody',
    metaDescription:
      'What is an insurance deductible and when do you pay it? Kuroda Autobody in Waipahu explains how deductibles work during your collision repair claim.',
    hero: {
      titleLead: 'Understanding Your ',
      titleAccent: 'Auto Insurance Deductible',
      body: "When filing an insurance claim after a collision, you will likely encounter your policy deductible. Knowing what a deductible is and how it applies helps you plan ahead for your vehicle's repair. Kuroda Autobody works with drivers across Oahu to make the payment and pickup process straightforward.",
    },
    sections: [
      {
        type: 'features',
        columns: 3,
        eyebrow: 'How deductibles work',
        headingLead: 'What Is a Deductible ',
        headingStrong: 'and How Does It Work?',
        lead: 'Your deductible is the specific amount your insurance policy requires you to pay toward a covered repair before your insurer covers the remaining eligible costs.',
        items: [
          {
            icon: 'claims',
            title: 'Set by Your Policy',
            description:
              'Your deductible amount is determined when you sign up for your insurance policy, not by the repair shop.',
          },
          {
            icon: 'check',
            title: 'Paid at Vehicle Pickup',
            description:
              'Deductibles are typically paid directly to the repair shop when you pick up your fully restored vehicle.',
          },
          {
            icon: 'chat',
            title: 'Confirmed by Your Insurer',
            description:
              'Your insurance agent or adjuster is the best resource to confirm your exact deductible amount and how it applies to your specific claim.',
          },
        ],
      },
    ],
    faqs: {
      eyebrow: 'Deductibles FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'About Deductibles',
      items: [
        {
          title: 'When do I pay my insurance deductible?',
          description:
            'Your deductible is paid directly to Kuroda Autobody when your vehicle repairs are complete and you pick up your car.',
        },
        {
          title: 'Who determines how much my deductible is?',
          description:
            'Your insurance company and policy terms determine your deductible amount. Kuroda Autobody does not set or collect fees for your insurance deductible until the final vehicle pickup.',
        },
        {
          title: 'Do I have to pay a deductible if the accident was not my fault?',
          description:
            'It depends on liability determinations and your insurance coverage. Your insurance adjuster can clarify whether your deductible applies or if it can be waived through subrogation.',
        },
      ],
    },
    cta: { title: 'Get Clear Guidance ', titleStrong: 'on Your Repair' },
  },

  // ─── Paying Out of Pocket ──────────────────────────────────────────────────
  {
    path: '/had-an-accident/paying-out-of-pocket/',
    seoTitle: 'Paying Out of Pocket for Auto Body Repair | Kuroda Autobody',
    metaDescription:
      'Need collision repair without an insurance claim? Kuroda Autobody in Waipahu explains self-pay estimates, transparent pricing, and warranty coverage.',
    hero: {
      titleLead: 'Paying Out of Pocket for Auto Body Repair ',
      titleAccent: 'in Waipahu',
      body: 'Not every vehicle repair goes through an insurance claim. Whether you are handling a minor scratch, avoiding a rate increase for a small dent, or simply preferring to pay directly, Kuroda Autobody makes self-pay repairs straightforward. We provide clear, honest estimates and expert craftsmanship for drivers across Oahu.',
    },
    sections: [
      {
        type: 'features',
        columns: 3,
        eyebrow: 'Self-pay',
        headingLead: 'When to Consider ',
        headingStrong: 'Paying Out of Pocket',
        lead: 'Drivers often choose self-pay options for specific situations where involving an insurer is unnecessary or counterproductive:',
        items: [
          {
            icon: 'claims',
            title: 'Damage Below Your Deductible',
            description:
              'If the repair cost is less than your insurance deductible, filing a claim will not provide any financial assistance.',
          },
          {
            icon: 'shield',
            title: 'Avoiding Premium Increases',
            description:
              'Handling minor cosmetic dings or bumper scrapes out of pocket keeps your insurance history clean and prevents potential rate hikes.',
          },
          {
            icon: 'check',
            title: 'Direct Control',
            description: 'Self-pay repairs skip the insurance approval step, so scheduling is between you and us.',
          },
        ],
      },
      {
        type: 'features',
        columns: 3,
        eyebrow: 'Self-pay process',
        headingLead: 'How ',
        headingStrong: 'Self-Pay Repairs Work',
        lead: "Choosing to pay out of pocket gives you complete control over your vehicle's restoration from start to finish. Our process is designed to be transparent and stress-free:",
        items: [
          {
            icon: 'clock',
            title: 'Direct Estimate Appointments',
            description:
              'Bring your vehicle to our Waipahu shop for a thorough assessment of the damage without needing an insurance claim number.',
          },
          {
            icon: 'claims',
            title: 'Itemized Transparent Pricing',
            description:
              'We provide a clear breakdown of labor, parts, and materials so you know exactly what your repair entails.',
          },
          {
            icon: 'shield',
            title: 'Full Warranty Protection',
            description:
              'Paying out of pocket does not mean sacrificing quality. Qualifying metalwork and refinishing are still backed by our Limited Lifetime Warranty.',
          },
        ],
      },
    ],
    faqs: {
      eyebrow: 'Self-pay FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'About Paying Out of Pocket',
      items: [
        {
          title: 'Do I need an insurance claim to get an estimate at Kuroda?',
          description:
            'No. You do not need an insurance claim or policy number to have your vehicle inspected and repaired at our shop.',
        },
        {
          title: 'Are repairs paid out of pocket covered by a warranty?',
          description:
            'Yes. Qualifying metalwork and refinishing repairs completed on self-pay jobs are still protected by our Limited Lifetime Warranty for as long as you own your vehicle.',
        },
        {
          title: 'Can I change my mind and file an insurance claim later?',
          description:
            'You generally need to decide whether to involve your insurance company before repairs begin. Once a repair is underway or completed, filing a retroactive claim with an insurer is rarely allowed.',
        },
      ],
    },
    cta: { title: 'Get Transparent ', titleStrong: 'Repair Pricing' },
  },

  // ─── Rental Cars ───────────────────────────────────────────────────────────
  {
    path: '/had-an-accident/rental-cars/',
    seoTitle: 'Rental Car Coordination & On-Site Pickup | Kuroda Autobody',
    metaDescription:
      'Need a rental car while your vehicle is being repaired? Kuroda Autobody in Waipahu offers convenient on-site rental car coordination and pickup.',
    hero: {
      titleLead: 'Rental Car Coordination and On-Site Pickup ',
      titleAccent: 'in Waipahu',
      body: 'Being without your vehicle while it is in the shop is inconvenient. To keep your daily routine moving forward, Kuroda Autobody coordinates convenient on-site rental car pickup right at our Waipahu facility. Whether your rental is covered by insurance or paid out of pocket, we help streamline the details so you can transition smoothly into a temporary vehicle.',
    },
    sections: [
      {
        type: 'features',
        columns: 3,
        eyebrow: 'Rental cars',
        headingLead: 'How ',
        headingStrong: 'Rental Car Coordination Works',
        lead: 'We work closely with local rental providers to make getting into a temporary vehicle as seamless as possible during your repair:',
        items: [
          {
            icon: 'rental',
            title: 'On-Site Pickup and Drop-Off',
            description:
              'You can pick up and drop off your rental vehicle right here at our shop, saving you extra trips around Oahu.',
          },
          {
            icon: 'shield',
            title: 'Insurance Coverage Verification',
            description:
              'If your auto insurance policy includes rental reimbursement coverage, we help coordinate with your adjuster to confirm your daily limits and billing details.',
          },
          {
            icon: 'claims',
            title: 'Self-Pay Options',
            description:
              'If your policy does not include rental coverage or you are paying for repairs out of pocket, you can still rent a vehicle at standard rates, and we will help coordinate the arrangements.',
          },
        ],
      },
      {
        type: 'quote',
        quote:
          '“I like that they have car rentals right there so all we do is jump into another car and off we go. They explain everything well and all questions are encouraged.”',
        attribution: '— Darcie M., Kuroda Customer Survey, July 2026',
      },
    ],
    faqs: {
      eyebrow: 'Rental cars FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'About Rental Cars',
      items: [
        {
          title: 'Can I pick up my rental car right at Kuroda Autobody?',
          description:
            "Yes. We offer convenient on-site rental car pickup and drop-off directly at our Waipahu shop so you don't have to travel across town.",
        },
        {
          title: 'Does my insurance policy pay for the rental car?',
          description:
            'It depends on your specific insurance policy. If you carry rental reimbursement coverage, your insurer will cover a portion or all of your rental costs based on your policy limits.',
        },
        {
          title: 'What if my insurance does not cover a rental car?',
          description:
            'You can still rent a vehicle at your own expense while your car is being repaired. We will help coordinate the details and reservation to make the process easy.',
        },
      ],
    },
    cta: { title: 'Keep Moving While ', titleStrong: 'Your Car Is Repaired' },
  },
];

/** Every page links to the whole "Had an Accident?" set (sitemap order, as in the content docs). */
const resourcePaths = [
  '/had-an-accident/your-right-to-choose/',
  '/had-an-accident/insurance-claims/',
  '/had-an-accident/insurance-estimate-differences/',
  '/had-an-accident/deductibles/',
  '/had-an-accident/paying-out-of-pocket/',
  '/had-an-accident/rental-cars/',
];

export const hadAnAccidentPages: ContentPage[] = pages.map((page) => ({
  ...page,
  eyebrow: 'Had an Accident?',
  related: {
    eyebrow: 'Had an Accident?',
    headingLead: 'Explore Accident and Claim ',
    headingStrong: 'Resources',
    paths: resourcePaths,
  },
}));
