import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons.jsx';
import ProjectVisual from './ProjectVisual.jsx';

function ProjectCard({ project, onView }) {
  return (
    <article className="project-card">
      <div className="project-visual">
        <ProjectVisual type={project.visual} />
      </div>

      <div>
        <p className="project-number mono">{project.number}</p>
        <p className="project-category mono">{project.category}</p>
        <h3 className="project-name">{project.name}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="project-tech">
          {project.technologies.map((tech) => (
            <span className="tech-tag" key={tech}>
              {tech}
            </span>
          ))}
        </div>

        <div className="project-actions">
          <button type="button" className="btn btn-primary" onClick={() => onView(project)}>
            View Project
          </button>
          <a
            href={project.githubUrl ?? undefined}
            target={project.githubUrl ? '_blank' : undefined}
            rel={project.githubUrl ? 'noreferrer noopener' : undefined}
            className={`btn btn-outline${!project.githubUrl ? ' btn-disabled' : ''}`}
            aria-disabled={!project.githubUrl}
            title={project.githubUrl ? undefined : 'GitHub link not added yet'}
          >
            <GithubIcon size={16} aria-hidden="true" />
            {project.githubUrl ? 'GitHub' : 'GitHub (soon)'}
          </a>
          <a
            href={project.liveUrl ?? undefined}
            target={project.liveUrl ? '_blank' : undefined}
            rel={project.liveUrl ? 'noreferrer noopener' : undefined}
            className={`btn btn-ghost${!project.liveUrl ? ' btn-disabled' : ''}`}
            aria-disabled={!project.liveUrl}
            title={project.liveUrl ? undefined : 'Live demo link not added yet'}
          >
            <ExternalLink size={16} aria-hidden="true" />
            {project.liveUrl ? 'Live Demo' : 'Live Demo (soon)'}
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
