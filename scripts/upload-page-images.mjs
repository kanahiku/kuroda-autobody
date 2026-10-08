/**
 * Uploads the client's page photos (new-images/Kuroda Website Images/<folder>/) to Sanity and attaches them to
 * the page documents' photo fields (the file + its alt text). Photos live in Sanity only — each original is
 * resized to 2000px / JPEG in memory before upload; nothing is written to the repo.
 *
 *   node --env-file=.env scripts/upload-page-images.mjs all                 # every folder
 *   node --env-file=.env scripts/upload-page-images.mjs "02 Our Story"      # one folder
 *   node --env-file=.env scripts/upload-page-images.mjs all --dry           # show the plan, change nothing
 *
 * Which photo goes where comes from "Image Manifest.csv" (folder + file); the alt text from the manifest's
 * "Image bank reference" (ALT below). Where a page keeps its photos is in TARGETS: a page document
 * (`contentPage-…`, `homePage`, …) or a row of the site-wide `pagePhotos` document (reviews, legal, blog).
 * File names map to a slot: Hero.png → hero photo, Final_CTA.png → closing photo, anything else → the page
 * block (story / numbered steps) whose heading matches BLOCKS. Safe to re-run: identical photos are not
 * uploaded twice and the fields are simply set again.
 * Needs SANITY_PROJECT_ID, SANITY_DATASET and a SANITY_API_TOKEN with write access.
 */
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { createClient } from '@sanity/client';
import sharp from 'sharp';

const ROOT = new URL('../new-images/Kuroda Website Images/', import.meta.url);
const MAX_WIDTH = 2000;

/** "Image bank reference" (manifest) → alt text. */
const ALT = {
  'Refinishing #5': 'Painter working in the spray booth at Kuroda Autobody',
  'Production #1': 'Two Kuroda technicians holding a bumper cover at the frame bench',
  'Production #3': 'Wide view of the Kuroda Autobody shop floor and mezzanine',
  'History #2': 'Opening Day group photo at Kuroda Service Station, May 29, 1938',
  'Reception #4': 'Front desk team greeting a customer at Kuroda Autobody',
  'Shop Exterior #1': 'Kuroda Autobody building with a traveler palm against a blue sky',
  'Reception #3': 'Memorial display case with a folded flag and awards at Kuroda Autobody',
  'History #4': 'Kuroda Service Station storefront with staff, in black and white',
  'Refinishing #3': 'Two Kuroda staff at the paint-matching station',
  'Refinishing #1': 'Paint booths on the Kuroda Autobody shop floor',
  'Production #5': 'Mezzanine and Car-O-Liner frame bay at Kuroda Autobody',
  'Production #4': 'Car-O-Liner frame machine with a vehicle on it',
  'image 15': 'Hand with a ratchet under the hood of a blue car',
  'image 7': 'Masked panel in the body prep area',
  'image 2': 'Technician in the wash and prep bay with a damaged car',
  'image 3': 'Calibration bay with a car on stands',
  'Production #2': 'Red car on the alignment rig',
  'image 8': 'Technicians working at a diagnostic and electronics bench',
  'image 17': 'Technician in a Kuroda jacket working under an open hood',
  'image 13': 'Row of clean vehicles with headlights and glass in view',
  'image 4': 'Technician in a Kuroda jacket walking past vehicles',
  'Shop Exterior #2': 'Entrance to Kuroda Autobody with the shop sign',
  'image 9': 'Service advisor with a tablet walking a customer through their car',
  'Shop Exterior #4': 'Stone sign for 94-518 Puahi St. and the Kuroda Autobody parking lot',
  'Reception #1': 'Customer lobby and waiting area at Kuroda Autobody',
  'Shop Exterior #3': 'Street view with flags and palm trees outside Kuroda Autobody',
  'History #3': 'Kuroda Service Station in a sepia photograph',
  'Reception #2': 'Hawaii and U.S. flags with palm trees at Kuroda Autobody',
};

