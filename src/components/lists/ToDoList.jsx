// ToDoList.jsx

import React, { useState, useRef } from "react";
import Draggable from "react-draggable"; // Import Draggable component
import { useDeleteMyToDoListMutation } from "../../slices/toDoSlice";
import DeleteToDoListModal from "./DeleteToDoListModal";

export default function ToDoList({ toDoList, onUpdate }) {
  const EXCLUSION_ZONE = {
    top: 300,
    height: 250,
    width: 300,
  };

  const generateRandomPosition = () => {
    let top, left;
    do {
      top = Math.floor(Math.random() * 200) + 100;
      left = Math.floor(Math.random() * (window.innerWidth - 350));
    } while (
      top >= EXCLUSION_ZONE.top &&
      top <= EXCLUSION_ZONE.top + EXCLUSION_ZONE.height &&
      Math.abs(left - window.innerWidth / 2) < EXCLUSION_ZONE.width / 2
    );
    return { x: left, y: top };
  };

  const [deleteToDoList] = useDeleteMyToDoListMutation();
  const nodeRef = useRef(null); // Declare nodeRef here

  const initialTasks = toDoList.taskName?.split("\n") || [];
  const [tasks, setTasks] = useState(initialTasks);
  const [completed, setCompleted] = useState(
    Array(initialTasks.length).fill(false)
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem(`note-position-${toDoList.id}`);
    return saved ? JSON.parse(saved) : generateRandomPosition();
  });

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // State to control the delete modal

  const handleToggleEdit = () => {
    if (isEditMode) {
      // When exiting edit mode, send the updated tasks to the parent for saving
      const updatedTaskName = tasks.join("\n");
      onUpdate({ id: toDoList.id, taskName: updatedTaskName });
    }
    setIsEditMode(!isEditMode);
  };

  const handleChange = (e, index) => {
    const newTasks = [...tasks];
    newTasks[index] = e.target.value;
    setTasks(newTasks);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTasks = [...tasks];
      newTasks.splice(index + 1, 0, "");
      setTasks(newTasks);

      const newCompleted = [...completed];
      newCompleted.splice(index + 1, 0, false);
      setCompleted(newCompleted);
    }
  };

  const handleCheck = (index) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    deleteToDoList(toDoList.id);
    localStorage.removeItem(`note-position-${toDoList.id}`);
    setDeleteModalOpen(false); // Close the modal after deleting
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false); // Close the modal if cancelled
  };

  return (
    <>
      <Draggable
        nodeRef={nodeRef} // Use nodeRef here
        position={position}
        onStop={(_, data) => {
          const newPosition = { x: data.x, y: data.y };
          setPosition(newPosition);
          localStorage.setItem(
            `note-position-${toDoList.id}`,
            JSON.stringify(newPosition)
          );
        }}
      >
        <div className="sticky-note" ref={nodeRef}>
          {" "}
          {/* Attach nodeRef to the sticky-note */}
          <div className="note-header">
            <button className="note-save-edit" onClick={handleToggleEdit}>
              {isEditMode ? "Save" : "Edit"}
            </button>
            <button
              className="note-delete"
              onClick={() => setDeleteModalOpen(true)} // Open the modal on click
            >
              ✖
            </button>
          </div>
          <div className="note-body">
            {tasks.map((task, index) => (
              <div key={index} className="task-line">
                <span
                  className={`task-check ${completed[index] ? "checked" : ""}`}
                  onClick={() => handleCheck(index)}
                >
                  ○
                </span>
                {isEditMode ? (
                  <input
                    type="text"
                    value={task}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ) : (
                  <span className={completed[index] ? "task-done" : ""}>
                    {task}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Draggable>

      {/* Delete Confirmation Modal */}
      <DeleteToDoListModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
