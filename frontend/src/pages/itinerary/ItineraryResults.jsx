import React, { useState} from 'react';
import ItineraryDetailsPage from './ItineraryDetails';
const ItineraryResultsPage = ({itineraries}) => {
  const [selectedItinerary, setSelectedItinerary] = useState(null);
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
      <ul style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', listStyleType: 'none', padding: '0' }}>
        {itineraries.map((itinerary) => (
          <li key={itinerary._id} style={{ flex: '0 0 calc(30% - 60px)', margin: '15px', width: '30%' }}>
            <div style={{ alignItems:'center', borderRadius:'10px', border: '5px solid white', padding: '10px', cursor: 'pointer' }} onClick={(e) => handleItineraryClick(e,itinerary)}>
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
export default ItineraryResultsPage;
