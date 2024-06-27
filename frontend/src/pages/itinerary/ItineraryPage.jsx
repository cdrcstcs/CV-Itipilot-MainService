// ItinerariesPage.js
import React, { useState, useEffect } from 'react';
import axios from '../../axiosSetUp';
import { useCookies } from '../../Cookies';
import ItineraryDetailsPage from './ItineraryDetails';
const ItinerariesPage = () => {
  const [itineraries, setItineraries] = useState([]);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const cookie = useCookies();

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
      const token = cookie.get('usertoken');
      console.log('hello'+ token);
      const response = await axios.get('http://localhost:4000/itinerary', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItineraries(response.data);
    } catch (error) {
      console.error('Error fetching itineraries:', error);
    }
  };

  const handleItineraryClick = (e, itinerary) => {
    e.preventDefault();
    setSelectedItinerary(itinerary);
    console.log(itinerary);
  };

  const handleCloseDetails = (e) => {
    e.preventDefault();
    setSelectedItinerary(null);
  };

  return (
    <div>
      <h1>All Itineraries</h1>
      <ul style={{  display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', listStyleType: 'none', padding: '0' }}>
        {itineraries.map((itinerary) => (
          <li key={itinerary._id} style={{  margin: '15px', width: '30%' }}>
            <div style={{ height: '500px',alignItems:'center', borderRadius:'10px', border: '5px solid white', padding: '10px', cursor: 'pointer' }} onClick={(e) => handleItineraryClick(e,itinerary)}>
              <h2>{itinerary.title}</h2>
              <p>Name: {itinerary.name}</p>
              <p>Start Time: {itinerary.startTime}</p>
              <p>End Time: {itinerary.endTime}</p>
            </div>
          </li>
        ))}
      </ul>
      {selectedItinerary && (
        <ItineraryDetailsPage itinerary={selectedItinerary} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default ItinerariesPage;
