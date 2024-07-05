import React, { useState } from 'react';
import UserPage from '../User/UserPage';
import RatingPage from '../Rating/RatingPage';
import EventPage from '../Event/EventPage';
import SavedItinerariesPage from './SavedItineraries';
const ItineraryDetailsPage = ({ itinerary, onClose }) => {
    const [check, setCheck] = useState(false);
    console.log(itinerary);

    const handleTransferClick = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event propagation

        setCheck(true);
    };
    
    return (
        <div
          className="fixed inset-0 top-0 max-h-screen overflow-auto flex items-start justify-center bg-black bg-opacity-80 z-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 text-center relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={onClose}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
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
            {check && <SavedItinerariesPage itiId={itinerary._id} />}
          </div>
        </div>
      );
};

export default ItineraryDetailsPage;
