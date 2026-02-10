import React from 'react';
import { motion } from 'framer-motion';
import {
  about,
  skills,
  education,
  certifications,
  workExperience,
  achievements
} from '../config/personalData';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">

        {/* Page Header */}
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>About Me</h1>
          <p>{about.experience} • {about.role}</p>
        </motion.div>


        {/* =========================
            ABOUT
        ========================= */}
        <section className="about-content section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Who I Am</h2>
            <div className="about-text">
              {about.fullBio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </section>


        {/* =========================
            SKILLS
        ========================= */}
        <section className="skills-section section">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Technical Skills
          </motion.h2>

          <div className="skills-grid">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                className="skill-category"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
                <div className="skill-tags">
                  {items
                    .filter(skill => skill.trim() !== "")
                    .map((skill) => (
                      <span key={skill} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* =========================
            EXPERIENCE
        ========================= */}
        <section className="experience-section section">
          <h2>Work Experience</h2>
          <div className="timeline">
            {workExperience.map((job, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="timeline-marker"></div>

                <div className="timeline-content">
                  <h3>{job.position}</h3>
                  <h4>{job.company}</h4>
                  <span className="timeline-date">
                    {job.duration} | {job.location}
                  </span>

                  <p>{job.description}</p>

                  {/* Responsibilities */}
                  {job.responsibilities?.length > 0 && (
                    <ul className="responsibility-list">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  )}

                  {/* Tech Stack */}
                  {/* <div className="tech-stack">
                    {job.technologies
                      .filter(tech => tech.trim() !== "")
                      .map((tech, i) => (
                        <span key={i} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                  </div> */}
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* =========================
            EDUCATION
        ========================= */}
        <section className="education-section section">
          <h2>Education</h2>
          <div className="education-grid">
            {education
              .filter(edu => edu && edu.degree)
              .map((edu, index) => (
                <motion.div
                  key={index}
                  className="education-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3>{edu.degree}</h3>
                  <h4>{edu.institution}</h4>
                  {edu.university && <p>{edu.university}</p>}
                  <span className="year">{edu.year}</span>
                  {edu.grade && <p className="grade">{edu.grade}</p>}
                </motion.div>
              ))}
          </div>
        </section>


        {/* =========================
            CERTIFICATIONS
        ========================= */}
        {certifications?.length > 0 && (
          <section className="certifications-section section">
            <h2>Certifications</h2>
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="cert-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <h3>{cert.name}</h3>
                  <p>{cert.issuer}</p>
                  <span className="cert-date">{cert.date}</span>

                  {cert.description && (
                    <p className="cert-description">
                      {cert.description}
                    </p>
                  )}

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* =========================
            ACHIEVEMENTS
        ========================= */}
        {achievements?.length > 0 && (
          <section className="achievements-section section">
            <h2>Key Achievements</h2>

            <div className="achievements-grid">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  className="achievement-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <h3>{item.name}</h3>

                  {item.issuer && <p>{item.issuer}</p>}
                  {item.date && (
                    <span className="achievement-date">{item.date}</span>
                  )}

                  {item.description && (
                    <p className="achievement-description">
                      {item.description}
                    </p>
                  )}

                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Document
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        )}


      </div>
    </div>
  );
};

export default About;
