import { useLanguage } from '../i18n/LanguageContext.jsx';
import { site } from '../content/site.js';
import EmphasisTitle from './EmphasisTitle.jsx';

export default function CallToAction() {
  const { t } = useLanguage();
  return (
    <section className="cta-section" id="contact">
      <h2><EmphasisTitle title={t.cta.title} /></h2>
      <p>{t.cta.sub}</p>
      <div className="cta-btns">
        <a href={`mailto:${site.email}`} className="btn-primary">{t.cta.primary}</a>
        <a href={`mailto:${site.email}`} className="btn-secondary">{t.cta.secondary}</a>
      </div>
    </section>
  );
}
