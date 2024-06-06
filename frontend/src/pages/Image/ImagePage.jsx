
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from '../../Cookies';

export const SingleImage = ({imageId}) => {
  const [image, setImage] = useState(null);
  const cookie = useCookies();

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try {
      const token = cookie.get('token');
      const response = await axios.get(`http://localhost:4000/images/${imageId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
      setImage(response.data[0].image);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  return (
    <div>
      <h1>Single Image</h1>
      {image ? (
        <div>
          <img src={`http://localhost/${image}`} alt={image} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};