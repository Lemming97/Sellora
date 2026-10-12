import { useLanguage } from '../i18n/LanguageContext.jsx';
import { stats } from '../content/site.js';
import EmphasisTitle from './EmphasisTitle.jsx';
import FadeIn from './FadeIn.jsx';
import StatBox from './StatBox.jsx';

export default function Hero() {
  const { t } = useLanguage();
  const { hero, panel } = t;

  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <div className="hero-eyebrow">{hero.eyebrow}</div>
        <h1><EmphasisTitle title={hero.title} /></h1>
        <p className="hero-sub">{hero.sub}</p>
        <div className="hero-btns">
          <a href="#contact" className="btn-primary">{hero.primaryCta}</a>
          <a href="#resultats" className="btn-ghost">{hero.secondaryCta}</a>
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
