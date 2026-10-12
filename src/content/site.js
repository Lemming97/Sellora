// Content that is the same in every language.
// Translated text lives in ./locales/<lang>.json, keyed by the same ids.

export const site = {
  name: 'Sellora',
  email: 'contact@sellora.fr',
  defaultLanguage: 'fr',
  // Where the audit and contact forms POST their data as JSON (e.g. a Formspree form URL).
  // Leave empty to open the visitor's email app with the message prefilled instead.
  formEndpoint: '',
};

export const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

// Headline results shown in the hero panel. Labels: panel.stats.<id>
export const stats = [
  { id: 'revenue', value: '+147%' },
  { id: 'acos', value: '-38%' },
];

// Service cards, in display order. Text: services.items.<id>
// To add a service: add it here, then add its title and description to every locale file.
export const services = [
  { id: 'ppc', icon: '🎯' },
  { id: 'listings', icon: '✍️' },
  { id: 'seo', icon: '📈' },
  { id: 'inventory', icon: '📦' },
  { id: 'visuals', icon: '📸' },
  { id: 'reporting', icon: '📊' },
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
