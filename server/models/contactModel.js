const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: String,
  message: { type: String, required: true },
  timestamp: String,
  status: { type: String, default: 'new' }
});

module.exports = mongoose.model('Contact', contactSchema, 'contactdb');