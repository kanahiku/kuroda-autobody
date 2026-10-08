/**
 * OEM program pages under Certifications & Training — /certifications/{honda,acura,nissan,gm,chrysler}/
 * (copy: Kuroda – Why Kuroda Pages, `_certifications_<oem>_.docx`). Rendered by `ContentPageView`.
 * Every page shares one frame (`oemPage`); only the copy differs per OEM.
 * Wording rule: Kuroda "participates in" OEM programs — never "certified" until the client confirms.
 */
import type { ContentPage, FaqItem, FeatureItem } from '~/data/contentPage';

type Four<T> = [T, T, T, T];
type Three<T> = [T, T, T];

interface OemCopy {
  slug: string;
  /** Short brand name used in links and headings, e.g. `Honda`. */
  name: string;
  /** Brand name as written in the hero H1 (e.g. `General Motors`). */
  heroName?: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  photoLabel: string;
  /** What the program gives our technicians — three icon columns. */
  program: Three<FeatureItem>;
  /** Why brand-specific procedures matter — story block. */
  why: { accent: string; paragraphs: string[] };
  /** Kuroda experience heading ("Experience" by default). */
  experienceWord?: string;
  experience: Four<FeatureItem>;
  faqs: Three<FaqItem>;
  cta: { title: string; titleStrong: string };
}

const SITE_LEAD =
  'Operating from our single 28,000-square-foot facility in the Gentry Waipio Business Park since 1938, we combine Hawaii family-owned heritage with rigorous technical standards:';

const ORDER = ['honda', 'acura', 'nissan', 'gm', 'chrysler'];

const relatedFor = (slug: string): NonNullable<ContentPage['related']> => ({
  eyebrow: 'Certifications & programs',
  headingLead: 'Explore Other ',
  headingStrong: 'Certifications & Programs',
  paths: ORDER.filter((s) => s !== slug).map((s) => `/certifications/${s}/`),
});

function oemPage(c: OemCopy): ContentPage {
  const { name } = c;
  return {
    path: `/certifications/${c.slug}/`,
    seoTitle: c.seoTitle,
    metaDescription: c.metaDescription,
    eyebrow: 'Why Kuroda',
    hero: {
      titleLead: `${c.heroName ?? name} OEM Collision Repair Program `,
      titleAccent: 'in Waipahu',
      body: c.intro,
      photoLabel: c.photoLabel,
    },
    sections: [
      {
        type: 'features',
        columns: 3,
        eyebrow: `${name} program`,
        headingLead: `What the ${name} Program `,
        headingStrong: 'Gives Our Technicians',
        items: [...c.program],
      },
      {
        type: 'story',
        eyebrow: 'Factory procedures',
        headingLead: `Why ${name}-Specific Procedures `,
        headingAccent: c.why.accent,
        paragraphs: c.why.paragraphs,
        photoLabel: `Kuroda Autobody technician repairing a ${name} vehicle`,
      },
      {
        type: 'features',
        columns: 2,
        eyebrow: 'The Kuroda difference',
        headingLead: `The Kuroda Autobody ${c.experienceWord ?? 'Experience'} `,
        headingStrong: `for ${name} Owners`,
        lead: SITE_LEAD,
        items: [...c.experience],
      },
    ],
    faqs: {
      eyebrow: `${name} FAQ`,
      titleLead: 'Frequently Asked Questions ',
      titleStrong: `About ${name} Repairs`,
      items: [...c.faqs],
    },
    related: relatedFor(c.slug),
    cta: c.cta,
  };
}

const rental = (description: string, title = 'On-Site Rental Support'): FeatureItem => ({
  icon: 'rental',
  title,
  description,
});
const warranty = (description: string): FeatureItem => ({
  icon: 'shield',
  title: 'Written Lifetime Warranty',
  description,
});
const handover = (description: string): FeatureItem => ({
  icon: 'check',
  title: 'Detailed Handover Review',
  description,
});
const advocacy = (title: string, description: string): FeatureItem => ({ icon: 'claims', title, description });

