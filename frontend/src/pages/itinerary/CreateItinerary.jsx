import React, { useState } from 'react';
import axios from 'axios';
import EventListingPage from '../Event/EventsPage';
import EventPage from '../Event/EventPage';
import CreateRating from '../Rating/CreateRating';
import RatingPage from '../Rating/RatingPage';
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
        const token = useCookies.get('token');

      const response = await axios.post('http://localhost:4000/itinerary',{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      }, {
        ...formData,
        eventIds: selectedEvents.map(event => event._id), // Send only event IDs to the backend
        ratingId: rating._id,
      });
      console.log('Itinerary created:', response.data);
      // Optionally, you can redirect to another page or show a success message
    } catch (error) {
      console.error('Error creating itinerary:', error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div>
      <h1>Create Itinerary</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Start Time:</label>
          <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required />
        </div>
        <div>
          <label>End Time:</label>
          <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required />
        </div>
        <EventListingPage onSelectEvents={handleSelectEvents} />
        {selectedEvents && selectedEvents.map((event)=>{
            <EventPage eventId={event._id}></EventPage>
        })}
        <CreateRating onRatingCreated={handleCreateRating}></CreateRating>
        {rating && <RatingPage ratingId={rating._id}></RatingPage>}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateItineraryPage;
