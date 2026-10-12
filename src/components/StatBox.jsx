import FadeIn from './FadeIn.jsx';

export default function StatBox({ value, label }) {
  return (
    <FadeIn className="stat-box">
      <div className="stat-num">{value}</div>
      <div className="stat-label">{label}</div>
    </FadeIn>
  );
}
