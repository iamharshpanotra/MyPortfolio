import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${API}/api/blog/featured?limit=10`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container" style={{padding: '4rem 0', textAlign: 'center'}}>Loading blogs...</div>;

  return (
    <div className="blog-page">
      <div className="container">
        <motion.div className="page-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>Blog & Articles</h1>
          <p>Thoughts, tutorials, and insights on software development</p>
        </motion.div>

        {blogs.length === 0 ? (
          <div className="no-blogs"><p>No blog posts yet. Check back soon!</p></div>
        ) : (
          <div className="blog-grid">
            {blogs.map((blog, index) => (
              <motion.div key={blog._id} className="blog-card"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Link to={`/blog/${blog.slug}`}>
                  {blog.coverImage && <div className="blog-image"><img src={blog.coverImage} alt={blog.title} /></div>}
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span className="blog-category">{blog.category}</span>
                      <span className="blog-date">{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3>{blog.title}</h3>
                    <p>{blog.excerpt}</p>
                    <div className="blog-footer">
                      <span className="read-time">{blog.readTime} min read</span>
                      <span className="read-more">Read More →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
