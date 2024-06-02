import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItineraryHistoryPage() {
  const [itineraryHistory, setItineraryHistory] = useState([]);

  useEffect(() => {
    // Fetch the user's itinerary history from the backend API
    axios.get('/itinerary/history')
      .then(response => {
        setItineraryHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching itinerary history:', error);
      });
  }, []);

  const handleDeleteItinerary = (itineraryId) => {
    // Send a delete request to remove the itinerary from history
    axios.delete(`/itinerary/history/${itineraryId}`)
      .then(() => {
        // Remove the deleted itinerary from the local state
        setItineraryHistory(itineraryHistory.filter(itinerary => itinerary._id !== itineraryId));
      })
      .catch(error => {
        console.error('Error deleting itinerary:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Itinerary History</h1>
      {itineraryHistory.length === 0 ? (
        <p>No itineraries in history.</p>
      ) : (
        itineraryHistory.map(itinerary => (
          <div key={itinerary._id} className="border border-gray-300 rounded-md p-4 mb-4">
            <h2 className="text-xl font-semibold">{itinerary.title}</h2>
            <p className="text-gray-500">Name: {itinerary.name}</p>
            <p className="text-gray-500">Start Time: {itinerary.startTime}</p>
            <p className="text-gray-500">End Time: {itinerary.endTime}</p>
            <div className="mt-2">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => handleDeleteItinerary(itinerary._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ItineraryHistoryPage;
