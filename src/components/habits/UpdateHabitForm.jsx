import React, { useState } from "react";
import toastr from "toastr";
import {
  useDeleteMyHabitMutation,
  useUpdateMyHabitMutation,
  useGetMyHabitsQuery,
} from "../../slices/habitsSlice";

import "../../css/UpdateHabit.css";

export default function UpdateHabitModal({
  habit,
  closeModal,
  onDeleteSuccess,
  onUpdateSuccess,
}) {
  const { userId, habitName, frequency, goal, progress } = habit;

  const [editMode, setEditMode] = useState(false);
  const [newHabitName, setNewHabitName] = useState(habitName);
  const [newFrequency, setNewFrequency] = useState(frequency);
  const [newGoal, setNewGoal] = useState(goal);
  const [newUserId, setNewUserId] = useState(userId);
  const [newProgress, setNewProgress] = useState(progress);
  const [UpdateHabit] = useUpdateMyHabitMutation();

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteHabit, { isLoading, isError, isSuccess }] =
    useDeleteMyHabitMutation();

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log(`Trying to delete habit with Id: ${habit.id}`);
      await deleteHabit(habit.id).unwrap();

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
      toastr.error("Could not delete. Please try again", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
    }
    setShowConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleEditClick = () => setEditMode(true);

  const handleCancelEdit = () => {
    setEditMode(false);
    setNewHabitName(habitName);
    setNewFrequency(frequency);
    setNewGoal(goal);
    setNewProgress(progress);
    setNewUserId(userId);
  };

  const handleSave = async () => {
    try {
      const result = await UpdateHabit({
        id: habit.id,
        userId: newUserId,
        habitName: newHabitName,
        frequency: newFrequency,
        goal: parseInt(newGoal, 10),
        progress: parseInt(newProgress, 10),
      }).unwrap();
      console.log("Update result:", result);
      onUpdateSuccess?.();
      toastr.success("Habit updated.");
      setEditMode(false);
      onUpdateSuccess?.();
      closeModal();
    } catch (e) {
      console.error("Error:", e);
      toastr.error("Update failed. Try again.");
    }
  };

  return (
    <div className="habit-modal">
      <div className="habit-modal-content">
        <div className="habit-modal-header">
          <h3 className="update-habit-name">
            {editMode ? (
              <label className="habitName">
                Habit:
                <input
                  type="text"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                />
              </label>
            ) : (
              habitName
            )}
          </h3>
          {!editMode && (
            <button className="editHabitButton" onClick={handleEditClick}>
              Edit
            </button>
          )}
        </div>
        <p>
          <label className="habitFrequencyLabel">Frequency: </label>
          {editMode ? (
            <input
              type="text"
              className="frequencyInput"
              value={newFrequency}
              onChange={(e) => setNewFrequency(e.target.value)}
            />
          ) : (
            frequency
          )}
        </p>
        <p>
          <label className="habitGoalLabel">Goal: </label>
          {editMode ? (
            <input
              type="text"
              className="goalInput"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            />
          ) : (
            goal
          )}
        </p>
        <p>
          <label className="habitProgressLabel">Progress: </label>
          {editMode ? (
            <input
              type="text"
              className="progressInput"
              value={newProgress}
              onChange={(e) => setNewProgress(e.target.value)}
            />
          ) : (
            progress
          )}
        </p>

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
                Delete Habit
              </button>
              <button className="closeDeleteButton" onClick={closeModal}>
                Close
              </button>
            </>
          )}
        </div>
        {showConfirmDelete && (
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <p>Are you sure you want to delete this habit?</p>
              <button onClick={handleConfirmDelete}>Confirm</button>
              <button onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
