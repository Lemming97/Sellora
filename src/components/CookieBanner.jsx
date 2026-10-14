import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { onOpenCookieSettings, readConsent, setConsent } from '../analytics/googleTag.js';

// Cookie consent banner. Shown until the visitor accepts or refuses, and again
// whenever they click "Cookie settings" in the footer. Both choices are equally
// prominent, as the CNIL requires.
export default function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(() => readConsent() === null);

  useEffect(() => onOpenCookieSettings(() => setVisible(true)), []);

  if (!visible) return null;

  const choose = (choice) => {
    setConsent(choice);
    setVisible(false);
  };

  return (
    <div className="cookie-banner" role="region" aria-label={t.cookies.title}>
      <p>{t.cookies.text}</p>
      <div className="cookie-actions">
        <button type="button" className="btn-secondary" onClick={() => choose('denied')}>{t.cookies.refuse}</button>
        <button type="button" className="btn-secondary" onClick={() => choose('granted')}>{t.cookies.accept}</button>
      </div>
    </div>
  );
}
