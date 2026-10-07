import { isSanityConfigured, sanityClient } from '../sanity/client';
import { mergeValue } from './merge';

/** Fetch one Sanity document by `_id`; null when unconfigured, missing or unreachable (logged). */
export async function fetchDocument(id: string): Promise<unknown> {
  if (!isSanityConfigured) return null;
  return sanityClient.fetch<unknown>(`*[_id == $id][0]`, { id }).catch((error) => {
    console.warn(`Sanity "${id}" unavailable — using built-in copy.`, error);
    return null;
  });
}

/**
 * Load a one-off Sanity document (`_id` = its type name, e.g. `locationPage`) merged field-by-field over
 * its built-in fallback from src/data/*.ts. Anything empty or missing in Sanity — or all of it, when
 * Sanity is unconfigured or unreachable — keeps the fallback, so a page always renders complete.
 */
export async function getSingleton<T>(id: string, fallback: T): Promise<T> {
  if (!isSanityConfigured) return fallback;
  return mergeValue(fallback, await fetchDocument(id));
}
