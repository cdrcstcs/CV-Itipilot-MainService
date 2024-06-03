// EventPage.js

import React, { useState } from 'react';
import axios from 'axios';
import AttractionListPage from '../Attraction/SelectAttraction';
import AttractionPage from '../Attraction/AttractionPage';
const CreateEventPage = ({ onEventCreated }) => {
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    attractionId: '',
    description: ''
  });
  const [selectedAttraction, setSelectedAttraction] = useState();
  const handleSelectAttraction = (attraction) => {
    setSelectedAttraction(attraction);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/events', formData);
      console.log('Event created:', response.data);
      // Pass the newly created event object to the callback function
      onEventCreated(response.data);
      // Optionally, you can redirect to another page or show a success message
    } catch (error) {
      console.error('Error creating event:', error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Start Time:</label>
          <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required />
        </div>
        <div>
          <label>End Time:</label>
          <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required />
        </div>
        <div>
          <label>Attraction ID:</label>
          <input type="text" name="attractionId" value={formData.attractionId} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <AttractionListPage onSelectAttraction={handleSelectAttraction}></AttractionListPage>
        {selectedAttraction && <AttractionPage attractionIdId={selectedAttraction._id}></AttractionPage>}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default EventPage;
