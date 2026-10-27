import type { BreadcrumbItem, PageSchema } from './types';

const HOME: BreadcrumbItem = { name: 'Home', path: '/' };

/**
 * Fallback schema for routes that are not in customOverrides.json.
 * The 41 pages from the schema document live in that file and replace this generator.
 * Privacy, Terms, and Accessibility are omitted on purpose: the document gives them no schema.
 */
export const pages: PageSchema[] = [
  {
    name: 'Home',
    path: '/',
    schemaType: 'WebPage',
    description: null,
    faq: [],
    breadcrumb: [HOME],
  },
  {
    name: 'Contact',
    path: '/contact',
    schemaType: 'ContactPage',
    description: null,
    faq: [],
    breadcrumb: [HOME, { name: 'Contact', path: '/contact' }],
  },
  {
    name: 'Reviews',
    path: '/reviews',
    schemaType: 'WebPage',
    description: null,
    faq: [],
    breadcrumb: [HOME, { name: 'Reviews', path: '/reviews' }],
  },
  {
    name: 'Blog',
    path: '/blog',
    schemaType: 'WebPage',
    description: null,
    faq: [],
    breadcrumb: [HOME, { name: 'Blog', path: '/blog' }],
  },
];
