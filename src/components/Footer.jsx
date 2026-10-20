import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useFormModal } from '../forms/FormModalContext.jsx';
import { legalPages, site } from '../content/site.js';
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
      <Logo href="/" />
      <div className="footer-middle">
        <p>© {year} {site.name}. {t.footer.tagline}</p>
        <nav className="footer-legal" aria-label={t.footer.legal.label}>
          <a href={legalPages.notice}>{t.footer.legal.notice}</a>
          <a href={legalPages.privacy}>{t.footer.legal.privacy}</a>
          <button type="button" onClick={openCookieSettings} aria-haspopup="dialog">{t.footer.legal.cookies}</button>
          <a href={legalPages.terms}>{t.footer.legal.terms}</a>
        </nav>
      </div>
      <div className="footer-contact">
        <p>
          {t.footer.location} ·{' '}
          <a href={`mailto:${site.email}`} onClick={handleEmailClick} aria-haspopup="dialog">{site.email}</a>
        </p>
        <a className="footer-social" href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on LinkedIn`}>
          <LinkedinLogo size={18} weight="duotone" aria-hidden="true" />
          <span>LinkedIn</span>
        </a>
      </div>
    </footer>
  );
}
