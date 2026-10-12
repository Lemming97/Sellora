import EmphasisTitle from './EmphasisTitle.jsx';

export default function SectionHeader({ eyebrow, title, centered = false }) {
  return (
    <div className={`section-header${centered ? ' section-header--center' : ''}`}>
      <div className="section-eyebrow">{eyebrow}</div>
      <h2 className="section-title">
        <EmphasisTitle title={title} />
      </h2>
    </div>
  );
}
