// EventSelectionComponent.jsx
import { useState } from "react";

export default function EventSelectionComponent({ events, selectedEvents, onSelectEvent }) {
  return (
    <div>
      {events.map(event => (
        <div key={event._id}>
          <input
            type="checkbox"
            checked={selectedEvents.includes(event._id)}
            onChange={() => onSelectEvent(event._id)}
          />
          <span>{event.title}</span>
        </div>
      ))}
    </div>
  );
}
