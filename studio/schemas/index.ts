import { blogPost } from './documents/blogPost';
import { contactPage } from './documents/contactPage';
import { siteNavigation } from './documents/siteNavigation';
import { contentPage } from './documents/contentPage';
import { homePage } from './documents/homePage';
import { locationPage } from './documents/locationPage';
import { pagePhotos } from './documents/pagePhotos';
import { ratingsBar } from './documents/ratingsBar';
import { testimonial } from './documents/testimonial';

/**
 * Sanity manages the homepage, location page, contact page and content-page (Our Story …) copy, the site-wide ratings bar and header & footer navigation, the blog and the customer testimonials shown on /reviews/ and the homepage.
 * Other page copy and imagery live in the codebase (`src/data/`, `public/`).
 */
export const schemaTypes = [
  homePage,
  locationPage,
  contactPage,
  contentPage,
  ratingsBar,
  pagePhotos,
  siteNavigation,
  blogPost,
  testimonial,
];
