import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import { contact, social } from '../config/personalData';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${API}/api/contact`, formData);

      setStatus({
        type: 'success',
        message: response.data.message || 'Message sent successfully! I\'ll get back to you soon.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        phone: ''
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to send message. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container container-narrow">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Get In Touch</h1>
          <p>Have a project in mind or just want to say hi? Feel free to reach out!</p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="info-card">
              <div className="info-icon">
                <FiMail />
              </div>
              <h3>Email</h3>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>

            {contact.phone && (
              <div className="info-card">
                <div className="info-icon">
                  📱
                </div>
                <h3>Phone</h3>
                <span>{contact.phone}</span>
              </div>
            )}

            <div className="info-card">
              <div className="info-icon">
                <FiMapPin />
              </div>
              <h3>Social</h3>
              <div className="social-links">
                {Object.entries(social).map(([platform, url]) => (
                  url && (
                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  )
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell me about your project or inquiry..."
                ></textarea>
              </div>

              {status.message && (
                <div className={`form-status ${status.type}`}>
                  {status.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
                  <span>{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Sending...' : (
                  <>
                    Send Message <FiSend />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
