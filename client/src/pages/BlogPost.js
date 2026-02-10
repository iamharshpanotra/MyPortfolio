import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${API}/api/blog/${slug}`);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container" style={{padding: '4rem 0'}}>Loading...</div>;
  if (!blog) return <div className="container" style={{padding: '4rem 0'}}>Blog post not found</div>;

  return (
    <div className="blog-post-page">
      <div className="container container-narrow">
        <article className="blog-post">
          <header className="blog-header">
            <h1>{blog.title}</h1>
            <div className="blog-meta">
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>{blog.readTime} min read</span>
              <span>•</span>
              <span>{blog.category}</span>
            </div>
          </header>
          {blog.coverImage && <img src={blog.coverImage} alt={blog.title} className="blog-cover" />}
          <div className="blog-body">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
          {blog.tags && blog.tags.length > 0 && (
            <div className="blog-tags">
              {blog.tags.map(tag => (<span key={tag} className="tag">{tag}</span>))}
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
