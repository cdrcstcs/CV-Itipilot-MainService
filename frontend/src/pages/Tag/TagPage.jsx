import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TagPage({ tagId }) {
  const [tag, setTag] = useState(null);

  useEffect(() => {
    fetchTagById();
  }, [tagId]);

  const fetchTagById = async () => {
    try {
      const response = await axios.get(`/api/tags/${tagId}`); // Replace '/api/tags' with your actual API endpoint
      setTag(response.data);
    } catch (error) {
      console.error('Error fetching tag:', error);
    }
  };

  return (
    <div>
      <h1>Tag Details</h1>
      {tag ? (
        <div>
          <p>Value: {tag.value}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TagPage;
