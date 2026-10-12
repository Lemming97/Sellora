export default function TestimonialCard({ quote, author, role }) {
  return (
    <figure className="testimonial">
      <span className="quote-mark" aria-hidden="true">"</span>
      <blockquote className="quote-text">{quote}</blockquote>
      <figcaption className="quote-author">
        <strong>{author}</strong>
        <span>{role}</span>
      </figcaption>
    </figure>
  );
}
