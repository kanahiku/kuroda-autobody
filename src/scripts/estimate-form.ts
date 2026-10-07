/**
 * Client script for the "Request an Estimate" form (`#contact-form`, see EstimateForm.astro).
 * Posts JSON to the shared forms worker with a Cloudflare Turnstile token.
 */

export {};

interface TurnstileApi {
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

const asText = (value: FormDataEntryValue | null): string => (typeof value === 'string' ? value.trim() : '');

function composeEstimateMessage(data: FormData): string {
  const lines: string[] = [];

  const vehicle = asText(data.get('vehicle'));
  if (vehicle) lines.push(`Vehicle: ${vehicle}`);

  const services = data.getAll('services');
  if (services.length) lines.push(`Services Requested:\n${services.map((s) => `  • ${s}`).join('\n')}`);

  const message = asText(data.get('message'));
  if (message) lines.push(`Details:\n${message}`);

  return lines.join('\n\n') || 'Estimate request submitted';
}

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

async function renderTurnstile(form: HTMLFormElement): Promise<string> {
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

function setStatus(status: HTMLElement, tone: keyof typeof STATUS_TONE, text: string) {
  status.className = `${STATUS_BASE} ${STATUS_TONE[tone]}`;
  status.textContent = text;
}

async function postEstimate(form: HTMLFormElement, data: FormData, turnstileToken: string): Promise<boolean> {
  const { endpoint, site } = form.dataset;
  if (!endpoint || !site) throw new Error('Form is not configured');
  if (!turnstileToken) throw new Error('Spam check is required');

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      site,
      name: asText(data.get('name')),
      email: asText(data.get('email')),
      phone: asText(data.get('phone')),
      message: composeEstimateMessage(data),
      website: asText(data.get('website')),
      turnstileToken,
    }),
  });
  const payload = await res.json().catch(() => null);
  return Boolean(res.ok && payload?.ok);
}

function bindSubmit(form: HTMLFormElement, status: HTMLElement, widgetId: string) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const data = new FormData(form);

    // Honeypot check
    if (asText(data.get('website'))) return;

    const turnstile = window.turnstile;
    const turnstileToken =
      widgetId && turnstile ? turnstile.getResponse(widgetId) : asText(data.get('cf-turnstile-response'));

    if (submitButton) submitButton.disabled = true;
    setStatus(status, 'pending', 'Sending…');
    status.classList.remove('hidden');

    try {
      if (!(await postEstimate(form, data, turnstileToken))) throw new Error();
      setStatus(status, 'success', 'Thanks! We\u2019ll review your estimate request and be in touch soon.');
      form.reset();
      if (widgetId && turnstile) turnstile.reset(widgetId);
    } catch {
      const phone = form.dataset.phone;
      setStatus(
        status,
        'error',
        phone ? `Something went wrong. Please try again or call ${phone}.` : 'Something went wrong. Please try again.'
      );
    } finally {
      if (submitButton) submitButton.disabled = false;
      status.classList.remove('hidden');
    }
  });
}

async function bindEstimateForm() {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const status = document.getElementById('form-status');

  if (!form || !status || form.dataset.bound === 'true') return;
  form.dataset.bound = 'true';

  const widgetId = await renderTurnstile(form);
  bindSubmit(form, status, widgetId);
}

// Bind now (plain page load) and again after client-side navigations; `data-bound` guards double-binding.
bindEstimateForm();
document.addEventListener('astro:page-load', bindEstimateForm);
