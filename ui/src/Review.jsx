import { motion } from 'framer-motion'
import React, { useState } from 'react';
import { Star } from 'lucide-react';

const Review = () => {
    const [reviews, setReviews] = useState([
        { id: 1, name: 'Aryan Tambde', rating: 5, comment: 'Excellent service! Very professional and careful with our belongings.', date: '2025-07-20' },
        { id: 2, name: 'Ashutosh', rating: 4, comment: 'Great experience overall. Timely delivery and reasonable pricing.', date: '2025-07-18' },
        { id: 3, name: 'ABC', rating: 5, comment: 'Highly recommended! Made our relocation stress-free.', date: '2025-07-15' }
    ]);
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            id: reviews.length + 1,
            name: reviewForm.name,
            rating: reviewForm.rating,
            comment: reviewForm.comment,
            date: new Date().toISOString().split('T')[0]
        };
        setReviews([newReview, ...reviews]);
        setReviewForm({ name: '', rating: 5, comment: '' });
        alert('Review submitted successfully!');
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ));
    };
    const [reviewForm, setReviewForm] = useState({
        name: '',
        rating: 5,
        comment: ''
    });
    return (

        <div className="py-16">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{

                        stiffness: 40,
                        damping: 25,
                        delay: 0.5,
                        duration: 1,

                    }}
                    className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-6">Customer Reviews</h1>
                    <p className="text-xl text-gray-600">See what our customers say about us</p>
                </motion.div>

                {/* Add Review Form */}
                <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{

                        stiffness: 40,
                        damping: 25,
                        delay: 0.5,
                        duration: 1,

                    }}
                    className="bg-white p-8 rounded-lg shadow-lg mb-12">
                    <h2 className="text-2xl font-bold mb-6">Share Your Experience</h2>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={reviewForm.name}
                                onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                                className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <select
                                value={reviewForm.rating}
                                onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                                className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={5}>5 Stars - Excellent</option>
                                <option value={4}>4 Stars - Very Good</option>
                                <option value={3}>3 Stars - Good</option>
                                <option value={2}>2 Stars - Fair</option>
                                <option value={1}>1 Star - Poor</option>
                            </select>
                        </div>
                        <textarea
                            placeholder="Write your review..."
                            value={reviewForm.comment}
                            onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                            rows={4}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Submit Review
                        </button>
                    </form>
                </motion.div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-lg">{review.name}</h3>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex">{renderStars(review.rating)}</div>
                                        <span className="text-sm text-gray-500">{review.date}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}

export default Review
