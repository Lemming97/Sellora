import { useLanguage } from '../i18n/LanguageContext.jsx';
import SectionHeader from './SectionHeader.jsx';
import MethodStep from './MethodStep.jsx';

export default function Method() {
  const { t } = useLanguage();
  return (
    <section className="how-section" id="approach">
      <div className="section section--compact">
        <SectionHeader eyebrow={t.method.eyebrow} title={t.method.title} centered />
        <div className="how-grid">
          {t.method.steps.map((step, i) => (
            <MethodStep key={i} number={i + 1} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
