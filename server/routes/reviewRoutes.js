const express = require('express');
const router = express.Router();
const { createReview, fetchReview, deleteReview } = require('../controllers/reviewController.js');

router.post('/create', createReview);
router.get('/fetch', fetchReview);
router.delete('/:id', deleteReview);

module.exports = router;