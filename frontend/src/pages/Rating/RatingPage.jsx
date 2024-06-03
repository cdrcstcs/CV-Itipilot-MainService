import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RatingPage({ ratingId }) {
  const [rating, setRating] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchRatingById();
  }, [ratingId]);

  const fetchRatingById = async () => {
    try {
      const response = await axios.get(`/api/ratings/${ratingId}`); // Replace '/api/ratings' with your actual API endpoint
      setRating(response.data);
    } catch (error) {
      console.error('Error fetching rating:', error);
    }
  };

  const handleLike = async () => {
    try {
      await axios.put(`/api/ratings/${ratingId}`, { score: rating.score + 1 }); // Replace '/api/ratings' with your actual API endpoint
      setRating({ ...rating, score: rating.score + 1 });
      setIsLiked(true);
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  return (
    <div>
      <h1>Rating Details</h1>
      {rating ? (
        <div>
          <p>Rating ID: {rating._id}</p>
          <p>Score: {rating.score}</p>
          <button onClick={handleLike} disabled={isLiked}>Like</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RatingPage;
