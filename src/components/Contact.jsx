import { Mail, Phone } from 'lucide-react';
import { LinkedinIcon } from './icons.jsx';
import { profile } from '../data/profile.js';
import { useInView } from '../hooks/useInView.js';

function Contact() {
  const [ref, inView] = useInView();

  return (
    <section id="contact" className="contact-section">
      <div className="container" ref={ref}>
        <div className={`contact-panel reveal${inView ? ' is-visible' : ''}`}>
          <span className="eyebrow">Contact</span>
          <h2 className="contact-heading">Have an idea? Let&rsquo;s build it.</h2>
          <p className="contact-desc">
            I&rsquo;m interested in opportunities where I can learn, contribute, and build
            meaningful software.
          </p>

          <div className="contact-cta-row">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              Get in Touch
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-outline"
            >
              LinkedIn
            </a>
          </div>

          <div className="contact-details">
            <a href={`mailto:${profile.email}`} className="contact-detail">
              <Mail size={16} aria-hidden="true" />
              {profile.email}
            </a>
            <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="contact-detail">
              <Phone size={16} aria-hidden="true" />
              {profile.phone}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="contact-detail"
            >
              <LinkedinIcon size={16} aria-hidden="true" />
              mohammed-ilyas
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
