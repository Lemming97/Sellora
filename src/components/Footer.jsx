import { useLanguage } from '../i18n/LanguageContext.jsx';
import { site } from '../content/site.js';
import Logo from './Logo.jsx';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  return (
    <footer>
      <Logo />
      <p>© {year} {site.name}. {t.footer.tagline}</p>
      <p>
        {t.footer.location} · <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </footer>
  );
}
