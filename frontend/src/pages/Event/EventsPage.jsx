import React, { useState, useEffect } from 'react';
import axios from '../../axiosSetUp';
import AttractionPage from '../Attraction/AttractionPage';
import { useCookies } from '../../Cookies';

const EventListPage = ({ onSelectEvents }) => {
  const [events, setEvents] = useState([]);
  const cookie = useCookies();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
        const token = cookie.get('usertoken');

      const response = await axios.get('http://localhost:4000/events',{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4">All Events</h1>
      <h2 className="text-xl font-semibold mb-4">Select Events</h2>
      <ul className="space-y-4">
        {events.map(event => (
          <li
            key={event._id}
            className="bg-gray-100 rounded-lg p-4 shadow-md"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="w-32 font-medium">Start Time:</span>
                <p>{event.startTime}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="w-32 font-medium">End Time:</span>
                <p>{event.endTime}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="w-32 font-medium">Description:</span>
                <p>{event.description}</p>
              </div>
              <AttractionPage attractionId={event.attractionId}></AttractionPage>
              <button
                onClick={() => handleSelectEvents(event._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Select
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventListPage;
