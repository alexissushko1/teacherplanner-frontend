import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddMyEventForm from "./AddEventForm";

import { useGetMyEventsQuery } from "../../slices/eventsSlice";
import EventDetailsModal from "./EventModal";

// Localizer for the calendar (using moment.js)
const localizer = momentLocalizer(moment);

export default function Events() {
  const navigate = useNavigate();

  // Fetching events using the Redux query hook
  const { data: eventsData, error, isLoading } = useGetMyEventsQuery();

  console.log("Events from backend: ", eventsData);

  // State for selected event
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addMyEventModalOpen, setAddMyEventModalOpen] = useState(false);

  console.log("fetched events: ", eventsData);

  // Format events for the calendar (convert to Date objects)
  const formatEventsForCalendar = (events) => {
    return events.map((event) => {
      const startDate = new Date(event.eventDate);
      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + 1);

      return {
        ...event,
        start: startDate,
        end: endDate,
        title: event.eventName || "Event",
      };
    });
  };

  // Handle event click on the calendar
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error loading events. Please try again later.</div>;
  }

  console.log("Formatted Events: ", formatEventsForCalendar(eventsData));

  // If events are available, render the calendar
  let content = (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={formatEventsForCalendar(eventsData)} // Use dynamic data from the backend
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleEventClick} // Event click handler
      />
    </div>
  );

  const openMyEventModal = () => {
    setAddMyEventModalOpen(true);
  };

  const closeAddMyEventModal = () => {
    setAddMyEventModalOpen(false);
  };

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>My Events</h1>
        <input type="text" placeholder="Search Events" />
        <button onClick={openMyEventModal}>Add New Event</button>
      </div>
      {content}

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          closeModal={() => setSelectedEvent(null)}
        />
      )}

      {addMyEventModalOpen && (
        <AddMyEventForm closeModal={closeAddMyEventModal} />
      )}
    </div>
  );
}
