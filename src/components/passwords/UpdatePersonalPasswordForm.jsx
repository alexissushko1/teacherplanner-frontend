import React, { useState } from "react";
import toastr from "toastr";
import { useDeleteMyPersonalPasswordMutation } from "../../slices/personalPasswordsSlice";

export default function PersonalPasswordModal({
  personalPassword,
  closeModal,
}) {
  const { accountName, username, password, userId, id } = personalPassword;

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deletePersonalPassword, { isLoading, isError, isSuccess }] =
    useDeleteMyPersonalPasswordMutation();

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log(`Trying to delete password with Id: ${id}`);
      await deletePersonalPassword(id).unwrap();

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
    <div className="personalpassword-modal">
      <div className="personalpassword-modal-content">
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
