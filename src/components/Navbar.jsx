import { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X, Download } from 'lucide-react';
import { NAV_ITEMS } from '../App.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNavClick = () => setOpen(false);

  return (
    <>
      <header className={`navbar${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container navbar-inner">
          <a href="#home" className="nav-logo" aria-label="Mohammed Ilyas P, back to top">
            <span className="nav-logo-mark" aria-hidden="true">
              MI
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link${active === item.id ? ' is-active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a
              href="/resume.pdf"
              download
              className="btn btn-outline btn-sm nav-resume"
            >
              <Download size={15} aria-hidden="true" />
              Resume
            </a>
            <button
              type="button"
              className="btn-icon nav-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              className="btn-icon nav-hamburger"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${open ? ' is-open' : ''}`}>
        <nav className="mobile-menu-inner" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link${active === item.id ? ' is-active' : ''}`}
              onClick={handleNavClick}
            >
              {item.label}
            </a>
          ))}
          <a href="/resume.pdf" download className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>
            <Download size={15} aria-hidden="true" />
            Download Resume
          </a>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
