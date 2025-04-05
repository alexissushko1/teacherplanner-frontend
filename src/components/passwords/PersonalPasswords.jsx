import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/PersonalPasswords.css";

import { useGetMyPersonalPasswordsQuery } from "../../slices/personalPasswordsSlice";
import AddPersonalPasswordForm from "./AddPersonalPasswordForm";
import PersonalPasswordModal from "./UpdatePersonalPasswordForm";

export default function PersonalPasswords() {
  const navigate = useNavigate();

  //Fetching personal passwords using Redux query hook
  const {
    data: personalPasswords = [],
    error,
    isLoading,
  } = useGetMyPersonalPasswordsQuery();

  console.log("Personal Passwords from backend: ", personalPasswords);

  console.log("Fetched events: ", personalPasswords);

  const [addMyPersonalPasswordModalOpen, setAddMyPersonalPasswordModalOpen] =
    useState(false);

  const [selectedPersonalPassword, setSelectedPersonalPassword] =
    useState(null);

  const openMyPersonalPasswordModal = () => {
    setAddMyPersonalPasswordModalOpen(true);
  };

  const closeAddMyPersonalPasswordModal = () => {
    setAddMyPersonalPasswordModalOpen(false);
  };

  const [
    updateMyPersonalPasswordModalOpen,
    setUpdateMyPersonalPasswordModalOpen,
  ] = useState(false);

  const openMyUpdatePersonalPasswordModal = (personalPassword) => {
    if (personalPassword) {
      console.log("Opening modal: ", personalPassword);
      setSelectedPersonalPassword(personalPassword);
      setUpdateMyPersonalPasswordModalOpen(true);
    } else {
      console.error("No password or missing id.");
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
      <div className="personal-passwords-header">
        <h1>Personal Passwords</h1>
      </div>
      <button onClick={openMyPersonalPasswordModal}>Add new password</button>
      <div>
        {personalPasswords.map((personalPassword) => (
          <div className="personal-password-note" key={personalPassword.id}>
            <div className="personal-password-details">
              <h2 className="personal-password-accountname">
                {personalPassword.accountName}
              </h2>
              <button
                onClick={() =>
                  openMyUpdatePersonalPasswordModal(personalPassword)
                }
              >
                Update or delete log in info
              </button>
              <div className="personal-password-description">
                <h4 className="personal-password-userId">
                  User Id: {personalPassword.userId}
                </h4>
                <h4 className="personal-password-username">
                  Username: {personalPassword.username}
                </h4>
                <h4 className="personal-password-listedpassword">
                  {personalPassword.password}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedPersonalPassword && (
        <PersonalPasswordModal
          personalPassword={selectedPersonalPassword}
          personalPasswordId={personalPasswords.id}
          closeModal={closeUpdateMyPersonalPasswordModal}
        />
      )}

      {addMyPersonalPasswordModalOpen && (
        <AddPersonalPasswordForm
          closeModal={closeAddMyPersonalPasswordModal}
          personalPasswordId={personalPasswords.id}
        />
      )}
    </div>
  );
}
