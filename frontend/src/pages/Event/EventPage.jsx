// EventPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttractionPage from '../Attraction/AttractionPage';
import { useCookies } from '../../Cookies';

const EventPage = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [editedEvent, setEditedEvent] = useState(null);
  const cookie = useCookies();

  useEffect(() => {
    if (eventId) {
      fetchEvent(eventId);
    }
  }, [eventId]);

  const fetchEvent = async (eventId) => {
    try {
      const token = cookie.get('token');

      const response = await axios.get(`http://localhost:4000/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvent(response.data);
      setEditedEvent(null); // Reset editedEvent state when fetching a new event
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const token = cookie.get('token');

      await axios.delete(`http://localhost:4000/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Optionally, you can handle state update or redirection after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEditEvent = () => {
    // Set editedEvent state to enable editing
    setEditedEvent(event);
  };

  const handleSaveEdit = async () => {
    try {
      const token = cookie.get('token');

      await axios.put(`http://localhost:4000/events/${eventId}`, editedEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Optionally, you can handle state update or redirection after editing
      setEvent(editedEvent); // Update event state with edited data
      setEditedEvent(null);
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Event Details</h1>
      <p>Start Time: {event.startTime}</p>
      <p>End Time: {event.endTime}</p>
      <AttractionPage attractionId={event.attractionId}></AttractionPage>
      <p>Description: {event.description}</p>

      {editedEvent ? (
        <div>
          <input
            type="datetime-local"
            name="startTime"
            value={editedEvent.startTime}
            onChange={handleChange}
          />
          <input
            type="datetime-local"
            name="endTime"
            value={editedEvent.endTime}
            onChange={handleChange}
          />
          <AttractionPage attractionId={event.attractionId}></AttractionPage>
          <input
            type="text"
            name="description"
            value={editedEvent.description}
            onChange={handleChange}
          />
          <button onClick={handleSaveEdit}>Save</button>
        </div>
      ) : (
        <div>
          <button onClick={handleEditEvent}>Edit</button>
          <button onClick={handleDeleteEvent}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default EventPage;
