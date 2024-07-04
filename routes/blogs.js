const express = require('express');
const router = express.Router();
const cors = require("cors");
const mongoose = require('mongoose');
const compression = require('compression');



router.use(compression());
router.use(express.json());
router.use(cors());

// Define the schema for the blog
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
});

// Create a Mongoose model for the blog using the defined schema
const Blog = mongoose.model('Blog', blogSchema);
Blog.createIndexes();

router.get('/', async (req, res) => {
    try {
      // Fetch all blogs from the database
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (error) {
      console.error('Error fetching blog data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      // Extract blog data from the request body
      const { title, date, content, photoUrl } = req.body;
  
      // Create a new blog post
      const newBlog = new Blog({
        title,
        date,
        content,
        photoUrl,
      });
  
      // Save the new blog post to the database
      const savedBlog = await newBlog.save();
  
      res.status(201).json(savedBlog);
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;
