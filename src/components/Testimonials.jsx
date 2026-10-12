import { useCallback, useEffect, useRef, useState } from 'react';
import { CaretLeft, CaretRight, Pause, Play } from '@phosphor-icons/react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import TestimonialCard from './TestimonialCard.jsx';

const AUTOPLAY_MS = 6000;

// Testimonials marked "placeholder": true only show when running locally (npm run dev).
// On the live site they are hidden, so visitors never see invented quotes.
// Add a real testimonial (without "placeholder") to every locale file and it appears live.
export function useVisibleTestimonials() {
  const { t } = useLanguage();
  return t.testimonials.filter((item) => import.meta.env.DEV || !item.placeholder);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return;
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export default function Testimonials() {
  const { t, lang } = useLanguage();
  const ui = t.testimonialsUi;
  const items = useVisibleTestimonials();
  const count = items.length;

  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const touchStartX = useRef(null);

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Back to the first slide when the language changes.
  useEffect(() => setIndex(0), [lang]);

  const autoplay = count > 1 && !userPaused && !hovered && !focused && !reducedMotion;
  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [autoplay, next, index]);

  if (count === 0) return null;

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <section
      className="testimonial-section"
      id="resultats"
      aria-roledescription="carousel"
      aria-label={ui.label}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
    >
      <div
        className="carousel-track"
        aria-live={autoplay ? 'off' : 'polite'}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {items.map((item, i) => (
          <div
            key={`${lang}-${i}`}
            className={`carousel-slide${i === index ? ' is-active' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${count}`}
            aria-hidden={i !== index}
          >
            <TestimonialCard {...item} placeholderLabel={item.placeholder ? ui.placeholder : null} />
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="carousel-controls">
          <button type="button" className="carousel-arrow" onClick={prev} aria-label={ui.previous}>
            <CaretLeft size={18} weight="bold" />
          </button>
          <div className="carousel-dots">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`carousel-dot${i === index ? ' is-active' : ''}`}
                onClick={() => go(i)}
                aria-label={ui.goTo.replace('{n}', i + 1)}
                aria-current={i === index ? 'true' : undefined}
              />
            ))}
          </div>
          <button type="button" className="carousel-arrow" onClick={next} aria-label={ui.next}>
            <CaretRight size={18} weight="bold" />
          </button>
          {!reducedMotion && (
            <button
              type="button"
              className="carousel-pause"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? ui.play : ui.pause}
            >
              {userPaused ? <Play size={14} weight="fill" /> : <Pause size={14} weight="fill" />}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