/** Page folder → where its photos live. `path` is the site route (content pages / `pagePhotos` rows). */
const SERVICE = (slug) => ({ doc: `contentPage-collision-repair-${slug}` });
const TOPIC = (slug) => ({ doc: `contentPage-had-an-accident-${slug}` });
const TARGETS = {
  '01 Home': {
    doc: 'homePage',
    slots: {
      'Hero.png': 'hero',
      'Services.png': 'services',
      'Why_Kuroda.png': 'why',
      'Heritage_1938.png': 'heritage',
      'Final_CTA.png': 'cta',
    },
  },
  '02 Our Story': { doc: 'contentPage-about' },
  '03 Collision Repair': { doc: 'contentPage-collision-repair' },
  '04 Frame & Structural Repair': SERVICE('frame-structural-repair'),
  '05 Auto Paint & Refinishing': SERVICE('auto-paint-refinishing'),
  '06 Bumper Repair & Replacement': SERVICE('bumper-repair'),
  '07 Dent & Body Repair': SERVICE('dent-repair'),
  '08 ADAS Calibration': SERVICE('adas-calibration'),
  '09 Vehicle Diagnostic Scanning': SERVICE('diagnostic-scanning'),
  '10 Auto Glass Replacement': SERVICE('auto-glass-replacement'),
  '11 Had an Accident': { doc: 'contentPage-had-an-accident' },
  '12 Your Right to Choose': TOPIC('your-right-to-choose'),
  '13 Insurance Claims': TOPIC('insurance-claims'),
  '14 When the Insurance Estimate Is Different': TOPIC('insurance-estimate-differences'),
  '15 Deductibles': TOPIC('deductibles'),
  '16 Paying Out of Pocket': TOPIC('paying-out-of-pocket'),
  '17 Rental Cars': TOPIC('rental-cars'),
  '18 Our Repair Process': { doc: 'contentPage-repair-process' },
  '19 Limited Lifetime Warranty': { doc: 'contentPage-warranty' },
  '20 Certifications & Training': { doc: 'contentPage-certifications' },
  '21 Reviews': { row: '/reviews/' },
  '22 Location': { doc: 'locationPage' },
  '23 Service Areas Hub': { doc: 'contentPage-service-areas' },
  '24 Mililani': { doc: 'contentPage-service-areas-mililani' },
  '25 Pearl City & Aiea': { doc: 'contentPage-service-areas-pearl-city-aiea' },
  '26 Contact': { doc: 'contactPage' },
  '27 Blog': { row: '/blog/' },
  '28 Blog Post Template': { row: '/blog/*' },
  '29 Privacy Policy': { row: '/privacy-policy/' },
  '30 Terms': { row: '/terms/' },
  '31 Accessibility Statement': { row: '/accessibility/' },
};

