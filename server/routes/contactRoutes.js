const express = require('express');
const router = express.Router();
const { submitContactForm, fetchContactForm, updateEnquiryStatus, deleteEnquiry } = require('../controllers/contactController.js');

router.post('/create', submitContactForm);
router.get('/fetch', fetchContactForm);
router.patch('/:id', updateEnquiryStatus);
router.delete('/:id', deleteEnquiry);

module.exports = router;