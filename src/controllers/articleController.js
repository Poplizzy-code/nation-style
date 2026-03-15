const Article = require('../models/article');
const Category = require('../models/category');
const Author = require('../models/author');

// Helper to generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    + '-' + Date.now();
};

// GET all articles
exports.getAllArticles = async (req, res) => {
  try {
    const { 
      category, 
      author, 
      page = 1, 
      limit = 10, 
      search, 
      featured, 
      breaking, 
      topStories,
      isCoverStory  // ✅ ADDED
    } = req.query;
    
    const skip = (page - 1) * limit;
    let query = { published: true };

    if (category) query.category = category;
    if (author) query.author = author;
    if (featured !== undefined) query.isFeatured = featured === 'true';
    if (breaking !== undefined) query.isBreaking = breaking === 'true';
    if (topStories !== undefined) query.isTopStory = topStories === 'true';
    if (isCoverStory !== undefined) query.isCoverStory = isCoverStory === 'true';  // ✅ ADDED

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
      ];
    }

    const articles = await Article.find(query)
      .populate('category', 'name slug')
      .populate('author', 'name slug profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Article.countDocuments(query);

    res.json({
      success: true,
      data: articles,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET single article by slug
exports.getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const article = await Article.findOne({ slug, published: true })
      .populate('category', 'name slug')
      .populate('author', 'name slug bio profileImage email social');

    if (!article) return res.status(404).json({ error: 'Article not found' });

    article.views = (article.views || 0) + 1;
    await article.save();

    res.json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE article
exports.createArticle = async (req, res) => {
  try {
    const { 
      title, 
      excerpt, 
      content, 
      category, 
      author, 
      tags, 
      isBreaking, 
      isFeatured, 
      isTopStory,
      isCoverStory,  // ✅ ADDED
      readTime 
    } = req.body;
    
    const featuredImage = req.file?.path;

    if (!title || !excerpt || !content || !category || !author || !featuredImage)
      return res.status(400).json({ error: 'Missing required fields' });

    const categoryExists = await Category.findById(category);
    const authorExists = await Author.findById(author);

    if (!categoryExists || !authorExists)
      return res.status(400).json({ error: 'Invalid category or author' });

    const slug = generateSlug(title);

    const article = new Article({
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      author,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      isBreaking: isBreaking === 'true',
      isFeatured: isFeatured === 'true',
      isTopStory: isTopStory === 'true',
      isCoverStory: isCoverStory === 'true',  // ✅ ADDED
      readTime: readTime || 5,
      views: 0,
    });

    await article.save();
    await article.populate('category', 'name slug');
    await article.populate('author', 'name slug profileImage');

    res.status(201).json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE article
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      excerpt, 
      content, 
      category, 
      author, 
      tags, 
      isBreaking, 
      isFeatured, 
      isTopStory,
      isCoverStory,  // ✅ ADDED
      readTime 
    } = req.body;

    const article = await Article.findById(id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    if (title) { article.title = title; article.slug = generateSlug(title); }
    if (excerpt) article.excerpt = excerpt;
    if (content) article.content = content;
    if (category) article.category = category;
    if (author) article.author = author;
    if (tags) article.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());
    if (isBreaking !== undefined) article.isBreaking = isBreaking === 'true';
    if (isFeatured !== undefined) article.isFeatured = isFeatured === 'true';
    if (isTopStory !== undefined) article.isTopStory = isTopStory === 'true';
    if (isCoverStory !== undefined) article.isCoverStory = isCoverStory === 'true';  // ✅ ADDED
    if (readTime) article.readTime = readTime;
    if (req.file) article.featuredImage = req.file.path;

    article.updatedAt = new Date();
    await article.save();
    await article.populate('category', 'name slug');
    await article.populate('author', 'name slug profileImage');

    res.json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE article
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByIdAndDelete(id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Featured, breaking, top stories, latest by category
exports.getFeaturedArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isFeatured: true, published: true })
      .populate('category', 'name slug')
      .populate('author', 'name slug profileImage')
      .sort({ createdAt: -1 })
      .limit(1);

    res.json({ success: true, data: articles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBreakingNews = async (req, res) => {
  try {
    const articles = await Article.find({ isBreaking: true, published: true })
      .populate('category', 'name slug')
      .populate('author', 'name slug')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ success: true, data: articles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopStories = async (req, res) => {
  try {
    const articles = await Article.find({ isTopStory: true, published: true })
      .populate('category', 'name slug')
      .populate('author', 'name slug')
      .sort({ views: -1 })
      .limit(5);

    res.json({ success: true, data: articles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ NEW: Get Cover Stories
exports.getCoverStories = async (req, res) => {
  try {
    const { limit = 3 } = req.query;
    
    const articles = await Article.find({ isCoverStory: true, published: true })
      .populate('category', 'name slug')
      .populate('author', 'name slug profileImage')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({ success: true, data: articles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLatestByCategory = async (req, res) => {
  try {
    const { categorySlug } = req.params;
    const { limit = 12, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    const category = await Category.findOne({ slug: categorySlug });
    if (!category) return res.status(404).json({ error: 'Category not found' });

    const query = { category: category._id, published: true };

    const articles = await Article.find(query)
      .populate('category', 'name slug')
      .populate('author', 'name slug profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Article.countDocuments(query);

    res.json({
      success: true,
      data: articles,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};