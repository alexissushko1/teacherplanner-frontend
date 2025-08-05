// DeleteConfirmationModal.jsx

import React from "react";
import "../../css/DeleteToDoListModal.css";

export default function DeleteToDoListModal({ onClose, onConfirm, isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <h2>Are you sure you want to delete this to-do list?</h2>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>
            Yes, delete
          </button>
          <button className="cancel-btn" onClick={onClose}>
            No, cancel
          </button>
        </div>
      </div>
    </div>
  );
}
