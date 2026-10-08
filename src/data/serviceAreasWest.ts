/**
 * Service Areas — Ewa Beach, Kapolei and Honolulu community pages (copy: Kuroda – Service Areas,
 * `_service-areas_<area>_.docx`). Rendered by `ContentPageView`. Same page frame as Pearl City & Aiea
 * (src/data/serviceAreas.ts): story → why Kuroda → services → FAQs → closing CTA, no related grid.
 */
import type { ContentPage, FeatureItem } from '~/data/contentPage';

interface AreaCopy {
  slug: string;
  /** Name used in headings and FAQ labels, e.g. `Ewa Beach`. */
  name: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  photoLabel: string;
  story: { headingLead: string; headingAccent: string; paragraph: string; stats: { value: string; label: string }[] };
  /** The one "why" item that differs per community (freeway access); the other three are shared. */
  access: { title: string; description: string };
  whyLead: string;
  directionsAnswer: string;
}

const SERVICE_ITEMS: FeatureItem[] = [
  {
    icon: 'collision',
    title: 'Auto Body & Panel Repair',
    description:
      'Restoring minor dents, door panels, fenders, and major accident damage with meticulous attention to fit and finish.',
  },
  {
    icon: 'alignment',
    title: 'Structural Frame Repair',
    description:
      'Utilizing advanced 3D electronic measuring systems to restore damaged vehicle frames to exact factory specifications.',
  },
  {
    icon: 'paint',
    title: 'Auto Paint & Refinishing',
    description:
      'Applying eco-friendly waterborne paint with computerized color-matching for a smooth, seamless finish.',
  },
  {
    icon: 'calibration',
    title: 'Diagnostics & ADAS',
    description: 'Performing rigorous vehicle scans and coordinating required sensor and safety system calibrations.',
  },
];

const SHARED_WHY: FeatureItem[] = [
  {
    icon: 'rental',
    title: 'On-Site Rental Cars',
    description:
      'We partner with Enterprise to park rental vehicles right on our lot, letting you drop off your damaged car and transition into temporary transportation in one seamless stop.',
  },
  {
    icon: 'claims',
    title: 'Insurance Assistance',
    description:
      'We work directly with your insurance company to manage estimates, approvals, and supplemental paperwork from start to finish.',
  },
  {
    icon: 'shield',
    title: 'Limited Lifetime Warranty',
    description:
      'We stand behind our qualifying metalwork and refinishing with a Limited Lifetime Warranty for as long as you own your vehicle.',
  },
];

function areaPage(a: AreaCopy): ContentPage {
  return {
    path: `/service-areas/${a.slug}/`,
    seoTitle: a.seoTitle,
    metaDescription: a.metaDescription,
    eyebrow: 'Service areas',
    hero: {
      titleLead: 'Auto Body Repair for ',
      titleAccent: `${a.name} Drivers`,
      body: a.intro,
      photoLabel: a.photoLabel,
    },
    sections: [
      {
        type: 'story',
        surface: 'subtle',
        eyebrow: 'Our family story',
        headingLead: a.story.headingLead,
        headingAccent: a.story.headingAccent,
        paragraphs: [a.story.paragraph],
        caption: 'Kuroda on Kamehameha Highway in Aiea, 1938.',
        photoLabel: 'Kuroda on Kamehameha Highway in Aiea, 1938.',
        stats: a.story.stats,
      },
      {
        type: 'features',
        eyebrow: 'Why Kuroda',
        headingLead: `Why ${a.name} Motorists `,
        headingStrong: 'Choose Kuroda',
        lead: a.whyLead,
        items: [{ icon: 'clock', ...a.access }, ...SHARED_WHY],
      },
      {
        type: 'features',
        surface: 'subtle',
        eyebrow: 'Our services',
        headingLead: 'Complete Auto Body ',
        headingStrong: 'Services',
        lead: `Our technicians bring advanced training and specialized equipment to every repair, handling a full range of services for ${a.name} motorists:`,
        items: SERVICE_ITEMS,
      },
    ],
    faqs: {
      eyebrow: `${a.name} FAQ`,
      titleLead: 'Frequently Asked Questions ',
      titleStrong: `for ${a.name} Customers`,
      items: [
        { title: `How do I get to your shop from ${a.name}?`, description: a.directionsAnswer },
        {
          title: 'Can I arrange a rental car near your shop?',
          description:
            'Yes. Rental vehicles are parked right on our lot, allowing for convenient on-site pickup and drop-off while your vehicle undergoes repair.',
        },
        {
          title: 'Do you service all vehicle makes and models?',
          description:
            'Yes. Our ASE-certified technicians provide expert auto body repair for most makes and models, backed by OEM program participation for major automotive manufacturers.',
        },
      ],
    },
    cta: {
      title: 'Plan Your ',
      titleStrong: `Visit from ${a.name}`,
      subtitle:
        'Get expert guidance and reliable auto body repair from a family-owned shop rooted in Hawaii since 1938.',
    },
  };
}

