/**
 * Why Kuroda pages — /repair-process/, /warranty/, /certifications/ (copy: Sitemap Content Plan V2).
 * Rendered by `ContentPageView`. "Why Kuroda" is a menu group only — it has no hub page of its own.
 * Wording rule: OEMs are "participates in … programs" — never "certified" until the client confirms.
 */
import type { ContentPage } from '~/data/contentPage';

/** Each page links to all three Why Kuroda pages (including itself, as before). */
const related: NonNullable<ContentPage['related']> = {
  eyebrow: 'Why Kuroda',
  headingLead: 'Explore Why Kuroda ',
  headingStrong: 'Resources',
  paths: ['/repair-process/', '/warranty/', '/certifications/'],
};

const program = 'OEM collision repair program';

export const whyKurodaPages: ContentPage[] = [
  // ─── Our Repair Process ────────────────────────────────────────────────────
  {
    path: '/repair-process/',
    seoTitle: 'The Collision Repair Process in Waipahu, Oahu | Kuroda Autobody',
    metaDescription:
      'Learn how Kuroda Autobody handles your collision repair from estimate to post-repair walkthrough. Step-by-step guidance at our Waipahu shop.',
    eyebrow: 'Why Kuroda',
    hero: {
      titleLead: 'Our Collision Repair Process ',
      titleAccent: 'in Waipahu',
      body: 'When your vehicle has been damaged in a collision, understanding what happens next provides peace of mind. At Kuroda Autobody, our repair process follows a careful, structured path to ensure your vehicle is restored correctly. From your initial estimate to our detailed post-repair walkthrough, our team guides you through every phase.',
      photoLabel: 'Kuroda Autobody technician at work on a vehicle',
    },
    sections: [
      {
        type: 'steps',
        eyebrow: 'From estimate to walkthrough',
        headingLead: 'The Seven Steps ',
        headingStrong: 'of Your Repair',
        lead: 'We manage your collision repair through seven clear stages:',
        steps: [
          {
            title: 'Schedule Your Estimate',
            description:
              'Bring your vehicle to our Waipahu shop where we inspect the damage, assess required repairs, and discuss your options.',
          },
          {
            title: 'Insurance Coordination',
            description:
              'We work directly with your insurance adjuster on initial estimates, approvals, and supplemental documentation for any hidden damage found later.',
          },
          {
            title: 'Drop Off and Rental Car',
            description:
              'Drop off your vehicle and utilize our convenient on-site rental car pickup if you need temporary transportation.',
          },
          {
            title: 'Repair and Updates',
            description:
              'Our technicians perform proper repair procedures while keeping you informed of our progress and expected completion milestones.',
          },
          {
            title: 'Final Quality Check',
            description: 'We thoroughly inspect the completed vehicle to verify quality, fit, and finish.',
          },
          { title: 'Post-Repair Walkthrough', description: 'We review the completed work together.' },
          {
            title: 'Back on the Road',
            description: 'Drive away with confidence, backed by our Limited Lifetime Warranty.',
          },
        ],
      },
      {
        type: 'story',
        eyebrow: 'Complete transparency',
        headingLead: 'The Post-Repair ',
        headingAccent: 'Walkthrough',
        paragraphs: [
          'Handing your vehicle back to you is a critical step in our process. Because car owners look at their vehicles very closely after an accident, we take extra time to ensure complete transparency before you drive away.',
          'During our post-repair walkthrough, we sit down with you to review an annotated hard-copy work order detailing every procedure performed. We also review side-by-side before-and-after photographs of the repair work so you can see exactly how your vehicle was restored. This comprehensive review gives you the opportunity to ask questions, inspect every detail, and feel fully confident in the craftsmanship before leaving our shop.',
        ],
        photoLabel: 'Kuroda Autobody team reviewing the post-repair walkthrough with a customer',
      },
    ],
    faqs: {
      eyebrow: 'Repair process FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'About Our Repair Process',
      items: [
        {
          title: 'What happens during the final vehicle pickup?',
          description:
            'During your final pickup, we conduct our detailed post-repair walkthrough, reviewing your annotated work order and before-and-after photos together so you can inspect the completed work and ask any questions.',
        },
        {
          title: 'How long will my repair take?',
          description:
            'Repair timelines vary depending on the extent of the damage, parts availability, and insurance supplement approvals. We keep you updated throughout the process but do not make fixed turnaround promises.',
        },
        {
          title: 'Do I need an appointment for an estimate?',
          description:
            'Yes. Estimates are by appointment to ensure our team can dedicate proper time to inspect your vehicle and review your options.',
        },
      ],
    },
    related,
    cta: { title: 'Experience ', titleStrong: 'Quality Restoration' },
  },

  // ─── Limited Lifetime Warranty ─────────────────────────────────────────────
  {
    path: '/warranty/',
    seoTitle: 'Limited Lifetime Warranty on Auto Repairs | Kuroda Autobody',
    metaDescription:
      'Kuroda Autobody stands by our work with a Limited Lifetime Warranty on qualifying metalwork and refinishing repairs for as long as you own your vehicle.',
    eyebrow: 'Why Kuroda',
    hero: {
      titleLead: 'Limited Lifetime Warranty ',
      titleAccent: 'in Waipahu',
      body: 'When you choose Kuroda Autobody for your collision repair, we stand behind our craftsmanship. We provide a Limited Lifetime Warranty on qualifying metalwork and refinishing repairs for as long as you own your vehicle.',
      photoLabel: 'Kuroda Autobody technician inspecting a finished repair',
    },
    sections: [
      {
        type: 'features',
        columns: 3,
        eyebrow: 'Our craftsmanship',
        headingLead: 'Standing Behind ',
        headingStrong: 'Our Work',
        lead: 'Quality restoration requires precision and experienced technicians. Because we hold ourselves to rigorous standards, we protect our craftsmanship for the long haul:',
        items: [
          {
            icon: 'shield',
            title: 'Covered Repairs',
            description: 'We provide a Limited Lifetime Warranty on qualifying metalwork and refinishing repairs.',
          },
          {
            icon: 'clock',
            title: 'Duration',
            description: 'This protection remains in effect for as long as you own your vehicle.',
          },
          {
            icon: 'claims',
            title: 'Other Repairs and Parts',
            description: 'Other repairs and parts carry specific terms.',
          },
        ],
      },
    ],
    faqs: {
      eyebrow: 'Warranty FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'About Our Warranty',
      items: [
        {
          title: 'What does the Kuroda Limited Lifetime Warranty cover?',
          description:
            'Our Limited Lifetime Warranty covers qualifying metalwork and refinishing repairs completed at our Waipahu facility.',
        },
        {
          title: 'How long does the warranty last?',
          description: 'The warranty remains valid for as long as you own the vehicle.',
        },
        {
          title: 'Are all parts and mechanical repairs covered under this lifetime warranty?',
          description:
            'Qualifying metalwork and refinishing repairs are covered for as long as you own the vehicle. Other repairs and parts carry their own specific terms.',
        },
      ],
    },
    related,
    cta: { title: 'Drive With ', titleStrong: 'Complete Confidence' },
  },

  // ─── Certifications & Training ─────────────────────────────────────────────
  {
    path: '/certifications/',
    seoTitle: 'Certifications & OEM Collision Repair Training | Kuroda Autobody',
    metaDescription:
      'Kuroda Autobody in Waipahu is an I-CAR Gold Class facility with ASE-certified technicians participating in major OEM collision repair programs.',
    eyebrow: 'Why Kuroda',
    hero: {
      titleLead: 'Certifications and Training ',
      titleAccent: 'in Waipahu',
      body: 'At Kuroda Autobody, our technicians maintain rigorous industry credentials and continuous training to ensure your vehicle is restored according to strict factory specifications.',
      photoLabel: 'Kuroda Autobody technicians in the collision repair shop',
    },
    sections: [
      {
        type: 'features',
        columns: 3,
        surface: 'subtle',
        eyebrow: 'Ongoing training',
        headingLead: 'Industry Standards ',
        headingStrong: 'and Ongoing Training',
        lead: 'Quality collision repair relies on continuous education and recognized industry standards. Our team maintains top-tier credentials to handle complex repairs safely:',
        items: [
          {
            icon: 'shield',
            title: 'I-CAR Gold Class Facility',
            description:
              'We maintain I-CAR Gold Class collision repair status, reflecting advanced training across all key roles in our shop.',
          },
          {
            icon: 'check',
            title: 'ASE-Certified Technicians',
            description:
              'Our technicians hold ASE certifications and complete ongoing industry training to stay current with evolving automotive technology.',
          },
          {
            icon: 'alignment',
            title: 'Vehicle-Specific Procedures',
            description:
              'Ongoing training gives our team access to accurate, up-to-date repair guidelines for a wide range of makes and models.',
          },
        ],
      },
      {
        type: 'credentials',
        eyebrow: 'OEM programs',
        headingLead: 'OEM Collision Repair ',
        headingStrong: 'Program Participation',
        paragraphs: [
          'Kuroda Autobody participates in OEM collision repair programs for Honda, Acura, Nissan, GM, and Chrysler. This participation provides our team with direct access to vehicle-specific repair information, procedures, and standards required for proper structural and cosmetic restoration.',
        ],
        credentials: [
          {
            name: 'I-CAR Gold Class',
            descriptor: 'Collision repair training',
            logo: '/oem/icar-gold-class.png',
            logoW: 220,
            logoH: 110,
          },
          { name: 'Honda', descriptor: program, logo: '/oem/honda.png', logoW: 141, logoH: 110 },
          { name: 'Acura', descriptor: program, logo: '/oem/acura.png', logoW: 141, logoH: 110 },
          { name: 'Nissan', descriptor: program, logo: '/oem/nissan.png', logoW: 141, logoH: 110 },
          { name: 'GM', descriptor: program, logo: '/oem/gm.png', logoW: 141, logoH: 110 },
          { name: 'Chrysler', descriptor: program, logo: '/oem/fca.png', logoW: 141, logoH: 110 },
        ],
      },
    ],
    faqs: {
      eyebrow: 'Training FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'About Our Training and Programs',
      items: [
        {
          title: 'What does I-CAR Gold Class status mean for my repair?',
          description:
            'I-CAR Gold Class is a recognized industry standard that signifies our shop maintains comprehensive, ongoing training across all major areas of collision repair.',
        },
        {
          title: 'Why is OEM program participation important?',
          description:
            'Participating in manufacturer programs gives our technicians direct access to vehicle-specific repair procedures, structural guidelines, and technical standards straight from the factory.',
        },
        {
          title: 'Are your technicians individually certified?',
          description:
            'Yes. Our team includes ASE-certified technicians who complete continuous training to keep pace with modern vehicle advancements.',
        },
      ],
    },
    related,
    cta: { title: 'Experience ', titleStrong: 'Expert Craftsmanship' },
  },
];
