import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../css/Events.css";

import AddMyEventForm from "./AddEventForm";
import EventDetailsModal from "./EventModal";
import { useGetMyEventsQuery } from "../../slices/eventsSlice";

// Localizer for the calendar (using moment.js)
const localizer = momentLocalizer(moment);

export default function Events() {
  const navigate = useNavigate();

  // Fetch events using Redux Query
  const {
    data: eventsData = [],
    error,
    isLoading,
    refetch,
  } = useGetMyEventsQuery();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addMyEventModalOpen, setAddMyEventModalOpen] = useState(false);
  const [calendarVersion, setCalendarVersion] = useState(0); // Version to force re-render

  // Convert events to calendar format
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

  // Handle calendar event click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // Handle updates or deletions
  const handleUpdateSuccess = async () => {
    const result = await refetch();
    setCalendarVersion((prev) => prev + 1); //Force calendar re-render
  };

  // Modal control
  const openMyEventModal = () => {
    setAddMyEventModalOpen(true);
  };

  const closeAddMyEventModal = () => {
    setAddMyEventModalOpen(false);
  };

  if (isLoading) return <div>Loading events...</div>;
  if (error) return <div>Error loading events. Please try again later.</div>;

  const formattedEvents = formatEventsForCalendar(eventsData);

  return (
    <div className="events-page">
      <div className="events-header">
        <h1 className="my-events-title">My Events</h1>
        <input id="search-events-bar" type="text" placeholder="Search Events" />
        <button className="add-event-button" onClick={openMyEventModal}>
          Add New Event
        </button>
      </div>

      <div className="calendar-container">
        <Calendar
          key={calendarVersion} //Force re-render when version changes
          localizer={localizer}
          events={formattedEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleEventClick}
        />
      </div>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          closeModal={() => setSelectedEvent(null)}
          onUpdateSuccess={handleUpdateSuccess}
          onDeleteSuccess={handleUpdateSuccess}
        />
      )}

      {addMyEventModalOpen && (
        <AddMyEventForm closeModal={closeAddMyEventModal} />
      )}
    </div>
  );
}
