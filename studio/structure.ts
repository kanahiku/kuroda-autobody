import { DocumentTextIcon, FolderIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/structure';

/** Document id for a content page — same rule as `contentPageId()` in src/lib/content/contentPageDoc.ts. */
const contentPageId = (path: string) => `contentPage-${path.replace(/^\/+|\/+$/g, '').replace(/\//g, '-')}`;

const contentPageItem = (S: StructureBuilder, title: string, path: string) =>
  S.listItem()
    .title(title)
    .id(contentPageId(path))
    .icon(DocumentTextIcon)
    .child(S.document().schemaType('contentPage').documentId(contentPageId(path)).title(title));

/** The service pages, in the same order as the site menu (src/data/sitemap.ts). */
const COLLISION_REPAIR_SERVICES: [string, string][] = [
  ['Frame & Structural Repair', '/collision-repair/frame-structural-repair/'],
  ['Auto Paint & Refinishing', '/collision-repair/auto-paint-refinishing/'],
  ['Bumper Repair & Replacement', '/collision-repair/bumper-repair/'],
  ['Dent & Body Repair', '/collision-repair/dent-repair/'],
  ['ADAS Calibration', '/collision-repair/adas-calibration/'],
  ['Vehicle Diagnostic Scanning', '/collision-repair/diagnostic-scanning/'],
  ['Auto Glass Replacement', '/collision-repair/auto-glass-replacement/'],
];

/** The Had an Accident topic pages, in the same order as the site menu (src/data/sitemap.ts). */
const HAD_AN_ACCIDENT_TOPICS: [string, string][] = [
  ['Your Right to Choose a Repair Shop', '/had-an-accident/your-right-to-choose/'],
  ['Insurance Claims', '/had-an-accident/insurance-claims/'],
  ['When the Insurance Estimate Is Different', '/had-an-accident/insurance-estimate-differences/'],
  ['Deductibles', '/had-an-accident/deductibles/'],
  ['Paying Out of Pocket', '/had-an-accident/paying-out-of-pocket/'],
  ['Rental Cars', '/had-an-accident/rental-cars/'],
];

/** The Why Kuroda pages, in the same order as the site menu. (The group has no hub page.) */
const WHY_KURODA_PAGES: [string, string][] = [
  ['Our Repair Process', '/repair-process/'],
  ['Limited Lifetime Warranty', '/warranty/'],
  ['Certifications & Training', '/certifications/'],
];

/** The Service Areas pages, in the same order as the site menu (the other areas have no page yet). */
const SERVICE_AREA_PAGES: [string, string][] = [
  ['Mililani & Koa Ridge', '/service-areas/mililani/'],
  ['Pearl City & Aiea', '/service-areas/pearl-city-aiea/'],
];

/**
 * Sidebar = the site's page order: Homepage, Our Story, Collision Repair and Had an Accident? (hub + sub pages), Why Kuroda (3 pages, no hub), Location, Service Areas (hub + communities), Contact,
 * then site-wide pieces. Each content page is one pre-seeded document — add a page = add one line here
 * (+ one in scripts/seed-pages.mjs).
 */
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .schemaType('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage').title('Homepage')),
      contentPageItem(S, 'Our Story', '/about/'),
      S.listItem()
        .title('Collision Repair')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('Collision Repair')
            .items([
              contentPageItem(S, 'Overview (hub page)', '/collision-repair/'),
              S.divider(),
              ...COLLISION_REPAIR_SERVICES.map(([title, path]) => contentPageItem(S, title, path)),
            ])
        ),
      S.listItem()
        .title('Had an Accident?')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('Had an Accident?')
            .items([
              contentPageItem(S, 'Overview (hub page)', '/had-an-accident/'),
              S.divider(),
              ...HAD_AN_ACCIDENT_TOPICS.map(([title, path]) => contentPageItem(S, title, path)),
            ])
        ),
      S.listItem()
        .title('Why Kuroda')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('Why Kuroda')
            .items(WHY_KURODA_PAGES.map(([title, path]) => contentPageItem(S, title, path)))
        ),
      S.listItem()
        .title('Location page')
        .schemaType('locationPage')
        .child(S.document().schemaType('locationPage').documentId('locationPage').title('Location page')),
      S.listItem()
        .title('Service Areas')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('Service Areas')
            .items([
              contentPageItem(S, 'Overview (hub page)', '/service-areas/'),
              S.divider(),
              ...SERVICE_AREA_PAGES.map(([title, path]) => contentPageItem(S, title, path)),
            ])
        ),
      S.listItem()
        .title('Contact page')
        .schemaType('contactPage')
        .child(S.document().schemaType('contactPage').documentId('contactPage').title('Contact page')),
      S.divider(),
      S.listItem()
        .title('Ratings bar (site-wide)')
        .schemaType('ratingsBar')
        .child(S.document().schemaType('ratingsBar').documentId('ratingsBar').title('Ratings bar')),
      S.listItem()
        .title('Header & footer (site-wide)')
        .schemaType('siteNavigation')
        .child(S.document().schemaType('siteNavigation').documentId('siteNavigation').title('Header & footer')),
      S.divider(),
      S.listItem()
        .title('Blog')
        .schemaType('blogPost')
        .child(
          S.documentTypeList('blogPost')
            .title('Blog posts')
            .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
        ),
      S.listItem()
        .title('Testimonials')
        .schemaType('testimonial')
        .child(
          S.documentTypeList('testimonial')
            .title('Testimonials')
            .defaultOrdering([
              { field: 'order', direction: 'asc' },
              { field: '_createdAt', direction: 'asc' },
            ])
        ),
    ]);

/** One-off documents: edited from the sidebar, never created, duplicated or deleted (content pages are created by scripts/seed-pages.mjs). */
export const singletonTypes = new Set<string>([
  'homePage',
  'locationPage',
  'contactPage',
  'contentPage',
  'ratingsBar',
  'siteNavigation',
]);
