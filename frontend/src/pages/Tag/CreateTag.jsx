// TagPage.js

import React, { useState } from 'react';
import axios from 'axios';

const TagPage = ({ onTagCreated }) => {
  const [formData, setFormData] = useState({
    value: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/tags', formData);
      console.log('Tag created:', response.data);
      // Pass the newly created tag object to the callback function
      onTagCreated(response.data);
      // Optionally, you can redirect to another page or show a success message
    } catch (error) {
      console.error('Error creating tag:', error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div>
      <h1>Create Tag</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Value:</label>
          <input type="text" name="value" value={formData.value} onChange={handleChange} required />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default TagPage;
