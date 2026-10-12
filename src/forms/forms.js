import { site } from '../content/site.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Accepts addresses with or without a scheme, e.g. "acme.com" or "https://www.acme.com/shop".
function isWebsite(value) {
  if (/\s/.test(value)) return false;
  try {
    const url = new URL(value.includes('://') ? value : `https://${value}`);
    return /^https?:$/.test(url.protocol) && /\.[a-z]{2,}$/i.test(url.hostname);
  } catch {
    return false;
  }
}

// Returns the error message for one field, or '' when the value is valid.
export function validateField(field, value, messages) {
  const trimmed = value.trim();
  if (field.required && !trimmed) return messages.required;
  if (!trimmed) return '';
  if (field.type === 'email' && !EMAIL_PATTERN.test(trimmed)) return messages.email;
  if (field.type === 'url' && !isWebsite(trimmed)) return messages.url;
  if (field.minLength && trimmed.length < field.minLength) {
    return messages.tooShort.replace('{min}', field.minLength);
  }
  return '';
}

// English field names used in the emails you receive, whatever language the visitor used.
const INBOX_LABELS = {
  company: 'Company',
  website: 'Website',
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  subject: 'Subject',
  message: 'Message',
};

// Sends a form. Resolves to 'sent' (delivered by a form service) or 'mailto' (visitor's
// email app opened). Rejects if the form service returns an error.
// `kind` is 'audit' or 'contact'; `lang` is the page language; `botcheck` is the honeypot.
export async function sendForm({ kind, subject, fields, values, labels, lang, botcheck }) {
  const data = Object.fromEntries(fields.map((f) => [f.id, values[f.id].trim()]));
  const who = [data.firstName, data.lastName].filter(Boolean).join(' ');
  // The subject carries the visitor's name and language in a fixed format, because the
  // auto-reply script (email/auto-reply/Code.gs) reads them from here. Keep the two in sync.
  // Audit:   "New audit request: Maison Test · Camille R [EN]"
  // Contact: "New message from Camille R: Question about pricing [EN]"
  const langTag = `[${String(lang || 'fr').slice(0, 2).toUpperCase()}]`;
  const inboxSubject = kind === 'audit'
    ? `New audit request: ${data.company || who} · ${who} ${langTag}`
    : `New message from ${who}${data.subject ? `: ${data.subject}` : ''} ${langTag}`;

  if (site.web3formsKey) {
    const readable = Object.fromEntries(
      fields.filter((f) => data[f.id]).map((f) => [INBOX_LABELS[f.id] || f.id, data[f.id]])
    );
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: site.web3formsKey,
        subject: inboxSubject,
        from_name: 'Sellora website',
        replyto: data.email,
        botcheck: Boolean(botcheck),
        Form: kind === 'audit' ? 'Audit request' : 'Contact form',
        'Page language': lang,
        ...readable,
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false) throw new Error(result.message || `Form service returned ${response.status}`);
    return 'sent';
  }

  if (site.formEndpoint) {
    const response = await fetch(site.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: inboxSubject, _replyto: data.email, ...data }),
    });
    if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`);
    return 'sent';
  }

  const body = fields
    .filter((f) => data[f.id])
    .map((f) => `${labels[f.id]}: ${data[f.id]}`)
    .join('\n\n');
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return 'mailto';
}
