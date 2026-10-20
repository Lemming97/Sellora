import { useCallback, useEffect, useRef, useState } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import TestimonialCard from './TestimonialCard.jsx';

const AUTOPLAY_MS = 8000;
const SWIPE_THRESHOLD = 50; // px a visitor must drag before it counts as a swipe

// Testimonials marked "placeholder": true only show when running locally (npm run dev).
// On the live site they are hidden, so visitors never see invented quotes.
// The entry with "kind": "promise" is Sellora's own promise. It shows live until real
// client testimonials exist; delete it from every locale file once you have them.
export function useVisibleTestimonials() {
  const { t } = useLanguage();
  return t.testimonials.filter((item) => import.meta.env.DEV || !item.placeholder);
}

function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => window.matchMedia?.(query).matches ?? false);
  useEffect(() => {
    const mq = window.matchMedia?.(query);
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
  const loop = count > 1;

  // The track is [last clone, ...items, first clone] so the carousel can slide
  // from the last quote straight on to the first. `pos` is the index in that track.
  const slides = loop ? [items[count - 1], ...items, items[0]] : items;
  const [pos, setPos] = useState(loop ? 1 : 0);
  const [animate, setAnimate] = useState(true);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const drag = useRef(null);
  const wheelLock = useRef(false);

  const active = loop ? (pos - 1 + count) % count : 0;

  const jumpTo = useCallback((p) => { setAnimate(false); setPos(p); }, []);
  const next = useCallback(() => { setAnimate(true); setPos((p) => Math.min(p + 1, count + 1)); }, [count]);
  const prev = useCallback(() => { setAnimate(true); setPos((p) => Math.max(p - 1, 0)); }, []);
  const goTo = (i) => { setAnimate(true); setPos(i + 1); };

  // After an instant jump (clone -> real slide), turn the animation back on.
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  // When we land on a clone, silently jump to the matching real slide.
  const onTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    if (pos === count + 1) jumpTo(1);
    if (pos === 0) jumpTo(count);
  };
  // With reduced motion there is no transition, so do the same jump right away.
  useEffect(() => {
    if (!loop || !reducedMotion) return;
    if (pos === count + 1) jumpTo(1);
    if (pos === 0) jumpTo(count);
  }, [pos, loop, reducedMotion, count, jumpTo]);

  // Back to the first quote when the language changes.
  useEffect(() => { jumpTo(loop ? 1 : 0); }, [lang, loop, jumpTo]);

  // Auto-advance every 8 seconds; the timer restarts after every move,
  // and waits while the visitor hovers, drags or uses the keyboard on it.
  const autoplay = loop && !hovered && !focused && !dragging && !reducedMotion;
  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [autoplay, next, pos]);

  if (count === 0) return null;

  // Drag / swipe with mouse, pen or finger
  const onPointerDown = (e) => {
    if (!loop || e.button > 0) return;
    drag.current = { x: e.clientX, y: e.clientY, id: e.pointerId, horizontal: null };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (d.horizontal === null && Math.abs(dx) + Math.abs(dy) > 6) {
      d.horizontal = Math.abs(dx) > Math.abs(dy);
      if (d.horizontal) { e.currentTarget.setPointerCapture(e.pointerId); setDragging(true); }
    }
    if (d.horizontal) setDragX(dx);
  };
  const endDrag = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (d.horizontal) {
      if (dragX <= -SWIPE_THRESHOLD) next();
      else if (dragX >= SWIPE_THRESHOLD) prev();
    }
    drag.current = null;
    setDragging(false);
    setDragX(0);
  };

  // Two-finger horizontal scroll on a trackpad
  const onWheel = (e) => {
    if (!loop || Math.abs(e.deltaX) < 25 || Math.abs(e.deltaX) < Math.abs(e.deltaY) || wheelLock.current) return;
    wheelLock.current = true;
    (e.deltaX > 0 ? next : prev)();
    setTimeout(() => { wheelLock.current = false; }, 700);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  const transition = animate && !dragging && !reducedMotion ? 'transform 0.75s cubic-bezier(0.22, 0.61, 0.36, 1)' : 'none';

  return (
    <section
      className="testimonial-section"
      id="results"
      aria-roledescription="carousel"
      aria-label={ui.label}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
    >
      <div className="carousel-viewport" aria-live={autoplay ? 'off' : 'polite'}>
        <div
          className={`carousel-track${dragging ? ' is-dragging' : ''}`}
          style={{ transform: `translateX(calc(${-pos * 100}% + ${dragX}px))`, transition }}
          onTransitionEnd={onTransitionEnd}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onWheel={onWheel}
        >
          {slides.map((item, i) => {
            const isClone = loop && (i === 0 || i === slides.length - 1);
            const realIndex = loop ? (i - 1 + count) % count : i;
            return (
              <div
                key={`${lang}-${i}`}
                className="carousel-slide"
                role={isClone ? undefined : 'group'}
                aria-roledescription={isClone ? undefined : 'slide'}
                aria-label={isClone ? undefined : `${realIndex + 1} / ${count}`}
                aria-hidden={isClone || i !== pos}
              >
                <TestimonialCard {...item} placeholderLabel={item.placeholder ? ui.placeholder : null} />
              </div>
            );
          })}
        </div>
      </div>

      {loop && (
        <div className="carousel-controls">
          <button type="button" className="carousel-arrow" onClick={prev} aria-label={ui.previous}>
            <CaretLeft size={18} weight="bold" />
          </button>
          <div className="carousel-dots">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`carousel-dot${i === active ? ' is-active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={ui.goTo.replace('{n}', i + 1)}
                aria-current={i === active ? 'true' : undefined}
              />
            ))}
          </div>
          <button type="button" className="carousel-arrow" onClick={next} aria-label={ui.next}>
            <CaretRight size={18} weight="bold" />
          </button>
        </div>
      )}
    </section>
  );
}
