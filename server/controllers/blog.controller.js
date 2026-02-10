const Blog = require('../models/Blog');

// Get all published blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, tag, search } = req.query;
    
    const query = { published: true };
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by tag
    if (tag) {
      query.tags = tag;
    }
    
    // Search in title, excerpt, and content
    if (search) {
      query.$text = { $search: search };
    }
    
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-content'); // Exclude full content for list view
    
    const count = await Blog.countDocuments(query);
    
    res.json({
      blogs,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
};

// Get single blog by slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      slug: req.params.slug, 
      published: true 
    });
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    // Increment views
    await blog.incrementViews();
    
    res.json(blog);
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
};

// Get featured/recent blogs for homepage
exports.getFeaturedBlogs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    
    const blogs = await Blog.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-content');
    
    res.json(blogs);
  } catch (error) {
    console.error('Get featured blogs error:', error);
    res.status(500).json({ message: 'Error fetching featured blogs', error: error.message });
  }
};

// Create new blog (you can add authentication middleware later)
exports.createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, tags, category, published, coverImage } = req.body;
    
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    
    const blog = new Blog({
      title,
      slug,
      excerpt,
      content,
      tags,
      category,
      published,
      readTime,
      coverImage
    });
    
    await blog.save();
    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    console.error('Create blog error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Blog with this title already exists' });
    }
    res.status(500).json({ message: 'Error creating blog', error: error.message });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // Update slug if title changed
    if (req.body.title && req.body.title !== blog.title) {
      req.body.slug = req.body.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }
    
    // Recalculate read time if content changed
    if (req.body.content) {
      const wordCount = req.body.content.split(/\s+/).length;
      req.body.readTime = Math.ceil(wordCount / 200);
    }
    
    Object.assign(blog, req.body);
    await blog.save();
    
    res.json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ message: 'Error updating blog', error: error.message });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ message: 'Error deleting blog', error: error.message });
  }
};

// Like a blog post
exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    blog.likes += 1;
    await blog.save();
    
    res.json({ likes: blog.likes });
  } catch (error) {
    console.error('Like blog error:', error);
    res.status(500).json({ message: 'Error liking blog', error: error.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Blog.distinct('category', { published: true });
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

// Get all tags
exports.getTags = async (req, res) => {
  try {
    const tags = await Blog.distinct('tags', { published: true });
    res.json(tags);
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({ message: 'Error fetching tags', error: error.message });
  }
};
