import { useLanguage } from '../i18n/LanguageContext.jsx';
import { auditItems } from '../content/site.js';
import SectionHeader from './SectionHeader.jsx';
import FadeIn from './FadeIn.jsx';

// "What's in your Amazon audit": sits just above the final call to action.
// Text: audit.* in each locale file. Item icons: auditItems in site.js.
export default function Audit() {
  const { t } = useLanguage();
  const a = t.audit;

  return (
    <section className="section audit-section" id="audit">
      <SectionHeader eyebrow={a.eyebrow} title={a.title} />
      <p className="audit-intro">{a.intro}</p>

      <h3 className="audit-subtitle">{a.scopeTitle}</h3>
      <div className="audit-grid">
        {auditItems.map(({ id, icon: Icon }) => (
          <FadeIn key={id} className="audit-item">
            <div className="service-icon" aria-hidden="true">
              <Icon size={22} weight="duotone" />
            </div>
            <div>
              <h4>{a.items[id].title}</h4>
              <p>{a.items[id].description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
      <p className="audit-note">{a.accessNote}</p>

      <div className="audit-details">
        <FadeIn className="audit-card">
          <h3 className="audit-subtitle">{a.receiveTitle}</h3>
          <p>{a.receiveText}</p>
          <ul className="audit-receive">
            {a.receiveItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </FadeIn>
        <FadeIn className="audit-card">
          <h3 className="audit-subtitle">{a.stepsTitle}</h3>
          <ol className="audit-steps">
            {a.steps.map((step, i) => (
              <li key={i}>
                <span className="audit-step-num" aria-hidden="true">{i + 1}</span>
                <span>
                  <strong className="audit-step-title">{step.title}</strong>
                  <span className="audit-step-text">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </FadeIn>
      </div>

      <p className="audit-pricing">{a.pricing}</p>
    </section>
  );
}
