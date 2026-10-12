import FadeIn from './FadeIn.jsx';

export default function ServiceCard({ icon, title, description }) {
  return (
    <FadeIn className="service-card">
      <div className="service-icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </FadeIn>
  );
}
