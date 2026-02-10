const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/featured', blogController.getFeaturedBlogs);
router.get('/categories', blogController.getCategories);
router.get('/tags', blogController.getTags);
router.get('/:slug', blogController.getBlogBySlug);
router.post('/:id/like', blogController.likeBlog);

// Admin routes (add authentication middleware later)
router.post('/', blogController.createBlog);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
