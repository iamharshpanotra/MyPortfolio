const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    maxLength: 300
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Harsh Sharma'
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['Technology', 'Development', 'Tutorial', 'Personal', 'Career', 'Other'],
    default: 'Technology'
  },
  readTime: {
    type: Number, // in minutes
    default: 5
  },
  published: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  coverImage: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search optimization
blogSchema.index({ title: 'text', excerpt: 'text', content: 'text' });
blogSchema.index({ slug: 1 });
blogSchema.index({ published: 1, createdAt: -1 });

// Method to increment views
blogSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

module.exports = mongoose.model('Blog', blogSchema);