const oemCopy: OemCopy[] = [
  // ─── Honda ─────────────────────────────────────────────────────────────────
  {
    slug: 'honda',
    name: 'Honda',
    seoTitle: 'Honda OEM Collision Repair Program | Kuroda Autobody Waipahu',
    metaDescription:
      'Kuroda Autobody participates in the Honda OEM collision repair program in Waipahu, Oahu, using factory ACE body structure guidelines to restore your vehicle safely.',
    intro:
      'Modern Honda vehicles from the Civic and Accord to the CR-V and Pilot are engineered around proprietary safety frameworks like the Advanced Compatibility Engineering (ACE) body structure. Kuroda Autobody participates in the Honda OEM collision repair program, granting our Waipahu technicians direct, unhindered access to official factory repair manuals, structural dimensions, and brand-specific technical standards.',
    photoLabel: 'Honda vehicle in the Kuroda Autobody collision repair shop',
    program: [
      {
        icon: 'alignment',
        title: 'ACE Structure Blueprints',
        description:
          'Official engineering schematics that map out how impact energy is deflected around the passenger cabin, ensuring frame pulls and structural replacements maintain original crash-test margins.',
      },
      {
        icon: 'shield',
        title: 'High-Strength Steel Protocols',
        description:
          'Honda utilizes a strategic mix of high-tensile and ultra-high-strength steels. Program data dictates exact spot-weld locations, MIG brazing requirements, and bonding agents so the frame retains its designed rigidity.',
      },
      {
        icon: 'calibration',
        title: 'Honda Sensing & ADAS Alignment Data',
        description:
          'Factory specifications guide the physical reassembly and calibration readiness of integrated camera and radar arrays embedded in Honda bumpers and windshields.',
      },
    ],
    why: {
      accent: 'Matter for Your Safety',
      paragraphs: [
        'A Honda is not built like other vehicles. Its unibody architecture relies on calibrated crush zones designed to absorb frontal and side-impact forces progressively.',
        "If a shop uses generic, one-size-fits-all repair methods, those energy-absorption pathways can fail during a secondary collision. By utilizing authentic Honda repair workflows, our technicians ensure that your vehicle's structural integrity, occupant safety margins, and remaining manufacturer warranties are fully preserved.",
      ],
    },
    experience: [
      advocacy(
        'ACE-Aligned Insurance Advocacy',
        'We work directly with your insurance provider, submitting precise documentation and supplement requests grounded in official Honda Advanced Compatibility Engineering (ACE) repair procedures.'
      ),
      rental(
        'Eligible customers enjoy seamless on-site Enterprise rental car access right at our Waipahu location to keep you moving while your Civic, Accord, or CR-V is serviced.'
      ),
      warranty(
        "All qualifying workmanship on your Honda's unibody and high-strength steel frame is backed by our lifetime warranty for as long as you own the vehicle."
      ),
      handover(
        'Before you drive away, we walk you through your completed repairs using an annotated work order and before-and-after photos, verifying that all safety systems and structural welds meet factory specifications.'
      ),
    ],
    faqs: [
      {
        title: 'What does Honda OEM program participation mean for my repair?',
        description:
          'It means our technicians use official manufacturer repair procedures, structural specifications, and technical standards specific to Honda vehicles.',
      },
      {
        title: 'Will OEM parts be used on my Honda?',
        description:
          "We work with your insurance provider and follow repair guidelines to source appropriate parts that maintain your vehicle's safety and structural integrity.",
      },
      {
        title: 'Are your technicians trained on Honda vehicles?',
        description:
          'Yes. Our team combines ongoing industry training with direct access to Honda repair documentation to handle complex unibody and frame restorations.',
      },
    ],
    cta: { title: 'Restore Your Honda ', titleStrong: 'to Factory Standards' },
  },

  // ─── Acura ─────────────────────────────────────────────────────────────────
  {
    slug: 'acura',
    name: 'Acura',
    seoTitle: 'Acura OEM Collision Repair Program | Kuroda Autobody Waipahu',
    metaDescription:
      'Kuroda Autobody participates in the Acura OEM collision repair program in Waipahu, Oahu, delivering precision luxury vehicle restoration.',
    intro:
      'Acura luxury vehicles from the Integra and TLX to the RDX and MDX combine high-performance powertrain engineering with sophisticated multi-material body construction. Kuroda Autobody participates in the Acura OEM collision repair program, providing our Waipahu technicians with direct digital access to official brand-specific repair standards, structural blueprints, and technical guidelines.',
    photoLabel: 'Acura vehicle in the Kuroda Autobody collision repair shop',
    program: [
      {
        icon: 'alignment',
        title: 'Multi-Material Construction Data',
        description:
          'Official blueprints detailing how aluminum components, advanced high-strength steels, and specialized bonding agents are integrated into the frame without compromising structural rigidity.',
      },
      {
        icon: 'paint',
        title: 'Precision Panel & Fitment Tolerances',
        description:
          'Exact factory spacing and alignment metrics required to preserve the aerodynamic lines, tight panel gaps, and refined aesthetics characteristic of Acura vehicles.',
      },
      {
        icon: 'calibration',
        title: 'AcuraWatch & Sensor Calibration Protocols',
        description:
          'Comprehensive factory procedures guiding the physical handling, reassembly, and calibration readiness of integrated safety cameras and bumper-mounted radar arrays.',
      },
    ],
    why: {
      accent: 'Matter for Luxury Performance',
      paragraphs: [
        'An Acura is engineered to deliver a dynamic driving experience while maximizing occupant protection. Its multi-material framework distributes impact energy differently than standard steel unibodies.',
        "Using generic repair techniques can disrupt these complex energy management pathways and misalign sensitive driver-assist electronics. By utilizing authentic Acura repair documentation, our team ensures your vehicle's performance capabilities, luxury finish, and structural crash integrity are fully restored.",
      ],
    },
    experienceWord: 'Difference',
    experience: [
      advocacy(
        'Precision-Targeted Insurance Advocacy',
        'We work directly with your insurance provider, substantiating the specific multi-material handling, specialized bonding agents, and official Acura procedures required for your luxury vehicle.'
      ),
      rental(
        'Eligible customers enjoy seamless on-site Enterprise rental car access right at our Waipahu location, matching the high-end convenience you expect as an Acura owner.',
        'Streamlined Luxury Logistics'
      ),
      warranty(
        "All qualifying restoration work on your Acura's performance framework and aesthetic finishes is backed by our lifetime warranty for as long as you own the vehicle."
      ),
      handover(
        'Before you drive away, we walk you through your completed repairs using an annotated work order and before-and-after photos, verifying tight panel gaps and AcuraWatch calibration readiness.'
      ),
    ],
    faqs: [
      {
        title: 'Do you follow official Acura repair guidelines?',
        description:
          'Yes. Our participation in the Acura program gives us direct access to brand-approved repair procedures and structural specifications.',
      },
      {
        title: 'How do you handle Acura advanced safety systems?',
        description:
          'We follow official repair protocols to ensure structural components surrounding cameras and radar units are restored to exact factory alignment.',
      },
      {
        title: 'Can I choose Kuroda Autobody for my Acura collision claim?',
        description:
          'Yes. You retain the legal right to choose your repair shop, and we work directly with your insurer to ensure proper repair procedures are followed.',
      },
    ],
    cta: { title: 'Restore Your Acura ', titleStrong: 'With Precision' },
  },

  // ─── Nissan ────────────────────────────────────────────────────────────────
  {
    slug: 'nissan',
    name: 'Nissan',
    seoTitle: 'Nissan OEM Collision Repair Program | Kuroda Autobody Waipahu',
    metaDescription:
      'Kuroda Autobody participates in the Nissan OEM collision repair program in Waipahu, Oahu, using factory Zone Body construction guidelines to restore your vehicle safely.',
    intro:
      'Modern Nissan vehicles from the Altima and Rogue to the Pathfinder and Frontier are engineered around specialized frameworks like Nissan’s Zone Body construction. Kuroda Autobody participates in the Nissan OEM collision repair program, providing our Waipahu technicians with direct digital access to official factory repair guidelines, structural dimensions, and brand-specific technical standards.',
    photoLabel: 'Nissan vehicle in the Kuroda Autobody collision repair shop',
    program: [
      {
        icon: 'alignment',
        title: 'Zone Body Construction Blueprints',
        description:
          'Official engineering schematics detailing energy-absorbing crumple zones and cabin reinforcement rings, ensuring unibody realignment matches factory impact dissipation standards.',
      },
      {
        icon: 'shield',
        title: 'High-Tensile Steel & Joining Specifications',
        description:
          'Factory documentation specifying approved spot welding, MIG brazing, and structural adhesive methods required for high-tensile steel assemblies.',
      },
      {
        icon: 'calibration',
        title: 'Nissan Safety Shield 360 Calibration Protocols',
        description:
          'Precise factory procedures guiding the physical reassembly, alignment, and calibration readiness of integrated bumper radar arrays and windshield-mounted safety cameras.',
      },
    ],
    why: {
      accent: 'Matter for Your Safety',
      paragraphs: [
        'Nissan vehicles rely on progressive deformation zones designed to deflect impact energy away from passengers during a collision. Utilizing generic repair practices can compromise these engineered crumple zones and misalign sensitive driver-assist sensors.',
        "By adhering to authentic Nissan repair documentation, our technicians ensure that your vehicle's structural integrity, occupant safety margins, and remaining manufacturer warranties are fully preserved.",
      ],
    },
    experience: [
      advocacy(
        'Zone Body-Aligned Insurance Advocacy',
        'We work directly with your insurance provider, submitting precise documentation grounded in official Nissan Zone Body construction and safety shielding repair guidelines.'
      ),
      rental(
        'Eligible customers enjoy seamless on-site Enterprise rental car access right at our Waipahu location to keep your daily routine uninterrupted.'
      ),
      warranty(
        'All qualifying structural and cosmetic workmanship on your Nissan is backed by our lifetime warranty for as long as you own the vehicle.'
      ),
      handover(
        'Before you drive away, we walk you through your completed repairs using an annotated work order and before-and-after photos, confirming that computerized 3D measuring metrics align with factory tolerances.'
      ),
    ],
    faqs: [
      {
        title: 'Why is Nissan program participation important for my repair?',
        description:
          'It gives our technicians direct access to official factory repair methods, ensuring your Nissan is restored according to manufacturer safety standards.',
      },
      {
        title: 'How do you ensure my Nissan is measured accurately?',
        description:
          'We combine computerized 3D measuring systems with official Nissan structural blueprints to verify frame alignment.',
      },
      {
        title: 'Will my insurance cover manufacturer-specified repairs?',
        description:
          'We work directly with insurance providers to submit accurate repair scopes based on required manufacturer procedures.',
      },
    ],
    cta: { title: 'Expert Care ', titleStrong: 'for Your Nissan' },
  },

  // ─── General Motors ────────────────────────────────────────────────────────
  {
    slug: 'gm',
    name: 'GM',
    heroName: 'General Motors',
    seoTitle: 'GM OEM Collision Repair Program | Kuroda Autobody Waipahu',
    metaDescription:
      'Kuroda Autobody participates in the General Motors OEM collision repair program in Waipahu, Oahu, providing factory-aligned repairs for Chevrolet, GMC, Buick, and Cadillac.',
    intro:
      'General Motors vehicles spanning Chevrolet, GMC, Buick, and Cadillac models encompass diverse structural architectures, from high-strength steel passenger cars to fully boxed, hydroformed frame rails on heavy-duty trucks and SUVs. Kuroda Autobody participates in the General Motors OEM collision repair program, ensuring our Waipahu facility maintains direct access to brand-specific repair standards and technical specifications.',
    photoLabel: 'GM vehicle in the Kuroda Autobody collision repair shop',
    program: [
      {
        icon: 'alignment',
        title: 'Model-Specific Structural Blueprints',
        description:
          'We access official GM repair information to map out precise unibody dimensions and load-bearing structures across diverse vehicle platforms.',
      },
      {
        icon: 'collision',
        title: 'Full-Frame Truck & SUV Guidelines',
        description:
          'Factory procedures dictate specialized measurement, alignment, and sectioning rules for fully boxed frame rails, suspension mounting points, and structural reinforcements found on trucks and large SUVs.',
      },
      {
        icon: 'calibration',
        title: 'Advanced Safety & Driver-Assist Integration',
        description:
          'Manufacturer guidelines support the proper reinstallation and calibration readiness of onboard safety arrays, radar modules, and camera systems.',
      },
    ],
    why: {
      accent: 'Matter for Your Safety',
      paragraphs: [
        'General Motors vehicles are built to handle rigorous everyday driving demands while protecting occupants across varied weight classes and body styles. Using generic repair practices on a hydroformed truck frame or a high-strength unibody car can compromise structural rigidity and crash energy management.',
        'By adhering to official GM repair documentation, our technicians ensure that your car, truck, or SUV receives the exact technical attention required to restore its original factory build quality and occupant protection margins.',
      ],
    },
    experience: [
      advocacy(
        'Platform-Specific Insurance Advocacy',
        'Whether you drive a high-strength unibody car or a heavy-duty truck with hydroformed frame rails, we work directly with your insurance provider to substantiate exact GM repair procedures.'
      ),
      rental(
        'Eligible customers enjoy seamless on-site Enterprise rental car access right at our Waipahu location, accommodating cars, trucks, and SUVs alike.'
      ),
      warranty(
        'All qualifying structural and mechanical-adjacent workmanship on your Chevrolet, GMC, Buick, or Cadillac is backed by our lifetime warranty for as long as you own the vehicle.'
      ),
      handover(
        'Before you drive away, we walk you through your completed repairs using an annotated work order and before-and-after photos, ensuring full visibility into major frame or panel restorations.'
      ),
    ],
    faqs: [
      {
        title: 'What models are covered under the GM repair program?',
        description:
          'The program encompasses official repair procedures for Chevrolet, GMC, Buick, and Cadillac vehicles.',
      },
      {
        title: 'How do you access GM repair information?',
        description:
          'Our participation grants us direct digital access to official GM service portals and structural repair guidelines.',
      },
      {
        title: 'Will my factory warranty be protected?',
        description:
          "Yes. Performing repairs according to official manufacturer procedures ensures your vehicle's structural integrity and remaining factory protections are maintained.",
      },
    ],
    cta: { title: 'Reliable Collision Care ', titleStrong: 'for Your GM Vehicle' },
  },

  // ─── Chrysler ──────────────────────────────────────────────────────────────
  {
    slug: 'chrysler',
    name: 'Chrysler',
    seoTitle: 'Chrysler OEM Collision Repair Program | Kuroda Autobody Waipahu',
    metaDescription:
      'Kuroda Autobody participates in the Chrysler OEM collision repair program in Waipahu, Oahu, using factory standards to restore your vehicle safely.',
    intro:
      'Chrysler vehicles alongside the broader family of Stellantis cars, minivans, and crossovers are engineered with robust structural frameworks and sophisticated electronic driver-assist features. Kuroda Autobody participates in the Chrysler OEM collision repair program, ensuring our Waipahu facility maintains direct access to official factory service portals, structural dimensions, and technical specifications.',
    photoLabel: 'Chrysler vehicle in the Kuroda Autobody collision repair shop',
    program: [
      {
        icon: 'alignment',
        title: 'Official Structural Blueprints',
        description:
          'We access factory schematics detailing exact unibody tolerances, frame dimensions, and reinforcement points for accurate vehicle realignment.',
      },
      {
        icon: 'shield',
        title: 'Manufacturer-Approved Joining Methods',
        description:
          'Factory guidelines dictate precise spot welding, MIG brazing, and structural bonding standards required for high-tensile steel assemblies.',
      },
      {
        icon: 'calibration',
        title: 'Advanced Driver-Assist & Sensor Alignment',
        description:
          'Manufacturer procedures guide the physical reassembly and calibration readiness of integrated safety cameras and bumper-mounted radar units.',
      },
    ],
    why: {
      accent: 'Matter for Your Safety',
      paragraphs: [
        'Chrysler vehicles incorporate engineered energy management paths designed to distribute impact forces away from the passenger compartment. Using generic repair methods can compromise these structural load-bearing pathways and misalign onboard safety technology.',
        "By utilizing authentic Chrysler repair documentation, our technicians ensure that your vehicle's structural integrity, occupant protection margins, and remaining manufacturer warranties are fully preserved.",
      ],
    },
    experience: [
      advocacy(
        'Stellantis-Aligned Insurance Advocacy',
        'We work directly with your insurance provider, submitting precise documentation and supplement requests grounded in official Chrysler structural and unibody repair guidelines.'
      ),
      rental(
        'Eligible customers enjoy seamless on-site Enterprise rental car access right at our Waipahu location—ideal for keeping families moving while minivans, sedans, or crossovers are in the shop.'
      ),
      warranty(
        'All qualifying workmanship on your Chrysler vehicle is backed by our lifetime warranty for as long as you own the vehicle.'
      ),
      handover(
        'Before you drive away, we walk you through your completed repairs using an annotated work order and before-and-after photos, demonstrating that frame dimensions and safety architecture have been restored precisely.'
      ),
    ],
    faqs: [
      {
        title: 'What does Chrysler OEM program participation mean for my repair?',
        description:
          'It means our technicians use official manufacturer repair procedures, structural specifications, and technical standards specific to Chrysler vehicles.',
      },
      {
        title: 'How do you ensure correct structural alignment on a Chrysler?',
        description:
          'We combine computerized 3D measuring systems with official Chrysler structural blueprints to verify frame accuracy down to the millimeter.',
      },
      {
        title: 'Will my insurance cover manufacturer-specified repairs?',
        description:
          'We work directly with insurance providers to submit accurate repair scopes based on required manufacturer procedures.',
      },
    ],
    cta: { title: 'Restore Your Chrysler ', titleStrong: 'to Factory Standards' },
  },
];

export const certificationProgramPages: ContentPage[] = oemCopy.map(oemPage);
