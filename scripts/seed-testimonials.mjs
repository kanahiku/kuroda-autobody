/**
 * One-time seed: copies the quotes in src/data/reviews.ts into Sanity as published `testimonial`
 * documents (ids `testimonial-01`, `testimonial-02`, …). Safe to re-run — existing documents are
 * left untouched, so edits made in the Studio are never overwritten.
 *
 *   node --env-file=.env scripts/seed-testimonials.mjs
 *
 * Needs SANITY_PROJECT_ID, SANITY_DATASET and a SANITY_API_TOKEN with write access.
 */
import { createClient } from '@sanity/client';
import { reviewPages } from '../src/data/reviews.ts';

const { SANITY_PROJECT_ID, SANITY_DATASET = 'production', SANITY_API_TOKEN } = process.env;
if (!SANITY_PROJECT_ID || !SANITY_API_TOKEN) {
  console.error('Set SANITY_PROJECT_ID and SANITY_API_TOKEN (write access) in .env first.');
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2026-09-15',
  token: SANITY_API_TOKEN,
  useCdn: false,
});

const section = reviewPages.flatMap((p) => p.sections).find((s) => s.type === 'reviews');
const reviews = section?.reviews ?? [];
if (!reviews.length) {
  console.error('No reviews found in src/data/reviews.ts');
  process.exit(1);
}

// Shown on the homepage: Brandon (Carwise), Vera Keala (Google), Kathleen R. (customer survey).
const FEATURED = new Set([3, 6, 9]);

const tx = client.transaction();
reviews.forEach((r, i) => {
  tx.createIfNotExists({
    _id: `testimonial-${String(i + 1).padStart(2, '0')}`,
    _type: 'testimonial',
    quote: r.quote,
    name: r.name,
    ...(r.detail ? { detail: r.detail } : {}),
    featured: FEATURED.has(i + 1),
    order: (i + 1) * 10,
  });
});

const result = await tx.commit();
console.log(`Seeded ${reviews.length} testimonials into ${SANITY_PROJECT_ID}/${SANITY_DATASET}`);
console.log(`${result.results.filter((r) => r.operation === 'create').length} created, the rest already existed.`);
