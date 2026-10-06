/**
 * Collision Repair service pages — copy from `pages-content/Kuroda - Collision Repair Pages/*.docx`.
 * Rendered by `ContentPageView` (see ./contentPage.ts for the shape).
 */
import type { ContentPage, ContentPageInput } from '~/data/contentPage';

const pages: ContentPageInput[] = [
  {
    path: '/collision-repair/frame-structural-repair/',
    seoTitle: 'Frame & Structural Repair in Waipahu, Oahu | Kuroda Autobody',
    metaDescription:
      "Restore your vehicle's structural integrity after an accident. Kuroda Autobody uses Car-O-Liner 3D electronic measuring and GYS welding in Waipahu.",
    hero: {
      titleLead: 'Frame & Structural Repair ',
      titleAccent: 'in Waipahu',
      body: 'Modern vehicles use advanced unibody and frame designs to absorb impact energy during a collision. When structural components are compromised, Kuroda Autobody provides precise assessment and realignment for drivers across Oahu to restore your vehicle to factory specifications.',
    },
    sections: [
      {
        type: 'features',
        columns: 2,
        eyebrow: 'Structural integrity',
        headingLead: 'Restoring Factory Safety Standards ',
        headingStrong: 'After a Collision',
        lead: "A collision can twist, bend, or displace a vehicle's internal framework far beyond what is visible on the outer panels. Restoring this structural integrity requires advanced diagnostic technology and rigorous technical standards.",
        items: [
          {
            icon: 'calibration',
            title: '3D Electronic Measuring',
            description:
              'We utilize **Car-O-Liner 3D electronic measuring** systems to map vehicle geometry, pinpoint structural misalignment, and guide precise hydraulic realignment.',
          },
          {
            icon: 'shield',
            title: 'OEM-Approved Welding',
            description:
              'Our technicians employ **GYS spot and MIG welding** equipment approved by major vehicle manufacturers to ensure factory-level strength.',
          },
          {
            icon: 'claims',
            title: 'Hidden Damage Assessment',
            description:
              'We perform **thorough vehicle teardowns** early in the repair process to uncover underlying structural compromise before metalwork begins.',
          },
          {
            icon: 'alignment',
            title: 'Factory Specification Alignment',
            description:
              'Every chassis component is returned to **proper factory tolerances** to support suspension geometry and structural crash protection.',
          },
        ],
      },
      {
        type: 'table',
        eyebrow: 'Repair phases',
        headingLead: 'Understanding Structural Damage ',
        headingStrong: 'and Repair Phases',
        columns: ['Repair Phase', 'Technical Focus', 'Purpose'],
        rows: [
          [
            'Initial Assessment',
            'Visual inspection and partial disassembly',
            'Identify visible frame distortion and unibody stress points',
          ],
          [
            '3D Measurement',
            'Car-O-Liner electronic mapping',
            'Compare vehicle chassis geometry against exact factory blueprints',
          ],
          [
            'Structural Realignment',
            'Controlled hydraulic pulling',
            'Return distorted frame rails and pillars to original dimensions',
          ],
          [
            'Welding and Joining',
            'GYS spot and MIG equipment',
            'Secure replacement structural panels using manufacturer-specified methods',
          ],
        ],
      },
      {
        type: 'steps',
        eyebrow: 'From estimate to walkthrough',
        headingLead: 'Our Four-Step ',
        headingStrong: 'Structural Repair Process',
        steps: [
          {
            title: 'Schedule your estimate',
            description:
              'Bring your vehicle to our Waipahu facility to inspect the collision damage, assess structural alignment, and discuss repair options.',
          },
          {
            title: 'Insurance coordination',
            description:
              'We work directly with your insurer on estimates, approvals, and necessary supplements if additional hidden frame damage is found during teardown.',
          },
          {
            title: 'Repair and updates',
            description:
              'Technicians execute precise 3D measurement, structural pulling, and factory-approved welding while keeping you informed on repair progress.',
          },
          {
            title: 'Final quality check',
            description:
              'We inspect the completed structural work for fit, finish, and safety compliance before conducting your post-repair walkthrough.',
          },
        ],
      },
      {
        type: 'story',
        eyebrow: 'Our craftsmanship',
        headingLead: 'Precision Engineering Backed by ',
        headingAccent: 'Decades of Experience',
        paragraphs: [
          'Structural repair requires more than surface-level cosmetic fixes. Our approach combines advanced computerized diagnostic technology with decades of hands-on collision repair experience in Hawaii. Every structural adjustment is executed to match strict automotive safety standards, ensuring your vehicle protects you the way the manufacturer intended.',
        ],
      },
    ],
    faqs: {
      eyebrow: 'Frame repair FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'About Frame Repair',
      items: [
        {
          title: 'Can every bent car frame be safely repaired?',
          description:
            'No. Repair feasibility depends on the severity and location of the damage relative to manufacturer guidelines, and severely compromised components must be replaced.',
        },
        {
          title: 'Will a repaired frame affect how my car drives or handles?',
          description:
            'No. When measured and restored to exact factory specifications using 3D equipment, a repaired vehicle maintains proper alignment, predictable handling, and even tire wear.',
        },
        {
          title: 'Do I need to visit multiple shops for a structural estimate?',
          description:
            'No. You do not need multiple estimates unless your insurer requires them, as you retain the legal right to choose your repair shop.',
        },
        {
          title: 'How do you detect hidden structural damage behind exterior panels?',
          description:
            'We perform systematic disassembly and use computerized 3D measuring tools to identify internal shifting and stress that remain invisible from the exterior panels.',
        },
      ],
    },
    cta: {
      title: "Restore Your Vehicle's ",
      titleStrong: 'Structural Integrity',
    },
  },
  {
    path: '/collision-repair/auto-paint-refinishing/',
    seoTitle: 'Auto Paint & Refinishing in Waipahu, Oahu | Kuroda Autobody',
    metaDescription:
      "Restore your vehicle's factory finish with digital color matching and Sikkens waterborne paint at Kuroda Autobody in Waipahu.",
    hero: {
      titleLead: 'Auto Paint & Refinishing ',
      titleAccent: 'in Waipahu',
      body: "Restoring a vehicle's exterior finish requires precision technology and careful application. Kuroda Autobody utilizes advanced color-matching systems and waterborne refinishing materials to deliver a seamless finish for drivers across Oahu.",
    },
    sections: [
      {
        type: 'features',
        columns: 2,
        eyebrow: 'Factory finish',
        headingLead: 'Achieving a ',
        headingStrong: 'Precise Factory Finish',
        lead: 'Matching modern automotive paint involves more than selecting a standard color code. Recreating exact factory appearances requires advanced digital tools and controlled application environments.',
        items: [
          {
            icon: 'paint',
            title: 'Digital Color Matching',
            description:
              'We utilize the **Sikkens refinishing system** to digitally analyze paint formulas, ensuring accurate color matches for various vehicle makes and models.',
          },
          {
            icon: 'check',
            title: 'Waterborne Refinishing',
            description:
              'Our shop uses **Sikkens Autowave waterborne paint**, producing substantially lower volatile organic compound emissions than conventional solvent-based paints.',
          },
          {
            icon: 'collision',
            title: 'Seamless Panel Blending',
            description:
              'Skilled technicians carefully **blend new paint** into adjacent panels to eliminate visible boundary lines and restore uniform gloss.',
          },
          {
            icon: 'shield',
            title: 'Controlled Application',
            description:
              'Refinishing work is completed in **dedicated clean-air environments** designed to prevent debris contamination and achieve a smooth surface finish.',
          },
        ],
      },
      {
        type: 'table',
        eyebrow: 'Refinishing phases',
        headingLead: 'Understanding the ',
        headingStrong: 'Paint and Refinishing Process',
        columns: ['Refinishing Phase', 'Technical Focus', 'Purpose'],
        rows: [
          [
            'Color Analysis',
            'Digital spectrophotometer scanning',
            'Capture precise paint formulation data directly from the vehicle',
          ],
          ['Surface Prep', 'Sanding, priming, and masking', 'Create a smooth, flawless foundation for paint adhesion'],
          [
            'Paint Application',
            'Sikkens waterborne spray coating',
            'Apply basecoats and clear coats in controlled conditions',
          ],
          [
            'Curing and Polish',
            'Thermal baking and final inspection',
            'Harden the finish and verify gloss, depth, and uniformity',
          ],
        ],
      },
      {
        type: 'steps',
        eyebrow: 'From estimate to walkthrough',
        headingLead: 'Our Four-Step ',
        headingStrong: 'Refinishing Process',
        steps: [
          {
            title: 'Schedule your estimate',
            description:
              'Bring your vehicle to our Waipahu facility to assess paint damage and discuss refinishing options.',
          },
          {
            title: 'Insurance coordination',
            description:
              'We work directly with your insurer on estimates, approvals, and paint supplements required for collision repairs.',
          },
          {
            title: 'Application and blending',
            description:
              'Technicians execute digital color matching, surface preparation, waterborne paint application, and seamless panel blending.',
          },
          {
            title: 'Final quality check',
            description:
              'We inspect the completed finish under specialized lighting for color accuracy, texture, and gloss before your post-repair walkthrough.',
          },
        ],
      },
      {
        type: 'story',
        eyebrow: 'Our craftsmanship',
        headingLead: 'Mastering the Craft of ',
        headingAccent: 'Automotive Refinishing',
        paragraphs: [
          'Achieving a flawless exterior finish requires more than basic painting tools. Our approach combines advanced Sikkens digital color-matching technology with decades of hands-on collision repair experience in Hawaii. Every step of the refinishing process is executed with careful attention to detail, ensuring your vehicle looks as good as it did before the accident.',
        ],
      },
    ],
    faqs: {
      eyebrow: 'Auto paint FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'About Auto Paint',
      items: [
        {
          title: 'Can you match the exact factory paint color of my vehicle?',
          description:
            "Yes. We use digital color-matching technology and manufacturer color codes to formulate a precise match for your vehicle's specific finish.",
        },
        {
          title: 'What are the benefits of waterborne automotive paint?',
          description:
            'Waterborne paint delivers exceptional color depth and durability while substantially lowering volatile organic compound emissions compared to conventional solvent-based finishes.',
        },
        {
          title: 'Will the new paint blend seamlessly with the rest of the car?',
          description:
            'Yes. Our technicians carefully blend refinished areas into adjacent panels so the repair remains unnoticeable under normal lighting conditions.',
        },
        {
          title: 'Do I need to schedule an appointment for a paint estimate?',
          description:
            'Yes. Estimates are handled by appointment to ensure our team can thoroughly inspect your vehicle and provide an accurate repair plan.',
        },
      ],
    },
    cta: {
      title: "Restore Your Vehicle's ",
      titleStrong: 'Exterior Finish',
    },
  },
  {
    path: '/collision-repair/bumper-repair/',
    seoTitle: 'Bumper Repair & Replacement in Waipahu, Oahu | Kuroda Autobody',
    metaDescription:
      'Expert bumper repair and replacement services in Waipahu, Oahu. Kuroda Autobody restores appearance, fit, and modern sensor alignment.',
    hero: {
      titleLead: 'Bumper Repair & Replacement ',
      titleAccent: 'in Waipahu',
      body: 'Modern vehicle bumpers absorb impact forces and house complex safety electronics such as parking sensors and collision cameras. When a bumper sustains impact damage, Kuroda Autobody provides expert repair or replacement for drivers across Oahu, restoring both exterior appearance and proper mechanical function.',
    },
    sections: [
      {
        type: 'features',
        columns: 2,
        eyebrow: 'Appearance and function',
        headingLead: 'Restoring Bumper ',
        headingStrong: 'Appearance and Function',
        lead: 'Repairing or replacing a damaged bumper requires careful attention to material construction, structural alignment, and integrated electronic components.',
        items: [
          {
            icon: 'claims',
            title: 'Repair Versus Replacement',
            description:
              'We assess the severity of cracks, scrapes, and backing reinforcement to determine whether a bumper can be **safely repaired** or requires full replacement.',
          },
          {
            icon: 'calibration',
            title: 'Integrated Sensor Alignment',
            description:
              'Modern bumpers contain **built-in parking sensors and radar transceivers** that require coordinated **ADAS Calibration** following a collision.',
          },
          {
            icon: 'alignment',
            title: 'Factory Fit and Finish',
            description:
              'Replacement covers and repaired components are fitted to **original manufacturer specifications** to maintain proper vehicle clearance and body lines.',
          },
          {
            icon: 'check',
            title: 'Associated Component Inspection',
            description:
              'We inspect energy absorbers, brackets, and mounting reinforcements behind the cover to ensure **complete structural integrity**.',
          },
        ],
      },
      {
        type: 'table',
        eyebrow: 'Repair vs. replacement',
        headingLead: 'Comparing Repair Versus ',
        headingStrong: 'Replacement Approaches',
        columns: ['Service Phase', 'Repair Approach', 'Replacement Approach'],
        rows: [
          [
            'Damage Evaluation',
            'Assess surface scrapes, minor dents, and plastic deformation',
            'Identify severe tears, structural backing failure, or crushed reinforcement',
          ],
          [
            'Component Prep',
            'Clean, heat-reshape, and sand damaged areas of the original cover',
            'Procure OEM-compliant replacement bumper covers and reinforcement bars',
          ],
          [
            'Finishing Work',
            'Prime, paint, and blend into adjacent body panels',
            'Paint and finish new cover to match factory specifications',
          ],
          [
            'Sensor Integration',
            'Reinstall existing parking sensors and calibration brackets',
            'Mount sensors and transceivers into new covers with coordinated ADAS checks',
          ],
        ],
      },
      {
        type: 'steps',
        eyebrow: 'From estimate to walkthrough',
        headingLead: 'Our Four-Step ',
        headingStrong: 'Bumper Service Process',
        steps: [
          {
            title: 'Schedule your estimate',
            description:
              'Bring your vehicle to our Waipahu facility to inspect the bumper damage and discuss repair or replacement options.',
          },
          {
            title: 'Insurance coordination',
            description:
              'We work directly with your insurer on estimates, approvals, and necessary replacement parts for your claim.',
          },
          {
            title: 'Repair and reassembly',
            description:
              'Technicians execute precise plastic repair, painting, component mounting, and structural reinforcement checks.',
          },
          {
            title: 'Final quality check',
            description:
              'We inspect the completed bumper assembly for proper fit, finish, and sensor alignment before your post-repair walkthrough.',
          },
        ],
      },
      {
        type: 'story',
        eyebrow: 'Our craftsmanship',
        headingLead: 'Precision Engineering Backed by ',
        headingAccent: 'Decades of Experience',
        paragraphs: [
          "Bumper service requires more than a simple cosmetic cover swap. Our approach combines accurate structural assessment with decades of hands-on collision repair experience in Hawaii. Every repair is executed with careful attention to detail, ensuring your vehicle's safety features and exterior appearance are restored correctly.",
        ],
      },
    ],
    faqs: {
      eyebrow: 'Bumper repair FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'About Bumper Repair',
      items: [
        {
          title: 'Can every damaged car bumper be repaired?',
          description:
            'No. The decision to repair or replace depends on the extent of the plastic deformation, tearing, and damage to internal reinforcement bars relative to manufacturer guidelines.',
        },
        {
          title: 'Do modern bumpers affect my car safety sensors?',
          description:
            'Yes. Many modern bumpers house parking sensors, blind-spot radar, or cameras that require careful handling and coordinated calibration after a collision.',
        },
        {
          title: 'Do I need to visit multiple shops for a bumper estimate?',
          description:
            'No. You do not need multiple estimates unless your insurer requires them, as you retain the legal right to choose your repair shop.',
        },
        {
          title: 'How do you match the paint on a new bumper?',
          description:
            "We utilize advanced digital color-matching systems and Sikkens refinishing materials to blend new bumper paint seamlessly with your vehicle's existing exterior finish.",
        },
      ],
    },
    cta: {
      title: 'Restore Your Bumper ',
      titleStrong: 'Fit and Function',
    },
  },
  {
    path: '/collision-repair/dent-repair/',
    seoTitle: 'Dent & Body Repair in Waipahu, Oahu | Kuroda Autobody',
    metaDescription:
      "Expert auto body repair for dents, fenders, doors, and panels in Waipahu, Oahu. Kuroda Autobody restores your vehicle's finish and structure.",
    hero: {
      titleLead: 'Dent & Body Repair ',
      titleAccent: 'in Waipahu',
      body: 'From minor door dings and fender scrapes to major body panel damage, vehicle exterior repairs require precision sheet metal work and meticulous alignment. Kuroda Autobody provides comprehensive auto body repair for drivers across Oahu, restoring the form and finish of your vehicle.',
    },
    sections: [
      {
        type: 'features',
        columns: 2,
        eyebrow: 'Exterior panels',
        headingLead: 'Restoring Exterior Panels ',
        headingStrong: 'and Body Lines',
        lead: 'Repairing damaged body panels involves reshaping metal components, aligning door gaps, and preparing exterior surfaces to factory standards.',
        items: [
          {
            icon: 'collision',
            title: 'Comprehensive Panel Work',
            description:
              'We service **dents, fenders, doors, and body panels** affected by everyday parking mishaps or collision impact.',
          },
          {
            icon: 'alignment',
            title: 'Sheet Metal Realignment',
            description:
              'Damaged panels are carefully worked back to their **original contours** using specialized hand tools and forming equipment.',
          },
          {
            icon: 'claims',
            title: 'Panel Replacement',
            description:
              'When metal stretching or tearing prevents safe repair, we install **OEM-compliant replacement panels** to maintain structural integrity.',
          },
          {
            icon: 'check',
            title: 'Gap and Fit Alignment',
            description:
              'Every door, hood, and fender is adjusted to **exact factory clearances** to ensure smooth closing and proper weather sealing.',
          },
        ],
      },
      {
        type: 'table',
        eyebrow: 'Repair phases',
        headingLead: 'Understanding ',
        headingStrong: 'Auto Body Repair Phases',
        columns: ['Repair Phase', 'Technical Focus', 'Purpose'],
        rows: [
          [
            'Surface Inspection',
            'Assessing metal depth and panel stress',
            'Identify surface creases, stretched metal, and underlying reinforcement issues',
          ],
          [
            'Panel Restoration',
            'Hammering, dollying, and reshaping',
            'Return deformed exterior metal back to original factory contours',
          ],
          [
            'Surface Preparation',
            'Sanding, filling, and priming',
            'Create a smooth, reliable foundation for subsequent paint application',
          ],
          [
            'Fit Verification',
            'Gap alignment and hardware check',
            'Ensure doors and panels latch smoothly and align with surrounding body lines',
          ],
        ],
      },
      {
        type: 'steps',
        eyebrow: 'From estimate to walkthrough',
        headingLead: 'Our Four-Step ',
        headingStrong: 'Body Repair Process',
        steps: [
          {
            title: 'Schedule your estimate',
            description:
              'Bring your vehicle to our Waipahu facility to inspect exterior damage and discuss repair options.',
          },
          {
            title: 'Insurance coordination',
            description:
              'We work directly with your insurer on estimates, approvals, and necessary panel replacement parts.',
          },
          {
            title: 'Repair and restoration',
            description:
              'Technicians execute precise metal straightening, panel replacement, surface priming, and body line alignment.',
          },
          {
            title: 'Final quality check',
            description:
              'We inspect the completed body work under specialized lighting for surface smoothness and proper alignment before your walkthrough.',
          },
        ],
      },
      {
        type: 'story',
        eyebrow: 'Our craftsmanship',
        headingLead: 'Mastering the Craft of ',
        headingAccent: 'Auto Body Repair',
        paragraphs: [
          'Restoring body panels requires more than basic cosmetic patching. Our approach combines traditional metal-working skill with decades of hands-on collision repair experience in Hawaii. Every fender, door, and quarter panel is serviced with careful attention to detail, ensuring your vehicle looks and performs as intended.',
        ],
      },
    ],
    faqs: {
      eyebrow: 'Body repair FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'About Body Repair',
      items: [
        {
          title: 'Can all minor dents and door dings be repaired?',
          description:
            "Yes. Most minor dings and creases can be reshaped and refinished during standard body repair work to restore your vehicle's smooth exterior appearance.",
        },
        {
          title: 'Do you replace damaged body panels when repair is unsafe?',
          description:
            "Yes. If a panel's structural metal is overstretched, torn, or compromised, we replace it with compliant components following manufacturer guidelines.",
        },
        {
          title: 'Do I need to visit multiple shops for a body repair estimate?',
          description:
            'No. You do not need multiple estimates unless your insurer requires them, as you retain the legal right to choose your repair shop.',
        },
        {
          title: 'How do you ensure repainted panels match the rest of the car?',
          description:
            'We utilize advanced digital color-matching systems and Sikkens refinishing materials to blend new paint smoothly into adjacent body panels.',
        },
      ],
    },
    cta: {
      title: "Restore Your Vehicle's ",
      titleStrong: 'Exterior Body',
    },
  },
  {
    path: '/collision-repair/adas-calibration/',
    seoTitle: 'ADAS Calibration Services in Waipahu, Oahu | Kuroda Autobody',
    metaDescription:
      'Professional ADAS calibration coordination for cameras, radar, and sensors after a collision at Kuroda Autobody in Waipahu.',
    hero: {
      titleLead: 'ADAS Calibration ',
      titleAccent: 'in Waipahu',
      body: 'Advanced Driver Assistance Systems connect cameras, radar units, and computer networks to help protect drivers on the road. When a collision disrupts these sensitive electronics, Kuroda Autobody coordinates professional calibration services for drivers across Oahu to ensure proper system performance.',
    },
    sections: [
      {
        type: 'features',
        columns: 2,
        eyebrow: 'Safety systems',
        headingLead: 'Restoring Advanced Safety ',
        headingStrong: 'and Electronic Systems',
        lead: 'Collision repairs frequently disturb the precise alignment of exterior cameras and radar transceivers. Restoring factory functionality requires targeted coordination and specialized calibration procedures.',
        items: [
          {
            icon: 'chat',
            title: 'Coordinated Specialist Services',
            description:
              'Calibrations are **coordination-managed by our team**, performed either on-site with qualified specialists or through the manufacturer dealership depending on your vehicle.',
          },
          {
            icon: 'calibration',
            title: 'Camera and Radar Realignment',
            description:
              'Everyday repairs, such as realigning a **mirror camera or bumper radar** after a minor impact, require exact electronic resetting to read road conditions accurately.',
          },
          {
            icon: 'shield',
            title: 'Manufacturer Procedure Adherence',
            description:
              'Every calibration follows **strict automaker guidelines**, ensuring safety sensors communicate properly with vehicle computer networks.',
          },
          {
            icon: 'check',
            title: 'Verification and Testing',
            description:
              'Completed calibrations are verified alongside diagnostic scans to ensure **flawless electronic performance** before vehicle delivery.',
          },
        ],
      },
      {
        type: 'table',
        eyebrow: 'Calibration phases',
        headingLead: 'Understanding ',
        headingStrong: 'ADAS Calibration Phases',
        columns: ['Calibration Phase', 'Technical Focus', 'Purpose'],
        rows: [
          [
            'System Identification',
            'Pre-repair scan and sensor audit',
            'Determine which cameras, radar units, or sensors require post-collision calibration',
          ],
          [
            'Mechanical Repair',
            'Structural and body realignment',
            'Restore proper physical mounting angles for all sensors and brackets',
          ],
          [
            'Specialist Coordination',
            'Scheduling qualified technicians',
            'Arrange on-site specialist work or dealership calibration according to OEM rules',
          ],
          [
            'Post-Calibration Check',
            'Electronic verification and testing',
            'Confirm that safety systems report normal operating status',
          ],
        ],
      },
      {
        type: 'steps',
        eyebrow: 'From estimate to walkthrough',
        headingLead: 'Our Four-Step ',
        headingStrong: 'Calibration Coordination Process',
        steps: [
          {
            title: 'Schedule your estimate',
            description:
              'Bring your vehicle to our Waipahu facility to assess collision damage and identify affected electronic safety systems.',
          },
          {
            title: 'Insurance coordination',
            description:
              'We work directly with your insurer on estimates, approvals, and necessary calibration services for your claim.',
          },
          {
            title: 'Repair and calibration coordination',
            description:
              'Technicians complete mechanical repairs and coordinate required ADAS calibrations with qualified specialists or dealerships.',
          },
          {
            title: 'Final quality check',
            description:
              'We inspect the completed vehicle and review diagnostic verification reports before your post-repair walkthrough.',
          },
        ],
      },
      {
        type: 'story',
        eyebrow: 'Our craftsmanship',
        headingLead: 'Mastering the Craft of ',
        headingAccent: 'Electronic Coordination',
        paragraphs: [
          "Restoring modern safety technology requires more than mechanical skill. Our approach combines meticulous collision repair experience with precise coordination of specialist calibration services in Hawaii. Every step is handled with careful attention to detail, ensuring your vehicle's electronic safety features operate exactly as intended.",
        ],
      },
    ],
    faqs: {
      eyebrow: 'ADAS calibration FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'About ADAS Calibration',
      items: [
        {
          title: 'Do you perform ADAS calibrations directly in-house?',
          description:
            "No. Calibrations are coordinated on-site with qualified specialists or through the manufacturer's dealership, depending on your specific vehicle make and model.",
        },
        {
          title: 'When is an ADAS calibration required after an accident?',
          description:
            'Calibration is necessary whenever collision repairs disturb components housing cameras or radar, such as windshield replacements, bumper repairs, or structural realignment.',
        },
        {
          title: 'Do I need to visit multiple shops for calibration coordination?',
          description:
            'No. We coordinate the entire repair process, including necessary calibration services, so you do not need to visit separate facilities.',
        },
        {
          title: 'Will my insurance cover ADAS calibration costs?',
          description:
            'Required calibrations are included in the repair estimate we submit to your insurer. Your insurance company decides what your policy covers, so confirm with your adjuster.',
        },
      ],
    },
    cta: {
      title: 'Coordinate Your ',
      titleStrong: 'Vehicle Safety Calibration',
    },
  },
  {
    path: '/collision-repair/diagnostic-scanning/',
    seoTitle: 'Vehicle Diagnostic Scanning in Waipahu, Oahu | Kuroda Autobody',
    metaDescription:
      'OEM and aftermarket diagnostic scanning for pre- and post-repair verification at Kuroda Autobody in Waipahu, Oahu.',
    hero: {
      titleLead: 'Vehicle Diagnostic Scanning ',
      titleAccent: 'in Waipahu',
      body: 'Behind every exterior dent lies a complex network of computerized modules and electronic sensors. When an accident disrupts these onboard systems, Kuroda Autobody performs rigorous diagnostic scanning for drivers across Oahu to uncover hidden faults and verify complete vehicle safety.',
    },
    sections: [
      {
        type: 'features',
        columns: 2,
        eyebrow: 'Pre and post scans',
        headingLead: 'Verifying Electronic Systems ',
        headingStrong: 'Through Pre and Post Scans',
        lead: 'Restoring a vehicle safely requires understanding how computer networks respond to impact forces. Diagnostic scanning uncovers hidden trouble codes and confirms that vehicle systems operate properly before handover.',
        items: [
          {
            icon: 'claims',
            title: 'Pre-Repair Scanning',
            description:
              'Initial scans identify **hidden electronic faults and stored trouble codes** before repair work begins, shaping an accurate restoration plan.',
          },
          {
            icon: 'check',
            title: 'Post-Repair Scanning',
            description:
              'Final scans verify that **all vehicle modules and safety sensors** report normal operating status after repairs are completed.',
          },
          {
            icon: 'shield',
            title: 'Extensive OEM Capabilities',
            description:
              'We utilize **original-equipment scanning for Toyota, Honda, Nissan, Kia, Hyundai, Subaru, Mazda, Ford, GM, and Chrysler**.',
          },
          {
            icon: 'calibration',
            title: 'Advanced Aftermarket Systems',
            description:
              'Our technicians also employ **Bosch and Autoland diagnostic equipment** to service a wide range of additional vehicle makes and models.',
          },
        ],
      },
      {
        type: 'table',
        eyebrow: 'Scan phases',
        headingLead: 'Understanding ',
        headingStrong: 'Diagnostic Scanning Phases',
        columns: ['Scan Phase', 'Technical Focus', 'Purpose'],
        rows: [
          [
            'Initial Assessment',
            'Pre-repair electronic module query',
            'Uncover hidden trouble codes and assess electronic damage before teardown',
          ],
          [
            'Mid-Repair Check',
            'Component communication audit',
            'Verify module responses during structural or mechanical realignment',
          ],
          [
            'Final Verification',
            'Post-repair system diagnostic scan',
            'Confirm that all safety systems and computer codes clear successfully',
          ],
          [
            'Documentation',
            'Diagnostic report generation',
            'Record scan results to ensure compliance with manufacturer repair standards',
          ],
        ],
      },
      {
        type: 'steps',
        eyebrow: 'From estimate to walkthrough',
        headingLead: 'Our Four-Step ',
        headingStrong: 'Diagnostic Scanning Process',
        steps: [
          {
            title: 'Schedule your estimate',
            description:
              'Bring your vehicle to our Waipahu facility to assess damage and initiate comprehensive diagnostic evaluations.',
          },
          {
            title: 'Insurance coordination',
            description:
              'We work directly with your insurer on estimates, approvals, and required diagnostic procedures for your claim.',
          },
          {
            title: 'Scanning and verification',
            description:
              'Technicians perform pre- and post-repair scans using manufacturer-approved diagnostic equipment.',
          },
          {
            title: 'Final quality check',
            description:
              'We review diagnostic verification reports alongside our physical inspection before your post-repair walkthrough.',
          },
        ],
      },
      {
        type: 'story',
        eyebrow: 'Our craftsmanship',
        headingLead: 'Mastering the Craft of ',
        headingAccent: 'Electronic Diagnostics',
        paragraphs: [
          "Validating a repair requires more than visual inspection. Our approach combines advanced computerized scanning technology with decades of collision repair experience in Hawaii. Every diagnostic check is executed with careful attention to detail, ensuring your vehicle's computer networks function safely and correctly.",
        ],
      },
    ],
    faqs: {
      eyebrow: 'Diagnostic scanning FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'About Diagnostic Scanning',
      items: [
        {
          title: 'Why are pre- and post-repair diagnostic scans necessary?',
          description:
            'Scans reveal hidden electronic faults before work begins and confirm that all computer modules and safety systems function properly before your vehicle is returned.',
        },
        {
          title: 'Which vehicle brands do you support with OEM diagnostic equipment?',
          description:
            'We provide original-equipment scanning capabilities for Toyota, Honda, Nissan, Kia, Hyundai, Subaru, Mazda, Ford, GM, and Chrysler.',
        },
        {
          title: 'Do you use aftermarket diagnostic systems as well?',
          description:
            'Yes. In addition to OEM equipment, we utilize Bosch and Autoland aftermarket diagnostic systems to service a broad range of vehicle makes and models.',
        },
        {
          title: 'Will my insurance cover necessary diagnostic scanning?',
          description:
            'Required pre- and post-repair scans are included in the estimate we submit to your insurer. Your insurance company confirms what your policy covers.',
        },
      ],
    },
    cta: {
      title: 'Verify Your Vehicle ',
      titleStrong: 'Electronics Today',
    },
  },
  {
    path: '/collision-repair/auto-glass-replacement/',
    seoTitle: 'Collision Auto Glass Replacement in Waipahu, Oahu | Kuroda Autobody',
    metaDescription:
      'Integrated auto glass and windshield replacement for collision repairs in Waipahu, Oahu. Kuroda Autobody restores structural safety and clear visibility.',
    hero: {
      titleLead: 'Auto Glass Replacement ',
      titleAccent: 'in Waipahu',
      body: 'Windshields and side windows serve as vital structural components that support roof strength and airbag deployment during an accident. At Kuroda Autobody, auto glass replacements are handled as part of our comprehensive collision repair services, ensuring structural safety and clear visibility for drivers across Oahu.',
    },
    sections: [
      {
        type: 'features',
        columns: 2,
        eyebrow: 'Windshields and side glass',
        headingLead: 'Integrated Auto Glass ',
        headingStrong: 'and Windshield Restorations',
        lead: 'Replacing damaged vehicle glass during a collision requires precision removal, proper adhesive application, and careful coordination with embedded safety systems.',
        items: [
          {
            icon: 'collision',
            title: 'Collision-Integrated Service',
            description:
              'Auto glass replacement is handled as part of your complete collision repair, rather than standalone mobile glass service.',
          },
          {
            icon: 'check',
            title: 'OEM-Compliant Glass',
            description:
              'Replacement uses **factory-grade windshields** and **side windows** designed to meet exact vehicle manufacturer specifications for fit and safety.',
          },
          {
            icon: 'shield',
            title: 'Structural Bonding',
            description:
              'High-grade urethane adhesives are applied using **controlled bonding techniques** to ensure the windshield acts as a reliable structural support member.',
          },
          {
            icon: 'calibration',
            title: 'ADAS Camera Coordination',
            description:
              'Windshield replacements frequently involve forward-facing safety cameras that require coordinated **ADAS Calibration** to maintain driver assistance features.',
          },
        ],
      },
      {
        type: 'table',
        eyebrow: 'Replacement phases',
        headingLead: 'Understanding ',
        headingStrong: 'Auto Glass Replacement Phases',
        columns: ['Replacement Phase', 'Technical Focus', 'Purpose'],
        rows: [
          [
            'Glass Assessment',
            'Evaluating damage extent and bonding',
            'Determine whether window replacement is necessary during collision restoration',
          ],
          [
            'Removal and Cleanup',
            'Stripping old adhesive and shattered glass',
            'Clear damaged panes without scratching vehicle paint or interior trim',
          ],
          [
            'Pinchweld Preparation',
            'Cleaning, priming, and surface prep',
            'Ensure optimal adhesion for the new urethane seal and windshield',
          ],
          [
            'Glass Installation',
            'Precision setting and curing time',
            'Secure the new glass in position and allow adhesives to cure safely',
          ],
        ],
      },
      {
        type: 'steps',
        eyebrow: 'From estimate to walkthrough',
        headingLead: 'Our Four-Step ',
        headingStrong: 'Auto Glass Process',
        steps: [
          {
            title: 'Schedule your estimate',
            description:
              'Bring your vehicle to our Waipahu facility to assess collision damage, including structural glass replacement.',
          },
          {
            title: 'Insurance coordination',
            description:
              'We work directly with your insurer on estimates, approvals, and glass replacement coverage for your claim.',
          },
          {
            title: 'Glass installation',
            description:
              'We coordinate removal and installation as part of your collision repair, then arrange any required sensor calibration.',
          },
          {
            title: 'Final quality check',
            description:
              'We inspect the completed installation for proper seal integrity, clean appearance, and clear visibility before your walkthrough.',
          },
        ],
      },
      {
        type: 'story',
        eyebrow: 'Our craftsmanship',
        headingLead: 'Mastering the Craft of ',
        headingAccent: 'Auto Glass Service',
        paragraphs: [
          "Replacing auto glass requires more than a simple pane swap. Our approach combines careful coordination of glass replacement with decades of hands-on collision repair experience in Hawaii. Every glass service is executed with careful attention to detail, ensuring your vehicle's safety features and weather seals are restored correctly.",
        ],
      },
    ],
    faqs: {
      eyebrow: 'Auto glass FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'About Auto Glass Replacement',
      items: [
        {
          title: 'Do you provide standalone windshield chip repairs or mobile glass service?',
          description:
            'No. We handle auto glass replacement as part of our comprehensive collision repair services rather than standalone mobile glass repairs.',
        },
        {
          title: 'Do windshield replacements affect my car safety cameras?',
          description:
            'Yes. Many modern windshields house forward-facing cameras that require coordinated calibration after a glass replacement.',
        },
        {
          title: 'Do I need to visit a separate glass shop for my collision repair?',
          description:
            'No. We handle glass replacement as an integrated part of your overall collision repair process at our Waipahu facility.',
        },
        {
          title: 'How long does urethane adhesive take to cure?',
          description:
            'Urethane adhesives require specific curing times under controlled conditions to ensure the windshield achieves full structural strength before driving.',
        },
      ],
    },
    cta: {
      title: "Restore Your Vehicle's ",
      titleStrong: 'Glass and Safety',
    },
  },
];

/** Each page links to its six siblings (sitemap order). */
export const collisionRepairPages: ContentPage[] = pages.map((page) => ({
  ...page,
  eyebrow: 'Collision Repair',
  related: {
    eyebrow: 'Collision Repair',
    headingLead: 'Explore Related ',
    headingStrong: 'Collision Services',
    paths: pages.filter((other) => other.path !== page.path).map((other) => other.path),
  },
}));
