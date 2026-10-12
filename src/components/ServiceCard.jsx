import FadeIn from './FadeIn.jsx';

export default function ServiceCard({ icon: Icon, title, description }) {
  return (
    <FadeIn className="service-card">
      <div className="service-icon" aria-hidden="true">
        <Icon size={22} weight="duotone" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </FadeIn>
  );
}
