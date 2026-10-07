/**
 * Service Areas — hub (/service-areas/) and its community pages (copy: Sitemap Content Plan V2).
 * Rendered by `ContentPageView`. No related-links grid on these pages.
 * Pinned `surface`s reproduce the page rhythm of the original layouts.
 */
import type { ContentPage, FeaturesSection } from '~/data/contentPage';

/** The four service blocks every community page ends on. */
const services = (
  headingLead: string,
  headingStrong: string,
  lead: string,
  items: FeaturesSection['items']
): FeaturesSection => ({
  type: 'features',
  surface: 'subtle',
  eyebrow: 'Our services',
  headingLead,
  headingStrong,
  lead,
  items,
});

export const serviceAreaPages: ContentPage[] = [
  // ─── Hub ───────────────────────────────────────────────────────────────────
  {
    path: '/service-areas/',
    seoTitle: 'Auto Body Shop Serving Oahu Communities | Kuroda Autobody',
    metaDescription:
      'Kuroda Autobody provides expert collision repair from our Waipahu facility in Gentry Waipio Business Park, serving drivers throughout Oahu.',
    eyebrow: 'Service areas',
    hero: {
      titleLead: 'Auto Body Shop Serving ',
      titleAccent: 'Drivers Across Oahu',
      body: 'Kuroda Autobody proudly provides expert collision repair, insurance coordination, and on-site rental vehicle pickup for drivers throughout Oahu. Centrally located in the Gentry Waipio Business Park, our shop is easily accessible for motorists looking for trusted craftsmanship and personal service.',
      photoLabel: 'Kuroda Autobody shop, Gentry Waipio Business Park',
    },
    sections: [
      {
        type: 'features',
        eyebrow: 'Across the island',
        headingLead: 'Auto Body Care ',
        headingStrong: 'for Oahu Motorists',
        lead: 'Drivers from across the island choose our Waipahu facility for complete collision and auto body care, including:',
        items: [
          {
            icon: 'collision',
            title: 'Collision & Body Repair',
            description:
              'Restoring minor dents, damaged panels, and major collision damage with strict attention to fit and finish.',
          },
          {
            icon: 'alignment',
            title: 'Structural & Frame Repair',
            description:
              'Using advanced 3D electronic measuring to restore vehicle frames to precise factory specifications.',
          },
          {
            icon: 'paint',
            title: 'Auto Paint & Refinishing',
            description:
              'Delivering a smooth, seamless finish using eco-friendly waterborne paint and computerized color-matching.',
          },
          {
            icon: 'calibration',
            title: 'Diagnostics & ADAS',
            description:
              'Performing vehicle diagnostic scans and coordinating required sensor and camera calibrations.',
          },
        ],
      },
      {
        type: 'features',
        surface: 'subtle',
        eyebrow: 'Regional service areas',
        headingLead: 'Explore Our ',
        headingStrong: 'Regional Service Areas',
        lead: 'We regularly serve communities across Central, West, and urban Oahu, providing dedicated support for local drivers:',
        items: [
          {
            icon: 'clock',
            title: 'Mililani & Koa Ridge',
            description: 'Convenient access down the H-2 freeway for Central Oahu drivers.',
            href: '/service-areas/mililani/',
          },
          {
            icon: 'check',
            title: 'Pearl City & Aiea',
            description: 'Honoring our deep historical roots in Aiea while serving neighboring communities.',
            href: '/service-areas/pearl-city-aiea/',
          },
        ],
        note: 'For complete directions, hours, and map details, visit our',
        noteLinkText: 'Location Page',
        noteLinkHref: '/location/',
      },
    ],
    faqs: {
      eyebrow: 'Service areas FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'About Our Service Areas',
      items: [
        {
          title: 'Do you have other shop locations on Oahu?',
          description:
            'No. All of our repair work, estimates, and customer service are centralized at our 28,000-square-foot facility in the Gentry Waipio Business Park in Waipahu to ensure consistent, high-quality standards.',
        },
        {
          title: 'Do I need to live nearby to bring my vehicle to Kuroda?',
          description:
            'Not at all. Drivers from all over Oahu regularly make the drive to our Waipahu shop because of our long-standing reputation, warranty coverage, and on-site rental car availability.',
        },
        {
          title: 'Can you help coordinate my insurance claim if I live outside Waipahu?',
          description:
            'Yes. We work with insurance companies for customers across the entire island, helping manage estimates, approvals, and supplemental paperwork regardless of where you live.',
        },
        {
          title: 'How do I get to your shop from other parts of the island?',
          description:
            'Our facility is conveniently situated right off major routes like the H-1 and H-2 freeways in the Gentry Waipio Business Park, making it straightforward to reach from West, Central, and urban Oahu.',
        },
        {
          title: 'Can I arrange a rental car if I am coming from another community?',
          description:
            'Yes. We coordinate convenient on-site rental car pickup directly on our lot, allowing you to transition smoothly into temporary transportation no matter which part of the island you are coming from.',
        },
      ],
    },
    cta: { title: 'Plan Your ', titleStrong: 'Visit' },
  },

  // ─── Mililani & Koa Ridge ──────────────────────────────────────────────────
  {
    path: '/service-areas/mililani/',
    seoTitle: 'Auto Body Shop Serving Mililani & Koa Ridge | Kuroda Autobody',
    metaDescription:
      'Kuroda Autobody provides expert collision repair for drivers in Mililani and Koa Ridge. Conveniently located nearby in Waipahu with on-site rentals.',
    eyebrow: 'Service areas',
    hero: {
      titleLead: 'Auto Body Repair for ',
      titleAccent: 'Mililani & Koa Ridge Drivers',
      body: "Drivers in Mililani and Koa Ridge looking for dependable auto body repair and personal service don't have to look far. Kuroda Autobody is located just down the road in the Gentry Waipio Business Park in Waipahu, offering a straightforward drive down the H-2 freeway for Central Oahu motorists.",
      photoLabel: 'Kuroda Autobody shop, a short drive from Mililani and Koa Ridge',
    },
    sections: [
      {
        type: 'story',
        surface: 'subtle',
        eyebrow: 'Our family story',
        headingLead: 'Rooted in Hawaii, ',
        headingAccent: 'Serving Central Oahu',
        paragraphs: [
          'Our family-owned business has deep roots in the islands. Kuroda originally started in Aiea in 1938 on Kamehameha Highway, across from the Sumida watercress farm. Over the decades, as Mililani, Koa Ridge, and surrounding Central Oahu communities grew, our family business grew right alongside them evolving into a modern 28,000-square-foot collision repair facility designed to handle today’s sophisticated vehicles.',
        ],
        caption: 'Kuroda on Kamehameha Highway in Aiea, 1938.',
        photoLabel: 'Kuroda on Kamehameha Highway in Aiea, 1938.',
        stats: [
          { value: '1938', label: 'Founded in Aiea' },
          { value: '28,000 SQ FT', label: 'Collision repair facility' },
          { value: 'H-2', label: 'Freeway access' },
        ],
      },
      {
        type: 'features',
        eyebrow: 'Why Kuroda',
        headingLead: 'Why Mililani and Koa Ridge Motorists ',
        headingStrong: 'Choose Kuroda',
        lead: 'When an accident happens, choosing the right repair shop makes all the difference. Central Oahu drivers trust our team for several key reasons:',
        items: [
          {
            icon: 'clock',
            title: 'Convenient Freeway Access',
            description:
              'A quick drive down from Mililani or Koa Ridge via the H-2 brings you directly to our Waipahu facility.',
          },
          {
            icon: 'rental',
            title: 'On-Site Rental Cars',
            description:
              'We coordinate convenient on-site rental car pickup right on our lot, so you can drop off your damaged vehicle and transition smoothly into temporary transportation.',
          },
          {
            icon: 'claims',
            title: 'Insurance Coordination',
            description:
              'We work directly with your insurance company to manage estimates, approvals, and supplemental paperwork.',
          },
          {
            icon: 'shield',
            title: 'Limited Lifetime Warranty',
            description:
              'We stand behind our metalwork and refinishing with a Limited Lifetime Warranty for as long as you own your vehicle.',
          },
        ],
      },
      services(
        'Complete Auto Body ',
        'and Repair Services',
        'Our technicians bring advanced training and equipment to every job, handling a full range of repair needs for drivers across Mililani and Koa Ridge:',
        [
          {
            icon: 'collision',
            title: 'Collision & Body Repair',
            description: 'Restoring minor door dings, fender benders, and major structural collision damage.',
          },
          {
            icon: 'alignment',
            title: 'Structural & Frame Repair',
            description:
              'Using 3D electronic measuring systems to ensure your vehicle’s frame is restored to exact factory specifications.',
          },
          {
            icon: 'paint',
            title: 'Auto Paint & Refinishing',
            description:
              'Utilizing eco-friendly waterborne paint and computerized color-matching for a seamless finish.',
          },
          {
            icon: 'calibration',
            title: 'Diagnostics & ADAS',
            description: 'Performing rigorous vehicle scans and coordinating required safety system calibrations.',
          },
        ]
      ),
    ],
    faqs: {
      eyebrow: 'Mililani & Koa Ridge FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'for Mililani & Koa Ridge Customers',
      items: [
        {
          title: 'How do I get to your shop from Mililani or Koa Ridge?',
          description:
            'Head south down the H-2 freeway toward the Waipio interchange, and you will find our facility easily accessible in the Gentry Waipio Business Park at 94-518 Puahi Street.',
        },
        {
          title: 'Can I get a rental car near your shop?',
          description:
            'Yes. Rental vehicles are parked directly on our lot, making pickup and drop-off seamless while your vehicle is being repaired.',
        },
        {
          title: 'Do you service all vehicle makes and models?',
          description:
            'Yes. Our ASE-certified technicians provide collision repair for most makes and models, backed by OEM program participation for major manufacturers.',
        },
      ],
    },
    cta: { title: 'Plan Your ', titleStrong: 'Visit from Central Oahu' },
  },

  // ─── Pearl City & Aiea ─────────────────────────────────────────────────────
  {
    path: '/service-areas/pearl-city-aiea/',
    seoTitle: 'Auto Body Repair Serving Pearl City & Aiea | Kuroda Autobody',
    metaDescription:
      'Kuroda Autobody provides expert auto body repair for drivers in Pearl City and Aiea. Visit our Waipahu shop for trusted craftsmanship and local roots.',
    eyebrow: 'Service areas',
    hero: {
      titleLead: 'Auto Body Repair for ',
      titleAccent: 'Pearl City & Aiea Drivers',
      body: 'Drivers in Pearl City and Aiea looking for trusted auto body repair and honest guidance have a reliable neighbor just minutes away. Kuroda Autobody is located nearby in the Gentry Waipio Business Park in Waipahu, making it quick and easy for Central and Leeward Oahu motorists to access expert vehicle care.',
      photoLabel: 'Kuroda Autobody shop, minutes from Pearl City and Aiea',
    },
    sections: [
      {
        type: 'story',
        surface: 'subtle',
        eyebrow: 'Our family story',
        headingLead: 'Deep Roots in Aiea ',
        headingAccent: 'and the Surrounding Community',
        paragraphs: [
          'Kuroda has been part of this community since 1938, when we first opened on Kamehameha Highway in Aiea, across from the Sumida watercress farm. As Pearl City and Aiea grew, our family business grew with them. Today, we bring those same generational roots and values to our modern Waipahu facility.',
        ],
        caption: 'Kuroda on Kamehameha Highway in Aiea, 1938.',
        photoLabel: 'Kuroda on Kamehameha Highway in Aiea, 1938.',
        stats: [
          { value: '1938', label: 'Founded in Aiea' },
          { value: 'AIEA', label: 'Kamehameha Highway' },
          { value: 'WAIPAHU', label: 'Modern facility today' },
        ],
      },
      {
        type: 'features',
        eyebrow: 'Why Kuroda',
        headingLead: 'Why Pearl City and Aiea Motorists ',
        headingStrong: 'Choose Kuroda',
        lead: 'When you need vehicle repairs after an accident or minor scrape, choosing an experienced shop brings peace of mind. Drivers throughout Pearl City and Aiea rely on our team for several distinct advantages:',
        items: [
          {
            icon: 'check',
            title: 'Local History and Trust',
            description:
              'A family-owned business serving Hawaii drivers since 1938, carrying forward generations of honest work and community commitment.',
          },
          {
            icon: 'rental',
            title: 'On-Site Rentals',
            description:
              'We coordinate convenient on-site rental car pickup directly on our lot, letting you drop off your car and transition into temporary transportation seamlessly.',
          },
          {
            icon: 'claims',
            title: 'Insurance Assistance',
            description:
              'We work closely with your insurance company to manage estimates, approvals, and supplemental paperwork from start to finish.',
          },
          {
            icon: 'shield',
            title: 'Limited Lifetime Warranty',
            description:
              'We stand behind our qualifying metalwork and refinishing with a Limited Lifetime Warranty for as long as you own your vehicle.',
          },
        ],
      },
      services(
        'Complete Auto Body ',
        'Services',
        'Our technicians bring advanced training and specialized equipment to every repair, handling a full range of services for Pearl City and Aiea motorists:',
        [
          {
            icon: 'collision',
            title: 'Collision & Body Repair',
            description:
              'Restoring minor dents, door panels, fenders, and major accident damage with meticulous attention to fit and finish.',
          },
          {
            icon: 'alignment',
            title: 'Structural & Frame Repair',
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
            description:
              'Performing rigorous vehicle scans and coordinating required sensor and safety system calibrations.',
          },
        ]
      ),
    ],
    faqs: {
      eyebrow: 'Pearl City & Aiea FAQ',
      titleLead: 'Frequently Asked Questions ',
      titleStrong: 'for Pearl City & Aiea Customers',
      items: [
        {
          title: 'How close is your shop to Pearl City and Aiea?',
          description:
            'Our facility is located just a short drive away in the Gentry Waipio Business Park at 94-518 Puahi Street, making it easily accessible via major local routes.',
        },
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
      titleStrong: 'Visit from Pearl City or Aiea',
      subtitle:
        'Get expert guidance and reliable auto body repair from a family-owned shop rooted in Hawaii since 1938.',
    },
  },
];
