import { education } from '../data/profile.js';
import { useInView } from '../hooks/useInView.js';

function Education() {
  const [ref, inView] = useInView();

  return (
    <section id="education">
      <div className="container" ref={ref}>
        <div className="section-head">
          <span className="eyebrow">Education</span>
          <h2 className="section-title">Where I&rsquo;ve studied.</h2>
        </div>

        <div className={`edu-grid reveal${inView ? ' is-visible' : ''}`}>
          {education.map((item) => (
            <div className="edu-card" key={item.id}>
              <p className="edu-period mono">{item.period}</p>
              <p className="edu-degree">{item.degree}</p>
              <p className="edu-institution">{item.institution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
