import React, { useState, useEffect } from 'react';
import axios from '../../axiosSetUp';
import UserPage from '../User/UserPage';
import RatingPage from '../Rating/RatingPage';
import { useCookies } from '../../Cookies';
import EventPage from '../Event/EventPage';
import { useLocation } from 'react-router-dom';

const YourItinerariesPage = () => {
  const [itineraries, setItineraries] = useState([]);
  const [editedItinerary, setEditedItinerary] = useState(null);
  const cookie = useCookies();
  const location = useLocation();
  useEffect(() => {
    fetchItineraries();
  }, []);
  const fetchItineraries = async () => {
    try {
        const token = cookie.get('usertoken');        
        axios.defaults.withCredentials = true;
        const response = await axios.get('http://localhost:4000/user_itinerary',{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type':'application/json'
          },
      });
      setItineraries(response.data);
    } catch (error) {
      console.error('Error fetching itineraries:', error);
    }
  };
  const handleDeleteItinerary = async (itineraryId) => {
    try {
        const token = cookie.get('usertoken');

      await axios.delete(`http://localhost:4000/user_itinerary/${itineraryId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
    } catch (error) {
      console.error('Error deleting itinerary:', error);
    }
  };
  const handleEditItinerary = (itinerary) => {
    setEditedItinerary(itinerary);
  };
  const handleSaveEdit = async (itineraryId) => {
    try {
        const token = cookie.get('usertoken');

      await axios.put(`http://localhost:4000/user_itinerary/${itineraryId}`, editedItinerary,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      setEditedItinerary(null);
    } catch (error) {
      console.error('Error editing itinerary:', error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItinerary({ ...editedItinerary, [name]: value });
  };
  return location.pathname === '/itineraries/user' ? (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Itineraries</h1>
      <ul className="flex flex-wrap justify-between list-none p-0">
        {itineraries.map((itinerary) => (
          <li
            key={itinerary._id}
            className="flex-1 basis-[calc(30%-1.5rem)] m-3 overflow-auto"
          >
            {editedItinerary && editedItinerary._id === itinerary._id ? (
              <div className="bg-white rounded-lg border-5 border-white p-4">
                <input
                  className="block w-full mb-2 border border-gray-300 rounded-md p-2"
                  type="text"
                  name="title"
                  value={editedItinerary.title}
                  onChange={handleChange}
                />
                <input
                  className="block w-full mb-2 border border-gray-300 rounded-md p-2"
                  type="text"
                  name="name"
                  value={editedItinerary.name}
                  onChange={handleChange}
                />
                <input
                  className="block w-full mb-2 border border-gray-300 rounded-md p-2"
                  type="datetime-local"
                  name="startTime"
                  value={editedItinerary.startTime}
                  onChange={handleChange}
                />
                <input
                  className="block w-full mb-2 border border-gray-300 rounded-md p-2"
                  type="datetime-local"
                  name="endTime"
                  value={editedItinerary.endTime}
                  onChange={handleChange}
                />
                <UserPage userId={itinerary.userId} />
                <RatingPage ratingId={itinerary.ratingId} />
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => handleSaveEdit(itinerary._id)}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg border-5 border-white p-4">
                <h2 className="text-xl font-semibold mb-2">Itinerary: {itinerary.title}</h2>
                <div className="space-y-2">
                  <p>Name: {itinerary.name}</p>
                  <p>Start Time: {itinerary.startTime}</p>
                  <p>End Time: {itinerary.endTime}</p>
                </div>
                {itinerary.eventIds && itinerary.eventIds.map((eventId) => (
                  <EventPage key={eventId} eventId={eventId} />
                ))}
                <div className="mt-4 space-x-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => handleDeleteItinerary(itinerary._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => handleEditItinerary(itinerary)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default YourItinerariesPage;
