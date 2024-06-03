// AttractionListPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttractionListPage = ({ onSelectMode, onAttractionsSelect }) => {
  const [attractions, setAttractions] = useState([]);
  const [selectedAttractions, setSelectedAttractions] = useState([]);

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
    const attractionCopy = { ...selectedAttraction };
    setSelectedAttractions([...selectedAttractions, attractionCopy]);
  };

  const handleRemoveAttraction = (attractionId) => {
    setSelectedAttractions(selectedAttractions.filter(attraction => attraction._id !== attractionId));
  };

  const handlePropagateAttractions = () => {
    onAttractionsSelect(selectedAttractions);
  };

  return (
    <div>
      <h1>All Attractions</h1>
      {onSelectMode && (
        <div>
          <h2>Selected Attractions</h2>
          <ul>
            {selectedAttractions.map(attraction => (
              <li key={attraction._id}>
                <div>
                  <p>Name: {attraction.name}</p>
                  <p>Address: {attraction.address}</p>
                  <p>City: {attraction.city}</p>
                  <button onClick={() => handleRemoveAttraction(attraction._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handlePropagateAttractions}>Propagate Attractions</button>
        </div>
      )}
      <h2>All Attractions</h2>
      <ul>
        {attractions.map(attraction => (
          <li key={attraction._id}>
            <div>
              <p>Name: {attraction.name}</p>
              <p>Address: {attraction.address}</p>
              <p>City: {attraction.city}</p>
              {onSelectMode && <button onClick={() => handleSelectAttraction(attraction._id)}>Select</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttractionListPage;
