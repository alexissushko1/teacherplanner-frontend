// EventDetails.jsx (Modal)

import React from "react";
import "../../css/EventModal.css";

export default function EventDetailsModal({ event, closeModal }) {
  const { eventName, description, eventDate } = event;

  const startDate = new Date(eventDate);
  const endDate = new Date(startDate);
  endDate.setHours(startDate.getHours() + 1);

  return (
    <div className="event-modal">
      <div className="event-modal-content">
        <h3>{event.eventName}</h3>
        <p>{event.description}</p>
        <p>
          Start:
          {startDate.toLocaleString()}
        </p>
        <p>
          End:
          {endDate.toLocaleString()}
        </p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}
