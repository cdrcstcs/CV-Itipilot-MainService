// ItinerariesPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItinerariesPage = () => {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get('YOUR_MONGODB_ATLAS_ENDPOINT');
        setItineraries(response.data);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      }
    };

    fetchItineraries();
  }, []);

  const handleDeleteItinerary = async (itineraryId) => {
    try {
      await axios.delete(`YOUR_MONGODB_ATLAS_ENDPOINT/${itineraryId}`);
      // Optionally, you can update the itineraries state to reflect the deletion
    } catch (error) {
      console.error('Error deleting itinerary:', error);
    }
  };

  const handleEditItinerary = (itineraryId) => {
    // Implement your logic for editing the itinerary
    console.log('Editing itinerary:', itineraryId);
  };

  return (
    <div>
      <h1>All Itineraries</h1>
      <ul>
        {itineraries.map(itinerary => (
          <li key={itinerary._id}>
            <h2>{itinerary.title}</h2>
            <p>Name: {itinerary.name}</p>
            <p>User ID: {itinerary.userId}</p>
            <p>Start Time: {itinerary.startTime}</p>
            <p>End Time: {itinerary.endTime}</p>
            <button onClick={() => handleDeleteItinerary(itinerary._id)}>Delete</button>
            <button onClick={() => handleEditItinerary(itinerary._id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItinerariesPage;