const FOUNDED = { value: '1938', label: 'Founded in Aiea' };
const FACILITY = { value: '28,000 SQ FT', label: 'Waipahu facility' };

const areas: AreaCopy[] = [
  // ─── Ewa Beach ─────────────────────────────────────────────────────────────
  {
    slug: 'ewa-beach',
    name: 'Ewa Beach',
    seoTitle: 'Auto Body Shop Serving Ewa Beach | Kuroda Autobody',
    metaDescription:
      'Kuroda Autobody provides expert auto body repair for drivers in Ewa Beach. Visit our Waipahu shop for trusted craftsmanship and local roots.',
    intro:
      'Drivers in Ewa Beach looking for trusted auto body repair and honest guidance have a reliable neighbor just a short commute away. Kuroda Autobody is located nearby in the Gentry Waipio Business Park in Waipahu, making it quick and easy for Leeward Oahu motorists to access expert vehicle care.',
    photoLabel: 'Kuroda Autobody shop, a short commute from Ewa Beach',
    story: {
      headingLead: 'Deep Roots Serving ',
      headingAccent: 'the Ewa Community',
      paragraph:
        'Kuroda has been part of Oahu since 1938, when we first opened on Kamehameha Highway in Aiea, across from the Sumida watercress farm. As Ewa Beach transformed from historic plantation lands into bustling residential hubs like Ocean Pointe and Hoʻopili, our family business grew right alongside it. Today, we bring those same generational roots and values to our modern 28,000-square-foot Waipahu facility.',
      stats: [FOUNDED, FACILITY, { value: 'H-1', label: 'Freeway access' }],
    },
    whyLead:
      'Navigating daily bottlenecks along Fort Weaver Road and the H-1 corridor can be frustrating after an accident. Ewa Beach drivers choose our Waipahu facility because we eliminate travel hassles and streamline your recovery:',
    access: {
      title: 'Strategic Off-Highway Access',
      description:
        'Located just past the West Oahu congestion points, our Gentry Waipio facility provides a direct route up the H-1 or Kunia Road, saving you from driving into urban Honolulu.',
    },
    directionsAnswer:
      'Head north up Fort Weaver Road, transition past the H-1 freeway interchange toward Waipahu, and you will find our facility easily accessible in the Gentry Waipio Business Park at 94-518 Puahi Street.',
  },

  // ─── Kapolei ───────────────────────────────────────────────────────────────
  {
    slug: 'kapolei',
    name: 'Kapolei',
    seoTitle: 'Auto Body Shop Serving Kapolei | Kuroda Autobody',
    metaDescription:
      'Kuroda Autobody provides expert auto body repair for drivers in Kapolei and Ka Makana Aliʻi. Visit our Waipahu shop for trusted craftsmanship and local roots.',
    intro:
      'Drivers in Kapolei looking for trusted auto body repair and honest guidance have a reliable neighbor just up the H-1 freeway. Kuroda Autobody is located nearby in the Gentry Waipio Business Park in Waipahu, making it quick and efficient for Second City motorists to access expert vehicle care without heading into town.',
    photoLabel: 'Kuroda Autobody shop, just up the H-1 from Kapolei',
    story: {
      headingLead: 'Deep Roots Serving ',
      headingAccent: 'West Oahu',
      paragraph:
        "Kuroda has been part of Oahu since 1938, when we first opened on Kamehameha Highway in Aiea, across from the Sumida watercress farm. As Kapolei rapidly expanded from agricultural fields into Oahu's thriving Second City, anchored by growing neighborhoods around Ka Makana Aliʻi and Kakaiʻwa, our family business grew right alongside West Oahu. Today, we bring those same generational roots and values to our modern 28,000-square-foot Waipahu facility.",
      stats: [FOUNDED, FACILITY, { value: 'H-1', label: 'Freeway access' }],
    },
    whyLead:
      'Navigating daily traffic along the H-1 corridor can be demanding after a collision. Kapolei drivers choose our Waipahu facility because we eliminate the hassle of driving deep into urban Honolulu while providing streamlined repair solutions:',
    access: {
      title: 'Efficient Freeway Access',
      description:
        'Just a straight eastbound drive up the H-1 freeway from Kapolei brings you directly to our Gentry Waipio location, saving you from navigating downtown congestion.',
    },
    directionsAnswer:
      'Head east up the H-1 freeway from Kapolei toward the Waipio interchange, and you will find our facility easily accessible in the Gentry Waipio Business Park at 94-518 Puahi Street.',
  },

  // ─── Honolulu ──────────────────────────────────────────────────────────────
  {
    slug: 'honolulu',
    name: 'Honolulu',
    seoTitle: 'Auto Body Repair Serving Honolulu | Kuroda Autobody',
    metaDescription:
      'Kuroda Autobody provides expert auto body repair for drivers in Honolulu. Visit our Waipahu shop for trusted craftsmanship and local roots.',
    intro:
      'Drivers in Honolulu looking for trusted auto body repair and honest guidance have a reliable destination just a short drive westbound. While many shops are packed into urban Honolulu, Kuroda Autobody is located nearby in the Gentry Waipio Business Park in Waipahu, offering a counter-commute escape from downtown congestion for expert vehicle care.',
    photoLabel: 'Kuroda Autobody shop, a short drive westbound from Honolulu',
    story: {
      headingLead: 'Deep Roots Serving ',
      headingAccent: 'the Islands Since 1938',
      paragraph:
        'Kuroda has been part of Oahu since 1938, when we first opened on Kamehameha Highway in Aiea, across from the Sumida watercress farm. Over the decades, as Honolulu and surrounding island communities grew, our family business expanded right alongside them. Today, we bring those same generational roots and values from our historic beginnings to our modern 28,000-square-foot Waipahu facility.',
      stats: [FOUNDED, FACILITY, { value: 'H-1', label: 'Westbound access' }],
    },
    whyLead:
      'Navigating tight urban parking and battling downtown traffic after a collision can be stressful. Honolulu drivers choose our Waipahu facility because we provide spacious, state-of-the-art repair capabilities combined with an easy westbound commute:',
    access: {
      title: 'Counter-Commute Convenience',
      description:
        'Head westbound up the H-1 freeway away from morning downtown gridlock to reach our Gentry Waipio facility quickly and easily.',
    },
    directionsAnswer:
      'Head westbound up the H-1 freeway away from town toward the Waipio interchange, and you will find our facility easily accessible in the Gentry Waipio Business Park at 94-518 Puahi Street.',
  },
];

export const serviceAreaWestPages: ContentPage[] = areas.map(areaPage);
