import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Habits.css";
import "../../css/HabitsModal.css";

import { useGetMyHabitsQuery } from "../../slices/habitsSlice";
// import AddHabitForm from "./AddHabitForm";
// import UpdateHabitForm from "./UpdateHabitForm";

export default function Habits() {
  const navigate = useNavigate();

  // Fetching passwords using Redux query
  const { data: habits = [], error, isLoading } = useGetMyHabitsQuery();

  const [addMyHabitModalOpen, setAddMyHabitModalOpen] = useState(false);

  const [selectedHabit, setSelectedHabit] = useState(null);
  const [updateMyHabitModalOpen, setUpdateMyHabitModalOpen] = useState(false);

  const openMyHabitModal = () => {
    setAddMyHabitModalOpen(true);
  };

  const closeAddMyHabitModal = () => {
    setAddMyHabitModalOpen(false);
  };

  const openMyUpdateHabitModal = (habit) => {
    if (habit) {
      setSelectedHabit(habit);
      setUpdateMyHabitModalOpen(true);
    } else {
      console.error("No password or missing ID.");
    }
  };

  const closeUpdateMyHabitModal = () => {
    setUpdateMyHabitModalOpen(false);
    setSelectedHabit(null);
  };

  const [habitProgress, setHabitProgress] = useState(() => {
    const saved = localStorage.getItem("habitProgress");
    return saved ? JSON.parse(saved) : {};
  });

  if (isLoading) {
    return <div>Loading habits...</div>;
  }

  if (error) {
    return <div>Error loading habits. Please try again.</div>;
  }

  const toggleProgress = (habitId, index) => {
    setHabitProgress((prev) => {
      const updated = {
        ...prev,
        [habitId]: {
          ...(prev[habitId] || {}),
          [index]: !(prev[habitId]?.[index] || false), // Toggle boolean
        },
      };

      localStorage.setItem("habitProgress", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="habits-page">
      <div className="habits-container">
        <div className="habits-header">
          <h1 className="habits-title">Habits</h1>
          <button className="add-habit-button" onClick={openMyHabitModal}>
            +
          </button>
        </div>

        <table className="habit-chart">
          <thead>
            <tr>
              <th className="habit-name-label">Name</th>
              <th className="habit-frequency-label">Frequency</th>
              <th className="habit-progress-check">Progress</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit.id}>
                <td>{habit.habitName}</td>
                <td>{habit.frequency}</td>
                <td>
                  <div className="checkbox-row">
                    {[...Array(7)].map((_, index) => {
                      const isChecked =
                        habitProgress[habit.id]?.[index] || false;

                      return (
                        <span
                          key={index}
                          className={`checkbox-star ${
                            isChecked ? "checked" : ""
                          }`}
                          onClick={() => toggleProgress(habit.id, index)}
                        >
                          {isChecked ? "⭐" : "☆"}
                        </span>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedHabit && (
          <UpdateHabitModal
            habit={selectedHabit}
            habitId={selectedHabit.id}
            closeModal={closeUpdateMyHabitModal}
            onUpdateSuccess={closeUpdateMyHabitModal}
          />
        )}

        {addMyHabitModalOpen && (
          <AddHabitForm closeModal={closeAddMyHabitModal} habitId={null} />
        )}
      </div>
    </div>
  );
}
