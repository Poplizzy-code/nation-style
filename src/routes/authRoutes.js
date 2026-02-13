// src/routes/authRoutes.js
const express = require('express');
const { login, register, getProfile } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/profile', authenticate, getProfile);

module.exports = router;
