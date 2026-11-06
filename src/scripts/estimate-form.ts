/**
 * Client script for the "Request an Estimate" form (`#contact-form`, see EstimateForm.astro).
 * Posts JSON to the shared forms worker with a Cloudflare Turnstile token.
 */

import { asText, phoneMessage, renderTurnstile, setFieldError, setStatus } from './form-shared';

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

function formProblem(data: FormData): { message: string; field: string } | null {
  if (!asText(data.get('name'))) return { message: 'Enter your name.', field: 'name' };
  const phone = phoneMessage(asText(data.get('phone')));
  if (phone) return { message: phone, field: 'phone' };
  const email = asText(data.get('email'));
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { message: 'Enter a valid email address.', field: 'email' };
  if (!asText(data.get('vehicle'))) return { message: 'Enter the year, make and model.', field: 'vehicle' };
  return null;
}

function bindSubmit(form: HTMLFormElement, status: HTMLElement, widgetId: string) {
  const phoneInput = form.querySelector<HTMLInputElement>('#phone');
  phoneInput?.addEventListener('input', () => setFieldError(phoneInput, ''));

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const data = new FormData(form);

    // Honeypot check
    if (asText(data.get('website'))) return;

    const problem = formProblem(data);
    setFieldError(phoneInput, problem?.field === 'phone' ? problem.message : '');
    if (problem) {
      setStatus(status, 'error', problem.message);
      status.classList.remove('hidden');
      form.querySelector<HTMLInputElement>(`#${problem.field}`)?.focus();
      return;
    }

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
