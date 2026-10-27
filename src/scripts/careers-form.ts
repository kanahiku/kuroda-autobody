/**
 * Client script for the careers application form (`#careers-form`, see CareersApply.astro).
 * Posts multipart form data (including the résumé file) to /api/careers/ with a Turnstile token.
 */
import { asText, renderTurnstile, setStatus } from './form-shared';

/** Returns a user-facing problem with the chosen résumé, or '' when it is fine. */
function resumeProblem(form: HTMLFormElement, file: FormDataEntryValue | null): string {
  if (!(file instanceof File) || !file.size) return 'Please attach your résumé.';
  const allowed = (form.dataset.extensions || '').split(',');
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (!allowed.includes(ext)) return 'Please upload a PDF or Word file.';
  const maxBytes = Number(form.dataset.maxBytes) || 0;
  if (maxBytes && file.size > maxBytes)
    return `Your résumé is too large. Please keep it under ${Math.floor(maxBytes / 1048576)}MB.`;
  return '';
}

async function postApplication(form: HTMLFormElement, data: FormData, turnstileToken: string): Promise<boolean> {
  const { endpoint, site } = form.dataset;
  if (!endpoint || !site) throw new Error('Form is not configured');
  if (!turnstileToken) throw new Error('Spam check is required');

  data.set('site', site);
  data.set('cf-turnstile-response', turnstileToken);

  const res = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: data });
  const payload = await res.json().catch(() => null);
  return Boolean(res.ok && payload?.ok);
}

function bindSubmit(form: HTMLFormElement, status: HTMLElement, widgetId: string) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const data = new FormData(form);

    if (asText(data.get('website'))) return; // honeypot

    status.classList.remove('hidden');
    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus(status, 'error', 'Please fill in your name, email, phone and résumé.');
      return;
    }
    const problem = resumeProblem(form, data.get('resume'));
    if (problem) {
      setStatus(status, 'error', problem);
      return;
    }

    const turnstile = window.turnstile;
    const turnstileToken =
      widgetId && turnstile ? turnstile.getResponse(widgetId) : asText(data.get('cf-turnstile-response'));

    if (submitButton) submitButton.disabled = true;
    setStatus(status, 'pending', 'Sending…');

    try {
      if (!(await postApplication(form, data, turnstileToken))) throw new Error();
      setStatus(status, 'success', 'Thanks, we got your application. Someone from our team will be in touch.');
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
    }
  });
}

async function bindCareersForm() {
  const form = document.getElementById('careers-form') as HTMLFormElement | null;
  const status = document.getElementById('careers-status');

  if (!form || !status || form.dataset.bound === 'true') return;
  form.dataset.bound = 'true';

  const widgetId = await renderTurnstile(form);
  bindSubmit(form, status, widgetId);
}

/**
 * "Apply Now" buttons in OpenPositions (`data-apply-position="<title>"`): pre-select that position in the
 * form's dropdown, then smooth-scroll to the form. One delegated listener, so it survives page swaps.
 */
document.addEventListener('click', (event) => {
  const button = (event.target as Element | null)?.closest<HTMLElement>('[data-apply-position]');
  const form = document.getElementById('careers-form');
  if (!button || !form) return;

  event.preventDefault();
  const select = form.querySelector<HTMLSelectElement>('select[name="position"]');
  const position = button.dataset.applyPosition || '';
  if (select && [...select.options].some((option) => option.value === position)) select.value = position;

  document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  form.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true });
});

bindCareersForm();
document.addEventListener('astro:page-load', bindCareersForm);
