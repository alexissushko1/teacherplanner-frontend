// EventDetailsModal.jsx
import React, { useState } from "react";
import "../../css/EventModal.css";
import toastr from "toastr";
import {
  useUpdateMyEventMutation,
  useDeleteMyEventMutation,
  useGetMyEventsQuery,
} from "../../slices/eventsSlice";

export default function EventDetailsModal({
  event,
  closeModal,
  onDeleteSuccess,
  onUpdateSuccess,
}) {
  const { eventName, description, eventDate, id } = event;

  const startDate = new Date(eventDate);
  const endDate = new Date(startDate);
  endDate.setHours(startDate.getHours() + 1);

  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(eventName);
  const [newStartDate, setNewStartDate] = useState(
    startDate.toISOString().slice(0, 16)
  );
  const [newEndDate, setNewEndDate] = useState(
    endDate.toISOString().slice(0, 16)
  );
  const [newDescription, setNewDescription] = useState(description);

  const { refetch } = useGetMyEventsQuery();

  const [updateEvent] = useUpdateMyEventMutation();
  const [deleteEvent] = useDeleteMyEventMutation();

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDelete = () => setShowConfirmDelete(true);

  const handleConfirmDelete = async () => {
    try {
      await deleteEvent(id).unwrap();
      toastr.success("Deleted event.");
      refetch();
      onDeleteSuccess?.();
      closeModal();
    } catch (e) {
      toastr.error("Could not delete event. Try again.");
    } finally {
      setShowConfirmDelete(false);
    }
  };

  const handleCancelDelete = () => setShowConfirmDelete(false);

  const handleEditClick = () => setEditMode(true);

  const handleCancelEdit = () => {
    setEditMode(false);
    setNewName(eventName);
    setNewStartDate(startDate.toISOString().slice(0, 16));
    setNewEndDate(endDate.toISOString().slice(0, 16));
    setNewDescription(description);
  };

  const handleSave = async () => {
    try {
      await updateEvent({
        id,
        eventName: newName,
        eventDate: new Date(newStartDate).toISOString(),
        endDate: new Date(newEndDate).toISOString(),
        description: newDescription,
      }).unwrap();

      onUpdateSuccess?.();
      toastr.success("Event updated.");
      setEditMode(false);
      refetch();
      closeModal();
    } catch (e) {
      toastr.error("Update failed. Try again.");
    }
  };

  return (
    <div className="event-modal">
      <div className="event-modal-content">
        <div className="modal-header">
          <h3>
            {editMode ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            ) : (
              eventName
            )}
          </h3>
          {!editMode && <button onClick={handleEditClick}>Edit</button>}
        </div>

        <p>
          {editMode ? (
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          ) : (
            description
          )}
        </p>

        <p>
          Start:{" "}
          {editMode ? (
            <input
              type="datetime-local"
              value={newStartDate}
              onChange={(e) => setNewStartDate(e.target.value)}
            />
          ) : (
            startDate.toLocaleString()
          )}
        </p>
        <p>
          End:{" "}
          {editMode ? (
            <input
              type="datetime-local"
              value={newEndDate}
              onChange={(e) => setNewEndDate(e.target.value)}
            />
          ) : (
            endDate.toLocaleString()
          )}
        </p>

        <div className="modal-footer">
          {editMode ? (
            <>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={handleDelete}>Delete Event</button>
              <button onClick={closeModal}>Close</button>
            </>
          )}
        </div>

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
