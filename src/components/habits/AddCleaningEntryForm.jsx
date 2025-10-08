import React, { useState } from "react";
import toastr from "toastr";
import { useAddMyTaskMutation } from "../../slices/cleaningSlice";
import "../../css/AddTasks.css";

export default function AddCleaningEntryForm({ closeModal }) {
  const [userId, setUserId] = useState(1); // You can make this dynamic later if needed
  const [taskName, setTaskName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addTask] = useAddMyTaskMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate inputs
    if (!taskName || !frequency) {
      toastr.error("Please fill in all required fields.", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Send POST request to backend
      await addTask({
        userId,
        taskName,
        frequency,
        isCompleted,
      }).unwrap();

      toastr.success("Task added successfully!", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });

      closeModal();
    } catch (error) {
      toastr.error("Could not add task. Please try again.", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="task-modal">
      <div className="task-modal-content">
        <h3>Add New Task</h3>

        <form onSubmit={handleSubmit}>
          {/* Task Name */}
          <div className="form-group">
            <label htmlFor="taskName">Task Name:</label>
            <input
              type="text"
              id="taskName"
              className="task-name-input"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>

          {/* Frequency */}
          <div className="form-group">
            <label htmlFor="frequency">Frequency:</label>
            <select
              id="frequency"
              className="task-frequency-input"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              required
            >
              <option value="">Select frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {/* Is Completed */}
          <div className="form-group">
            <label className="task-completed-label">
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
              />
              Completed
            </label>
          </div>

          {/* Buttons */}
          <div className="form-buttons">
            <button
              type="submit"
              className="add-task-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Task"}
            </button>
            <button
              type="button"
              className="add-task-close-button"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
