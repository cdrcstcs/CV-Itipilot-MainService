import React, { useState } from 'react';
import UserPage from '../User/UserPage';
import RatingPage from '../Rating/RatingPage';
import EventPage from '../Event/EventPage';
import YourItinerariesPage from './UserItineraries';

const ItineraryDetailsPage = ({ itinerary, onClose }) => {
    const [check, setCheck] = useState(false);

    const handleTransferClick = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event propagation

        setCheck(true);
    };
    
    return (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={onClose}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Itinerary: {itinerary.title}</h1>
            <div className="space-y-4">
              <p>Name: {itinerary.name}</p>
              <p>Start Time: {itinerary.startTime}</p>
              <p>End Time: {itinerary.endTime}</p>
            </div>
            <div className="space-y-4">
              {itinerary.eventIds.map((eventId) => (
                <EventPage key={eventId} eventId={eventId} />
              ))}
            </div>
            <div className="space-y-4">
              <UserPage userId={itinerary.userId} />
              <RatingPage ratingId={itinerary.ratingId} />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
              onClick={handleTransferClick}
            >
              Save to your itineraries
            </button>
            {check && <YourItinerariesPage iti={itinerary} />}
          </div>
        </div>
      );
};

export default ItineraryDetailsPage;