/** Non-hero / non-CTA files → [block type, regex on the block heading]. */
const BLOCKS = {
  'A_Legacy_Beyond_the_Business.png': ['storySection', /legacy beyond/i],
  'From_Service_Station_to_Collision_Repair.png': ['storySection', /from service station/i],
  'Some_Things_Never_Change.png': ['storySection', /some things/i],
  'Do_It_Right_Treat_People_Right.png': ['storySection', /do it right/i],
  'Built_for_Todays_Vehicles.png': ['storySection', /built for/i],
  'Doing_Our_Part.png': ['storySection', /doing\s+our part/i],
  'Four_Step_Process.png': ['stepsSection', /four-step/i],
  'Your_Car_Your_Choice.png': ['storySection', /your car\.?\s+your choice/i],
  'We_Help_Make_the_Process_Easier.png': ['storySection', /we help make/i],
  'Keep_Moving_Rental_Cars.png': ['storySection', /keep moving/i],
  'Post_Repair_Walkthrough.png': ['storySection', /post-repair/i],
  'Heritage_1938.png': ['storySection', /rooted in hawaii|deep roots/i],
};

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Minimal CSV reader for the manifest (handles quoted fields). */
function parseCsv(text) {
  const [header, ...lines] = text.trim().split(/\r?\n/);
  const split = (line) => [...line.matchAll(/("([^"]*)"|[^,]*)(,|$)/g)].slice(0, -1).map((m) => m[2] ?? m[1]);
  const keys = split(header);
  return lines.map((line) => Object.fromEntries(split(line).map((value, i) => [keys[i], value])));
}

async function readManifest() {
  return parseCsv(await readFile(new URL('Image%20Manifest.csv', ROOT), 'utf8'));
}

async function prepare(folder, file) {
  const input = await readFile(new URL(`${encodeURIComponent(folder)}/${encodeURIComponent(file)}`, ROOT));
  return sharp(input)
    .flatten({ background: '#ffffff' })
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
}

const heading = (block) => `${block.headingLead ?? ''} ${block.headingAccent ?? ''}`.replace(/\s+/g, ' ');

/** The Sanity field path (without `.image` / `.imageAlt`) a photo goes to, or null when it has no home. */
function slotPath(target, file, doc) {
  if (target.slots?.[file]) return target.slots[file];
  if (file === 'Hero.png') return 'hero';
  if (file === 'Final_CTA.png') return 'cta';
  const [type, pattern] = BLOCKS[file] ?? [];
  const block = (doc?.sections ?? []).find((b) => b._type === type && pattern.test(heading(b)));
  return block ? `sections[_key=="${block._key}"]` : null;
}

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const uploaded = new Map();
async function upload(buffer, name) {
  const hash = createHash('sha1').update(buffer).digest('hex');
  if (!uploaded.has(hash)) {
    const asset = await client.assets.upload('image', buffer, { filename: name, contentType: 'image/jpeg' });
    uploaded.set(hash, asset._id);
  }
  return uploaded.get(hash);
}

/** Ensure the shared `pagePhotos` row for a route exists; returns its field prefix. */
async function ensureRow(path) {
  const key = slug(path.replace('*', 'all')) || 'home';
  await client.createIfNotExists({ _id: 'pagePhotos', _type: 'pagePhotos', pages: [] });
  const doc = await client.getDocument('pagePhotos');
  if (!(doc.pages ?? []).some((row) => row._key === key)) {
    await client
      .patch('pagePhotos')
      .setIfMissing({ pages: [] })
      .append('pages', [{ _type: 'pagePhotoRow', _key: key, path }])
      .commit();
  }
  return `pages[_key=="${key}"]`;
}

/** Field names for a slot: page documents use `<slot>.image`, `pagePhotos` rows use `heroImage` / `ctaImage`. */
const fieldNames = (prefix, isRow, slot) =>
  isRow ? [`${prefix}.${slot}Image`, `${prefix}.${slot}Alt`] : [`${prefix}.image`, `${prefix}.imageAlt`];

async function processFolder(folder, rows, dry) {
  const target = TARGETS[folder];
  if (!target) return console.log(`! ${folder}: no target configured`);
  const doc = target.doc ? await client.getDocument(target.doc) : null;
  if (target.doc && !doc) return console.log(`! ${folder}: document "${target.doc}" not found in Sanity`);
  const rowPrefix = target.row && !dry ? await ensureRow(target.row) : null;
  const set = {};
  for (const { File: file, 'Image bank reference': ref } of rows) {
    const path = slotPath(target, file, doc);
    const alt = ALT[ref];
    if (!path || !alt) {
      console.log(`! ${folder}/${file}: ${!path ? 'no matching block on the page' : `no alt text for "${ref}"`}`);
      continue;
    }
    console.log(`${dry ? '·' : '✓'} ${folder}/${file} → ${target.doc ?? target.row} ${path}`);
    if (dry) continue;
    const buffer = await prepare(folder, file);
    const id = await upload(buffer, `${slug(folder)}-${slug(file.replace(/\.png$/i, ''))}.jpg`);
    const slot = file === 'Final_CTA.png' ? 'cta' : 'hero';
    const prefix = target.row ? rowPrefix : path;
    const [imageField, altField] = fieldNames(prefix, Boolean(target.row), slot);
    set[imageField] = { _type: 'image', asset: { _type: 'reference', _ref: id } };
    set[altField] = alt;
  }
  if (!dry && Object.keys(set).length)
    await client
      .patch(target.doc ?? 'pagePhotos')
      .set(set)
      .commit();
}

const [arg, flag] = process.argv.slice(2);
if (!arg) {
  console.error('Usage: upload-page-images.mjs <"01 Home" | all> [--dry]');
  process.exit(1);
}
const dry = flag === '--dry';
const manifest = await readManifest();
const folders = [...new Set(manifest.map((row) => row['Page folder']))].filter((f) => arg === 'all' || f === arg);
if (folders.length === 0) {
  console.error(`No folder "${arg}" in the manifest.`);
  process.exit(1);
}
for (const folder of folders) {
  await processFolder(
    folder,
    manifest.filter((row) => row['Page folder'] === folder),
    dry
  );
}
console.log(dry ? 'Dry run — nothing changed.' : `Done. ${uploaded.size} distinct photos uploaded.`);
