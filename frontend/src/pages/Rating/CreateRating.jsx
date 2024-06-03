// RatingPage.js

import React, { useState } from 'react';
import axios from 'axios';

const RatingPage = ({ onRatingCreated }) => {
  const [formData, setFormData] = useState({
    score: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value, 10) }); // Convert value to integer
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/ratings', formData);
      console.log('Rating created:', response.data);
      // Pass the newly created rating object to the callback function
      onRatingCreated(response.data);
      // Optionally, you can redirect to another page or show a success message
    } catch (error) {
      console.error('Error creating rating:', error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div>
      <h1>Create Rating</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Score:</label>
          <input type="number" name="score" value={formData.score} onChange={handleChange} required />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default RatingPage;
