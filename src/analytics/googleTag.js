import { googleTag } from '../content/site.js';

// Google Analytics 4 and Google Ads, loaded only after the visitor accepts cookies
// (Consent Mode v2, "basic" setup). Until then no Google script is downloaded and
// nothing is sent to Google. The visitor's choice is kept in localStorage.
//
// IDs live in src/content/site.js (googleTag). Leave them empty to switch tracking off.

const CONSENT_KEY = 'sellora-consent'; // 'granted' | 'denied'
const CONSENT_AT_KEY = 'sellora-consent-at'; // when the choice was made (ms since 1970)
// The CNIL expects visitors to be asked again after about 6 months.
const CONSENT_MAX_AGE = 182 * 24 * 60 * 60 * 1000;
// The CNIL caps audience cookies at 13 months (Google's default is 2 years).
const COOKIE_EXPIRES_SECONDS = 395 * 24 * 60 * 60;
const CHANGE_EVENT = 'sellora:cookie-settings';

const GRANTED = {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted',
};
const DENIED = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
};

let loaded = false;

// The official gtag helper: it must push the `arguments` object, not an array.
function gtag() {
  window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
}

const tagIds = () => [googleTag.analyticsId, googleTag.adsId].filter(Boolean);

export function readConsent() {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    const at = Number(localStorage.getItem(CONSENT_AT_KEY));
    // No date (a choice made before dates were kept) or older than 6 months: ask again.
    if (!at || Date.now() - at > CONSENT_MAX_AGE) return null;
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null; // storage blocked: ask again on each visit
  }
}

function loadGoogleTag() {
  if (loaded || tagIds().length === 0) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = gtag;
  gtag('consent', 'default', DENIED);
  gtag('consent', 'update', GRANTED);
  gtag('js', new Date());
  tagIds().forEach((id) => gtag('config', id, { cookie_expires: COOKIE_EXPIRES_SECONDS }));

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${tagIds()[0]}`;
  document.head.appendChild(script);
}

// Removes Google Analytics and Ads cookies after a visitor withdraws consent.
function clearGoogleCookies() {
  const host = window.location.hostname;
  const domains = ['', host, `.${host.replace(/^www\./, '')}`];
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (!/^(_ga|_gid|_gat|_gcl)/.test(name)) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ''}`;
    });
  });
}

// Call once on page load: starts tracking if the visitor accepted on an earlier visit.
export function initGoogleTag() {
  if (readConsent() === 'granted') loadGoogleTag();
}

export function setConsent(choice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
    localStorage.setItem(CONSENT_AT_KEY, String(Date.now()));
  } catch {
    // Storage blocked: the choice still applies for this visit.
  }
  if (choice === 'granted') {
    loadGoogleTag();
  } else if (loaded) {
    gtag('consent', 'update', DENIED);
    clearGoogleCookies();
  } else {
    clearGoogleCookies();
  }
}

// Reopens the cookie banner (the "Cookies" link in the footer, the cookie policy page).
export function openCookieSettings() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function onOpenCookieSettings(handler) {
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

// Records a sent form: a GA4 "generate_lead" event (mark it as a key event in GA4)
// and the Google Ads "Submit lead form" conversion. Does nothing without consent.
// `kind` is 'audit' or 'contact'.
export function trackLead(kind) {
  if (!loaded) return;
  gtag('event', 'generate_lead', { form_name: kind });
  if (googleTag.adsId && googleTag.adsLeadLabel) {
    gtag('event', 'conversion', {
      send_to: `${googleTag.adsId}/${googleTag.adsLeadLabel}`,
      value: 1.0,
      currency: 'USD',
    });
  }
}
