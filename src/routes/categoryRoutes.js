const express = require('express');
const router = express.Router(); // ⚠️ This line must exist

module.exports = router;

const Category = require('../models/category');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET category by slug
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;