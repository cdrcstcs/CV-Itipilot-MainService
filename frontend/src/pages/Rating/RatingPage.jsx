import React, { useState, useEffect } from 'react';
import axios from '../../axiosSetUp';
import { useCookies } from '../../Cookies';

function RatingPage({ ratingId }) {
  const [rating, setRating] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const cookie = useCookies();

  useEffect(() => {
    fetchRatingById();
  }, [ratingId]);

  const fetchRatingById = async () => {
    try {
        const token = cookie.get('usertoken');

      const response = await axios.get(`http://localhost:4000/ratings/${ratingId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      }); // Replace '/api/ratings' with your actual API endpoint
      setRating(response.data);
    } catch (error) {
      console.error('Error fetching rating:', error);
    }
  };

  const handleLike = async () => {
    try {
        const token = cookie.get('usertoken');

      await axios.put(`http://localhost:4000/ratings/${ratingId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      }, { score: rating.score + 1 }); // Replace '/api/ratings' with your actual API endpoint
      setRating({ ...rating, score: rating.score + 1 });
      setIsLiked(true);
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Rating Details</h1>
      {rating ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium">Score: {rating.score}</p>
            <button
              onClick={handleLike}
              disabled={isLiked}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                isLiked
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Like
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
}

export default RatingPage;
