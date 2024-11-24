import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createReview } from '../services/reviewService.js';
import { toast } from 'react-hot-toast';
import { Star } from 'lucide-react';

const IncidentReview = ({ incidentId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    try {
      const review = await createReview(incidentId, { rating, content });
      onReviewAdded(review);
      setRating(0);
      setContent('');
      toast.success('Review submitted successfully');
    } catch (error) {
      toast.error('Failed to submit review');
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 ${
                    value <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Review
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
            placeholder="Share your thoughts about this incident report..."
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default IncidentReview;