import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import Logo from './Logo.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function Nav() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : undefined}>
      <Logo />
      <ul>
        <li className="nav-wide"><a href="#services">{t.nav.services}</a></li>
        <li className="nav-wide"><a href="#approach">{t.nav.approach}</a></li>
        <li><a href="#audit">{t.nav.audit}</a></li>
        <li className="nav-wide"><a href="#launch">{t.nav.launch}</a></li>
        <li className="nav-contact"><a href="#contact">{t.nav.contact}</a></li>
        <li><a href="#contact" className="nav-cta">{t.nav.cta}</a></li>
      </ul>
      <LanguageSwitcher />
    </nav>
  );
}
