const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
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
  bio: {
    type: String,
    maxlength: 500
  },
  profileImage: String,
  email: {
    type: String,
    lowercase: true
  },
  social: {
    twitter: String,
    instagram: String,
    linkedin: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Author || mongoose.model('Author', authorSchema);