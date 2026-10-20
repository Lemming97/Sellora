import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useFormModal } from '../forms/FormModalContext.jsx';
import { launchItems } from '../content/site.js';
import EmphasisTitle from './EmphasisTitle.jsx';
import FadeIn from './FadeIn.jsx';

const Star = ({ className }) => (
  <svg className={className} viewBox="43 11 10 10" aria-hidden="true" focusable="false">
    <polygon points="48,11 49.13,14.87 53,16 49.13,17.13 48,21 46.87,17.13 43,16 46.87,14.87" />
  </svg>
);

// "Not on Amazon yet? We build your store for you." For brands that have never sold
// on Amazon. Sits after the audit section. Text: launch.* in each locale file.
// Items and icons: launchItems in site.js.
export default function LaunchSection() {
  const { t } = useLanguage();
  const openForm = useFormModal();
  const l = t.launch;

  return (
    <section className="launch-section theme-dark" id="launch" aria-labelledby="launch-title">
      <Star className="launch-star" />
      <span className="launch-eyebrow">{l.eyebrow}</span>
      <h2 id="launch-title" className="launch-title"><EmphasisTitle title={l.title} /></h2>
      <p className="launch-intro">{l.intro}</p>

      <h3 className="launch-subtitle">{l.setupTitle}</h3>
      <div className="launch-grid">
        {launchItems.map(({ id, icon: Icon }) => (
          <FadeIn key={id} className="launch-item">
            <div className="launch-icon" aria-hidden="true"><Icon size={22} weight="duotone" /></div>
            <h4>{l.items[id].title}</h4>
            <p>{l.items[id].description}</p>
          </FadeIn>
        ))}
      </div>

      <div className="launch-bottom">
        <div>
          <h3 className="launch-subtitle">{l.stepsTitle}</h3>
          <ol className="launch-steps">
            {l.steps.map((step, i) => (
              <li key={i}>
                <span className="launch-step-num" aria-hidden="true">{i + 1}</span>
                <span>
                  <strong>{step.title}</strong>
                  <span>{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="launch-pricing">{l.pricing}</p>
        </div>
        <div className="launch-cta">
          <h3><EmphasisTitle title={l.cta.title} /></h3>
          <p>{l.cta.text}</p>
          <button type="button" className="btn-primary" onClick={() => openForm('audit', { selling: 'no' })} aria-haspopup="dialog">
            {l.cta.button}
          </button>
        </div>
      </div>
    </section>
  );
}
