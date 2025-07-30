const Review = require('../models/reviewModel.js');

const createReview = async (req, res) => {
    try {
        const { name, rating, comment, date } = req.body;

        const newReview = new Review({ name, rating, comment, date });
        await newReview.save();

        res.status(201).json({ message: 'Review saved successfully' });
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).json({ message: 'Error saving review' });
    }
}

const fetchReview = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews' });
    }
}

const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Review.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully'});
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({ message: 'Server error during deletion' });
  }
};

module.exports = { createReview , fetchReview, deleteReview}