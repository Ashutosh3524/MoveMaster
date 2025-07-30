const express = require('express');
const router = express.Router();
const { getSettings, createOrUpdateSettings } = require('../controllers/settingsController.js');

router.get('/fetch', getSettings);
router.put('/create', createOrUpdateSettings);

module.exports = router;