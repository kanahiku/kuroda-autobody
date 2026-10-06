import { site } from '~/config/site';

/** Public form config. Vercel env overrides these; production fallbacks keep the live site working without dashboard vars. */
export const FORM_ENDPOINT =
  import.meta.env.PUBLIC_FORM_ENDPOINT ||
  (import.meta.env.PROD ? 'https://massic-forms.kanahiku.workers.dev/submit' : 'http://localhost:8787/submit');

const FORM_WORKER_ORIGIN = FORM_ENDPOINT.replace(/\/submit\/?$/, '');

/** Check-up PDF emails. Separate from contact `/submit` so answers are not stored as leads. */
export const EMAIL_SUMMARY_ENDPOINT = `${FORM_WORKER_ORIGIN}/email-summary`;

/**
 * Production uses the Kuroda Turnstile widget (public site key; its secret lives on the Worker as
 * TURNSTILE_SECRET_KURODA_AUTOBODY). Dev falls back to Cloudflare's always-pass test key.
 */
export const TURNSTILE_SITE_KEY =
  import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ||
  (import.meta.env.PROD ? '0x4AAAAAAFPP-IGITblIQw9l' : '1x00000000000000000000AA');

export const SITE_SLUG = import.meta.env.PUBLIC_SITE_SLUG || site.formSlug;
