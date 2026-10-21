import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import EmphasisTitle from './EmphasisTitle.jsx';

// Kraft parcel colours for the warehouse illustration.
const BOX = { a: '#C9965A', b: '#B98448', c: '#D6A86B' };
const TAPE = { a: '#E3C18D', b: '#D9B07A', c: '#EBCB98' };

// The shelves' top edges (the parcels sit on these).
const SHELVES = [150, 300, 430];

// Each parcel: [x, bottom (the shelf or box it sits on), width, height, colour, tape strip?, stays?].
// "stays" marks a box with another box on top: it never leaves, so nothing floats.
// Every other parcel keeps being picked (lifts out) and restocked (drops back in).
// Only x 0 to about 850 shows on wide screens, less on phones.
const PARCELS = [
  [50, 430, 130, 66, 'a', true, true], [62, 364, 100, 46, 'c'],
  [200, 430, 96, 80, 'b', true],
  [312, 430, 150, 60, 'c', true, true], [330, 370, 70, 48, 'a'], [408, 370, 48, 40, 'b'],
  [480, 430, 110, 90, 'a', true],
  [610, 430, 130, 56, 'b', true, true], [630, 374, 90, 52, 'c', true],
  [760, 430, 90, 70, 'c', true],
  [70, 300, 110, 84, 'c', true, true], [86, 216, 80, 50, 'a'],
  [200, 300, 130, 64, 'a', true],
  [345, 300, 90, 100, 'b', true],
  [450, 300, 140, 70, 'c', true, true], [470, 230, 100, 60, 'b', true],
  [610, 300, 100, 88, 'a', true],
  [725, 300, 120, 60, 'b'],
  [60, 150, 120, 80, 'a', true],
  [195, 150, 90, 56, 'b', true, true], [205, 94, 70, 44, 'c'],
  [300, 150, 110, 100, 'c', true],
  [430, 150, 150, 66, 'a', true, true], [450, 84, 110, 54, 'b', true],
  [600, 150, 96, 90, 'b', true],
  [715, 150, 130, 74, 'c'],
];

// Give each moving parcel its own cycle length (8.5 to 13.9 s) and a negative start
// delay, so the page opens with everything already in motion and never in sync.
let moving = 0;
const LAYOUT = PARCELS.map(([x, bottom, w, h, tone, tape, stays]) => {
  if (stays) return { x, y: bottom - h, w, h, tone, tape };
  const i = moving++;
  const duration = 8.5 + ((i * 37) % 7) * 0.9;
  const delay = -((i * 2.9) % duration);
  return { x, y: bottom - h, w, h, tone, tape, style: { animationDuration: `${duration.toFixed(1)}s`, animationDelay: `${delay.toFixed(1)}s` } };
});

function WarehouseIllustration() {
  return (
    <svg
      className="hero-band-art"
      viewBox="0 0 1312 440"
      preserveAspectRatio="xMinYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="rgba(255, 255, 255, 0.05)">
        {[430, 820].map((x) => <rect key={x} x={x} y="0" width="14" height="440" />)}
      </g>
      {/* Only the shelves fade in on the left; the parcels stay solid over the gradient. */}
      <defs>
        <linearGradient id="hero-band-shelf-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.3" stopColor="#FFFFFF" stopOpacity="0.09" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.09" />
        </linearGradient>
      </defs>
      <g fill="url(#hero-band-shelf-fade)">
        {SHELVES.map((y) => <rect key={y} x="0" y={y} width="1312" height={y === 430 ? 10 : 12} />)}
      </g>
      {LAYOUT.map(({ x, y, w, h, tone, tape, style }) => (
        <g key={`${x}-${y}`} className={style ? 'hero-parcel is-moving' : 'hero-parcel'} style={style}>
          <rect x={x} y={y} width={w} height={h} rx="4" fill={BOX[tone]} />
          {tape && <rect x={x + Math.floor(w / 2) - 6} y={y} width="12" height={h} fill={TAPE[tone]} />}
        </g>
      ))}
    </svg>
  );
}

// The four point star from the Sellora seal, in gold. Kept outside the
// illustration so the band's cropping and fade never hide it.
function SelloraStar({ className }) {
  return (
    <svg className={`hero-band-star ${className}`} viewBox="43 11 10 10" aria-hidden="true" focusable="false">
      <polygon points="48,11 49.13,14.87 53,16 49.13,17.13 48,21 46.87,17.13 43,16 46.87,14.87" />
    </svg>
  );
}

// Image band above the hero: a warehouse that keeps restocking (parcels picked and
// replaced in a continuous loop, stars twinkling) next to a short tagline.
export default function HeroBand() {
  const { t } = useLanguage();
  const bandRef = useRef(null);

  // The parcels and stars only move while the band is on screen.
  useEffect(() => {
    const band = bandRef.current;
    if (!band || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      band.classList.toggle('is-paused', !entry.isIntersecting);
    });
    observer.observe(band);
    return () => observer.disconnect();
  }, []);
  // The whole page fades when the language changes (LanguageContext.jsx).
  const copy = t.heroBand;

  return (
    <div className="hero-band-wrap">
      <div className="hero-band" ref={bandRef}>
        <WarehouseIllustration />
        <SelloraStar className="hero-band-star-lg" />
        <SelloraStar className="hero-band-star-md" />
        <SelloraStar className="hero-band-star-sm" />
        <div className="hero-band-panel">
          <div className="hero-band-copy">
            <p className="hero-band-label">{copy.label}</p>
            <p className="hero-band-line"><EmphasisTitle title={copy.line} /></p>
          </div>
          <span className="hero-band-rule" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
