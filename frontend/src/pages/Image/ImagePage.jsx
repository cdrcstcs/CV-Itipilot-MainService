
import React, { useEffect, useState } from 'react';
import axios from '../../axiosSetUp';
import { useCookies } from '../../Cookies';

export const SingleImage = ({imageId}) => {
  const [image, setImage] = useState(null);
  const cookie = useCookies();
  useEffect(() => {
    fetchImage();
  }, []);
  const fetchImage = async () => {
    try {
      const token = cookie.get('usertoken');
      const response = await axios.get(`http://localhost:4000/images/${imageId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
      setImage(response.data.image);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {image ? (
        <div className="flex justify-center">
          <img
            src={`http://localhost:4000/${image}`}
            alt={image}
            className="max-w-full h-auto rounded-lg shadow-md"
          />
        </div>
      ) : (
        <p className="text-gray-500 text-center">Loading...</p>
      )}
    </div>
  );
};