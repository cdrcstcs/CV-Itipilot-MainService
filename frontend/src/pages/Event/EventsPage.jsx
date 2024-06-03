// EventListPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttractionPage from '../Attraction/AttractionPage';
const EventListPage = ({ onSelectMode, onEventsSelect }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

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

  const handleSelectEvent = (eventId) => {
    const selectedEvent = events.find(event => event._id === eventId);
    const eventCopy = { ...selectedEvent };
    setSelectedEvents([...selectedEvents, eventCopy]);
  };

  const handleRemoveEvent = (eventId) => {
    setSelectedEvents(selectedEvents.filter(event => event._id !== eventId));
  };

  const handlePropagateEvents = () => {
    onEventsSelect(selectedEvents);
  };

  return (
    <div>
      <h1>All Events</h1>
      {onSelectMode && (
        <div>
          <h2>Selected Events</h2>
          <ul>
            {selectedEvents.map(event => (
              <li key={event._id}>
                <div>
                  <p>Start Time: {event.startTime}</p>
                  <p>End Time: {event.endTime}</p>
                  <p>Description: {event.description}</p>
                  <AttractionPage attractionId={event.attractionId}></AttractionPage>
                  <button onClick={() => handleRemoveEvent(event._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handlePropagateEvents}>Propagate Events</button>
        </div>
      )}
      <h2>All Events</h2>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <div>
              <p>Start Time: {event.startTime}</p>
              <p>End Time: {event.endTime}</p>
              <p>Description: {event.description}</p>
              <AttractionPage attractionId={event.attractionId}></AttractionPage>
              {onSelectMode && <button onClick={() => handleSelectEvent(event._id)}>Select</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventListPage;
