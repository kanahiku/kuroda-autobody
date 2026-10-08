import { contactFallback, type ContactContent } from '../../data/contact';
import { applyTokens } from './merge';
import { getSingleton } from './singleton';
import { siteTokens } from './tokens';
import { withSanityPhotos } from './photos';

/**
 * Contact page content = Sanity `contactPage` document merged over `contactFallback`
 * (src/data/contact.ts), with `{phone}`, `{fax}`, `{cityLine}`, `{addressLine}` … filled in from site config.
 */
export async function getContactContent(): Promise<ContactContent> {
  const content = await getSingleton('contactPage', contactFallback);
  return withSanityPhotos(applyTokens(content, siteTokens()), 'contactPage', ['hero']);
}
