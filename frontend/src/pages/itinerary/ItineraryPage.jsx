import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserPage from '../User/UserPage';
import RatingPage from '../Rating/RatingPage';
import { useCookies } from '../../Cookies';

const ItinerariesPage = () => {
  const [itineraries, setItineraries] = useState([]);
  const [editedItinerary, setEditedItinerary] = useState(null);
  const cookie = useCookies();

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
        const token = cookie.get('token');

      const response = await axios.get('http://localhost:4000/itinerary',{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      setItineraries(response.data);
    } catch (error) {
      console.error('Error fetching itineraries:', error);
    }
  };

  const handleDeleteItinerary = async (itineraryId) => {
    try {
        const token = cookie.get('token');

      await axios.delete(`http://localhost:4000/itinerary/${itineraryId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      // Optionally, you can update the itineraries state to reflect the deletion
    } catch (error) {
      console.error('Error deleting itinerary:', error);
    }
  };

  const handleEditItinerary = (itinerary) => {
    setEditedItinerary(itinerary);
  };

  const handleSaveEdit = async (itineraryId) => {
    try {
        const token = cookie.get('token');

      await axios.put(`http://localhost:4000/itinerary/${itineraryId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      }, editedItinerary);
      setEditedItinerary(null);
      // Optionally, you can update the itineraries state to reflect the changes
    } catch (error) {
      console.error('Error editing itinerary:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItinerary({ ...editedItinerary, [name]: value });
  };

  return (
    <div>
      <h1>All Itineraries</h1>
      <ul>
        {itineraries.map((itinerary) => (
          <li key={itinerary._id}>
            {editedItinerary && editedItinerary._id === itinerary._id ? (
              <div>
                <input
                  type="text"
                  name="title"
                  value={editedItinerary.title}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="name"
                  value={editedItinerary.name}
                  onChange={handleChange}
                />
                <input
                  type="datetime-local"
                  name="startTime"
                  value={editedItinerary.startTime}
                  onChange={handleChange}
                />
                <input
                  type="datetime-local"
                  name="endTime"
                  value={editedItinerary.endTime}
                  onChange={handleChange}
                />
                <UserPage userId = {itinerary._id}></UserPage>
                <RatingPage ratingId={itinerary.ratingId}></RatingPage>
                {/* Include input fields for other itinerary properties */}
                <button onClick={() => handleSaveEdit(itinerary._id)}>Save</button>
              </div>
            ) : (
              <div>
                <h2>{itinerary.title}</h2>
                <p>Name: {itinerary.name}</p>
                <p>User ID: {itinerary.userId}</p>
                <p>Start Time: {itinerary.startTime}</p>
                <p>End Time: {itinerary.endTime}</p>
                <UserPage userId = {itinerary._id}></UserPage>
                <RatingPage ratingId={itinerary.ratingId}></RatingPage>                
                <button onClick={() => handleDeleteItinerary(itinerary._id)}>Delete</button>
                <button onClick={() => handleEditItinerary(itinerary)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItinerariesPage;
