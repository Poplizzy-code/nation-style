const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');

router.get('/', adController.getAds);

module.exports = router;