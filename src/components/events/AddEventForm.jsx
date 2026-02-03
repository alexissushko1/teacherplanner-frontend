import React, { useState } from "react";
import toastr from "toastr";
import { useAddMyEventMutation } from "../../slices/eventsSlice";
import "../../css/AddEventModal.css";

export default function AddMyEventForm({ closeModal }) {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [userId, setUserId] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addEvent] = useAddMyEventMutation();

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate inputs
    if (!eventName || !description || !eventDate) {
      toastr.error("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      //Convert date to ISO String

      const isoDate = new Date(eventDate).toISOString();

      // Send request to add the event
      await addEvent({ userId, eventName, description, eventDate: isoDate });

      // Success
      toastr.success("Event added successfully!", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });

      // Close modal after successful submission
      closeModal();
    } catch (error) {
      // Error handling
      toastr.error("Could not add event. Please try again.", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="event-modal">
      <div className="event-modal-content">
        <h3 className="add-event-title">Add New Event</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="event-name-label" htmlFor="eventName">
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="event-description-label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="date-and-time" htmlFor="eventDate">
              {" "}
              Date & Time
            </label>
            <input
              type="datetime-local"
              id="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Event"}
          </button>
        </form>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}
