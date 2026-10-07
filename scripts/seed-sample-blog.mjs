/**
 * Creates ONE sample blog post in Sanity that uses every building block the article page supports —
 * cover image, headings (H2 → table of contents, H3, H4), paragraphs with bold / italic / underline / code /
 * links, bullet + numbered lists (nested), block quote, callouts (tip / info / warning / note), tables,
 * inline images with captions, tags — so the design can be reviewed in one place.
 *
 *   node --env-file=.env scripts/seed-sample-blog.mjs           # create (skips if it already exists)
 *   node --env-file=.env scripts/seed-sample-blog.mjs --reset   # delete it and create it again
 *   node --env-file=.env scripts/seed-sample-blog.mjs --delete  # remove it (and stop)
 *
 * The images are generated here (plain brand-coloured sample cards, not photography) and uploaded as Sanity
 * assets. Delete the post in the Studio (Blog → "Sample post …") when you no longer need it.
 * Needs SANITY_PROJECT_ID, SANITY_DATASET and a SANITY_API_TOKEN with write access.
 */
import { createClient } from '@sanity/client';
import sharp from 'sharp';

const ID = 'blogPost-sample-everything';
const SLUG = 'sample-what-to-do-after-a-collision';

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

const args = process.argv.slice(2);
if (args.includes('--reset') || args.includes('--delete')) {
  await client.delete(ID);
  console.log(`Deleted ${ID}.`);
  if (args.includes('--delete')) process.exit(0);
}
if (await client.getDocument(ID)) {
  console.log(`${ID} already exists — left untouched (use --reset to rebuild it).`);
  process.exit(0);
}

// ─── Sample images ────────────────────────────────────────────────────────────

