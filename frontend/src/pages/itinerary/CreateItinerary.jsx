import React, { useState } from 'react';
import axios from '../../axiosSetUp';
import EventListingPage from '../Event/EventsPage';
import EventPage from '../Event/EventPage';
import CreateRating from '../Rating/CreateRating';
import RatingPage from '../Rating/RatingPage';
function getCookie(name) {
  const cookieRegex = new RegExp(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  const cookieMatch = document.cookie.match(cookieRegex);
  return cookieMatch ? decodeURIComponent(cookieMatch[2]) : null;
}

const CreateItineraryPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    startTime: '',
    endTime: ''
  });

  const [selectedEvents, setSelectedEvents] = useState([]);
  const [rating, onRatingCreated] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectEvents = (events) => {
    setSelectedEvents(events);
  };
  const handleCreateRating = (rating) => {
    onRatingCreated(rating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = getCookie('usertoken');
      console.log(formData);
      console.log(selectedEvents);
      console.log(rating);
      const response = await axios.post('http://localhost:4000/itinerary', {
        ...formData,
        eventIds: selectedEvents.map(event => event._id), // Send only event IDs to the backend
        ratingId: rating._id,
      },{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      console.log('Itinerary created:', response.data);
      // Optionally, you can redirect to another page or show a success message
    } catch (error) {
      console.error('Error creating itinerary:', error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Create Itinerary</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700">
              Title:
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">
              Name:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startTime" className="block font-medium text-gray-700">
              Start Time:
            </label>
            <input
              id="startTime"
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="endTime" className="block font-medium text-gray-700">
              End Time:
            </label>
            <input
              id="endTime"
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        <EventListingPage onSelectEvents={handleSelectEvents} />
        {selectedEvents &&
          selectedEvents.map((event) => (
            <EventPage key={event._id} eventId={event._id} />
          ))}
        <CreateRating onRatingCreated={handleCreateRating} />
        {rating && <RatingPage ratingId={rating._id} />}
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

export default CreateItineraryPage;
