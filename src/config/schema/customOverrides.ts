import type { JsonLdNode } from './types';
import customSchemasJson from './customOverrides.json';

const customMap = customSchemasJson as Record<string, JsonLdNode>;

/**
 * Authored schema from the Kuroda schema document, one `@graph` per path.
 * URLs use the canonical origin in `src/config/site.ts` (apex, not www).
 * Trailing slashes are stripped so `/contact/` matches the `/contact` key.
 */
export function getCustomSchema(pathname: string): JsonLdNode | null {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  return customMap[normalized] ?? null;
}

export { customSchemasJson as customPageSchemas };
