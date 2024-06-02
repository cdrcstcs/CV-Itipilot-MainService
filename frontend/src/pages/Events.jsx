import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../Image.jsx";

export default function EventListPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/events').then(response => {
      setEvents(response.data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {events.length > 0 && events.map(event => (
        <Link to={`/event/${event._id}`} key={event._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            <Image className="rounded-2xl object-cover aspect-square" src={event.photo} alt=""/>
          </div>
          <h2 className="font-bold">{event.title}</h2>
          <h3 className="text-sm text-gray-500">{event.description}</h3>
          <div className="mt-1">
            <span className="font-bold">{event.startTime}</span> to {event.endTime}
          </div>
        </Link>
      ))}
    </div>
  );
}
