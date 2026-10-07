/**
 * Field-by-field merge of a Sanity document over its built-in fallback (src/data/*.ts).
 *
 * The fallback's shape is the contract; unknown Sanity keys are ignored.
 *  - string: a non-empty Sanity value wins
 *  - object: merged key by key
 *  - array:  a non-empty Sanity list replaces the fallback list; items missing a required field are dropped
 *            (a field is required when every fallback item fills it)
 *  - Sanity-only metadata (`_id`, `_key`, image assets …) is never copied
 */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isBlank(value: unknown): boolean {
  return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
}

export function mergeValue<T>(base: T, override: unknown): T {
  if (Array.isArray(base)) {
    if (!Array.isArray(override) || override.length === 0) return base;
    const shapes = base.filter(isRecord);
    if (shapes.length === 0) {
      const strings = override.filter((item): item is string => typeof item === 'string' && item.trim() !== '');
      return (strings.length ? strings : base) as T;
    }
    // Item shape = every key the fallback items use. A key is required when every fallback item fills it;
    // otherwise (e.g. an optional "note") it is copied when present and may be left empty.
    const keys = [...new Set(shapes.flatMap((shape) => Object.keys(shape)))];
    const required = keys.filter((key) => shapes.every((shape) => !isBlank(shape[key])));
    const items = override
      .filter(isRecord)
      .map((item) => Object.fromEntries(keys.filter((key) => !isBlank(item[key])).map((key) => [key, item[key]])))
      .filter((item) => required.every((key) => key in item));
    return (items.length ? items : base) as T;
  }
  if (isRecord(base)) {
    const source = isRecord(override) ? override : {};
    return Object.fromEntries(Object.entries(base).map(([key, value]) => [key, mergeValue(value, source[key])])) as T;
  }
  if (typeof base === 'string') return (typeof override === 'string' && override.trim() !== '' ? override : base) as T;
  if (typeof base === 'number') return (typeof override === 'number' ? override : base) as T;
  return base;
}

/**
 * Replace `{token}` placeholders in every string of a content object with values from site config
 * (phone, fax, city line …), so editors can type `{phone}` and the number stays defined in one place.
 * Unknown `{words}` are left untouched.
 */
export function applyTokens<T>(value: T, tokens: Record<string, string>): T {
  if (typeof value === 'string') {
    return value.replace(/\{(\w+)\}/g, (match, name: string) => tokens[name] ?? match) as T;
  }
  if (Array.isArray(value)) return value.map((item) => applyTokens(item, tokens)) as T;
  if (isRecord(value)) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, applyTokens(item, tokens)])) as T;
  }
  return value;
}
