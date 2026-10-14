import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useFormModal } from '../forms/FormModalContext.jsx';
import { site } from '../content/site.js';
import { LinkedinLogo } from '@phosphor-icons/react';
import Logo from './Logo.jsx';
import { openCookieSettings } from '../analytics/googleTag.js';

export default function Footer() {
  const { t } = useLanguage();
  const openForm = useFormModal();
  const year = new Date().getFullYear();

  // A normal click opens the contact form. The link keeps its mailto address, so
  // right-click "Copy email address" and Cmd/Ctrl-click still work as usual.
  const handleEmailClick = (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openForm('contact');
  };

  return (
    <footer>
      <Logo />
      <p>© {year} {site.name}. {t.footer.tagline}</p>
      <div className="footer-contact">
        <p>
          {t.footer.location} ·{' '}
          <a href={`mailto:${site.email}`} onClick={handleEmailClick} aria-haspopup="dialog">{site.email}</a>
        </p>
        <a className="footer-social" href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on LinkedIn`}>
          <LinkedinLogo size={18} weight="duotone" aria-hidden="true" />
          <span>LinkedIn</span>
        </a>
        <button type="button" className="footer-cookies" onClick={openCookieSettings}>{t.cookies.settings}</button>
      </div>
    </footer>
  );
}
