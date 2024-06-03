// RatingListPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RatingListPage = ({ onSelectMode, onRatingsSelect }) => {
  const [ratings, setRatings] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await axios.get('http://localhost:4000/ratings');
      setRatings(response.data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const handleSelectRating = (ratingId) => {
    const selectedRating = ratings.find(rating => rating._id === ratingId);
    const ratingCopy = { ...selectedRating };
    setSelectedRatings([...selectedRatings, ratingCopy]);
  };

  const handleRemoveRating = (ratingId) => {
    setSelectedRatings(selectedRatings.filter(rating => rating._id !== ratingId));
  };

  const handlePropagateRatings = () => {
    onRatingsSelect(selectedRatings);
  };

  return (
    <div>
      <h1>All Ratings</h1>
      {onSelectMode && (
        <div>
          <h2>Selected Ratings</h2>
          <ul>
            {selectedRatings.map(rating => (
              <li key={rating._id}>
                <div>
                  <p>Score: {rating.score}</p>
                  <button onClick={() => handleRemoveRating(rating._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handlePropagateRatings}>Propagate Ratings</button>
        </div>
      )}
      <h2>All Ratings</h2>
      <ul>
        {ratings.map(rating => (
          <li key={rating._id}>
            <div>
              <p>Score: {rating.score}</p>
              {onSelectMode && <button onClick={() => handleSelectRating(rating._id)}>Select</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RatingListPage;
