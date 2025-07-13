import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/PersonalPasswords.css";
import "../../css/PersonalPasswordsModal.css";

import { useGetMyPersonalPasswordsQuery } from "../../slices/personalPasswordsSlice";
import AddPersonalPasswordForm from "./AddPersonalPasswordForm";
import PersonalPasswordModal from "./UpdatePersonalPasswordForm";

export default function PersonalPasswords() {
  const navigate = useNavigate();

  // Fetching passwords using Redux query
  const {
    data: personalPasswords = [],
    error,
    isLoading,
  } = useGetMyPersonalPasswordsQuery();

  const [addMyPersonalPasswordModalOpen, setAddMyPersonalPasswordModalOpen] =
    useState(false);
  const [selectedPersonalPassword, setSelectedPersonalPassword] =
    useState(null);
  const [
    updateMyPersonalPasswordModalOpen,
    setUpdateMyPersonalPasswordModalOpen,
  ] = useState(false);

  const openMyPersonalPasswordModal = () => {
    setAddMyPersonalPasswordModalOpen(true);
  };

  const closeAddMyPersonalPasswordModal = () => {
    setAddMyPersonalPasswordModalOpen(false);
  };

  const openMyUpdatePersonalPasswordModal = (personalPassword) => {
    if (personalPassword) {
      setSelectedPersonalPassword(personalPassword);
      setUpdateMyPersonalPasswordModalOpen(true);
    } else {
      console.error("No password or missing ID.");
    }
  };

  const closeUpdateMyPersonalPasswordModal = () => {
    setUpdateMyPersonalPasswordModalOpen(false);
    setSelectedPersonalPassword(null);
  };

  if (isLoading) {
    return <div>Loading personal passwords...</div>;
  }

  if (error) {
    return <div>Error loading personal passwords. Please try again.</div>;
  }

  return (
    <div className="personal-passwords-page">
      <div className="personal-passwords-container">
        <div className="personal-passwords-header">
          <h1>Personal Passwords</h1>
          <button className="addButton" onClick={openMyPersonalPasswordModal}>
            Add new password
          </button>
        </div>

        <div className="personal-password-list">
          {personalPasswords.map((personalPassword) => (
            <div className="personal-password-note" key={personalPassword.id}>
              <div className="personal-password-details">
                <div className="personal-password-header">
                  <h2 className="personal-password-accountname">
                    {personalPassword.accountName}
                  </h2>
                </div>
                <div className="personal-password-description">
                  <h4 className="personal-password-userId">
                    User Id: {personalPassword.userId}
                  </h4>
                  <h4 className="personal-password-username">
                    Username: {personalPassword.username}
                  </h4>
                  <h4 className="personal-password-listedpassword">
                    Password: {personalPassword.password}
                  </h4>
                </div>
                <button
                  className="updateButton"
                  onClick={() =>
                    openMyUpdatePersonalPasswordModal(personalPassword)
                  }
                >
                  Update or delete login info
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedPersonalPassword && (
          <PersonalPasswordModal
            personalPassword={selectedPersonalPassword}
            personalPasswordId={selectedPersonalPassword.id}
            closeModal={closeUpdateMyPersonalPasswordModal}
            onUpdateSuccess={closeUpdateMyPersonalPasswordModal}
          />
        )}

        {addMyPersonalPasswordModalOpen && (
          <AddPersonalPasswordForm
            closeModal={closeAddMyPersonalPasswordModal}
            personalPasswordId={null}
          />
        )}
      </div>
    </div>
  );
}
