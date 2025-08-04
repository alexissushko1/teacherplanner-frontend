import React, { useState } from "react";
import toastr from "toastr";
import { useAddMyToDoListMutation } from "../../slices/toDoSlice";
import ToDoLists from "./ToDoLists";

export default function AddToDoListForm({ closeModal, ToDoListId }) {
  const [userId, setUserId] = useState(1);
  const [taskName, setTaskName] = useState("");
  const [isCompleted, setIsCompleted] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addToDoList] = useAddMyToDoListMutation();

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!taskName || !isCompleted) {
      toastr.error("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Send request to add the event
      await addToDoList({ userId, taskName, isCompleted });

      // Success
      toastr.success("List added successfully!", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
      // Close modal after successful submission
      closeModal();
    } catch (error) {
      // Error handling
      toastr.error("Could not add list. Please try again.", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="todo-list-modal">
      <div className="todo-list-modal-content">
        <h3>Add To Do List</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="userId-label" htmlFor={`UserId-${ToDoListId}`}>
              User Id:
            </label>
            <input
              type="text"
              className="userId-input"
              id={`UserId-${ToDoListId}`}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label
              className="taskName-label"
              htmlFor={`taskname-${ToDoListId}`}
            >
              Task Name:{" "}
            </label>
            <input
              type="text"
              className="taskName-input"
              id={`taskName-${ToDoListId}`}
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label
              className="is-completed-label"
              htmlFor={`isCompleted-${ToDoListId}`}
            >
              {" "}
              Is Completed? :{" "}
            </label>
            <input
              className="is-completed-input"
              type="text"
              id={`isCompleted-${ToDoListId}`}
              value={isCompleted}
              onChange={(e) => setIsCompleted(e.target.value)}
              required
            />
          </div>
          <button
            className="add-todo-list-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add To Do List"}
          </button>
          <button className="add-todo-list-close-button" onClick={closeModal}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}
