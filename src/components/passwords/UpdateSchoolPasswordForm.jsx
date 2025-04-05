import React, { useState } from "react";
import toastr from "toastr";
import { useDeleteMySchoolPasswordMutation } from "../../slices/schoolPasswordsSlice";

export default function SchoolPasswordModal({ schoolPassword, closeModal }) {
  const { accountName, username, password, userId, id } = schoolPassword;

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteSchoolPassword, { isLoading, isError, isSuccess }] =
    useDeleteMySchoolPasswordMutation();

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log(`Trying to delete password with Id: ${id}`);
      await deleteSchoolPassword(id).unwrap();

      if (isSuccess) {
        toastr.success("Deleted", {
          positionClass: "toast-bottom-center",
          timeOut: 3000,
        });
        closeModal();

        if (onDeleteSuccess) onDeleteSuccess();
      } else if (isError) {
        toastr.error("Could not delete. Please try again.", {
          positionClass: "toast-bottom-center",
          timeOut: 3000,
        });
      }

      closeModal();

      if (onDeleteSuccess) onDeleteSuccess();
    } catch (e) {
      toastr.error("Could not delete event. Please try again", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
    }
    setShowConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <div className="schoolpassword-modal">
      <div className="schoolpassword-modal-content">
        <h3>{accountName}</h3>
        <h3>{userId}</h3>
        <p>{username}</p>
        <p>{password}</p>
        <button onClick={handleDelete}>Delete Information</button>
        <button onClick={closeModal}>Close</button>

        {showConfirmDelete && (
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <p>Are you sure you want to delete this Login Info?</p>
              <button onClick={handleConfirmDelete}>Confirm</button>
              <button onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
