import React, { useState } from "react";
import { useGetMyTasksQuery } from "../../slices/cleaningSlice";
import UpdateCleaningEntryForm from "./UpdateCleaningEntryForm";
import AddCleaningEntryForm from "./AddCleaningEntryForm";
import "../../css/Cleaning.css";
import "../../css/AddCleaning.css";

export default function Tasks() {
  const { data: tasks = [], error, isLoading } = useGetMyTasksQuery();
  const [selectedTask, setSelectedTask] = useState(null); // for update
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // for add

  const openUpdateModal = (task) => {
    setSelectedTask(task);
  };

  const closeUpdateModal = () => {
    setSelectedTask(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks. Please try again.</div>;

  // Task frequency groups
  const dailyTasks = tasks.filter((t) => t.frequency === "daily");
  const weeklyTasks = tasks.filter((t) => t.frequency === "weekly");
  const monthlyTasks = tasks.filter((t) => t.frequency === "monthly");
  const quarterlyTasks = tasks.filter((t) => t.frequency === "quarterly");
  const yearlyTasks = tasks.filter((t) => t.frequency === "yearly");
  const noFrequencyTasks = tasks.filter((t) => !t.frequency);

  return (
    <div className="tasks-page">
      <div className="tasks-container">
        <div className="tasks-header">
          <h1 className="tasks-title">Tasks</h1>
          <button className="add-task-button" onClick={openAddModal}>
            + Add Task
          </button>
        </div>

        {/* Daily Tasks */}
        <div className="daily-task-section">
          <h4 className="daily-tasks">Daily Tasks</h4>
          <div className="days-of-week">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <div key={day} className="task-day">
                <h5>{day}</h5>
                {dailyTasks.length === 0 && noFrequencyTasks.length === 0 ? (
                  <p>No daily tasks</p>
                ) : (
                  <>
                    {dailyTasks.map((task) => (
                      <div
                        key={task.id}
                        className="task-item-inline"
                        onClick={() => openUpdateModal(task)}
                      >
                        {task.taskName}
                      </div>
                    ))}
                    {noFrequencyTasks.map((task) => (
                      <div
                        key={`nofreq-${task.id}-${day}`}
                        className="task-item-inline"
                        onClick={() => openUpdateModal(task)}
                      >
                        {task.taskName}
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Tasks */}
        <div className="weekly-task-section">
          <h4>Weekly Tasks</h4>
          <div className="weekly-container">
            {weeklyTasks.length === 0 ? (
              <p>No weekly tasks</p>
            ) : (
              weeklyTasks.map((task) => (
                <div
                  key={task.id}
                  className="weekly-task task-item-inline"
                  onClick={() => openUpdateModal(task)}
                >
                  {task.taskName}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Monthly Tasks */}
        <div className="monthly-task-section">
          <h4>Monthly Tasks</h4>
          <div className="monthly-container">
            {monthlyTasks.length === 0 ? (
              <p>No monthly tasks</p>
            ) : (
              monthlyTasks.map((task) => (
                <div
                  key={task.id}
                  className="monthly-task task-item-inline"
                  onClick={() => openUpdateModal(task)}
                >
                  {task.taskName}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quarterly Tasks */}
        <div className="quarterly-task-section">
          <h4>Quarterly Tasks</h4>
          <div className="quarterly-container">
            {quarterlyTasks.length === 0 ? (
              <p>No quarterly tasks</p>
            ) : (
              quarterlyTasks.map((task) => (
                <div
                  key={task.id}
                  className="quarterly-task task-item-inline"
                  onClick={() => openUpdateModal(task)}
                >
                  {task.taskName}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Yearly Tasks */}
        <div className="yearly-task-section">
          <h4>Yearly Tasks</h4>
          <div className="yearly-container">
            {yearlyTasks.length === 0 ? (
              <p>No yearly tasks</p>
            ) : (
              yearlyTasks.map((task) => (
                <div
                  key={task.id}
                  className="yearly-task task-item-inline"
                  onClick={() => openUpdateModal(task)}
                >
                  {task.taskName}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedTask && (
        <UpdateCleaningEntryForm
          task={selectedTask}
          closeModal={closeUpdateModal}
          onUpdateSuccess={closeUpdateModal}
          onDeleteSuccess={closeUpdateModal}
        />
      )}

      {isAddModalOpen && <AddCleaningEntryForm closeModal={closeAddModal} />}
    </div>
  );
}
