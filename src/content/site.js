import {
  Camera,
  ChartBar,
  GlobeHemisphereEast,
  MagnifyingGlass,
  Megaphone,
  Package,
  PencilLine,
  Scales,
} from '@phosphor-icons/react';

// Content that is the same in every language.
// Translated text lives in ./locales/<lang>.json, keyed by the same ids.

export const site = {
  name: 'Hello Sellora',
  email: 'contact@hellosellora.com',
  linkedin: 'https://www.linkedin.com/company/hellosellora',
  defaultLanguage: 'fr',
  // How the audit and contact forms are delivered, in order of preference:
  // 1. web3formsKey: the access key from https://web3forms.com (created for contact@hellosellora.com).
  //    Submissions are emailed straight to contact@. The key is designed to be public.
  // 2. formEndpoint: any service that accepts a JSON POST (e.g. a Formspree form URL).
  // 3. Neither set: the visitor's email app opens with the message prefilled.
  web3formsKey: 'efb4ad51-131b-40e4-91aa-e250c7f8cb34',
  formEndpoint: '',
};

// Google Analytics 4 and Google Ads. Loaded only after a visitor accepts cookies
// (see src/analytics/googleTag.js). Leave an ID empty to switch that part off.
export const googleTag = {
  analyticsId: 'G-5NCZPXGX3Q',          // GA4 property "hellosellora.com", stream "Hello Sellora website"
  adsId: 'AW-18513143620',              // Google Ads account
  adsLeadLabel: 'DF42CNLV3JwdEMTO4PtE', // Ads conversion action "Submit lead form"
};

// Who publishes the site, shown on the legal pages (src/content/legal/).
// Until Hello Sellora is registered as its own business, it is run by Lindsey
// Martin as an entrepreneur individuel (her consulting registration).
// When the business is registered, update these fields; the pages follow.
// address and phone are left empty on purpose: when set, they appear in the
// legal notice (French law asks for both on a professional site).
export const legal = {
  publisher: 'Lindsey Martin',
  siren: '131 358 541',
  ape: '70.22Z',
  rneDate: '2026-10-12', // date of registration in the RNE
  city: 'Paris (75), France',
  address: '',
  phone: '',
  director: 'Lindsey Martin', // directrice de la publication
  lastUpdated: '2026-10-20',
  host: {
    name: 'GitHub, Inc. (GitHub Pages)',
    address: '88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, United States',
    phone: '+1 877 448 4820',
  },
};

// The four legal pages: id → address on the site. Each becomes its own page at
// build time (see vite.config.js). Old or English addresses redirect here
// through src/content/redirects.js.
export const legalPages = {
  notice: '/mentions-legales/',
  privacy: '/confidentialite/',
  cookies: '/cookies/',
  terms: '/conditions/',
};

export const languages = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'sv', name: 'Svenska' },
  { code: 'es', name: 'Español' },
];

// Headline results shown in the hero panel. Labels: panel.stats.<id>
export const stats = [
  { id: 'revenue', value: '+147%' },
  { id: 'acos', value: '-38%' },
];

// Service cards, in display order. Text: services.items.<id>
// Icons come from Phosphor (https://phosphoricons.com). To change one, find an icon
// on that site, import it by name above, and swap it in here.
// To add a service: add it here, then add its title and description to every locale file.
export const services = [
  { id: 'ppc', icon: Megaphone },
  { id: 'listings', icon: PencilLine },
  { id: 'seo', icon: MagnifyingGlass },
  { id: 'inventory', icon: Package },
  { id: 'visuals', icon: Camera },
  { id: 'reporting', icon: ChartBar },
];

// "What does the audit entail?" items, in display order. Text: audit.items.<id>
export const auditItems = [
  { id: 'listings', icon: PencilLine },
  { id: 'advertising', icon: Megaphone },
  { id: 'ranking', icon: MagnifyingGlass },
  { id: 'competitors', icon: Scales },
  { id: 'operations', icon: Package },
  { id: 'expansion', icon: GlobeHemisphereEast },
];

// Fields for the modal forms, in display order. Labels: forms.fields.<id>
// half: shares a row with the next half field on wider screens.
export const forms = {
  audit: [
    { id: 'company', required: true, autoComplete: 'organization', maxLength: 120 },
    { id: 'website', type: 'url', required: true, autoComplete: 'url', maxLength: 200 },
    { id: 'firstName', required: true, autoComplete: 'given-name', maxLength: 80, half: true },
    { id: 'lastName', required: true, autoComplete: 'family-name', maxLength: 80, half: true },
    { id: 'email', type: 'email', required: true, autoComplete: 'email', maxLength: 160 },
    { id: 'message', type: 'textarea', maxLength: 2000 },
  ],
  contact: [
    { id: 'firstName', required: true, autoComplete: 'given-name', maxLength: 80, half: true },
    { id: 'lastName', required: true, autoComplete: 'family-name', maxLength: 80, half: true },
    { id: 'email', type: 'email', required: true, autoComplete: 'email', maxLength: 160 },
    { id: 'subject', required: true, maxLength: 150 },
    { id: 'message', type: 'textarea', required: true, minLength: 10, maxLength: 2000 },
  ],
};
