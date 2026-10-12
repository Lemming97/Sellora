import { useLanguage } from '../i18n/LanguageContext.jsx';
import { services } from '../content/site.js';
import SectionHeader from './SectionHeader.jsx';
import ServiceCard from './ServiceCard.jsx';

export default function Services() {
  const { t } = useLanguage();
  return (
    <section className="section" id="services">
      <SectionHeader eyebrow={t.services.eyebrow} title={t.services.title} />
      <div className="services-grid">
        {services.map(({ id, icon }) => (
          <ServiceCard key={id} icon={icon} {...t.services.items[id]} />
        ))}
      </div>
    </section>
  );
}
