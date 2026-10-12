import FadeIn from './FadeIn.jsx';

export default function MethodStep({ number, title, description }) {
  return (
    <FadeIn className="how-step">
      <div className="how-num">{number}</div>
      <h4>{title}</h4>
      <p>{description}</p>
    </FadeIn>
  );
}
