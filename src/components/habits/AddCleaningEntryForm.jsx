import React, { useState } from "react";
import toastr from "toastr";
import { useAddMyTaskMutation } from "../../slices/cleaningSlice";
import "../../css/AddTasks.css";

export default function AddCleaningEntryForm({ closeModal }) {
  const [newTaskName, setNewTaskName] = useState("");
  const [newFrequency, setNewFrequency] = useState("");
  const [newIsCompleted, setNewIsCompleted] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  const [addTask] = useAddMyTaskMutation();

  // Handle adding/removing days of the week for daily tasks
  const toggleDaySelection = (day) => {
    setSelectedDays(
      (prevSelectedDays) =>
        prevSelectedDays.includes(day)
          ? prevSelectedDays.filter((d) => d !== day) // Remove day
          : [...prevSelectedDays, day] // Add day
    );
  };

  const handleSave = async () => {
    try {
      await addTask({
        taskName: newTaskName,
        frequency: newFrequency,
        isCompleted: newIsCompleted,
        selectedDays: newFrequency === "daily" ? selectedDays : [], // Only store days if it's daily
      }).unwrap();

      toastr.success("Task added successfully!", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });

      closeModal();
    } catch (e) {
      toastr.error("Failed to add task. Please try again.", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
      console.error(e);
    }
  };

  return (
    <div className="task-modal">
      <div className="task-modal-content">
        <div className="task-modal-header">
          <h3>Add New Task</h3>
        </div>

        <label>
          Task Name:
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
        </label>

        <label>
          Frequency:
          <select
            value={newFrequency}
            onChange={(e) => setNewFrequency(e.target.value)}
          >
            <option value="">Select frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>

        {/* Show day selection if daily frequency is selected */}
        {newFrequency === "daily" && (
          <div>
            <h4>Select Days of the Week:</h4>
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <label key={day}>
                <input
                  type="checkbox"
                  checked={selectedDays.includes(day)}
                  onChange={() => toggleDaySelection(day)}
                />
                {day}
              </label>
            ))}
          </div>
        )}

        <label>
          Completed:
          <input
            type="checkbox"
            checked={newIsCompleted}
            onChange={(e) => setNewIsCompleted(e.target.checked)}
          />
        </label>

        <div className="modal-footer">
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
