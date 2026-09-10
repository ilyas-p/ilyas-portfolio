import { skillGroups } from '../data/skills.js';
import { useInView } from '../hooks/useInView.js';

function Skills() {
  const [ref, inView] = useInView();

  return (
    <section id="skills">
      <div className="container" ref={ref}>
        <div className="section-head">
          <span className="eyebrow">Skills</span>
          <h2 className="section-title">Tools I build with.</h2>
        </div>

        <div className={`skills-grid reveal${inView ? ' is-visible' : ''}`}>
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.id}>
              <p className="skill-group-label mono">{group.label}</p>
              <div className="skill-chips">
                {group.skills.map((skill) => (
                  <span className="skill-chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
