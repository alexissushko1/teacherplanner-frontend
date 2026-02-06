import React, { useState } from "react";
import toastr from "toastr";
import {
  useDeleteMyPersonalPasswordMutation,
  useUpdateMyPersonalPasswordMutation,
  useGetMyPersonalPasswordsQuery,
} from "../../slices/personalPasswordsSlice";

export default function PersonalPasswordModal({
  personalPassword,
  closeModal,
  onDeleteSuccess,
  onUpdateSuccess,
}) {
  const { accountName, username, password, userId, id } = personalPassword;

  const [editMode, setEditMode] = useState(false);
  const [newAccountName, setNewAccountName] = useState(accountName);
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState(password);
  const [newUserId, setNewUserId] = useState(userId);
  const [UpdatePersonalPassword] = useUpdateMyPersonalPasswordMutation();

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

  const handleEditClick = () => setEditMode(true);

  const handleCancelEdit = () => {
    setEditMode(false);
    setNewAccountName(accountName);
    setNewUsername(username);
    setNewPassword(password);
    setNewUserId(userId);
  };

  const handleSave = async () => {
    try {
      const result = await UpdatePersonalPassword({
        id,
        userId: newUserId,
        accountName: newAccountName,
        username: newUsername,
        password: newPassword,
      }).unwrap();
      console.log("Update result:", result);
      onUpdateSuccess?.();
      toastr.success("Password updated.");
      setEditMode(false);
      onUpdateSuccess?.();
      closeModal();
    } catch (e) {
      console.error("Error:", e);
      toastr.error("Update failed. Try again.");
    }
  };

  return (
    <div className="personalpassword-modal">
      <div className="personalpassword-modal-content">
        <div className="personalpassword-modal-header">
          <h3>
            {editMode ? (
              <label className="personal-password-name">
                Name:
                <input
                  type="text"
                  id="personal-password-name-input"
                  value={newAccountName}
                  onChange={(e) => setNewAccountName(e.target.value)}
                />
              </label>
            ) : (
              accountName
            )}
          </h3>
          {!editMode && <button onClick={handleEditClick}>Edit</button>}
        </div>
        <p>
          <label className="personal-username-label">Username: </label>
          {editMode ? (
            <input
              type="text"
              id="personal-password-name-input"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          ) : (
            username
          )}
        </p>
        <p>
          <label className="personal-password-label">Password: </label>
          {editMode ? (
            <input
              type="text"
              id="personal-password-password-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          ) : (
            password
          )}
        </p>

        <div className="modal-footer">
          {editMode ? (
            <>
              <button
                className="save-personal-password-button"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="cancel-personal-password-button"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="delete-personal-password-button"
                onClick={handleDelete}
              >
                Delete Password
              </button>
              <button
                className="close-delete-personal-password-button"
                onClick={closeModal}
              >
                Close
              </button>
            </>
          )}
        </div>
        {showConfirmDelete && (
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <p>Are you sure you want to delete this Login Info?</p>
              <button
                className="confirmation-deletion-personal-password-button"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
              <button
                className="cancel-confirmation-deletion-personal-password-button"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
