// src/models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: String,
  icon: String,
  color: String,
  createdAt: { type: Date, default: Date.now }
});

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);
