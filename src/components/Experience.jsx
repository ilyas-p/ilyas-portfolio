import { Cloud } from 'lucide-react';
import { experience, certification } from '../data/profile.js';
import { useInView } from '../hooks/useInView.js';

function Experience() {
  const [ref, inView] = useInView();

  return (
    <section id="experience">
      <div className="container" ref={ref}>
        <div className="section-head">
          <span className="eyebrow">Experience</span>
          <h2 className="section-title">Where I&rsquo;ve worked.</h2>
        </div>

        <div className={`reveal${inView ? ' is-visible' : ''}`}>
          <div className="timeline">
            <div className="timeline-item">
              <h3 className="timeline-role">{experience.role}</h3>
              <p className="timeline-meta mono">
                {experience.company} — {experience.location}
              </p>
              <ul className="timeline-points">
                {experience.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="cert-card">
            <span className="cert-icon" aria-hidden="true">
              <Cloud size={18} />
            </span>
            <div>
              <p className="cert-label mono">Certification</p>
              <p style={{ fontWeight: 500 }}>{certification.name}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
