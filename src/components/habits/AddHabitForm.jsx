import React, { useState } from "react";
import toastr from "toastr";
import { useAddMyHabitMutation } from "../../slices/habitsSlice";
import Habits from "./Habits";
import "../../css/AddHabits.css";

export default function AddHabitForm({ closeModal, habitId }) {
  const [userId, setUserId] = useState(1);
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [goal, setGoal] = useState("");
  const [progress, setProgress] = useState("");

  const [addHabit] = useAddMyHabitMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!habitName || !frequency || !goal) {
      toastr.error("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Send request to add the event
      await addHabit({
        userId,
        habitName,
        frequency,
        goal: parseInt(goal, 10),
        progress: parseInt(progress || "0", 10),
      });

      // Success
      toastr.success("Habit added successfully!", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
      // Close modal after successful submission
      closeModal();
    } catch (error) {
      // Error handling
      toastr.error("Could not add habit. Please try again.", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="habit-modal">
      <div className="habit-modal-content">
        <h3>Add Habit</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="habitName-label" htmlFor={`habitname-${userId}`}>
              Habit:{" "}
            </label>
            <input
              type="text"
              className="habit-name-input"
              id={`habitName-${userId}`}
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label
              className="habit-frequency-label"
              htmlFor={`frequency-${userId}`}
            >
              {" "}
              Frequency :{" "}
            </label>
            <input
              className="habit-frequency-input"
              type="text"
              id={`frequency-${userId}`}
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="habit-goal-label" htmlFor={`goal-${userId}`}>
              {" "}
              Goal :{" "}
            </label>
            <input
              className="habit-goal-input"
              type="number"
              id={`goal-${userId}`}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label
              className="habit-progress-label"
              htmlFor={`progress-${userId}`}
            >
              {" "}
              Progress :{" "}
            </label>
            <input
              className="habit-progress-input"
              type="number"
              id={`progress-${userId}`}
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              required
            />
          </div>
          <button
            className="add-habit-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Habit"}
          </button>
          <button
            className="add-habit-close-button"
            type="button"
            onClick={closeModal}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
}
