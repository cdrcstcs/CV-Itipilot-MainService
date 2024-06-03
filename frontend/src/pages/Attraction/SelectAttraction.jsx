import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttractionListPage = ({ onSelectAttraction }) => {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    fetchAttractions();
  }, []);

  const fetchAttractions = async () => {
    try {
      const response = await axios.get('http://localhost:4000/attractions');
      setAttractions(response.data);
    } catch (error) {
      console.error('Error fetching attractions:', error);
    }
  };

  const handleSelectAttraction = (attractionId) => {
    const selectedAttraction = attractions.find(attraction => attraction._id === attractionId);
    onSelectAttraction(selectedAttraction);
  };
  return (
    <div>
      <h1>All Attractions</h1>
      <h2>Select Attractions</h2>
      <ul>
        {attractions.map(attraction => (
          <li key={attraction._id}>
            <div>
              <p>Name: {attraction.name}</p>
              <p>Address: {attraction.address}</p>
              <p>City: {attraction.city}</p>
              <button onClick={() => handleSelectAttraction(attraction._id)}>Select</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttractionListPage;
