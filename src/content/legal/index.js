import { legal, legalPages, site } from '../site.js';
import fr from './fr.js';
import en from './en.js';
import sv from './sv.js';
import es from './es.js';

const builders = { fr, en, sv, es };
const dateLocales = { fr: 'fr-FR', en: 'en-GB', sv: 'sv-SE', es: 'es-ES' };

const formatDate = (iso, lang) =>
  new Intl.DateTimeFormat(dateLocales[lang], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${iso}T00:00:00Z`));

// The legal pages' text in one language, with the publisher details filled in.
export function legalContent(lang) {
  const build = builders[lang] || builders.fr;
  const details = { ...legal, rneDateText: formatDate(legal.rneDate, lang) };
  return { ...build(details, site), lastUpdatedText: formatDate(legal.lastUpdated, lang) };
}

// Which legal page an address belongs to ('notice', 'privacy'...), or null for the homepage.
export function legalPageFromPath(pathname) {
  const path = `${pathname.replace(/\/+$/, '')}/`.toLowerCase();
  return Object.keys(legalPages).find((id) => legalPages[id] === path) || null;
}
