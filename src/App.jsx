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
import { FormModalProvider } from './forms/FormModalContext.jsx';

export default function App() {
  return (
    <FormModalProvider>
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
      <Footer />
      <CookieBanner />
    </FormModalProvider>
  );
}
