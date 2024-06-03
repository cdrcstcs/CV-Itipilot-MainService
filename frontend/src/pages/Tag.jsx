import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TagPage() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get('/api/tags'); // Replace '/api/tags' with your actual API endpoint
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  return (
    <div>
      <h1>Tags</h1>
      <ul>
        {tags.map(tag => (
          <li key={tag._id}>{tag.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default TagPage;
