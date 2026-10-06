/**
 * Our Story (/about/) — copy from the client's content doc.
 * Rendered by `ContentPageView`; the doc has no FAQs, so `faqs` is omitted.
 * Story blocks alternate photo side (isReversed) down the page; photos stay grey placeholders until supplied.
 */
import type { ContentPage } from '~/data/contentPage';

export const ourStoryPages: ContentPage[] = [
  {
    path: '/about/',
    seoTitle: 'Our Story | Four Generations of Kuroda Auto Body in Hawaii | Kuroda Autobody',
    metaDescription:
      'Kuroda has served Hawaii since 1938. Four generations of family-owned collision repair, from Kuroda Chevron in Aiea to a modern 28,000-square-foot collision center in Waipio.',
    eyebrow: 'Our Story',
    hero: {
      titleLead: 'Four Generations. ',
      titleAccent: 'One Family Name.',
      body: [
        'The Kuroda story in Hawaii began with Toyoichi Kuroda, who came to the Islands from Japan and built a life for his family here.',
        'In 1938, he established Kuroda Chevron on Kamehameha Highway in Aiea. What began as a service station and auto repair business would evolve over the decades into Kuroda Auto Body.',
        'Today, the Kuroda automotive tradition spans four generations, carrying forward a family business that has been part of Hawaii for nearly 90 years.',
      ],
    },
    sections: [
      {
        type: 'story',
        headingLead: 'A Legacy Beyond ',
        headingAccent: 'the Business.',
        photoLabel: 'The Kuroda family and Staff Sergeant Robert Toshio Kuroda',
        paragraphs: [
          'The Kuroda family story is also part of a larger Hawaii story. Four of Toyoichi’s seven sons served in the U.S. Army during World War II. Among them was Robert Toshio Kuroda, a Farrington High School graduate who volunteered to serve with the famed 442nd Regimental Combat Team.',
          'On October 20, 1944, Staff Sergeant Kuroda was killed in action near Bruyères, France. He was just 21 years old. For his extraordinary bravery in battle, he was posthumously awarded the Medal of Honor.',
          'More than seven decades later, Robert’s story took an extraordinary turn.',
          'In 2021, a military historian searching the forests near Bruyères discovered a high school class ring buried in the earth. Inscribed inside was a name: R. Kuroda.',
          'It was the Farrington High School class ring Robert had carried with him to war. After nearly 80 years in France, the ring was returned to the Kuroda family in Hawaii—a remarkable connection between Robert’s life here and the place where he made the ultimate sacrifice.',
          'His legacy lives on in other ways as well. Kuroda Field at Fort DeRussy in Waikīkī bears his name, honoring his courage and service.',
          'Robert was one of four Kuroda brothers who served. Ronald survived the war and received the Distinguished Service Cross for extraordinary heroism in Italy. Wallace served with the 1399th Engineer Construction Battalion in Hawaii, while Joseph, the youngest, entered the Army near the war’s end and later became an Army Reserve colonel and Hawaii state senator.',
        ],
      },
      {
        type: 'story',
        headingLead: 'From Service Station to ',
        headingAccent: 'Collision Repair.',
        isReversed: true,
        photoLabel: 'Kuroda Auto Body in Aiea, across from the Sumida watercress farm',
        paragraphs: [
          'In the years that followed, the next generation of the Kuroda family carried the automotive business forward. The family’s roots in service and repair evolved into Kuroda Auto Body, which became a familiar presence in Aiea, across from the Sumida watercress farm.',
          'As Oahu’s communities grew westward and vehicles became more sophisticated, Kuroda grew with them—eventually moving to a larger, modern facility in Waipio and continuing to invest in the people, training and technology needed to repair the vehicles of each new generation.',
        ],
      },
      {
        type: 'story',
        headingLead: 'Some Things ',
        headingAccent: 'Never Change.',
        photoLabel: 'Third and fourth generations of the Kuroda family',
        paragraphs: [
          'Nearly 90 years after Toyoichi began the family business, the third and fourth generations of the Kuroda family are carrying it forward.',
          'The shop looks very different. Vehicles have become more sophisticated. Repair technology has changed dramatically.',
          'But the values haven’t.',
        ],
        quote: '“Do it right. Treat people with respect. Take care of your employees. Take care of your customers.”',
        quoteAttribution: 'That’s how the Kuroda family has done business for generations.',
      },
      {
        type: 'story',
        eyebrow: 'The Kuroda Way',
        headingLead: 'Do It Right. ',
        headingAccent: 'Treat People Right.',
        isReversed: true,
        photoLabel: 'Longtime Kuroda employees with their years of service',
        paragraphs: [
          'Those values aren’t simply part of our history. They shape the way we work every day.',
          'For our customers, that means quality workmanship, clear communication, honest guidance and doing everything we can to make an unexpected situation easier. For our employees, it means creating a workplace built on respect, teamwork and pride in what we do.',
          'Many of our customers have trusted Kuroda for generations, while members of our team have built careers here spanning decades—including employees who have been with us for nearly 40 years.',
          'Because when you take care of people, they take care of each other—and the work reflects it.',
        ],
      },
      {
        type: 'story',
        eyebrow: 'A Modern Collision Center',
        headingLead: 'Built for ',
        headingAccent: 'Today’s Vehicles.',
        photoLabel: 'Kuroda Auto Body’s 28,000-square-foot collision center in Waipio',
        paragraphs: [
          'Kuroda Auto Body’s 28,000-square-foot facility in Waipio was designed from the ground up for professional collision repair. Spacious, clean and highly organized, it gives our technicians the environment and resources needed to meet Kuroda’s high standards for quality.',
          'Dedicated areas support every stage of the repair process, with advanced collision repair and refinishing equipment throughout. Our secure lot keeps vehicles safely stored while in our care. And with easy freeway access, Kuroda conveniently serves drivers from Aiea, Pearl City, Waipio, Waikele, Waipahu, Koa Ridge and Mililani—and communities across Oahu.',
          'For our customers, it all adds up to a professional, efficient repair experience designed to keep work moving smoothly and get you back on the road.',
        ],
      },
      {
        type: 'story',
        eyebrow: 'Environmental Responsibility',
        headingLead: 'Doing ',
        headingAccent: 'Our Part.',
        isReversed: true,
        photoLabel: 'Kuroda Auto Body’s waterborne paint system and rooftop solar array',
        paragraphs: [
          'Kuroda was the first collision repair facility in Hawaii to convert to a waterborne auto refinishing system. Our Sikkens Autowave® paint system delivers the quality and performance we expect while substantially reducing VOC emissions compared with conventional automotive paint.',
          'That commitment extends throughout our facility. Our rooftop photovoltaic system produces clean solar electricity, while we recycle metal, aluminum, cardboard and reusable paint materials whenever possible.',
          'For us, doing the job right also means doing our part to take care of the place we call home.',
        ],
      },
    ],
    related: {
      eyebrow: 'Why Kuroda',
      headingLead: 'Explore Why Kuroda ',
      headingStrong: 'Resources',
      paths: ['/repair-process/', '/warranty/', '/certifications/'],
    },
    cta: { title: 'Experience ', titleStrong: 'Quality Restoration' },
  },
];
