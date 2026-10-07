import { CONTACT } from '../../config/contact';

/**
 * Site-config details editors (and built-in copy) can insert into text with `{token}`; applied with
 * `applyTokens` (./merge.ts). Defined here once so the number / address stay in `src/config/contact.ts`.
 */
export const siteTokens = (): Record<string, string> => ({
  phone: CONTACT.phone.display,
  phoneHref: CONTACT.phone.href,
  fax: CONTACT.fax.display,
  cityLine: CONTACT.address.cityLine,
  landmark: CONTACT.address.landmark,
  addressLine: CONTACT.address.oneLiner,
  directionsHref: CONTACT.address.mapsDirectionsHref,
  hoursLine: CONTACT.hoursLine,
  established: CONTACT.established,
  year: String(new Date().getFullYear()),
});
