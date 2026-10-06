/**
 * Collision Repair hub (/collision-repair/) — copy from the client's content doc.
 * Rendered by `ContentPageView`; the doc has no FAQs, so `faqs` and `related` are omitted.
 * Wording rule: OEMs are "participates in … programs" — never "certified" until the client confirms.
 * The ASE Certified logo has not been supplied yet, so its tile shows a grey placeholder.
 */
import type { ContentPage } from '~/data/contentPage';

export const collisionRepairHubPages: ContentPage[] = [
  {
    path: '/collision-repair/',
    seoTitle: 'Collision Repair in Waipahu, Oahu | Kuroda Autobody',
    metaDescription:
      'From minor dents to major collision damage, Kuroda Autobody in Waipahu repairs your vehicle safely and properly with I-CAR Gold Class training, OEM program participation and a Limited Lifetime Warranty.',
    eyebrow: 'Collision Repair',
    hero: {
      titleLead: 'From Minor Damage ',
      titleAccent: 'to Major Repairs.',
      body: 'Whether it’s a minor dent or major collision damage, Kuroda has the experience, training and technology to repair your vehicle safely, properly and to our high standards.',
    },
    sections: [
      {
        type: 'features',
        eyebrow: 'Our services',
        headingLead: 'Collision Repair ',
        headingStrong: 'Services',
        columns: 2,
        items: [
          {
            icon: 'collision',
            title: 'Collision & Body Repair',
            href: '/collision-repair/dent-repair/',
            description:
              'From dents, fenders and damaged doors or body panels to major collision work, our highly trained technicians bring skill and careful attention to fit, finish and detail.',
          },
          {
            icon: 'alignment',
            title: 'Structural & Frame Repair',
            href: '/collision-repair/frame-structural-repair/',
            description:
              'Advanced measuring and frame repair systems help us identify structural damage and restore your vehicle to proper specifications.',
          },
          {
            icon: 'shield',
            title: 'Bumper Repair & Replacement',
            href: '/collision-repair/bumper-repair/',
            description:
              'We repair or replace damaged bumpers and related exterior components to restore appearance, fit and function.',
          },
          {
            icon: 'paint',
            title: 'Auto Paint & Refinishing',
            href: '/collision-repair/auto-paint-refinishing/',
            description:
              'Waterborne auto refinishing and computerized color-matching help deliver a smooth, precise finish that blends seamlessly with your vehicle.',
          },
          {
            icon: 'calibration',
            title: 'ADAS Calibration',
            href: '/collision-repair/adas-calibration/',
            description:
              'When collision repairs affect cameras, radar or sensors, we coordinate required Advanced Driver Assistance System (ADAS) calibrations to help ensure these systems function properly.',
          },
          {
            icon: 'verified',
            title: 'Vehicle Diagnostic Scanning',
            href: '/collision-repair/diagnostic-scanning/',
            description:
              'Original-equipment and aftermarket diagnostic scanning helps identify electronic issues related to collision damage and verify vehicle systems throughout the repair process.',
          },
          {
            icon: 'camera',
            title: 'Auto Glass Replacement',
            href: '/collision-repair/auto-glass-replacement/',
            description:
              'When collision damage affects your vehicle’s glass, we coordinate the necessary repairs as part of the overall process.',
          },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'What to expect',
        headingLead: 'From Estimate to ',
        headingStrong: 'Finished Repair.',
        lead: 'We make the collision repair process as straightforward as possible, keeping you informed and helping with the details along the way.',
        steps: [
          {
            title: 'Schedule Your Estimate',
            description:
              'Choose a convenient time for us to inspect your vehicle, assess the damage and determine what repairs are needed.',
          },
          {
            title: 'Insurance Coordination',
            description:
              'We work with your insurance company to help with estimates, approvals and any additional damage discovered during the repair.',
          },
          {
            title: 'Drop Off & Rental Car',
            description:
              'When it’s time for repairs to begin, simply drop off your vehicle. If you need a rental car, we can arrange convenient on-site pickup.',
          },
          {
            title: 'Repair & Updates',
            description:
              'Our technicians follow proper repair procedures, while we keep you informed about your vehicle’s progress and expected completion.',
          },
          {
            title: 'Final Quality Check',
            description:
              'Before your vehicle is returned, we carefully inspect the completed work to make sure it meets our standards for quality, fit and finish.',
          },
          {
            title: 'Post-Repair Walkthrough',
            description:
              'Before you drive away, we walk around your vehicle with you, review the work completed and answer any questions you may have about the repair.',
          },
          {
            title: 'Back on the Road',
            description:
              'With your repair complete, it’s time to get back behind the wheel—with quality workmanship and warranty protection you can count on.',
          },
        ],
      },
      {
        type: 'action',
        eyebrow: 'Limited Lifetime Warranty',
        headingLead: 'We Stand Behind ',
        headingStrong: 'Our Work.',
        body: 'Kuroda provides Limited Lifetime Warranty coverage on qualifying metalwork and refinishing repairs for as long as you own your vehicle. Other repairs and parts carry specific warranty terms—all reflecting our commitment to doing the job right.',
        ctaText: 'View Warranty Details',
        ctaHref: '/warranty/',
      },
      {
        type: 'features',
        eyebrow: 'Repair Technology & Equipment',
        headingLead: 'The Right Tools for ',
        headingStrong: 'Today’s Vehicles.',
        lead: 'Modern collision repair requires advanced technology, accurate diagnostics and specialized equipment. Kuroda invests in the tools needed to perform precise repairs and verify proper vehicle function.',
        columns: 2,
        items: [
          {
            icon: 'alignment',
            title: '3D Electronic Measuring',
            description:
              'Our Car-O-Liner® 3D electronic measuring system precisely identifies structural damage and helps restore your vehicle to proper specifications.',
          },
          {
            icon: 'shield',
            title: 'OEM-Approved Welding',
            description:
              'Kuroda uses GYS spot and MIG welding equipment approved by vehicle manufacturers and designed for today’s materials and repair procedures.',
          },
          {
            icon: 'verified',
            title: 'Vehicle Diagnostics',
            description:
              'Original-equipment scanning capabilities for Toyota, Honda, Nissan, Kia, Hyundai, Subaru, Mazda, Ford, GM and Chrysler help us identify diagnostic issues related to collision damage and repair. We also use Bosch and Autoland aftermarket diagnostic systems.',
          },
          {
            icon: 'calibration',
            title: 'ADAS Calibration',
            description:
              'Depending on your vehicle and the systems affected, required ADAS calibrations are coordinated on site with qualified specialists or through the manufacturer’s dealership.',
          },
          {
            icon: 'paint',
            title: 'Digital Color Matching',
            description:
              'Our Sikkens® refinishing system uses digital color-matching technology to create a precise paint formula, while careful blending helps achieve a seamless finish.',
          },
        ],
      },
      {
        type: 'credentials',
        eyebrow: 'Certifications & Training',
        headingLead: 'Trained to ',
        headingStrong: 'Do It Right.',
        paragraphs: [
          'Today’s vehicles demand specialized knowledge and continually evolving repair skills. As an I-CAR Gold Class collision repair facility, Kuroda invests in the training needed to keep pace with changing vehicle technology, materials and repair procedures.',
          'Our ASE-certified technicians receive ongoing industry training, building on their hands-on experience as repair methods and vehicles evolve. That combination of proven skill and continued learning helps ensure your vehicle is repaired properly.',
        ],
        credentials: [
          { name: 'I-CAR Gold Class', logo: '/oem/icar-gold-class.png', logoW: 220, logoH: 110 },
          { name: 'ASE Certified' },
        ],
      },
      {
        type: 'credentials',
        eyebrow: 'OEM Collision Repair Capabilities',
        headingLead: 'Repaired with the ',
        headingStrong: 'Manufacturer in Mind.',
        paragraphs: [
          'Every vehicle is engineered differently, and proper repair means understanding the procedures and requirements established by the manufacturer.',
          'Kuroda participates in OEM collision repair programs for Honda, Acura, Nissan, GM and Chrysler, giving our technicians access to vehicle-specific repair information, procedures and standards.',
          'Combined with OEM-approved equipment, diagnostic capabilities and ongoing training, these resources help us make informed repair decisions based on how your vehicle was designed and built.',
        ],
        credentials: [
          { name: 'Honda', logo: '/oem/honda.png', logoW: 141, logoH: 110 },
          { name: 'Acura', logo: '/oem/acura.png', logoW: 141, logoH: 110 },
          { name: 'Nissan', logo: '/oem/nissan.png', logoW: 141, logoH: 110 },
          { name: 'GM', logo: '/oem/gm.png', logoW: 141, logoH: 110 },
          { name: 'Chrysler', logo: '/oem/fca.png', logoW: 141, logoH: 110 },
        ],
      },
    ],
    cta: { title: 'Schedule Your ', titleStrong: 'Estimate Today' },
  },
];
