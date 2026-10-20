import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import App from './App.jsx';
import { initGoogleTag } from './analytics/googleTag.js';
import './styles/global.css';

initGoogleTag();

// Section anchors are in English (#approach, #launch, #results). Links that still
// use the old French ones are switched over before the page renders.
const OLD_ANCHORS = { methode: 'approach', lancement: 'launch', resultats: 'results' };
const oldAnchor = OLD_ANCHORS[window.location.hash.slice(1)];
if (oldAnchor) {
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${oldAnchor}`);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
