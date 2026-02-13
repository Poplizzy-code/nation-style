// src/middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDirs = ['./uploads/articles', './uploads/authors', './uploads/ads'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage for article images
const articleStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/articles');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'article-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure storage for author images
const authorStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/authors');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'author-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure storage for ad images
const adStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/ads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'ad-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, webp)'));
  }
};

// Create multer instances
exports.uploadArticleImage = multer({
  storage: articleStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: imageFileFilter
});

exports.uploadAuthorImage = multer({
  storage: authorStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: imageFileFilter
});

exports.uploadAdImage = multer({
  storage: adStorage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
  fileFilter: imageFileFilter
});