import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { LinkedinIcon } from './icons.jsx';
import { profile } from '../data/profile.js';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

const CODE_LINES = [
  <>
    <span className="tok-key">const</span>{' '}
    <span className="tok-fn">developer</span>{' '}
    <span className="tok-punc">= {'{'}</span>
  </>,
  <>
    &nbsp;&nbsp;name:{' '}
    <span className="tok-str">"Mohammed Ilyas"</span>
    <span className="tok-punc">,</span>
  </>,
  <>
    &nbsp;&nbsp;role:{' '}
    <span className="tok-str">"Full Stack Developer"</span>
    <span className="tok-punc">,</span>
  </>,
  <>
    &nbsp;&nbsp;focus: <span className="tok-punc">[</span>
  </>,
  <>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span className="tok-str">"Web Applications"</span>
    <span className="tok-punc">,</span>
  </>,
  <>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span className="tok-str">"AI &amp; Coding Tools"</span>
    <span className="tok-punc">,</span>
  </>,
  <>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span className="tok-str">"3D Experiences"</span>
  </>,
  <>
    &nbsp;&nbsp;<span className="tok-punc">],</span>
  </>,
  <>
    &nbsp;&nbsp;mindset:{' '}
    <span className="tok-str">"Keep building."</span>
  </>,
  <span className="tok-punc">{'};'}</span>,
];

function Hero() {
  const reducedMotion = usePrefersReducedMotion();

  const [visibleLines, setVisibleLines] = useState(
    reducedMotion ? CODE_LINES.length : 0
  );

  useEffect(() => {
    if (reducedMotion) {
      setVisibleLines(CODE_LINES.length);
      return undefined;
    }

    const interval = setInterval(() => {
      setVisibleLines((current) => {
        if (current >= CODE_LINES.length) {
          clearInterval(interval);
          return current;
        }

        return current + 1;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">

        {/* =====================================================
            HERO CONTENT
            ===================================================== */}

        <div className="hero-content">

          <span className="hero-eyebrow">
            <span
              className="hero-eyebrow-dot"
              aria-hidden="true"
            />

            Available for opportunities
          </span>

          <p className="hero-name mono">
            {profile.name}
          </p>

          <h1 className="hero-heading">
            Building digital experiences that solve problems.
          </h1>

          <p className="hero-role">
            {profile.title}
          </p>

          <p className="hero-intro">
            I design and build full-stack web applications — from Django
            e-commerce systems to AI-assisted learning tools and interactive
            3D experiences — with a focus on clean interfaces and dependable
            backends.
          </p>

          {/* =================================================
              HERO BUTTONS
              ================================================= */}

          <div className="hero-cta-row">

            <a
              href="#projects"
              className="btn btn-primary"
            >
              View My Work
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-outline"
            >
              View Resume
            </a>

            <a
              href="/resume.pdf"
              download="Mohammed-Ilyas-Resume.pdf"
              className="btn btn-outline"
            >
              Download Resume
            </a>

          </div>

          {/* =================================================
              SOCIAL / CONTACT LINKS
              ================================================= */}

          <div className="hero-links">

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="hero-link"
            >
              <LinkedinIcon
                size={16}
                aria-hidden="true"
              />

              LinkedIn
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="hero-link"
            >
              <Mail
                size={16}
                aria-hidden="true"
              />

              {profile.email}
            </a>

          </div>

        </div>


        {/* =====================================================
            HERO VISUAL
            ===================================================== */}

        <div className="hero-visual">

          {/* Profile Photo */}

          <div className="profile-photo-card">

            <div
              className="profile-photo-glow"
              aria-hidden="true"
            />

            <div
              className="profile-photo-overlay"
              aria-hidden="true"
            />

            <img
              src="/profile-photo.png"
              alt="Mohammed Ilyas"
              className="profile-photo"
            />

            <div className="profile-photo-caption">

              <span
                className="profile-photo-status"
                aria-hidden="true"
              />

              <span>
                Full Stack Developer
              </span>

            </div>

          </div>


          {/* =================================================
              CODE PANEL
              ================================================= */}

          <div
            className="code-panel"
            aria-hidden="true"
          >

            <div className="code-panel-bar">

              <span className="code-dot" />
              <span className="code-dot" />
              <span className="code-dot" />

              <span className="code-panel-label">
                developer.js
              </span>

            </div>


            <div className="code-panel-body">

              {CODE_LINES
                .slice(0, visibleLines)
                .map((line, index) => (
                  <div
                    className="code-line"
                    key={index}
                  >
                    {line}

                    {index === visibleLines - 1 &&
                      visibleLines < CODE_LINES.length && (
                        <span className="code-caret" />
                      )}
                  </div>
                ))}

              {visibleLines >= CODE_LINES.length && (
                <span className="code-caret" />
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;