// ParentComponent.jsx
import React, { useState } from "react";
import { useGetMyEventsQuery } from "../../slices/eventsSlice";
import EventDetailsModal from "./EventDetailsModal";

export default function ParentComponent() {
  const { data: events, refetch, isLoading } = useGetMyEventsQuery();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCloseModal = () => setSelectedEvent(null);

  const handleUpdateSuccess = () => {
    refetch();
  };

  const handleDeleteSuccess = () => {
    refetch();
  };

  if (isLoading) return <p>Loading events...</p>;

  return (
    <div>
      <h2>My Events</h2>
      <ul>
        {events?.map((event) => (
          <li key={event.id}>
            <strong>{event.eventName}</strong>
            <button onClick={() => setSelectedEvent(event)}>Details</button>
          </li>
        ))}
      </ul>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          closeModal={handleCloseModal}
          onUpdateSuccess={handleUpdateSuccess}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
