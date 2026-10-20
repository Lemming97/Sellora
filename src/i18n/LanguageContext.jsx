import { createContext, useContext, useEffect, useState } from 'react';
import { locales } from '../content/locales/index.js';
import { site } from '../content/site.js';

const STORAGE_KEY = 'sellora-lang';
const LanguageContext = createContext(null);

function readSavedLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && locales[saved] ? saved : site.defaultLanguage;
  } catch {
    return site.defaultLanguage;
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readSavedLanguage);
  const t = locales[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage can be blocked (private mode); the switcher still works for this visit.
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return context;
}
