// const express = require('express');
// const router = express.Router();
// const articleController = require('../controllers/articleController');
// const { authenticate } = require('../middleware/authMiddleware');
// const upload = require('../middleware/uploadMiddleware');

// // Public routes
// router.get('/', articleController.getAllArticles);
// router.get('/featured', articleController.getFeaturedArticles);
// router.get('/breaking', articleController.getBreakingNews);
// router.get('/top-stories', articleController.getTopStories);
// router.get('/category/:categorySlug', articleController.getLatestByCategory);
// router.get('/:slug', articleController.getArticleBySlug);

// // Protected routes (admin/editor only)
// router.post('/', authenticate, upload.single('featuredImage'), articleController.createArticle);
// router.put('/:id', authenticate, upload.single('featuredImage'), articleController.updateArticle);
// router.delete('/:id', authenticate, articleController.deleteArticle);

// module.exports = router;


const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { authenticate } = require('../middleware/authMiddleware');
const { uploadArticleImage } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', articleController.getAllArticles);
router.get('/featured', articleController.getFeaturedArticles);
router.get('/breaking', articleController.getBreakingNews);
router.get('/top-stories', articleController.getTopStories);
router.get('/category/:categorySlug', articleController.getLatestByCategory);
router.get('/:slug', articleController.getArticleBySlug);

// Protected routes (admin/editor only)
router.post('/', authenticate, uploadArticleImage.single('featuredImage'), articleController.createArticle);
router.put('/:id', authenticate, uploadArticleImage.single('featuredImage'), articleController.updateArticle);
router.delete('/:id', authenticate, articleController.deleteArticle);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const articleController = require('../controllers/articleController');
// const { authenticate } = require('../middleware/authMiddleware');

// // Public routes
// router.get('/', articleController.getAllArticles);
// router.get('/featured', articleController.getFeaturedArticles);
// router.get('/breaking', articleController.getBreakingNews);
// router.get('/top-stories', articleController.getTopStories);
// router.get('/category/:categorySlug', articleController.getLatestByCategory);
// router.get('/:slug', articleController.getArticleBySlug);

// // Protected routes (admin/editor only) - TEMPORARILY WITHOUT FILE UPLOAD
// router.post('/', authenticate, articleController.createArticle);
// router.put('/:id', authenticate, articleController.updateArticle);
// router.delete('/:id', authenticate, articleController.deleteArticle);

// module.exports = router;