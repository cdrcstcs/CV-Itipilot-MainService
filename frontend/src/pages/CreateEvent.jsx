import { useState } from "react";
import axios from "axios";

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    attractionId: "" // Assuming this is required for creating an event
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/events", formData);
      // Handle success, e.g., show a success message or redirect to event list page
      console.log("Event created successfully!");
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div>
          <label htmlFor="description" className="block font-medium">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required className="border border-gray-300 rounded-md p-2 w-full h-32"></textarea>
        </div>
        <div>
          <label htmlFor="startTime" className="block font-medium">Start Time</label>
          <input type="datetime-local" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} required className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div>
          <label htmlFor="endTime" className="block font-medium">End Time</label>
          <input type="datetime-local" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} required className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div>
          <label htmlFor="attractionId" className="block font-medium">Attraction ID</label>
          <input type="text" id="attractionId" name="attractionId" value={formData.attractionId} onChange={handleChange} required className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Create Event</button>
      </form>
    </div>
  );
}
