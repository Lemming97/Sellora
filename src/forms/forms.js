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

// Sends a form to site.formEndpoint, or falls back to the visitor's email app.
// Resolves to 'sent' or 'mailto'; rejects if the endpoint returns an error.
export async function sendForm({ subject, fields, values, labels }) {
  const data = Object.fromEntries(fields.map((f) => [f.id, values[f.id].trim()]));

  if (site.formEndpoint) {
    const response = await fetch(site.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: subject, ...data }),
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
