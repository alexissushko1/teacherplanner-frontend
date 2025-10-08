import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Cleaning.css";
import "../../css/CleaningModal.css";

import { useGetMyTasksQuery } from "../../slices/cleaningSlice";
import AddCleaningEntryForm from "./AddCleaningEntryForm";
import UpdateTaskModal from "./UpdateCleaningEntryForm";

export default function Tasks() {
  const navigate = useNavigate();

  // Fetching tasks using Redux query
  const { data: tasks = [], error, isLoading } = useGetMyTasksQuery();

  const [addMyTaskModalOpen, setAddMyTaskModalOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [updateMyTaskModalOpen, setUpdateMyTaskModalOpen] = useState(false);

  const openMyTaskModal = () => {
    setAddMyTaskModalOpen(true);
  };

  const closeAddMyTaskModal = () => {
    setAddMyTaskModalOpen(false);
  };

  const openMyUpdateTaskModal = (task) => {
    if (task) {
      setSelectedTask(task);
      setUpdateMyTaskModalOpen(true);
    } else {
      console.error("No task or missing ID.");
    }
  };

  const closeUpdateMyTaskModal = () => {
    setUpdateMyTaskModalOpen(false);
    setSelectedTask(null);
  };

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error loading tasks. Please try again.</div>;
  }

  return (
    <div className="tasks-page">
      <div className="tasks-container">
        <div className="tasks-header">
          <h1 className="tasks-title">Tasks</h1>
          <button className="add-task-button" onClick={openMyTaskModal}>
            +
          </button>
        </div>

        <table className="task-chart">
          <thead>
            <tr>
              <th className="task-name-label">Name</th>
              <th className="task-progress-check">Completed?</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="task-row"
                onClick={() => openMyUpdateTaskModal(task)}
              >
                <td>{task.taskName}</td>
                <td>{task.isCompleted ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedTask && (
          <UpdateTaskModal
            task={selectedTask}
            taskId={selectedTask.id}
            closeModal={closeUpdateMyTaskModal}
            onUpdateSuccess={closeUpdateMyTaskModal}
          />
        )}

        {addMyTaskModalOpen && (
          <AddCleaningEntryForm
            closeModal={closeAddMyTaskModal}
            taskId={null}
          />
        )}
      </div>
    </div>
  );
}
