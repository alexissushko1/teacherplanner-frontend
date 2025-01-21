import React from "react";
import { generateMonthGrid } from "./dateUtils"; // Assuming this function works fine
import { formatDate } from "./dateUtils"; // Assuming this function works fine

const CalendarGrid = ({ currentDate, events, onEventClick }) => {
  // Ensure currentDate is a valid Date object
  if (!(currentDate instanceof Date) || isNaN(currentDate.getTime())) {
    console.error("Invalid currentDate passed to CalendarGrid:", currentDate);
    return <div>Error: Invalid currentDate prop</div>; // Handle invalid currentDate
  }

  // Ensure events is an array (in case it's undefined or null)
  const validEvents = Array.isArray(events) ? events : [];

  const month = currentDate.getMonth(); // 0-indexed month
  const year = currentDate.getFullYear();

  // Generate the grid for the month view
  const monthGrid = generateMonthGrid(month + 1, year); // +1 because generateMonthGrid expects 1-based month

  // Function to check if an event falls on a specific day
  const getEventsForDay = (date) => {
    return validEvents.filter((event) => {
      const eventDate = new Date(event.startTime); // Ensure startTime is a valid Date object
      return eventDate.toDateString() === date.toDateString(); // Compare only the date part
    });
  };

  return (
    <div className="calendar-grid">
      {monthGrid.map((week, weekIndex) => (
        <div key={weekIndex} className="week-row">
          {week.map((day, dayIndex) => {
            if (!day) return <div key={dayIndex} className="day empty"></div>; // Skip empty days

            const eventsForDay = getEventsForDay(day); // Get events for the current day

            return (
              <div
                key={dayIndex}
                className="day"
                onClick={() => onEventClick(day)} // Trigger onEventClick when clicking a day
              >
                <div className="day-number">{day.getDate()}</div>
                {eventsForDay.length > 0 && (
                  <div className="events">
                    {eventsForDay.slice(0, 3).map((event, index) => (
                      <div key={index} className="event-item">
                        {event.eventName || "Untitled Event"}
                      </div>
                    ))}
                    {eventsForDay.length > 3 && (
                      <span>+{eventsForDay.length - 3} more</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;
