import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { name, tagline, about, resume, social, projects } from '../config/personalData';
import './Home.css';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="hero-tag" variants={itemVariants}>
              👋 Welcome to my portfolio
            </motion.div>

            <motion.h1 className="hero-title" variants={itemVariants}>
              Hi, I'm <span className="gradient-text">{name}</span>
            </motion.h1>

            {/* <motion.p className="hero-subtitle" variants={itemVariants}>
              {about.currentRole}
            </motion.p> */}

            <motion.p className="hero-description" variants={itemVariants}>
              {about.shortBio}
            </motion.p>

            <motion.div className="hero-actions" variants={itemVariants}>
              <Link to="/contact" className="btn-primary">
                Get In Touch <FiArrowRight />
              </Link>
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <FiDownload /> Download Resume
              </a>
            </motion.div>

            <motion.div className="hero-social" variants={itemVariants}>
              <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FiGithub />
              </a>
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
              <a href={social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FiTwitter />
              </a>
              {/* <a href={social.leetcode} target="_blank" rel="noopener noreferrer" aria-label="Leetcode">
                <Fileetcode />
              </a> */}
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="code-window">
              <div className="code-header">
                <div className="code-buttons">
                  <span className="code-btn red"></span>
                  <span className="code-btn yellow"></span>
                  <span className="code-btn green"></span>
                </div>
                <span className="code-title">harsh_sharma.js</span>
              </div>
              <div className="code-body">
                <pre>
                  <code>
                    {`const developer = {
  name: "${name}",
  role: "Software Engineer",
  skills: [
    ".NET", "React", "Node.js",
    "MongoDB", "C#", "JavaScript"
  ],
  passion: "Building Impact",
  mindset: "Growth-Oriented"
};

console.log(developer.build());
// Output: Scalable Solutions ✨`}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated Background */}
        <div className="hero-background">
          <div className="gradient-sphere sphere-1"></div>
          <div className="gradient-sphere sphere-2"></div>
          <div className="gradient-sphere sphere-3"></div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {/* <section className="section featured-projects">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Featured Projects</h2>
            <p>Some of my recent work</p>
          </motion.div>

          <div className="projects-grid">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <span className="project-category">{project.category}</span>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link to="/projects" className="btn-primary">
              View All Projects <FiArrowRight />
            </Link>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Let's Work Together</h2>
            <p>
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
            <Link to="/contact" className="btn-primary btn-large">
              Start a Conversation <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
