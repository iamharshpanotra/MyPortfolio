import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { name, social, contact } from '../config/personalData';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, url: social.github, label: 'GitHub' },
    { icon: FiLinkedin, url: social.linkedin, label: 'LinkedIn' },
    { icon: FiTwitter, url: social.twitter, label: 'Twitter' },
    { icon: SiLeetcode, url: social.leetcode, label: 'LeetCode' },
  ].filter(link => link.url); // Only show links that are defined

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <h3 className="footer-brand">{name}</h3>
            <p className="footer-description">
              Building scalable systems with clean code.
              Passionate about creating impactful software solutions.
            </p>
            <div className="footer-social">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label={link.label}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">Get In Touch</h4>
            <ul className="footer-contact">
              <li>
                <FiMail />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              {contact.phone && (
                <li>
                  <span>📱</span>
                  <span>{contact.phone}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} {name}. All rights reserved.
          </p>
          <p className="made-with">
            Made with <FiHeart className="heart" /> using MERN Stack
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
