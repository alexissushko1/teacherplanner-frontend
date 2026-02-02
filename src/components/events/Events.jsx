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
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestion, setSuggestion] = useState([]);

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

  console.log("Sample event:", eventsData[0]);

  const filteredEvents = eventsData.filter((event) =>
    event.eventName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formattedEvents = formatEventsForCalendar(filteredEvents);

  const suggestions = searchTerm
    ? eventsData.filter((event) =>
        `${event.eventName} ${event.description}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="events-page">
      <div className="events-header">
        <h1 className="my-events-title">My Events</h1>
        <button className="add-event-button" onClick={openMyEventModal}>
          Add New Event
        </button>
        <div className="search-container">
          <input
            id="search-events-bar"
            type="text"
            placeholder="Search Events"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
            className="search-input"
          />

          {suggestions.length > 0 && (
            <ul className="search-suggestions">
              {suggestions.map((event) => (
                <li
                  key={event.id}
                  onClick={() => {
                    setSelectedEvent(event); // Open EventModal
                    setSearchTerm(""); // Clear input
                  }}
                  className="search-suggestion-item"
                >
                  {event.eventName} —{" "}
                  {new Date(event.eventDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="calendar-container">
        <Calendar
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
