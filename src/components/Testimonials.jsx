import { useLanguage } from '../i18n/LanguageContext.jsx';
import TestimonialCard from './TestimonialCard.jsx';

// Add more testimonials to the "testimonials" list in each locale file and they appear here.
export default function Testimonials() {
  const { t } = useLanguage();
  return (
    <section className="testimonial-section" id="resultats">
      {t.testimonials.map((item) => (
        <TestimonialCard key={item.author} {...item} />
      ))}
    </section>
  );
}
