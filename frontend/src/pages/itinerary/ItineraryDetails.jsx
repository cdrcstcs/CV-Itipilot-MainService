// ItineraryDetailsPage.js
import React from 'react';
import UserPage from '../User/UserPage';
import RatingPage from '../Rating/RatingPage';
import EventPage from '../Event/EventPage';

const ItineraryDetailsPage = ({ itinerary, onClose }) => {
  return (
    <div style={{overflowY:'auto', height:'100%',position: 'absolute', top: 0, left: 0, width: '100%', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)' ,padding: '20px', borderRadius: '5px'}} onClick={onClose}>
        <h1>Itinerary: {itinerary.title}</h1>
        <p>Name: {itinerary.name}</p>
        <p>Start Time: {itinerary.startTime}</p>
        <p>End Time: {itinerary.endTime}</p>
        {itinerary.eventIds.map((eventId) => (
        <EventPage key={eventId} eventId={eventId} />
        ))}
        <UserPage userId = {itinerary.userId}></UserPage>
        <RatingPage ratingId={itinerary.ratingId}></RatingPage>    
    </div>
  );
};
export default ItineraryDetailsPage;
