import { useState } from 'react';
import { projects } from '../data/projects.js';
import ProjectCard from './ProjectCard.jsx';
import ProjectModal from './ProjectModal.jsx';
import { useInView } from '../hooks/useInView.js';

function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [ref, inView] = useInView();

  return (
    <section id="projects">
      <div className="container" ref={ref}>
        <div className="section-head">
          <span className="eyebrow">Projects</span>
          <h2 className="section-title">Things I&rsquo;ve built.</h2>
          <p className="section-sub">
            Three projects covering AI-assisted learning, an interactive 3D game, and a
            full-stack e-commerce build.
          </p>
        </div>

        <div className={`project-list reveal${inView ? ' is-visible' : ''}`}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onView={setActiveProject} />
          ))}
        </div>
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}

export default Projects;
