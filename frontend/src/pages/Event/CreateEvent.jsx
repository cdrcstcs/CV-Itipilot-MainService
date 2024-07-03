// EventPage.js

import React, { useState } from 'react';
import axios from '../../axiosSetUp';
import AttractionListPage from '../Attraction/SelectAttraction';
import AttractionPage from '../Attraction/AttractionPage';
import { useCookies } from '../../Cookies';

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    attractionId: '',
    description: ''
  });
  const cookie = useCookies();

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
        const token = cookie.get('usertoken');

      const response = await axios.post('http://localhost:4000/events',{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      } ,formData);
      console.log('Event created:', response.data);
      // Pass the newly created event object to the callback function
      // Optionally, you can redirect to another page or show a success message
    } catch (error) {
      console.error('Error creating event:', error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="w-32 font-medium">Start Time:</label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-32 font-medium">End Time:</label>
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-32 font-medium">Attraction ID:</label>
          <input
            type="text"
            name="attractionId"
            value={formData.attractionId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-32 font-medium">Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <AttractionListPage onSelectAttraction={handleSelectAttraction}></AttractionListPage>
        {selectedAttraction && <AttractionPage attractionIdId={selectedAttraction._id}></AttractionPage>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
