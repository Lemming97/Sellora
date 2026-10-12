import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import SectorsStrip from './components/SectorsStrip.jsx';
import Services from './components/Services.jsx';
import Method from './components/Method.jsx';
import Testimonials from './components/Testimonials.jsx';
import CallToAction from './components/CallToAction.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SectorsStrip />
        <Services />
        <Method />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
