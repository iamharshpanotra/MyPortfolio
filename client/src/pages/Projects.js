import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '../config/personalData';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="projects-page">
      <div className="container">
        <motion.div className="page-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>My Projects</h1>
          <p>A collection of work I'm proud of</p>
        </motion.div>

        <div className="filter-buttons">
          {categories.map(cat => (
            <button key={cat} className={filter === cat ? 'active' : ''} onClick={() => setFilter(cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <motion.div key={project.id} className="project-card" 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.technologies.map(tech => (<span key={tech}>{tech}</span>))}
                </div>
                <div className="project-links">
                  {project.github && (<a href={project.github} target="_blank" rel="noopener noreferrer"><FiGithub /> Code</a>)}
                  {project.demo && (<a href={project.demo} target="_blank" rel="noopener noreferrer"><FiExternalLink /> Live Demo</a>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
