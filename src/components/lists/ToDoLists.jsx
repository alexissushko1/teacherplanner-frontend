import React, { useState } from "react";
import {
  useGetMyToDoListsQuery,
  useAddMyToDoListMutation,
  useUpdateMyToDoListMutation,
} from "../../slices/toDoSlice";
import ToDoList from "./ToDoList";
import "../../css/ToDoLists.css";

export default function ToDoLists() {
  const {
    data: toDoLists = [],
    error,
    isLoading,
    refetch,
  } = useGetMyToDoListsQuery();

  const [addToDoList] = useAddMyToDoListMutation();
  const [updateToDoList] = useUpdateMyToDoListMutation();

  const [addStickyNote, setAddStickyNote] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [initialTasks, setInitialTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [newStickyPosition, setNewStickyPosition] = useState({ x: 0, y: 0 });
  const [editingToDoListId, setEditingToDoListId] = useState(null);

  const handleAddButtonClick = () => {
    const x = window.innerWidth / 2 - 150; // horizontally center
    const y = window.scrollY + 250; // near top of viewport
    setNewStickyPosition({ x, y });

    setAddStickyNote(true);
    setInitialTasks([]);
    setTasks([]);
    setNewTaskName("");
    setEditingToDoListId(null);
  };

  const handleSave = async () => {
    const finalTasks = [...tasks];
    if (newTaskName.trim()) {
      finalTasks.push(newTaskName.trim());
    }

    if (!finalTasks.length || finalTasks.every((t) => t.trim() === "")) {
      alert("Please enter at least one task.");
      return;
    }

    const payload = {
      userId: 1,
      taskName: finalTasks.join("\n"),
      isCompleted: false,
    };

    try {
      if (editingToDoListId === null) {
        await addToDoList(payload).unwrap();
      } else {
        await updateToDoList({ id: editingToDoListId, ...payload }).unwrap();
      }

      // Reset state after successful save
      setAddStickyNote(false);
      setTasks([]);
      setNewTaskName("");
      setInitialTasks([]);
      setEditingToDoListId(null);
      refetch();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleCancel = () => {
    setTasks(initialTasks);
    setNewTaskName("");
    setAddStickyNote(false);
    setEditingToDoListId(null);
  };

  const handleChange = (e, index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = e.target.value;
    setTasks(updatedTasks);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const updatedTasks = [...tasks];
      updatedTasks.splice(index + 1, 0, "");
      setTasks(updatedTasks);
    }
  };

  const handleTaskInput = (e) => {
    if (e.key === "Enter" && newTaskName.trim()) {
      e.preventDefault();
      setTasks([...tasks, newTaskName.trim()]);
      setNewTaskName("");
    }
  };

  const handleEdit = (id, taskString) => {
    const splitTasks = taskString.split("\n");
    setEditingToDoListId(id);
    setTasks(splitTasks);
    setInitialTasks(splitTasks);
    setNewTaskName("");
    setAddStickyNote(true);
  };

  if (isLoading) return <div>Loading To Do Lists...</div>;
  if (error) return <div>Error loading to-do lists. Please try again.</div>;

  return (
    <div className="todolist-page">
      {/* Sticky note rendered at top-level so it's not buried in scrollable div */}
      {addStickyNote && (
        <div
          className="sticky-note"
          style={{
            position: "absolute",
            left: newStickyPosition.x,
            top: newStickyPosition.y,
            zIndex: 1000,
          }}
        >
          <div className="note-header">
            <button className="note-save-edit" onClick={handleSave}>
              Save
            </button>
            <button className="note-delete" onClick={handleCancel}>
              Cancel
            </button>
          </div>
          <div className="note-body">
            {tasks.map((task, index) => (
              <div key={index} className="task-line">
                <span className="task-symbol">○</span>
                <input
                  type="text"
                  value={task}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  placeholder="Enter task..."
                />
              </div>
            ))}
            <div className="task-line">
              <span className="task-symbol">○</span>
              <input
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onKeyDown={handleTaskInput}
                placeholder="Enter task..."
              />
            </div>
          </div>
        </div>
      )}

      <div className="todo-list-container">
        <h1 className="todo-list-header">To Do</h1>

        {!addStickyNote && (
          <button className="todoAddButton" onClick={handleAddButtonClick}>
            ➕
          </button>
        )}

        {toDoLists.map((toDoList) => (
          <div key={toDoList.id}>
            <ToDoList
              toDoList={toDoList}
              onUpdate={updateToDoList}
              onEdit={() => handleEdit(toDoList.id, toDoList.taskName)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
