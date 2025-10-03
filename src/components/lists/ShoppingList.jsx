import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { useDeleteMyShoppingListMutation } from "../../slices/shoppingSlice";
import DeleteShoppingListModal from "./DeleteShoppingListModal";

export default function ShoppingList({ shoppingList, onUpdate }) {
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

  const [deleteShoppingList] = useDeleteMyShoppingListMutation();
  const nodeRef = useRef(null);

  const initialItems = shoppingList.itemName?.split("/n") || [];
  const [items, setItems] = useState(initialItems);
  const [completed, setCompleted] = useState(
    Array(initialItems.length).fill(false)
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem(`note-position-${shoppingList.id}`);
    return saved ? JSON.parse(saved) : generateRandomPosition();
  });

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleToggleEdit = () => {
    if (isEditMode) {
      const updatedItemName = items.join("\n");
      onUpdate({ id: shoppingList.id, itemName: updatedItemName });
    }
    setIsEditMode(!isEditMode);
  };

  const handleChange = (e, index) => {
    const newItems = [...items];
    newItems[index] = e.target.value;
    setItems(newItems);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, "");
      setItems(newItems);

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

  const handleDeleteConfirm = () => {
    deleteShoppingList(shoppingList.id);
    localStorage.removeItem(`note-position-${shoppingList.id}`);
    setDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  return (
    <>
      <Draggable
        nodeRef={nodeRef}
        position={position}
        onStop={(_, data) => {
          const newPosition = { x: data.x, y: data.y };
          setPosition(newPosition);
          localStorage.setItem(
            `note-position-${shoppingList.id}`,
            JSON.stringify(newPosition)
          );
        }}
      >
        <div className="shopping-note" ref={nodeRef}>
          {" "}
          <div className="note-header">
            <button className="note-save-edit" onClick={handleToggleEdit}>
              {isEditMode ? "Save" : "Edit"}
            </button>
            <button
              className="note-delete"
              onClick={() => setDeleteModalOpen(true)}
            >
              ✖
            </button>
          </div>
          <div className="note-body">
            {items.map((item, index) => (
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
                    value={item}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ) : (
                  <span className={completed[index] ? "task-done" : ""}>
                    {item}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Draggable>

      <DeleteShoppingListModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
