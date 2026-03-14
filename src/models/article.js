// src/models/Article.js
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 300
  },
  content: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  tags: [String],
  isBreaking: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isTopStory: {
    type: Boolean,
    default: false
  },
  isCoverStory: {
    type: Boolean,
    default: false
  },
  readTime: {
    type: Number,
    default: 5
  },
  views: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for better query performance
articleSchema.index({ slug: 1 });
articleSchema.index({ category: 1 });
articleSchema.index({ author: 1 });
articleSchema.index({ createdAt: -1 });
articleSchema.index({ isCoverStory: 1 });
articleSchema.index({ isFeatured: 1 });
articleSchema.index({ isTopStory: 1 });
articleSchema.index({ isBreaking: 1 });

// Update the updatedAt field before saving
articleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);