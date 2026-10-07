import { locationFallback, type LocationContent } from '../../data/location';
import { applyTokens } from './merge';
import { getSingleton } from './singleton';
import { siteTokens } from './tokens';

/**
 * Location page content = Sanity `locationPage` document merged over `locationFallback`
 * (src/data/location.ts), with `{phone}`, `{phoneHref}`, `{fax}`, `{cityLine}`, `{landmark}` and `{directionsHref}` filled in from site config.
 */
export async function getLocationContent(): Promise<LocationContent> {
  const content = await getSingleton('locationPage', locationFallback);
  return applyTokens(content, siteTokens());
}
