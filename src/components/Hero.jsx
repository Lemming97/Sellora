import { useLanguage } from '../i18n/LanguageContext.jsx';
import { stats } from '../content/site.js';
import EmphasisTitle from './EmphasisTitle.jsx';
import FadeIn from './FadeIn.jsx';
import StatBox from './StatBox.jsx';
import { useVisibleTestimonials } from './Testimonials.jsx';

export default function Hero() {
  const { t } = useLanguage();
  const { hero, panel } = t;
  // "See our results" scrolls to the testimonials, so it only shows when there are some.
  const hasTestimonials = useVisibleTestimonials().length > 0;

  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <div className="hero-eyebrow">{hero.eyebrow}</div>
        <h1><EmphasisTitle title={hero.title} /></h1>
        <p className="hero-sub">{hero.sub}</p>
        <div className="hero-btns">
          <a href="#contact" className="btn-primary">{hero.primaryCta}</a>
          {hasTestimonials && <a href="#resultats" className="btn-ghost">{hero.secondaryCta}</a>}
        </div>
      </div>

      <FadeIn className="hero-panel">
        <div className="panel-title">{panel.resultsTitle}</div>
        <div className="stat-row">
          {stats.map((s) => (
            <StatBox key={s.id} value={s.value} label={panel.stats[s.id]} />
          ))}
        </div>
        <hr className="panel-divider" />
        <div className="panel-title">{panel.howTitle}</div>
        {panel.steps.map((step, i) => (
          <div className="panel-step" key={i}>
            <div className="step-num">{i + 1}</div>
            <div className="step-text">
              <strong>{step.title}</strong>
              <span>{step.sub}</span>
            </div>
          </div>
        ))}
      </FadeIn>
    </section>
  );
}
