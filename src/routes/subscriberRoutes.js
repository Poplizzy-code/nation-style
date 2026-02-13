const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

// Subscribe
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();
    
    res.status(201).json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;