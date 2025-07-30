const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true }, // or use timestamps if you prefer
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  views: { type: Number, default: 0 },
  tags: { type: [String], default: [] },
  img: { type: String, required: true }
}, {
  timestamps: true
});

module.exports =  mongoose.model('Blog', blogSchema, 'blogs');
