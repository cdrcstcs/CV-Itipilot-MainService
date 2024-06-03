import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttractionPage from '../Attraction/AttractionPage';

const EventListPage = ({ onSelectEvents }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSelectEvents = (eventId) => {
    const selectedEvent = events.find(event => event._id === eventId);
    onSelectEvents(prev => [...prev,selectedEvent]);
  };

  return (
    <div>
      <h1>All Events</h1>
      <h2>Select Events</h2>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <div>
              <p>Start Time: {event.startTime}</p>
              <p>End Time: {event.endTime}</p>
              <p>Description: {event.description}</p>
              <AttractionPage attractionId={event.attractionId}></AttractionPage>
              <button onClick={() => handleSelectEvents(event._id)}>Select</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventListPage;
