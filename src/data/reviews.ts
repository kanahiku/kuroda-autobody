/**
 * Reviews (/reviews/) — quotes from the client's content doc, verbatim and in the doc's order.
 * The page renders the Sanity testimonials (`source: 'sanity'`); the quotes here are the original
 * seed and the fallback if Sanity is unreachable. Rendered by `ContentPageView` with the `reviews` section (ReviewWall). Hero carries the title, so the
 * section has no head. `detail` is everything after the reviewer's name in the doc's attribution line.
 */
import type { ContentPage } from '~/data/contentPage';

export const reviewPages: ContentPage[] = [
  {
    path: '/reviews/',
    seoTitle: 'Customer Reviews | Kuroda Autobody in Waipahu, Oahu',
    metaDescription:
      'Read what Hawaii drivers say about Kuroda Autobody — reviews from Carwise, Google and our own customer surveys on quality repairs, communication and service.',
    eyebrow: 'Reviews',
    hero: {
      titleLead: 'Hawaii Drivers ',
      titleAccent: 'Say It Best.',
      body: 'The best measure of our work is what our customers say when the job is done. From quality repairs to personal service, we’re grateful for the trust Hawaii drivers have placed in Kuroda for generations.',
    },
    sections: [
      {
        type: 'reviews',
        surface: 'subtle',
        // Live cards come from Sanity (`testimonial`); the list below is the fallback + seed copy.
        source: 'sanity',
        reviews: [
          {
            quote:
              '“I have complete confidence in all of the employees at Kuroda auto body. Friends have thanked me for referring them to Kuroda for auto repairs. I have been using their services for about 30 years.”',
            name: 'John M.',
            detail: 'Mazda owner, Carwise Review',
          },
          {
            quote:
              '“The staff at Kuroda Autobody were very friendly and professional. They kept me up to date on the progress of my repairs.”',
            name: 'Nolan O.',
            detail: 'Toyota owner, Auto Body Review',
          },
          {
            quote:
              '“Best Ever! Now that is what you call customer service, communication and professionalism. They always do great work!”',
            name: 'Brandon',
            detail: 'Lexus owner, June 2026, Carwise Review',
          },
          {
            quote: '“Did a great job also got my truck back a couple days earlier than expected”',
            name: 'Glenwood',
            detail: 'Toyota owner, June 2026, Carwise Review',
          },
          {
            quote: '“Repairs completed fast and excellent”',
            name: 'Jon',
            detail: 'Lexus owner, June 2026, Carwise Review',
          },
          {
            quote:
              '“Very Friendly, Efficient, Professional Staff. Quality of workmanship perfectness. Highly recommend 👌. MAHALO KURODA AUTO BODY!”',
            name: 'Vera Keala',
            detail: 'Google Review, 2026',
          },
          {
            quote:
              '“I’d give Kuroda 10 stars if I could. Shanna took care of everything and explained it all really well for me as I’ve never had to deal with this process before.”',
            name: 'Alaska B.',
            detail: 'Google Review',
          },
          {
            quote: '“The service I just received was amazing.”',
            name: 'Kolby D.',
            detail: 'Google Review',
          },
          {
            quote:
              '“Customer for 10 years. Kuroda has always maintained meeting deadlines on a timely basis. Their procedures are outstanding! Staff communication is A+!”',
            name: 'Kathleen R.',
            detail: 'Kuroda Customer Survey, March 2026',
          },
          {
            quote:
              '“This was the first time I ever made a claim. Kuroda Auto Body made it so easy to understand the procedure.”',
            name: 'Amy N.',
            detail: 'Kuroda Customer Survey, April 2026',
          },
          {
            quote:
              '“Honest, trustworthy, fair, reasonable pricing, friendly and kind. They go above and beyond to satisfy the customer. I’ve used them all my life - over 40 years!”',
            name: 'Patricia W.',
            detail: 'Kuroda Customer Survey, June 2026',
          },
          {
            quote: '“Customer service, timeliness and quality of repair are excellent.”',
            name: 'Ruth C.',
            detail: 'Kuroda Customer Survey, July 2026',
          },
          {
            quote:
              '“I like that they have car rentals right there so all we do is jump into another car and off we go. They explain everything well and all questions are encouraged.”',
            name: 'Darcie M.',
            detail: 'Kuroda Customer Survey, July 2026',
          },
          {
            quote: '“Hands down the best auto body shop on the island.”',
            name: 'Walter I.',
            detail: 'Kuroda Customer Survey, January 2026',
          },
          {
            quote: '“We have always had great experiences with Kuroda’s!”',
            name: 'Beth H.',
            detail: 'Kuroda Customer Survey, April 2026',
          },
          {
            quote: '“I will always do business with and refer Kuroda Autobody!”',
            name: 'Terri K.',
            detail: 'Kuroda Customer Survey, May 2026',
          },
        ],
      },
    ],
    cta: { title: 'Schedule Your ', titleStrong: 'Estimate Today' },
  },
];
