import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { languages } from '../content/site.js';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = languages.find((l) => l.code === lang);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (e.type === 'keydown' ? e.key === 'Escape' : !ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  const choose = (code) => {
    setLang(code);
    setOpen(false);
  };

  return (
    <div className={`lang-switcher${open ? ' open' : ''}`} ref={ref}>
      <button
        type="button"
        className="lang-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {current.flag} {current.name} <span className="lang-arrow">▾</span>
      </button>
      <ul className="lang-menu" role="listbox" aria-label="Language">
        {languages.map((l) => (
          <li
            key={l.code}
            role="option"
            aria-selected={l.code === lang}
            tabIndex={open ? 0 : -1}
            onClick={() => choose(l.code)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), choose(l.code))}
          >
            {l.flag} {l.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
