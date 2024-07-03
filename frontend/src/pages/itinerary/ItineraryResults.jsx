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
      <h1 className="text-2xl font-bold mb-4">All Itineraries</h1>
      <ul className="flex flex-wrap justify-between list-none p-0">
        {itineraries.map((itinerary) => (
          <li
            key={itinerary._id}
            className="flex-1 basis-[calc(30%-1.5rem)] m-3 cursor-pointer"
            onClick={(e) => handleItineraryClick(e, itinerary)}
          >
            <div className="h-64 flex flex-col justify-center items-center bg-white rounded-lg border-5 border-white p-4">
              <h2 className="text-xl font-semibold mb-2">{itinerary.title}</h2>
              <div className="space-y-2">
                <p>Name: {itinerary.name}</p>
                <p>Start Time: {itinerary.startTime}</p>
                <p>End Time: {itinerary.endTime}</p>
              </div>
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
