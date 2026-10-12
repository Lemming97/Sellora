import { useInView } from '../hooks/useInView.js';

// Wraps any element so it fades up when scrolled into view.
export default function FadeIn({ as: Tag = 'div', className = '', children, ...props }) {
  const [ref, isVisible] = useInView();
  const classes = ['fade-in', isVisible && 'visible', className].filter(Boolean).join(' ');
  return (
    <Tag ref={ref} className={classes} {...props}>
      {children}
    </Tag>
  );
}
