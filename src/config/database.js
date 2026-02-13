const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nation-style';

    // Mongoose 7+ does NOT need useNewUrlParser or useUnifiedTopology
    await mongoose.connect(mongoURI);

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Stop app if DB connection fails
  }
};

module.exports = connectDB;
