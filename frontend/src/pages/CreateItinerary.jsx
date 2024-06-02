// CreateItineraryPage.jsx
import { useState } from "react";
import axios from "axios";
import EventSelectionComponent from "./EventSelectionComponent";

export default function CreateItineraryPage() {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [itineraryFormData, setItineraryFormData] = useState({
    title: "",
    name: "",
    startTime: "",
    endTime: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItineraryFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectEvent = (eventId) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...itineraryFormData,
        eventIds: selectedEvents
      };
      await axios.post("/itinerary", payload);
      console.log("Itinerary created successfully!");
    } catch (error) {
      console.error("Error creating itinerary:", error);
    }
  };

  return (
    <div>
      <h1>Create Itinerary</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={itineraryFormData.title} onChange={handleChange} />
        <input type="text" name="name" value={itineraryFormData.name} onChange={handleChange} />
        <input type="datetime-local" name="startTime" value={itineraryFormData.startTime} onChange={handleChange} />
        <input type="datetime-local" name="endTime" value={itineraryFormData.endTime} onChange={handleChange} />
        <EventSelectionComponent
          events={events}
          selectedEvents={selectedEvents}
          onSelectEvent={handleSelectEvent}
        />
        <button type="submit">Create Itinerary</button>
      </form>
    </div>
  );
}
