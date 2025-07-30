const Setting = require('../models/settingsModel.js');


const getSettings = async (req, res) => {
    try {
        let settings = await Setting.findOne().sort({ updatedAt: -1 });

        if (!settings) {
            settings = new Setting({});
            await settings.save();
        }

        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching settings', error });
    }
};


const createOrUpdateSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne(); // find existing one

    if (settings) {
      // Update existing settings
      settings.set(req.body);
      await settings.save();
      res.json({ message: 'Settings updated', settings });
    } else {
      // Create new settings only if none exists
      const newSettings = new Setting(req.body);
      await newSettings.save();
      res.status(201).json({ message: 'Settings created', settings: newSettings });
    }
  } catch (error) {
    console.error('[SERVER] Error saving settings:', error);
    res.status(500).json({ message: 'Error saving settings', error });
  }
};

module.exports = { getSettings, createOrUpdateSettings }
