import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useFormModal } from '../forms/FormModalContext.jsx';
import { site } from '../content/site.js';
import Logo from './Logo.jsx';

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
      <p>
        {t.footer.location} ·{' '}
        <a href={`mailto:${site.email}`} onClick={handleEmailClick} aria-haspopup="dialog">{site.email}</a>
      </p>
    </footer>
  );
}
