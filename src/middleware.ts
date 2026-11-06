import { defineMiddleware } from 'astro:middleware';
import { isIndexableHost } from '~/lib/indexing';

/** Old URLs. The shop page is /location/, not /locations. */
const LEGACY_REDIRECTS: Record<string, string> = {
  '/our-locations': '/location/',
  '/our-locations/': '/location/',
  '/work-with-us': '/careers/',
  '/work-with-us/': '/careers/',
  '/terms-of-service': '/terms/',
  '/terms-of-service/': '/terms/',
};

export const onRequest = defineMiddleware(async (context, next) => {
  const legacy = LEGACY_REDIRECTS[context.url.pathname];
  if (legacy) return context.redirect(legacy, 301);

  const response = await next();

  if (isIndexableHost(context.url.host)) {
    response.headers.delete('X-Robots-Tag');
  } else {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
});
