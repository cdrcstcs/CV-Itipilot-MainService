import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
        const token = cookie.get('Token');

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
        const token = cookie.get('Token');

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
    <div>
      <h1>Rating Details</h1>
      {rating ? (
        <div>
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
