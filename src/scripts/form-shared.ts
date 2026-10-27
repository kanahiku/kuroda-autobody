/**
 * Helpers shared by the browser scripts of the site's forms (estimate-form.ts, careers-form.ts):
 * Cloudflare Turnstile loading / rendering and the status line under the form.
 */

export interface TurnstileApi {
  render(container: Element, options: { sitekey: string }): string;
  getResponse(widgetId: string): string;
  reset(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const STATUS_BASE = 'mt-4 text-left text-[14px] md:text-[15px] font-medium';
const STATUS_TONE = { pending: 'text-body-78', success: 'text-heading-full', error: 'text-red-700' } as const;

export const asText = (value: FormDataEntryValue | null): string => (typeof value === 'string' ? value.trim() : '');

function loadTurnstile(): Promise<TurnstileApi> {
  const existing = window.turnstile;
  if (existing) return Promise.resolve(existing);

  return new Promise((resolve, reject) => {
    const fail = () => reject(new Error('Turnstile failed to load'));
    const ready = () => {
      const api = window.turnstile;
      if (api) resolve(api);
      else fail();
    };

    const script = document.querySelector('script[data-turnstile-api]');
    const target = script ?? Object.assign(document.createElement('script'), { src: TURNSTILE_SRC, async: true });
    if (!script) (target as HTMLScriptElement).dataset.turnstileApi = 'true';
    target.addEventListener('load', ready, { once: true });
    target.addEventListener('error', fail, { once: true });
    if (!script) document.head.appendChild(target);
  });
}

/** Renders the Turnstile widget into the form's `[data-turnstile]` slot; resolves to its widget id ('' on failure). */
export async function renderTurnstile(form: HTMLFormElement): Promise<string> {
  const slot = form.querySelector('[data-turnstile]');
  const sitekey = form.dataset.turnstileSitekey || '';
  if (!slot || !sitekey) return '';
  try {
    const turnstile = await loadTurnstile();
    return turnstile.render(slot, { sitekey });
  } catch (err) {
    console.error(err);
    return '';
  }
}

export function setStatus(status: HTMLElement, tone: keyof typeof STATUS_TONE, text: string) {
  status.className = `${STATUS_BASE} ${STATUS_TONE[tone]}`;
  status.textContent = text;
}
