// Short addresses that send visitors to a section of the one page site.
// At build time each one becomes a tiny page (e.g. dist/audit/index.html)
// that forwards to the target, so https://hellosellora.com/audit works.
// The 404 page also uses this list to catch other spellings (/Audit, /AUDIT/).
// To add one: add a line here; nothing else to change.
export const redirects = {
  // The audit section (/audit/amazon is the display path on the Google Ads ad)
  '/audit': '/#audit',
  '/audit/amazon': '/#audit',
  '/l-audit': '/#audit',
  '/auditoria': '/#audit',
  '/analys': '/#audit',

  '/services': '/#services',
  '/servicios': '/#services',
  '/tjanster': '/#services',

  '/contact': '/#contact',
  '/contacto': '/#contact',
  '/kontakt': '/#contact',

  '/approche': '/#methode',
  '/approach': '/#methode',
  '/methode': '/#methode',

  '/resultats': '/#resultats',
  '/results': '/#resultats',
};

// /fr, /en, /sv, /es open the homepage in that language.
export const languagePaths = ['fr', 'en', 'sv', 'es'];
