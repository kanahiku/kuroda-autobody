import { createClient } from '@sanity/client';

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || 'production';
const token = import.meta.env.SANITY_API_TOKEN || undefined;

/** False until SANITY_PROJECT_ID is set — the blog then renders its empty state instead of fetching. */
export const isSanityConfigured = Boolean(projectId);

export const sanityClient = createClient({
  // Placeholder keeps the client constructible; nothing fetches while `isSanityConfigured` is false.
  projectId: projectId || 'unconfigured',
  dataset,
  apiVersion: '2026-09-15',
  useCdn: false,
  perspective: 'published',
  ...(token ? { token } : {}),
});
