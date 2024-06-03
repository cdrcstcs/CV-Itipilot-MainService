import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const AttractionPage = ({ attractionId }) => {
  const [attraction, setAttraction] = useState(null);

  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        const response = await axios.get(`/api/attractions/${attractionId}`);
        setAttraction(response.data);
      } catch (error) {
        console.error('Error fetching attraction:', error);
      }
    };

    fetchAttraction();
  }, [attractionId]);

  const handleDeleteAttraction = async () => {
    try {
      await axios.delete(`/api/attractions/${attractionId}`);
    } catch (error) {
      console.error('Error deleting attraction:', error);
    }
  };

  const handleEditAttraction = () => {
  };

  return (
    <div>
      {attraction ? (
        <div>
          <h2>{attraction.name}</h2>
          <p>Address: {attraction.address}</p>
          <p>City: {attraction.city}</p>
          <p>X: {attraction.x}</p>
          <p>Y: {attraction.y}</p>
          <button onClick={handleDeleteAttraction}>Delete Attraction</button>
          <button onClick={handleEditAttraction}>Edit Attraction</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AttractionPage;
