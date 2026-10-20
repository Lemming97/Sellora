import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { locales } from '../content/locales/index.js';
import { site } from '../content/site.js';

const STORAGE_KEY = 'sellora-lang';
// Changing language fades the page text out, swaps it, then fades it back in.
// Keep in sync with the "LANGUAGE CHANGE" transition in global.css.
const FADE_OUT_MS = 180;
const FADING_CLASS = 'lang-fading';
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
  const [lang, setLangNow] = useState(readSavedLanguage);
  const t = locales[lang];
  const timer = useRef(null);

  // Fade out, switch, then fade back in once the new text is on screen.
  const setLang = useCallback((next) => {
    if (!locales[next]) return;
    const root = document.documentElement;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setLangNow(next);
      return;
    }
    clearTimeout(timer.current);
    root.classList.add(FADING_CLASS);
    timer.current = setTimeout(() => {
      setLangNow(next);
      // Two frames: let React paint the new language before fading it in.
      requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove(FADING_CLASS)));
    }, FADE_OUT_MS);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

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
