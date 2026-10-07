/**
 * One-time seed for the Sanity page documents: writes each page's built-in copy (src/data/*.ts) into Sanity
 * as a published singleton so the Studio opens pre-filled with exactly what the site shows today.
 *
 *   node --env-file=.env scripts/seed-pages.mjs              # every page below
 *   node --env-file=.env scripts/seed-pages.mjs locationPage # just one
 *
 * Safe to re-run: a document that already exists is left untouched, so Studio edits are never overwritten.
 * To start a page over, delete its document in the Studio (Vision / API) and run this again.
 *
 * Needs SANITY_PROJECT_ID, SANITY_DATASET and a SANITY_API_TOKEN with write access.
 * Add a one-off page = add one line to PAGES. Content pages (Our Story, Collision Repair …) are seeded from their src/data lists — add the list to the `contentPage` entry below.
 */
import { createClient } from '@sanity/client';
import { homeFallback } from '../src/data/home.ts';
import { locationFallback } from '../src/data/location.ts';
import { contactFallback } from '../src/data/contact.ts';
import { ratingsFallback } from '../src/data/ratings.ts';
import { navigationData } from '../src/data/navigation.ts';
import { toDoc as navigationToDoc } from '../src/lib/content/navigationDoc.ts';
import { ourStoryPages } from '../src/data/ourStory.ts';
import { collisionRepairPages } from '../src/data/collisionRepair.ts';
import { collisionRepairHubPages } from '../src/data/collisionRepairHub.ts';
import { hadAnAccidentPages } from '../src/data/hadAnAccident.ts';
import { hadAnAccidentHubPages } from '../src/data/hadAnAccidentHub.ts';
import { whyKurodaPages } from '../src/data/whyKuroda.ts';
import { serviceAreaPages } from '../src/data/serviceAreas.ts';
import { contentPageId, toDoc } from '../src/lib/content/contentPageDoc.ts';

const { reviews, ...homeRest } = homeFallback;

/** document id → content. The id is the type name for one-off pages; content pages carry `_type` and use `contentPageId(route)`. */
const PAGES = {
  homePage: {
    ...homeRest,
    // The review cards are not seeded — they come from Testimonials marked "Show on homepage".
    reviews: {
      eyebrow: reviews.eyebrow,
      headingLead: reviews.headingLead,
      headingAccent: reviews.headingAccent,
      note: reviews.note,
    },
  },
  ratingsBar: ratingsFallback,
  locationPage: locationFallback,
  contactPage: contactFallback,
  siteNavigation: navigationToDoc(navigationData),
  ...Object.fromEntries(
    [
      ...ourStoryPages,
      ...collisionRepairHubPages,
      ...collisionRepairPages,
      ...hadAnAccidentHubPages,
      ...hadAnAccidentPages,
      ...whyKurodaPages,
      ...serviceAreaPages,
    ].map((page) => [contentPageId(page.path), { _type: 'contentPage', ...toDoc(page) }])
  ),
};

const { SANITY_PROJECT_ID, SANITY_DATASET = 'production', SANITY_API_TOKEN } = process.env;
if (!SANITY_PROJECT_ID || !SANITY_API_TOKEN) {
  console.error('Set SANITY_PROJECT_ID and SANITY_API_TOKEN (write access) in .env first.');
  process.exit(1);
}

const only = process.argv.slice(2);
const unknown = only.filter((id) => !(id in PAGES));
if (unknown.length) {
  console.error(`Unknown page: ${unknown.join(', ')}. Available: ${Object.keys(PAGES).join(', ')}`);
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2026-09-15',
  token: SANITY_API_TOKEN,
  useCdn: false,
});

/** Sanity array items need a stable `_key`. */
function withKeys(value, path = 'k') {
  if (Array.isArray(value)) {
    return value.map((item, i) =>
      item && typeof item === 'object' ? { _key: `${path}${i}`, ...withKeys(item, `${path}${i}-`) } : item
    );
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withKeys(v, `${path}${k}-`)]));
  }
  return value;
}

for (const id of only.length ? only : Object.keys(PAGES)) {
  const { _type = id, ...content } = PAGES[id];
  if (await client.getDocument(id)) {
    console.log(`${id} already exists — left untouched.`);
    continue;
  }
  await client.create({ _id: id, _type, ...withKeys(content) });
  console.log(`Created ${id} in ${SANITY_PROJECT_ID}/${SANITY_DATASET}`);
}
