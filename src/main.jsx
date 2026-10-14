import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import App from './App.jsx';
import { initGoogleTag } from './analytics/googleTag.js';
import './styles/global.css';

initGoogleTag();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
