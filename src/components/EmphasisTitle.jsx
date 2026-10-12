// Renders a title made of { before, em, after } with the middle part in italic gold.
export default function EmphasisTitle({ title }) {
  return (
    <>
      {title.before}
      {title.em && <> <em>{title.em}</em></>}
      {title.after && (/^[\s?!.]/.test(title.after) ? title.after : ` ${title.after}`)}
    </>
  );
}
