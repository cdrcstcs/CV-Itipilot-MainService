import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItineraryListPage() {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    // Fetch all itineraries from the backend API
    axios.get('/itinerary')
      .then(response => {
        setItineraries(response.data);
      })
      .catch(error => {
        console.error('Error fetching itineraries:', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Itinerary List</h1>
      {itineraries.length === 0 ? (
        <p>No itineraries found.</p>
      ) : (
        itineraries.map(itinerary => (
          <div key={itinerary._id} className="mb-4">
            <h2 className="text-xl font-semibold">{itinerary.title}</h2>
            <p className="text-gray-500">Name: {itinerary.name}</p>
            <p className="text-gray-500">Start Time: {itinerary.startTime}</p>
            <p className="text-gray-500">End Time: {itinerary.endTime}</p>
            <h3 className="text-lg font-semibold mt-2">Events:</h3>
            {itinerary.eventIds.length === 0 ? (
              <p>No events in this itinerary.</p>
            ) : (
              itinerary.eventIds.map(eventId => (
                <div key={eventId}>
                  {/* Fetch event details from the backend API and display them */}
                  {/* Example: <p>{event.title}</p> */}
                </div>
              ))
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ItineraryListPage;
