import { useEffect, useRef } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons.jsx';

function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={handleOverlayClick}
      role="presentation"
    >
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={panelRef}
      >
        <div className="modal-head">
          <div>
            <p className="project-category mono">{project.category}</p>
            <h3 id="modal-title" className="project-name" style={{ marginBottom: 0 }}>
              {project.name}
            </h3>
          </div>
          <button
            type="button"
            className="btn-icon modal-close"
            onClick={onClose}
            aria-label="Close project details"
            ref={closeBtnRef}
          >
            <X size={18} />
          </button>
        </div>

        <p className="project-desc" style={{ marginBottom: 0 }}>
          {project.longDescription}
        </p>

        <div className="modal-section">
          <h4>Features</h4>
          <ul className="modal-feature-list">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="modal-section">
          <h4>Technology stack</h4>
          <div className="project-tech">
            {project.technologies.map((tech) => (
              <span className="tech-tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="modal-actions">
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
            className={`btn btn-primary${!project.liveUrl ? ' btn-disabled' : ''}`}
            aria-disabled={!project.liveUrl}
            title={project.liveUrl ? undefined : 'Live demo link not added yet'}
          >
            <ExternalLink size={16} aria-hidden="true" />
            {project.liveUrl ? 'Live Demo' : 'Live Demo (soon)'}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
