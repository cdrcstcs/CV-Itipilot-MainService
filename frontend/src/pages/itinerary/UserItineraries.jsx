import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserPage from '../User/UserPage';
import RatingPage from '../Rating/RatingPage';
import { useCookies } from '../../Cookies';
import EventPage from '../Event/EventPage';
import { useLocation } from 'react-router-dom';

const YourItinerariesPage = ({iti}) => {
  const [itineraries, setItineraries] = useState([]);
  const [editedItinerary, setEditedItinerary] = useState(null);
  const cookie = useCookies();
  const location = useLocation();
  const createItinerary = async () => {
    try {
        const token = cookie.get('token');
        console.log(iti);
      const response = await axios.post('http://localhost:4000/user_itinerary', iti,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      console.log('Itinerary created:', response.data);
    } catch (error) {
      console.error('Error creating itinerary:', error);
    }
  };
  
  createItinerary();
  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
        const token = cookie.get('token');
        // console.log(token);
        
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
        const token = cookie.get('token');

      await axios.delete(`http://localhost:4000/user_itinerary/${itineraryId}`,{
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

      await axios.put(`http://localhost:4000/user_itinerary/${itineraryId}`,{
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

  return location.pathname === '/itineraries/user' ? (        
    <div>
      <h1>Your Itineraries</h1>
      <ul style={{ display: 'flex', justifyContent:'space-between',flexWrap: 'wrap', listStyleType: 'none', padding: 0  }}>
        {itineraries.map((itinerary) => (
          <li key={itinerary._id} style={{ height: '1000px', overflow: 'auto', flex: '0 0 calc(30% - 60px)', margin: '15px', width:'30%'}}>
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
                <UserPage userId = {itinerary.userId}></UserPage>
                <RatingPage ratingId={itinerary.ratingId}></RatingPage>
                {/* Include input fields for other itinerary properties */}
                <button onClick={() => handleSaveEdit(itinerary._id)}>Save</button>
              </div>
            ) : (
              <div>
                <h1>Itinerary: {itinerary.title}</h1>
                <p>Name: {itinerary.name}</p>
                <p>Start Time: {itinerary.startTime}</p>
                <p>End Time: {itinerary.endTime}</p>
                {itinerary.eventIds && itinerary.eventIds.map((eventId) => (
                <EventPage key={eventId} eventId={eventId} />
                ))}
                <UserPage userId = {itinerary.userId}></UserPage>
                <RatingPage ratingId={itinerary.ratingId}></RatingPage>                
                <button onClick={() => handleDeleteItinerary(itinerary._id)}>Delete</button>
                <button onClick={() => handleEditItinerary(itinerary)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
 ) : null;
};

export default YourItinerariesPage;
