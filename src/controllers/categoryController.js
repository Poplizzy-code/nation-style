// src/controllers/categoryController.js
const Category = require('./models/Category'); // make sure Category model uses mongoose.models.Category || mongoose.model('Category', schema)

// Helper to generate slug
const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

// GET all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, icon, color } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Category name required' });
    }

    const slug = generateSlug(name);
    const category = new Category({ name, slug, description, icon, color });
    await category.save();

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon, color } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    if (name) {
      category.name = name;
      category.slug = generateSlug(name);
    }
    if (description) category.description = description;
    if (icon) category.icon = icon;
    if (color) category.color = color;

    await category.save();
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
