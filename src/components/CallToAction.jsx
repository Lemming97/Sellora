import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import EmphasisTitle from './EmphasisTitle.jsx';
import FormModal from './FormModal.jsx';

export default function CallToAction() {
  const { t } = useLanguage();
  const [openForm, setOpenForm] = useState(null); // 'audit' | 'contact' | null

  return (
    <>
      <section className="cta-section" id="contact">
        <h2><EmphasisTitle title={t.cta.title} /></h2>
        <p>{t.cta.sub}</p>
        <div className="cta-btns">
          <button type="button" className="btn-primary" onClick={() => setOpenForm('audit')}>{t.cta.primary}</button>
          <button type="button" className="btn-secondary" onClick={() => setOpenForm('contact')}>{t.cta.secondary}</button>
        </div>
      </section>
      {/* Rendered outside the navy section so the modal uses the light theme. */}
      {openForm && <FormModal type={openForm} onClose={() => setOpenForm(null)} />}
    </>
  );
}
