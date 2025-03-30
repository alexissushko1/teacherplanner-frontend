// EventDetails.jsx (Modal)

import React, { useState } from "react";
import "../../css/EventModal.css";
import toastr from "toastr";
import { useDeleteMyEventMutation } from "../../slices/eventsSlice";

export default function EventDetailsModal({ event, closeModal }) {
  const { eventName, description, eventDate, id } = event;

  const startDate = new Date(eventDate);
  const endDate = new Date(startDate);
  endDate.setHours(startDate.getHours() + 1);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteEvent, { isLoading, isError, isSuccess }] =
    useDeleteMyEventMutation();

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteEvent(id).unwrap();

      if (isSuccess) {
        toastr.success("Deleted", {
          positionClass: "toast-bottom-center",
          timeOut: 3000,
        });
        closeModal();

        if (onDeleteSuccess) onDeleteSuccess();
      } else if (isError) {
        toastr.error("Could not delete. Please try again.", {
          positionClass: "toast-bottom-center",
          timeOut: 3000,
        });
      }

      closeModal();

      if (onDeleteSuccess) onDeleteSuccess();
    } catch (e) {
      toastr.error("Could not delete event. Please try again", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
    }
    setShowConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

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
        <button onClick={handleDelete}>Delete Event</button>
        <button onClick={closeModal}>Close</button>

        {showConfirmDelete && (
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <p>Are you sure you want to delete this event?</p>
              <button onClick={handleConfirmDelete}>Confirm</button>
              <button onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
