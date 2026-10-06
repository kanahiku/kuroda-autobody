/**
 * Site map — GENERATED from the client workbook (Sitemap sheet). Do not edit by hand.
 * Regenerate: python3 scripts/gen-sitemap.py "<path to .xlsx>"
 *
 * Hierarchy (one level per spreadsheet column pair):
 *   Category (slug)  →  Sub category one (slug)  →  Sub category two (slug)
 * A node without `slug` is a grouping label only (no page).
 */
export interface SitemapNode {
  label: string;
  /** Route, e.g. `/collision-repair/`. Absent = nav/footer grouping only. */
  slug?: string;
  /** Workbook batch: Approved · Batch 1 · Batch 2 (on hold) · Batch 3 · Client / legal. */
  batch?: string;
  children?: SitemapNode[];
}

export const sitemap: SitemapNode[] = [
  { label: 'Home', slug: '/', batch: 'Approved' },
  { label: 'Our Story', slug: '/about/', batch: 'Approved' },
  {
    label: 'Collision Repair',
    slug: '/collision-repair/',
    batch: 'Approved',
    children: [
      { label: 'Frame & Structural Repair', slug: '/collision-repair/frame-structural-repair/', batch: 'Batch 1' },
      { label: 'Auto Paint & Refinishing', slug: '/collision-repair/auto-paint-refinishing/', batch: 'Batch 1' },
      { label: 'Bumper Repair & Replacement', slug: '/collision-repair/bumper-repair/', batch: 'Batch 1' },
      { label: 'Dent & Body Repair', slug: '/collision-repair/dent-repair/', batch: 'Batch 1' },
      { label: 'ADAS Calibration', slug: '/collision-repair/adas-calibration/', batch: 'Batch 1' },
      { label: 'Vehicle Diagnostic Scanning', slug: '/collision-repair/diagnostic-scanning/', batch: 'Batch 1' },
      { label: 'Auto Glass Replacement', slug: '/collision-repair/auto-glass-replacement/', batch: 'Batch 1' },
      { label: 'Paintless Dent Repair', slug: '/collision-repair/paintless-dent-repair/', batch: 'Batch 2' },
    ],
  },
  {
    label: 'Had an Accident?',
    slug: '/had-an-accident/',
    batch: 'Approved',
    children: [
      { label: 'Your Right to Choose a Repair Shop', slug: '/had-an-accident/your-right-to-choose/', batch: 'Batch 1' },
      { label: 'Insurance Claims', slug: '/had-an-accident/insurance-claims/', batch: 'Batch 1' },
      {
        label: 'When the Insurance Estimate Is Different',
        slug: '/had-an-accident/insurance-estimate-differences/',
        batch: 'Batch 1',
      },
      { label: 'Deductibles', slug: '/had-an-accident/deductibles/', batch: 'Batch 1' },
      { label: 'Paying Out of Pocket', slug: '/had-an-accident/paying-out-of-pocket/', batch: 'Batch 1' },
      { label: 'Rental Cars', slug: '/had-an-accident/rental-cars/', batch: 'Batch 1' },
      { label: 'Towing', slug: '/had-an-accident/towing/', batch: 'Batch 2' },
      {
        label: 'Insurance Companies We Work With',
        slug: '/had-an-accident/insurance-companies/',
        batch: 'Batch 2',
        children: [
          { label: 'GEICO', slug: '/had-an-accident/insurance-companies/geico/', batch: 'Batch 2' },
          { label: 'State Farm', slug: '/had-an-accident/insurance-companies/state-farm/', batch: 'Batch 2' },
          { label: 'Progressive', slug: '/had-an-accident/insurance-companies/progressive/', batch: 'Batch 2' },
          { label: 'USAA', slug: '/had-an-accident/insurance-companies/usaa/', batch: 'Batch 2' },
          { label: 'Allstate', slug: '/had-an-accident/insurance-companies/allstate/', batch: 'Batch 2' },
        ],
      },
    ],
  },
  {
    label: 'Why Kuroda',
    children: [
      { label: 'Our Repair Process', slug: '/repair-process/', batch: 'Batch 1' },
      { label: 'Limited Lifetime Warranty', slug: '/warranty/', batch: 'Batch 1' },
      {
        label: 'Certifications & Training',
        slug: '/certifications/',
        batch: 'Batch 1',
        children: [
          { label: 'Honda', slug: '/certifications/honda/', batch: 'Batch 2' },
          { label: 'Acura', slug: '/certifications/acura/', batch: 'Batch 2' },
          { label: 'Nissan', slug: '/certifications/nissan/', batch: 'Batch 2' },
          { label: 'GM', slug: '/certifications/gm/', batch: 'Batch 2' },
          { label: 'Chrysler', slug: '/certifications/chrysler/', batch: 'Batch 2' },
        ],
      },
      { label: 'Repair Gallery', slug: '/gallery/', batch: 'Batch 2' },
    ],
  },
  { label: 'Reviews', slug: '/reviews/', batch: 'Approved' },
  { label: 'Location', slug: '/location/', batch: 'Batch 1' },
  {
    label: 'Service Areas',
    slug: '/service-areas/',
    batch: 'Batch 1',
    children: [
      { label: 'Mililani', slug: '/service-areas/mililani/', batch: 'Batch 1' },
      { label: 'Pearl City & Aiea', slug: '/service-areas/pearl-city-aiea/', batch: 'Batch 1' },
      { label: 'Ewa Beach', slug: '/service-areas/ewa-beach/', batch: 'Batch 2' },
      { label: 'Kapolei', slug: '/service-areas/kapolei/', batch: 'Batch 2' },
      { label: 'Honolulu', slug: '/service-areas/honolulu/', batch: 'Batch 2' },
    ],
  },
  { label: 'Contact', slug: '/contact/', batch: 'Approved' },
  { label: 'Online Estimate', slug: '/online-estimate/', batch: 'Batch 2' },
  {
    label: 'Blog',
    slug: '/blog/',
    batch: 'Batch 3',
    children: [
      {
        label: 'Posts',
        children: [
          {
            label: 'Can I Choose My Own Body Shop After an Accident in Hawaii?',
            slug: '/blog/choose-your-own-body-shop/',
            batch: 'Batch 3',
          },
          {
            label: 'What Happens After a Car Accident? The Repair Process',
            slug: '/blog/what-happens-after-car-accident/',
            batch: 'Batch 3',
          },
          { label: 'Is My Car Safe to Drive After an Accident?', slug: '/blog/safe-to-drive-after-accident/', batch: 'Batch 3' },
          {
            label: 'Why a Minor Accident Can Need ADAS Calibration',
            slug: '/blog/adas-calibration-after-minor-accident/',
            batch: 'Batch 3',
          },
          {
            label: 'Should I File a Claim or Pay Out of Pocket?',
            slug: '/blog/file-claim-or-pay-out-of-pocket/',
            batch: 'Batch 3',
          },
          { label: 'How Auto Body Paint Color Matching Works', slug: '/blog/paint-color-matching/', batch: 'Batch 3' },
        ],
      },
    ],
  },
  {
    label: 'Legal & Utility',
    children: [
      { label: 'Privacy Policy', slug: '/privacy-policy/', batch: 'Client / legal' },
      { label: 'Terms', slug: '/terms/', batch: 'Client / legal' },
      { label: 'Accessibility Statement', slug: '/accessibility/', batch: 'Client / legal' },
    ],
  },
];
