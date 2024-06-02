import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItineraryShowcasePage({ match }) {
  const [itinerary, setItinerary] = useState(null);
  const itineraryId = match.params.id;

  useEffect(() => {
    // Fetch the details of the chosen itinerary from the backend API
    axios.get(`/itinerary/${itineraryId}`)
      .then(response => {
        setItinerary(response.data);
      })
      .catch(error => {
        console.error('Error fetching itinerary details:', error);
      });
  }, [itineraryId]);

  if (!itinerary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{itinerary.title}</h1>
      <p className="text-gray-500">Name: {itinerary.name}</p>
      <p className="text-gray-500">Start Time: {itinerary.startTime}</p>
      <p className="text-gray-500">End Time: {itinerary.endTime}</p>
      <h2 className="text-lg font-semibold mt-4">Events:</h2>
      {itinerary.eventIds.length === 0 ? (
        <p>No events in this itinerary.</p>
      ) : (
        itinerary.eventIds.map(eventId => (
          <div key={eventId}>
            {/* Fetch and display event details from the backend API */}
            {/* Example: <p>{event.title}</p> */}
          </div>
        ))
      )}
    </div>
  );
}

export default ItineraryShowcasePage;
