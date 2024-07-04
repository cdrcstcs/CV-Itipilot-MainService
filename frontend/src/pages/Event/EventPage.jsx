// EventPage.js

import React, { useState, useEffect } from 'react';
import axios from '../../axiosSetUp';
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
      const token = cookie.get('usertoken');
      console.log(eventId);
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
      const token = cookie.get('usertoken');

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
      const token = cookie.get('usertoken');

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
    <div className="bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Event Details</h1>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="w-32 font-medium">Start Time:</span>
          <p>{event.startTime}</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="w-32 font-medium">End Time:</span>
          <p>{event.endTime}</p>
        </div>
        <AttractionPage attractionId={event.attractionId}></AttractionPage>
        <div className="flex items-center space-x-4">
          <span className="w-32 font-medium">Description:</span>
          <p>{event.description}</p>
        </div>
        {editedEvent ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="w-32 font-medium">Start Time:</span>
              <input
                type="datetime-local"
                name="startTime"
                value={editedEvent.startTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <span className="w-32 font-medium">End Time:</span>
              <input
                type="datetime-local"
                name="endTime"
                value={editedEvent.endTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <AttractionPage attractionId={event.attractionId}></AttractionPage>
            <div className="flex items-center space-x-4">
              <span className="w-32 font-medium">Description:</span>
              <input
                type="text"
                name="description"
                value={editedEvent.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSaveEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <button
              onClick={handleEditEvent}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteEvent}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;
