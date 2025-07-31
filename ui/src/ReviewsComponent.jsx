import React, { useState, useEffect } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const ReviewsComponent = ({ apiBase, authToken }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWithAuth = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    
    return fetch(url, { ...options, headers });
  };

  const loadReviews = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBase}/reviews/fetch`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error loading reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id) => {
    try {
      const response = await fetchWithAuth(`${apiBase}/reviews/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setReviews(reviews.filter(r => r._id !== id));
      } else {
        toast.error('Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      setReviews(reviews.filter(r => r._id !== id));
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Star size={24} className="mr-3 text-yellow-500" />
          <h2 className="text-xl font-semibold text-gray-800">Customer Reviews</h2>
          {loading && <Loader2 size={16} className="animate-spin ml-3 text-yellow-500" />}
        </div>
        <button
          onClick={loadReviews}
          disabled={loading}
          className="text-blue-600 hover:text-blue-800 text-sm disabled:opacity-50"
        >
          Refresh
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        {reviews.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {loading ? 'Loading reviews...' : 'No reviews found'}
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="p-4 border-b last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-800">{review.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{review.date}</span>
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="text-red-600 cursor-none hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsComponent;