import React, { useState } from "react";
import toastr from "toastr";
import {
  useDeleteMySchoolPasswordMutation,
  useUpdateMySchoolPasswordMutation,
  useGetMySchoolPasswordsQuery,
} from "../../slices/schoolPasswordsSlice";

import "../../css/SchoolPasswordsModal.css";

export default function SchoolPasswordModal({
  schoolPassword,
  closeModal,
  onDeleteSuccess,
  onUpdateSuccess,
}) {
  const { accountName, username, password, userId, id, isTeacher } =
    schoolPassword;

  const [editMode, setEditMode] = useState(false);
  const [newAccountName, setNewAccountName] = useState(accountName);
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState(password);
  const [newUserId, setNewUserId] = useState(userId);
  const [newIsTeacher, setNewIsTeacher] = useState(isTeacher);
  const [UpdateSchoolPassword] = useUpdateMySchoolPasswordMutation();

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

  const handleEditClick = () => setEditMode(true);

  const handleCancelEdit = () => {
    setEditMode(false);
    setNewAccountName(accountName);
    setNewUsername(username);
    setNewPassword(password);
    setNewUserId(userId);
    setNewIsTeacher(isTeacher);
  };

  const handleSave = async () => {
    try {
      const result = await UpdateSchoolPassword({
        id,
        userId: newUserId,
        accountName: newAccountName,
        username: newUsername,
        password: newPassword,
        isTeacher: newIsTeacher,
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
    <div className="schoolpassword-modal">
      <div className="schoolpassword-modal-content">
        <div className="schoolpassword-modal-header">
          <h3>
            {editMode ? (
              <label className="accountName">
                Name:
                <input
                  type="text"
                  value={newAccountName}
                  onChange={(e) => setNewAccountName(e.target.value)}
                />
              </label>
            ) : (
              accountName
            )}
          </h3>
          {!editMode && (
            <button className="editAccountButton" onClick={handleEditClick}>
              Edit
            </button>
          )}
        </div>
        <p>
          <label className="usernameLabel">Username: </label>
          {editMode ? (
            <input
              type="text"
              className="usernameInput"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          ) : (
            username
          )}
        </p>
        <p>
          <label className="passwordLabel">Password: </label>
          {editMode ? (
            <input
              type="text"
              className="passwordInput"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          ) : (
            password
          )}
        </p>
        <div className="form-group">
          <label className="teacher-confirmation">Are you a teacher? </label>
          {editMode ? (
            <div>
              <label className="isTeacherLabel">
                <input
                  type="radio"
                  id="isTeacherInput"
                  name="isTeacher"
                  value="true"
                  checked={newIsTeacher === true}
                  onChange={() => setNewIsTeacher(true)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="isTeacher"
                  value="false"
                  checked={newIsTeacher === false}
                  onChange={() => setNewIsTeacher(false)}
                />
                No
              </label>
            </div>
          ) : (
            <div>{newIsTeacher ? "Yes" : "No"}</div>
          )}
        </div>

        <div className="modal-footer">
          {editMode ? (
            <>
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-button" onClick={handleCancelEdit}>
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
              <button className="closeDeleteButton" onClick={closeModal}>
                Close
              </button>
            </>
          )}
        </div>

        {showConfirmDelete && (
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <p className="deletion-school-password-question">
                Are you sure you want to delete this Login Info?
              </p>
              <button
                className="confirmation-deletion-school-password-button"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
              <button
                className="cancel-delete-school-password-button"
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
