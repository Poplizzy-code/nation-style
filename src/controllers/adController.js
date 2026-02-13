const Ad = require('../models/ad');

exports.getAds = async (req, res) => {
  try {
    const { position, isActive } = req.query;
    const query = {};
    
    if (position) query.position = position;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const ads = await Ad.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: ads,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};