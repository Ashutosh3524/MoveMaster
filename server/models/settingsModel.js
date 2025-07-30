const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  adminEmail: String,
  emailNotifications: Boolean,
  reviewNotifications: Boolean,
  maintenanceMode: Boolean,
  autoRefresh: Number,
  siteName: String,
  contactEmail: String,
  businessHours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema, 'settingsdb');
