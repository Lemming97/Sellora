import { useLanguage } from '../i18n/LanguageContext.jsx';
import EmphasisTitle from './EmphasisTitle.jsx';

// Kraft parcel colours for the warehouse illustration.
const BOX = { a: '#C9965A', b: '#B98448', c: '#D6A86B' };
const TAPE = { a: '#E3C18D', b: '#D9B07A', c: '#EBCB98' };

// Each parcel: x, y, width, height, colour, and where its tape strip sits (omit for no tape).
const PARCELS = [
  [70, 70, 120, 80, 'a', 124], [200, 96, 90, 54, 'b', 238], [300, 50, 110, 100, 'c', 349],
  [470, 84, 150, 66, 'a', 539], [636, 60, 96, 90, 'b', 678], [744, 104, 60, 46, 'c'],
  [860, 56, 130, 94, 'c', 919], [1004, 92, 88, 58, 'a'], [1104, 70, 90, 80, 'b', 1143],
  [76, 214, 100, 86, 'b', 120], [190, 236, 140, 64, 'c', 254], [344, 250, 70, 50, 'a'],
  [470, 200, 110, 100, 'c', 519], [594, 230, 120, 70, 'a', 648], [728, 246, 76, 54, 'b'],
  [860, 226, 96, 74, 'a', 902], [970, 196, 124, 104, 'b', 1026], [1108, 240, 88, 60, 'c'],
  [90, 350, 130, 80, 'c', 149], [236, 374, 96, 56, 'b'], [490, 360, 100, 70, 'a', 534],
  [606, 340, 150, 90, 'c', 675], [880, 370, 110, 60, 'b'], [1006, 346, 96, 84, 'a', 1048],
];

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
        {[430, 820, 1210].map((x) => <rect key={x} x={x} y="0" width="14" height="440" />)}
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
        <rect x="0" y="150" width="1312" height="12" />
        <rect x="0" y="300" width="1312" height="12" />
        <rect x="0" y="430" width="1312" height="10" />
      </g>
      <g>
        {PARCELS.map(([x, y, w, h, tone, tapeX]) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width={w} height={h} rx="4" fill={BOX[tone]} />
            {tapeX !== undefined && <rect x={tapeX} y={y} width="12" height={h} fill={TAPE[tone]} />}
          </g>
        ))}
      </g>
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

// Image band above the hero: warehouse illustration with a short tagline.
export default function HeroBand() {
  const { t } = useLanguage();
  // The whole page fades when the language changes (LanguageContext.jsx).
  const copy = t.heroBand;

  return (
    <div className="hero-band-wrap">
      <div className="hero-band">
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
