
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const SingleImage = ({imageId}) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try {
      const response = await axios.get(`/images/${imageId}`);
      setImage(response.data);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  return (
    <div>
      <h1>Single Image</h1>
      {image ? (
        <div>
          <img src={`/uploads/${image.filename}`} alt={image.filename} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};