import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetMySchoolPasswordsQuery } from "../../slices/schoolPasswordsSlice";
import AddSchoolPasswordForm from "./AddSchoolPasswordForm";
import SchoolPasswordModal from "./UpdateSchoolPasswordForm";

import "../../css/SchoolPasswords.css";
import "../../css/SchoolPasswordsModal.css";

export default function SchoolPasswords() {
  const navigate = useNavigate();

  const {
    data: schoolPasswords = [],
    error,
    isLoading,
  } = useGetMySchoolPasswordsQuery();

  const [addMySchoolPasswordModalOpen, setAddMySchoolPasswordModalOpen] =
    useState(false);
  const [selectedSchoolPassword, setSelectedSchoolPassword] = useState(null);
  const [updateMySchoolPasswordModalOpen, setUpdateMySchoolPasswordModalOpen] =
    useState(false);

  const openMySchoolPasswordModal = () => {
    setAddMySchoolPasswordModalOpen(true);
  };

  const closeAddMySchoolPasswordModal = () => {
    setAddMySchoolPasswordModalOpen(false);
  };

  const openMyUpdateSchoolPasswordModal = (schoolPassword) => {
    if (schoolPassword) {
      setSelectedSchoolPassword(schoolPassword);
      setUpdateMySchoolPasswordModalOpen(true);
    } else {
      console.error("No password or missing ID.");
    }
  };

  const closeUpdateMySchoolPasswordModal = () => {
    setUpdateMySchoolPasswordModalOpen(false);
    setSelectedSchoolPassword(null);
  };

  if (isLoading) {
    return <div>Loading school passwords...</div>;
  }

  if (error) {
    return <div>Error loading school passwords. Please try again.</div>;
  }

  return (
    <div className="school-passwords-page">
      <div className="school-passwords-container">
        <div className="school-passwords-header">
          <h1>School Passwords</h1>
          <button className="addButton" onClick={openMySchoolPasswordModal}>
            Add new password
          </button>
        </div>

        <div className="school-password-list">
          {schoolPasswords.map((schoolPassword) => (
            <div className="school-password-note" key={schoolPassword.id}>
              <div className="school-password-details">
                <h2 className="school-password-accountname">
                  {schoolPassword.accountName}
                </h2>
                <div className="school-password-description">
                  <h4 className="school-password-userId">
                    User Id: {schoolPassword.userId}
                  </h4>
                  <h4 className="school-password-username">
                    Username: {schoolPassword.username}
                  </h4>
                  <h4 className="school-password-listedpassword">
                    Password: {schoolPassword.password}
                  </h4>
                  <h4 className="school-password-isteacher">
                    Is Teacher: {schoolPassword.isTeacher ? "Yes" : "No"}
                  </h4>
                </div>
                <button
                  className="updateButton"
                  onClick={() =>
                    openMyUpdateSchoolPasswordModal(schoolPassword)
                  }
                >
                  Update or delete login info
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedSchoolPassword && (
          <SchoolPasswordModal
            schoolPassword={selectedSchoolPassword}
            schoolPasswordId={selectedSchoolPassword.id}
            closeModal={closeUpdateMySchoolPasswordModal}
          />
        )}

        {addMySchoolPasswordModalOpen && (
          <AddSchoolPasswordForm
            closeModal={closeAddMySchoolPasswordModal}
            schoolPasswordId={null}
          />
        )}
      </div>
    </div>
  );
}
