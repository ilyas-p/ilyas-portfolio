import { Code2, Sparkles, GraduationCap } from 'lucide-react';
import { useInView } from '../hooks/useInView.js';

const FEATURES = [
  {
    icon: Code2,
    title: 'Build',
    body: 'Practical web applications',
  },
  {
    icon: Sparkles,
    title: 'Explore',
    body: 'AI & 3D experiences',
  },
  {
    icon: GraduationCap,
    title: 'Learn',
    body: 'New technologies',
  },
];

function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about">
      <div className="container" ref={ref}>
        <div className={`about-grid reveal${inView ? ' is-visible' : ''}`}>
          <div>
            <span className="eyebrow">About</span>
            <h2 className="section-title">Curious by nature. Developer by choice.</h2>
          </div>

          <div className="about-copy">
            <p>
              I&rsquo;m an aspiring MCA student with hands-on experience in Python full-stack
              development. I enjoy creating software that combines clean interfaces, practical
              backend systems, and engaging user experiences.
            </p>
            <p>
              My project work spans e-commerce, AI-assisted programming education, and an
              interactive 3D football game — giving me experience across traditional web
              development and more visual, interactive applications.
            </p>
          </div>
        </div>

        <div className="feature-cards" style={{ marginTop: 'var(--space-8)' }}>
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div className="feature-card" key={title}>
              <Icon size={20} color="var(--accent)" aria-hidden="true" />
              <h3 style={{ marginTop: 'var(--space-3)' }}>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
