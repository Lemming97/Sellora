import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useFormModal } from '../forms/FormModalContext.jsx';
import EmphasisTitle from './EmphasisTitle.jsx';

export default function CallToAction() {
  const { t } = useLanguage();
  const openForm = useFormModal();

  return (
    <section className="cta-section" id="contact">
      <h2><EmphasisTitle title={t.cta.title} /></h2>
      <p>{t.cta.sub}</p>
      <div className="cta-btns">
        <button type="button" className="btn-primary" onClick={() => openForm('audit')}>{t.cta.primary}</button>
        <button type="button" className="btn-secondary" onClick={() => openForm('contact')}>{t.cta.secondary}</button>
      </div>
    </section>
  );
}
