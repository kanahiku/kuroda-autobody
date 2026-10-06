/**
 * Regenerates favicon.svg, favicon.ico, favicon-32.png and apple-touch-icon.png
 * from the square "K" mark in the client's vertical logo (public/brand/logo-vertical-color.png).
 *
 *   node scripts/gen-icons.mjs
 */
import sharp from 'sharp';
import { writeFileSync } from 'fs';

const ICON_BG = '#FFFFFF';
const LOGO_SOURCE = 'public/brand/logo-vertical-color.png';
// Mark region of the 478 × 324 vertical logo (square + chevron, above the wordmark).
const MARK = { left: 140, top: 0, width: 206, height: 224 };

const mark = await sharp(LOGO_SOURCE).extract(MARK).png().toBuffer();

const side = Math.max(MARK.width, MARK.height);
const canvas = Math.round(side * 1.16);
const left = Math.round((canvas - MARK.width) / 2);
const top = Math.round((canvas - MARK.height) / 2);

const layer = await sharp({
  create: { width: canvas, height: canvas, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([{ input: mark, left, top }])
  .png()
  .toBuffer();

const icon = await sharp({
  create: { width: canvas, height: canvas, channels: 4, background: ICON_BG },
})
  .composite([{ input: layer }])
  .png()
  .toBuffer();

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvas} ${canvas}" width="32" height="32" role="img" aria-label="Kuroda Autobody">
  <rect width="${canvas}" height="${canvas}" fill="${ICON_BG}"/>
  <image width="${canvas}" height="${canvas}" href="data:image/png;base64,${layer.toString('base64')}"/>
</svg>
`;
writeFileSync('public/favicon.svg', faviconSvg);

await Promise.all([
  sharp(icon).resize(180, 180).png().toFile('public/apple-touch-icon.png'),
  sharp(icon).resize(32, 32).png().toFile('public/favicon.ico'),
  sharp(icon).resize(32, 32).png().toFile('public/favicon-32.png'),
]);

console.log('✓ favicon.svg ✓ favicon.ico ✓ favicon-32.png ✓ apple-touch-icon.png');
