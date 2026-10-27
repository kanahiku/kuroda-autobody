export const prerender = false;

import type { APIRoute } from 'astro';
import { CAREERS } from '~/config/contact';
import { site } from '~/config/site';
import { TURNSTILE_SITE_KEY } from '~/lib/forms';

/**
 * POST /api/careers/ — careers application with a résumé attached.
 * The shared forms worker only handles text leads, so this route verifies Turnstile and emails the
 * application (résumé attached) to CAREERS.recipients through Resend.
 *
 * Server-only env (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY        Resend API key
 *   RESEND_FROM           Verified sender, e.g. `Kuroda Autobody <careers@kurodaautobody.com>`
 *   TURNSTILE_SECRET_KEY  Secret of the Turnstile widget whose site key is TURNSTILE_SITE_KEY (src/lib/forms.ts)
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, email: 254, phone: 40, position: 120, message: 3000 };

/** First bytes of each accepted file type — the extension alone is not trusted. */
const SIGNATURES: Record<string, number[][]> = {
  pdf: [[0x25, 0x50, 0x44, 0x46]],
  docx: [[0x50, 0x4b, 0x03, 0x04]],
  doc: [[0xd0, 0xcf, 0x11, 0xe0]],
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

const fail = (error: string, status = 400) => json({ ok: false, error }, status);

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const text = (value: FormDataEntryValue | null) => (typeof value === 'string' ? value.trim() : '');

/** Strips anything that could break a header / path from the uploaded file name. */
const safeFilename = (name: string) => name.replace(/[^a-zA-Z0-9._ -]/g, '').slice(0, 80) || 'resume';

function validResumeType(ext: string, bytes: Uint8Array): boolean {
  return (SIGNATURES[ext] ?? []).some((sig) => sig.every((byte, i) => bytes[i] === byte));
}

async function verifyTurnstile(token: string, request: Request): Promise<boolean> {
  const secret =
    import.meta.env.TURNSTILE_SECRET_KEY ||
    // Cloudflare's always-pass test secret pairs with the dev test site key only.
    (TURNSTILE_SITE_KEY.startsWith('1x') ? '1x0000000000000000000000000000000AA' : '');
  if (!secret || !token) return false;
  const body = new URLSearchParams({ secret, response: token });
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (ip) body.set('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  if (!res.ok) return false;
  return ((await res.json()) as { success?: boolean }).success === true;
}

interface Application {
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
}

function emailBodies(app: Application, filename: string) {
  const rows: [string, string][] = [
    ['Name', app.name],
    ['Email', app.email],
    ['Phone', app.phone],
    ['Position', app.position || 'General application'],
    ['Résumé', filename],
  ];
  const html = `
    <p>New job application from the <strong>${escapeHtml(site.name)}</strong> website.</p>
    ${rows.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`).join('')}
    ${app.message ? `<p><strong>Note:</strong></p><p>${escapeHtml(app.message).replace(/\n/g, '<br />')}</p>` : ''}
  `;
  const plain = [
    `New job application from the ${site.name} website.`,
    ...rows.map(([label, value]) => `${label}: ${value}`),
    ...(app.message ? ['', 'Note:', app.message] : []),
  ].join('\n');
  return { html, plain };
}

async function sendApplication(app: Application, file: File, bytes: Uint8Array): Promise<boolean> {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.RESEND_FROM;
  if (!apiKey || !from) {
    console.error('careers: RESEND_API_KEY and RESEND_FROM must be set');
    return false;
  }

  const filename = safeFilename(file.name);
  const { html, plain } = emailBodies(app, filename);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [...CAREERS.recipients],
      reply_to: app.email,
      subject: `New job application: ${app.name}${app.position ? ` (${app.position})` : ''}`,
      html,
      text: plain,
      attachments: [{ filename, content: Buffer.from(bytes).toString('base64') }],
    }),
  });
  if (!res.ok) console.error('careers: Resend failed', res.status, await res.text());
  return res.ok;
}

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail('Invalid submission');
  }

  if (text(form.get('website'))) return json({ ok: true }); // honeypot: pretend success

  const app: Application = {
    name: text(form.get('name')),
    email: text(form.get('email')),
    phone: text(form.get('phone')),
    position: text(form.get('position')),
    message: text(form.get('message')),
  };
  const digits = app.phone.replace(/\D/g, '');

  if (!app.name || app.name.length > MAX.name) return fail('Enter your name');
  if (!EMAIL_RE.test(app.email) || app.email.length > MAX.email) return fail('Enter a valid email');
  if (digits.length < 10 || digits.length > 15 || app.phone.length > MAX.phone)
    return fail('Enter a valid phone number');
  if (app.position.length > MAX.position || app.message.length > MAX.message) return fail('Entry is too long');

  const file = form.get('resume');
  if (!(file instanceof File) || !file.size) return fail('Please attach your résumé');
  if (file.size > CAREERS.maxResumeBytes) return fail('Résumé is too large');
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!CAREERS.resumeExtensions.includes(ext as never) || !validResumeType(ext, bytes)) {
    return fail('Please upload a PDF or Word file');
  }

  if (!(await verifyTurnstile(text(form.get('cf-turnstile-response')), request))) return fail('Spam check failed');

  if (!(await sendApplication(app, file, bytes))) return fail('Unable to submit right now', 500);
  return json({ ok: true });
};