async function sampleImage(label, sub, width, height, colors) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${colors[0]}"/><stop offset="1" stop-color="${colors[1]}"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="48%" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="700"
      font-size="${Math.round(height / 11)}" fill="#ffffff" letter-spacing="4">${label}</text>
    <text x="50%" y="58%" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
      font-size="${Math.round(height / 22)}" fill="#ffffff" fill-opacity="0.8" letter-spacing="2">${sub}</text>
  </svg>`;
  const buffer = await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toBuffer();
  const asset = await client.assets.upload('image', buffer, {
    filename: `sample-${label.toLowerCase().replace(/\W+/g, '-')}.jpg`,
    contentType: 'image/jpeg',
  });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

const cover = await sampleImage('SAMPLE COVER', `${1600} × ${900} · replace with a real photo`, 1600, 900, [
  '#0d2540',
  '#2f6fd0',
]);
const photoA = await sampleImage('SAMPLE PHOTO 1', '1200 × 675 · inline article image', 1200, 675, [
  '#2f6fd0',
  '#0d2540',
]);
const photoB = await sampleImage('SAMPLE PHOTO 2', '1200 × 675 · inline article image', 1200, 675, [
  '#44525f',
  '#0d2540',
]);

// ─── Portable-text helpers ────────────────────────────────────────────────────

let n = 0;
const key = () => `k${(n++).toString(36)}`;

/** A text span; `marks` are decorator names or markDef keys. */
const t = (text, ...marks) => ({ _type: 'span', _key: key(), text, marks });

/** A block of the given style; `defs` are link annotations referenced from span marks. */
const block = (style, children, extra = {}) => ({
  _type: 'block',
  _key: key(),
  style,
  markDefs: extra.defs ?? [],
  children: children.map((c) => (typeof c === 'string' ? t(c) : c)),
  ...(extra.listItem ? { listItem: extra.listItem, level: extra.level ?? 1 } : {}),
});
const p = (...children) => block('normal', children);
const h2 = (text) => block('h2', [text]);
const h3 = (text) => block('h3', [text]);
const h4 = (text) => block('h4', [text]);
const quote = (text) => block('blockquote', [text]);
const li = (listItem, children, level = 1) => block('normal', children, { listItem, level });
const bullet = (...children) => li('bullet', children);
const bullet2 = (...children) => li('bullet', children, 2);
const num = (...children) => li('number', children);
const num2 = (...children) => li('number', children, 2);

const link = (href, blank = true) => ({ _type: 'link', _key: key(), href, blank });
/** A paragraph containing one link: p-with-link(before, [text, href], after). */
const withLink = (before, [text, href, blank], after = '') => {
  const def = link(href, blank);
  return block(
    'normal',
    [before, t(text, def._key), after].filter((x) => x !== ''),
    { defs: [def] }
  );
};

const callout = (type, text) => ({ _type: 'callout', _key: key(), type, text });
const table = (caption, headerRow, rows) => ({
  _type: 'table',
  _key: key(),
  caption,
  headerRow,
  rows: rows.map((cells) => ({ _type: 'tableRow', _key: key(), cells })),
});
const image = (img, alt, caption) => ({ ...img, _key: key(), alt, caption });

// ─── The article ──────────────────────────────────────────────────────────────

const body = [
  // Lead paragraph — every inline style
  (() => {
    const a = link('https://www.nhtsa.gov', true);
    return block(
      'normal',
      [
        'A collision is stressful, and the hours afterwards matter. This ',
        t('sample article', 'strong'),
        ' walks through what to do — and it also shows ',
        t('every', 'em'),
        ' kind of content a Kuroda blog post can hold: ',
        t('bold', 'strong'),
        ', ',
        t('italic', 'em'),
        ', ',
        t('underlined', 'underline'),
        ' and ',
        t('inline code', 'code'),
        ' text, plus ',
        t('external links', a._key),
        ' like this one to safety information.',
      ],
      { defs: [a] }
    );
  })(),

  h2('Step 1 — Make sure everyone is safe'),
  p(
    'Before anything else, check on everyone in the vehicles involved. If it is safe to do so, move to the side of the road and turn on your hazard lights. Then:'
  ),
  bullet('Call ', t('911', 'strong'), ' if anyone is hurt or the vehicles cannot be moved.'),
  bullet('Stay in your vehicle if you are on a busy road, and keep your seat belt on until traffic is clear.'),
  bullet('Switch off the engine if you smell fuel or see smoke.'),
  bullet2('Do not stand between vehicles or in a live lane.'),
  bullet2('Keep children and pets inside until it is safe to move them.'),
  bullet('Turn on hazard lights and set out flares or triangles if you have them.'),
  callout(
    'warning',
    'Never move a person who may have a neck or back injury unless they are in immediate danger. Wait for emergency responders.'
  ),

  h2('Step 2 — Document the scene'),
  p(
    'Good documentation makes the insurance claim and the repair estimate smoother. Take more photos than you think you need — you can always delete extras later.'
  ),
  h3('What to photograph'),
  num('All four corners of ', t('every', 'em'), ' vehicle involved.'),
  num('Close-ups of each damaged area, with something for scale.'),
  num('Wider shots that show the road, signs and traffic lights.'),
  num('The other driver’s details:'),
  num2('License plate and vehicle make / model.'),
  num2('Insurance card and contact information.'),
  num('Any skid marks, debris or weather conditions.'),
  image(
    photoA,
    'Sample photo card showing where an article image appears',
    'Figure 1 — Inline images show a caption underneath. Replace this sample with a real photo.'
  ),
  callout(
    'tip',
    'Turn on your phone’s location and date stamp before you take photos, so every image carries its own proof of when and where it was taken.'
  ),

  h2('Step 3 — Talk to your insurance company'),
  withLink(
    'Report the collision to your insurer as soon as you can. You are free to choose where your car is repaired — read ',
    ['your right to choose a repair shop', '/had-an-accident/your-right-to-choose/', false],
    ' for the details.'
  ),
  quote(
    'A repair estimate is a starting point, not a final price — hidden damage often shows up once the panels come off.'
  ),
  h3('Choosing a shop'),
  p('This is a general comparison to help you ask the right questions; every claim is different.'),
  table(
    'Table 1 — Questions to ask when comparing repair options',
    ['Question', 'Insurer-referred shop', 'Shop of your choice'],
    [
      ['Who recommends the shop?', 'Your insurance company', 'You, a friend or a trusted review'],
      ['Who do you talk to about the repair?', 'Often the insurer first', 'The shop and your adjuster'],
      ['Can you visit before you decide?', 'Yes', 'Yes'],
      ['Is the repair warrantied?', 'Ask for it in writing', 'Ask for it in writing'],
    ]
  ),
  callout(
    'info',
    'Ask every shop for a written estimate and a written warranty before work begins. A good shop is happy to explain both.'
  ),

  h2('Step 4 — Understand the repair'),
  p(
    'Modern vehicles are built from many materials and carry safety sensors in the bumpers, mirrors and windshield. That is why the way a repair is done matters as much as how it looks.'
  ),
  h3('Common levels of damage'),
  h4('Cosmetic damage'),
  p(
    'Scratches, scuffs and small dents. These usually involve sanding, filler and paint, and sometimes paintless dent repair.'
  ),
  h4('Structural damage'),
  p(
    'Bent frames or crumpled rails. These need frame measuring equipment and trained technicians — see our ',
    t('Frame & Structural Repair', 'strong'),
    ' service.'
  ),
  table(
    'Table 2 — What different kinds of damage usually involve',
    ['Damage', 'What it usually involves', 'Sensors / ADAS check?', 'Typical effort'],
    [
      ['Light scratches', 'Sanding, paint and clear coat', 'Rarely', 'Low'],
      ['Dents and creases', 'Panel repair or paintless dent repair', 'Sometimes', 'Medium'],
      ['Bumper damage', 'Repair or replace, refinish, re-mount sensors', 'Yes', 'Medium'],
      ['Frame damage', 'Measuring, pulling and welding to spec', 'Yes', 'High'],
    ]
  ),
  image(
    photoB,
    'Second sample photo card',
    'Figure 2 — A second inline image, to show spacing between several figures in one article.'
  ),
  callout('note', 'This table is illustrative. Your estimator will list the exact steps for your vehicle.'),

  h2('Quick checklist'),
  num('Check everyone is safe and call 911 if needed.'),
  num('Photograph the scene, all vehicles and the other driver’s details.'),
  num('Report the collision to your insurance company.'),
  num('Choose the repair shop you trust — it is your decision.'),
  num('Ask for a written estimate and warranty.'),
  withLink(
    'Questions after a collision? Call us on ',
    ['(808) 676-1941', 'tel:+18086761941', false],
    ' or schedule an estimate online.'
  ),
];

const doc = {
  _id: ID,
  _type: 'blogPost',
  title: 'Sample: What to Do After a Collision — a Complete Walkthrough',
  slug: { _type: 'slug', current: SLUG },
  excerpt:
    'A sample article that shows everything a blog post can contain — images, tables, lists, callouts, quotes and links — while walking through what to do after a collision.',
  publishDate: new Date().toISOString(),
  author: 'Kuroda Autobody',
  category: 'Insurance & Claims',
  tags: ['sample', 'collision', 'insurance', 'checklist', 'estimates'],
  image: { ...cover, alt: 'Sample cover image for the article' },
  body,
};

await client.create(doc);
console.log(`Created ${ID} → /blog/${SLUG}/`);
