import React, { useState } from 'react';
import axios from 'axios';

const CreateRating = ({ onRatingCreated }) => {
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
      onRatingCreated(response.data);
    } catch (error) {
      console.error('Error creating rating:', error);
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
