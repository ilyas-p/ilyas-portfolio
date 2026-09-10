import { Mail } from 'lucide-react';
import { LinkedinIcon } from './icons.jsx';
import { profile } from '../data/profile.js';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {year} {profile.name} — Designed &amp; built with React
        </p>
        <div className="footer-icons">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-icon"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon size={16} />
          </a>
          <a href={`mailto:${profile.email}`} className="btn-icon" aria-label="Send an email">
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
