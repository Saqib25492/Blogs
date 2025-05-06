const express = require('express');
const Blog = require('../models/Blogs');
const authenticateUser = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Setup multer for image upload
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Create blog
router.post('/createBlog', upload.single('image'), async (req, res) => {
  const { title, content, category, author } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : '/uploads/default.png';

  const newBlog = new Blog({ title, content, category, author, image: imagePath });

  try {
    const blog = await newBlog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json({ success: true, blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Fetch blogs by authenticated user
router.get('/my', authenticateUser, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.userId });
    res.json({ success: true, blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
