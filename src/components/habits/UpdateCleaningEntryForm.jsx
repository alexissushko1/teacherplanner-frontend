import React, { useState } from "react";
import toastr from "toastr";
import {
  useDeleteMyTaskMutation,
  useUpdateMyTaskMutation,
} from "../../slices/cleaningSlice";

import "../../css/UpdateCleaning.css";

export default function UpdateTaskModal({
  task,
  closeModal,
  onDeleteSuccess,
  onUpdateSuccess,
}) {
  if (!task) return null;

  const { userId, taskName, frequency, isCompleted } = task;

  const [editMode, setEditMode] = useState(false);
  const [newTaskName, setNewTaskName] = useState(taskName);
  const [newFrequency, setNewFrequency] = useState(frequency);
  const [newIsCompleted, setNewIsCompleted] = useState(isCompleted);
  const [newUserId, setNewUserId] = useState(userId);

  const [updateTask] = useUpdateMyTaskMutation();
  const [deleteTask, { isLoading, isError, isSuccess }] =
    useDeleteMyTaskMutation();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // 🗑️ Delete
  const handleDelete = () => setShowConfirmDelete(true);

  const handleConfirmDelete = async () => {
    try {
      console.log(`Trying to delete task with Id: ${task.id}`);
      await deleteTask(task.id).unwrap();

      toastr.success("Task deleted successfully!", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });

      if (onDeleteSuccess) onDeleteSuccess();
      closeModal();
    } catch (e) {
      toastr.error("Could not delete. Please try again.", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
      console.error(e);
    }
    setShowConfirmDelete(false);
  };

  const handleCancelDelete = () => setShowConfirmDelete(false);

  // ✏️ Edit mode toggles
  const handleEditClick = () => setEditMode(true);

  const handleCancelEdit = () => {
    setEditMode(false);
    setNewTaskName(taskName);
    setNewFrequency(frequency);
    setNewIsCompleted(isCompleted);
    setNewUserId(userId);
  };

  // 💾 Save changes
  const handleSave = async () => {
    try {
      await updateTask({
        id: task.id,
        userId: newUserId,
        taskName: newTaskName,
        frequency: newFrequency,
        isCompleted: newIsCompleted,
      }).unwrap();

      toastr.success("Task updated successfully!", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });

      onUpdateSuccess?.();
      setEditMode(false);
      closeModal();
    } catch (e) {
      console.error("Error updating task:", e);
      toastr.error("Update failed. Please try again.", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
    }
  };

  return (
    <div className="task-modal">
      <div className="task-modal-content">
        <div className="task-modal-header">
          <h3 className="update-task-name">
            {editMode ? (
              <label>
                Task:
                <input
                  type="text"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                />
              </label>
            ) : (
              taskName
            )}
          </h3>

          {!editMode && (
            <button className="editTaskButton" onClick={handleEditClick}>
              Edit
            </button>
          )}
        </div>

        {/* Frequency */}
        <p>
          <label className="taskFrequencyLabel">Frequency: </label>
          {editMode ? (
            <select
              className="frequencyInput"
              value={newFrequency}
              onChange={(e) => setNewFrequency(e.target.value)}
            >
              <option value="">Select frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          ) : (
            frequency
          )}
        </p>

        {/* Is Completed */}
        <p>
          <label className="taskIsCompletedLabel">Completed: </label>
          {editMode ? (
            <input
              type="checkbox"
              checked={newIsCompleted}
              onChange={(e) => setNewIsCompleted(e.target.checked)}
            />
          ) : (
            <span>{isCompleted ? "Yes" : "No"}</span>
          )}
        </p>

        {/* Footer buttons */}
        <div className="modal-footer">
          {editMode ? (
            <>
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="deleteButton" onClick={handleDelete}>
                Delete Task
              </button>
              <button className="closeDeleteButton" onClick={closeModal}>
                Close
              </button>
            </>
          )}
        </div>

        {/* Confirm delete modal */}
        {showConfirmDelete && (
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <p>Are you sure you want to delete this task?</p>
              <button onClick={handleConfirmDelete}>Confirm</button>
              <button onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
