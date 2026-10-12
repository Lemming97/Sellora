import logoLight from '../assets/brand/sellora-logo-light.svg';
import logoDark from '../assets/brand/sellora-logo-dark.svg';
import seal from '../assets/brand/sellora-seal.svg';

// variant: "light" for cream/white backgrounds, "dark" for navy backgrounds.
// On very narrow screens the nav shows only the round seal.
export default function Logo({ variant = 'light' }) {
  return (
    <a href="#top" className="logo" aria-label="Sellora">
      <img className="logo-full" src={variant === 'dark' ? logoDark : logoLight} alt="Sellora" />
      <img className="logo-mark" src={seal} alt="" aria-hidden="true" />
    </a>
  );
}
