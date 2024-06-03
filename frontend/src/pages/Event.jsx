import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router for routing
import axios from 'axios';

function EventPage() {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams(); // Accessing event ID from URL parameters

  useEffect(() => {
    fetchEventById();
  }, [eventId]);

  const fetchEventById = async () => {
    try {
      const response = await axios.get(`/api/events/${eventId}`); // Replace '/api/events' with your actual API endpoint
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  return (
    <div>
      <h1>Event Details</h1>
      {event ? (
        <div>
          <p>Event ID: {event._id}</p>
          <p>Start Time: {event.startTime}</p>
          <p>End Time: {event.endTime}</p>
          <p>Attraction ID: {event.attractionId}</p>
          <p>Description: {event.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EventPage;
