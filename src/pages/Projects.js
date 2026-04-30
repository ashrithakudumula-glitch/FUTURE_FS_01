import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { getProjects } from '../api/services';

const FALLBACK_PROJECTS = [
  {
    _id: '1',
    emoji: '🏨',
    title: 'GlobeStay — Hotel Reservation System',
    description: 'A responsive hotel reservation platform with multi-parameter search across 3+ filters. Real-time data sync, end-to-end booking workflow, and mobile-responsive UI.',
    tags: ['Angular', 'TypeScript', 'JavaScript', 'CSS3'],
    category: 'Full-Stack',
    github: 'https://github.com/ashrithakudumula-glitch',
    live: '',
  },
  {
    _id: '2',
    emoji: '🛡️',
    title: 'B-Vikas — Digital Identity Protocol',
    description: 'A 5-layer digital verification architecture with Aadhaar VID-based auth, AI biometric liveness checks, Zero-Knowledge Proof framework, and Hyperledger Fabric blockchain audit trail.',
    tags: ['Node.js', 'JavaScript', 'Blockchain', 'ZKP'],
    category: 'Full-Stack',
    github: 'https://github.com/ashrithakudumula-glitch',
    live: '',
  },
];

const FILTERS = ['All', 'Full-Stack', 'Frontend', 'Backend'];

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [filtered, setFiltered] = useState(FALLBACK_PROJECTS);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(data => {
        if (data.length > 0) {
          setProjects(data);
          setFiltered(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (f) => {
    setActiveFilter(f);
    setFiltered(f === 'All' ? projects : projects.filter(p => p.category === f));
  };

  return (
    <>
      <Helmet>
        <title>Projects | Ashritha Kudumula</title>
        <meta name="description" content="Explore Ashritha Kudumula's portfolio of full-stack web applications built with Angular, React, Node.js and more." />
      </Helmet>

      <section className="section" style={{ paddingTop: 140 }}>
        <div className="container">
          <div className="section-label">Portfolio</div>
          <h1 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h1>
          <p className="section-subtitle">
            A collection of projects I've built and shipped. Each one taught me something new.
          </p>

          <div className="projects-filter">
            {FILTERS.map(f => (
              <button key={f} className={`filter-btn ${activeFilter === f ? 'active' : ''}`} onClick={() => handleFilter(f)}>
                {f}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--neon-primary)', fontSize: '1.5rem' }}>
              Loading...
            </div>
          ) : (
            <div className="projects-grid">
              {filtered.map(project => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-image">
        <span style={{ position: 'relative', zIndex: 1 }}>{project.emoji || '💻'}</span>
        <div className="project-overlay">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-overlay-btn"><FiGithub /></a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-overlay-btn"><FiExternalLink /></a>
          )}
        </div>
      </div>

      <div className="project-content">
        <div className="project-tags">
          {(project.tags || []).map(tag => <span key={tag} className="project-tag">{tag}</span>)}
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
      </div>

      <div className="project-footer">
        <div className="project-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link"><FiGithub /> GitHub</a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link"><FiExternalLink /> Live Demo</a>
          )}
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {project.category}
        </span>
      </div>
    </div>
  );
}
