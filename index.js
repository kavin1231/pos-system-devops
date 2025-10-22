const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

// Use built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Environment variables
const PORT = process.env.SERVER_PORT || 3010;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://chamathkaveendra_db_user:r1TkZxaXHn4ePt2y@devops.2i9li4h.mongodb.net/pos_system_devops?retryWrites=true&w=majority&appName=Devops';

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected...');
    app.listen(PORT, () => {
      console.log(`🚀 Server started and running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('❌ DB Error:', error));

// Test route
app.get('/test', (req, res) => {
  return res.json({ message: 'Server Started...' });
});
