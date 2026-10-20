import Nav from './components/Nav.jsx';
import HeroBand from './components/HeroBand.jsx';
import Hero from './components/Hero.jsx';
import SectorsStrip from './components/SectorsStrip.jsx';
import Services from './components/Services.jsx';
import Method from './components/Method.jsx';
import Testimonials from './components/Testimonials.jsx';
import Audit from './components/Audit.jsx';
import CallToAction from './components/CallToAction.jsx';
import Footer from './components/Footer.jsx';
import CookieBanner from './components/CookieBanner.jsx';
import LegalPage from './components/LegalPage.jsx';
import { FormModalProvider } from './forms/FormModalContext.jsx';
import { useLanguage } from './i18n/LanguageContext.jsx';
import { legalPageFromPath } from './content/legal/index.js';
import { useEffect } from 'react';

// /mentions-legales/, /confidentialite/, /cookies/ and /conditions/ show a legal
// page; every other address shows the one page site.
const legalPage = legalPageFromPath(window.location.pathname);

function HomePage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [t]);

  return (
    <>
      <Nav />
      <main>
        <HeroBand />
        <Hero />
        <SectorsStrip />
        <Services />
        <Method />
        <Testimonials />
        <Audit />
        <CallToAction />
      </main>
    </>
  );
}

export default function App() {
  return (
    <FormModalProvider>
      {legalPage ? <LegalPage id={legalPage} /> : <HomePage />}
      <Footer />
      <CookieBanner />
    </FormModalProvider>
  );
}
