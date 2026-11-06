import { site } from '~/config/site';

/** Public form config. Vercel env overrides these; production fallbacks keep the live site working without dashboard vars. */
export const FORM_ENDPOINT =
  import.meta.env.PUBLIC_FORM_ENDPOINT ||
  (import.meta.env.PROD ? 'https://massic-forms.kanahiku.workers.dev/submit' : 'http://localhost:8787/submit');

const FORM_WORKER_ORIGIN = FORM_ENDPOINT.replace(/\/submit\/?$/, '');

/** Check-up PDF emails. Separate from contact `/submit` so answers are not stored as leads. */
export const EMAIL_SUMMARY_ENDPOINT = `${FORM_WORKER_ORIGIN}/email-summary`;

/** Résumé applications. Uses its own forms-database row so the inbox can differ from estimates. */
export const APPLY_ENDPOINT = `${FORM_WORKER_ORIGIN}/apply`;
export const CAREERS_SITE_SLUG = 'kuroda-careers';

/**
 * Production uses the Kuroda Turnstile widget (public site key; its secret lives on the Worker as
 * TURNSTILE_SECRET_KURODA_AUTOBODY). Dev falls back to Cloudflare's always-pass test key.
 */
const PRODUCTION_TURNSTILE_SITE_KEY = '0x4AAAAAAFPP-IGITblIQw9l';
const DEV_TURNSTILE_SITE_KEY = '1x00000000000000000000AA';

/** Cloudflare's dummy keys always paint a "for testing only" box. Never use those on the live site. */
const configuredTurnstileKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '';
const isDummyTurnstileKey = /^[123]x00000000000000000000/.test(configuredTurnstileKey);

export const TURNSTILE_SITE_KEY =
  configuredTurnstileKey && !(import.meta.env.PROD && isDummyTurnstileKey)
    ? configuredTurnstileKey
    : import.meta.env.PROD
      ? PRODUCTION_TURNSTILE_SITE_KEY
      : DEV_TURNSTILE_SITE_KEY;

export const SITE_SLUG = import.meta.env.PUBLIC_SITE_SLUG || site.formSlug;
