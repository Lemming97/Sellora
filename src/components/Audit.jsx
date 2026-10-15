import { Check } from '@phosphor-icons/react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { auditItems } from '../content/site.js';
import SectionHeader from './SectionHeader.jsx';
import EmphasisTitle from './EmphasisTitle.jsx';
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

      {/* After the audit: the team puts the plan into action (white-glove). */}
      <FadeIn className="audit-after">
        <h3 className="audit-after-title"><EmphasisTitle title={a.after.title} /></h3>
        <p className="audit-after-intro">{a.after.intro}</p>
        <div className="audit-after-grid">
          <div className="audit-after-card">
            <div className="audit-after-head">
              <span className="audit-after-icon" aria-hidden="true"><Check size={20} weight="bold" /></span>
              <span className="audit-after-label">{a.after.you.label}</span>
            </div>
            <h4>{a.after.you.title}</h4>
            <p>{a.after.you.text}</p>
          </div>
          <div className="audit-after-card audit-after-card-navy">
            <div className="audit-after-head">
              <span className="audit-after-icon" aria-hidden="true">
                <svg viewBox="43 11 10 10" width="18" height="18" focusable="false">
                  <polygon points="48,11 49.13,14.87 53,16 49.13,17.13 48,21 46.87,17.13 43,16 46.87,14.87" fill="currentColor" />
                </svg>
              </span>
              <span className="audit-after-label">{a.after.us.label}</span>
            </div>
            <h4>{a.after.us.title}</h4>
            <p>{a.after.us.text}</p>
            <a href="#services" className="audit-after-link">{a.after.us.link} <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </FadeIn>

      <p className="audit-pricing">{a.pricing}</p>
    </section>
  );
}
