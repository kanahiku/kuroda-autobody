import { onlineEstimateFallback, type OnlineEstimateContent } from '../../data/onlineEstimate';
import { applyTokens } from './merge';
import { getSingleton } from './singleton';
import { siteTokens } from './tokens';
import { withSanityPhotos } from './photos';

/**
 * Online Estimate page content = Sanity `onlineEstimatePage` document merged over `onlineEstimateFallback`
 * (src/data/onlineEstimate.ts), with `{phone}`, `{cityLine}` … filled in from site config.
 */
export async function getOnlineEstimateContent(): Promise<OnlineEstimateContent> {
  const content = await getSingleton('onlineEstimatePage', onlineEstimateFallback);
  return withSanityPhotos(applyTokens(content, siteTokens()), 'onlineEstimatePage', ['hero', 'launch']);
}
