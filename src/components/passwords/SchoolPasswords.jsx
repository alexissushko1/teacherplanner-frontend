import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetMySchoolPasswordsQuery } from "../../slices/schoolPasswordsSlice";
import AddSchoolPasswordForm from "./AddSchoolPasswordForm";
import SchoolPasswordModal from "./UpdateSchoolPasswordForm";

import "../../css/SchoolPasswords.css";
import "../../css/SchoolPasswordsModal.css";

export default function SchoolPasswords() {
  const navigate = useNavigate();

  //Fetching school passwords
  const {
    data: schoolPasswords = [],
    error,
    isLoading,
  } = useGetMySchoolPasswordsQuery();

  console.log("School passwords received from backend: ", schoolPasswords);

  const [addMySchoolPasswordModalOpen, setAddMySchoolPasswordModalOpen] =
    useState(false);

  const [selectedSchoolPassword, setSelectedSchoolPassword] = useState(null);

  const openMySchoolPasswordModal = () => {
    console.log("Opening Add School Password Modal");
    setAddMySchoolPasswordModalOpen(true);
  };

  const closeAddMySchoolPasswordModal = () => {
    setAddMySchoolPasswordModalOpen(false);
  };

  const [updateMySchoolPasswordModalOpen, setUpdateMySchoolPasswordModalOpen] =
    useState(false);

  const openMyUpdateSchoolPasswordModal = (schoolPassword) => {
    if (schoolPassword) {
      console.log("Opening modal: ", schoolPassword);
      setSelectedSchoolPassword(schoolPassword);
      setUpdateMySchoolPasswordModalOpen(true);
    } else {
      console.error("No password or missing id.");
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
      <div className="school-passwords-header">
        <h1>School Passwords</h1>
      </div>
      <button onClick={openMySchoolPasswordModal}>Add new password</button>
      <div>
        {schoolPasswords.map((schoolPassword) => (
          <div className="school-password-note" key={schoolPassword.id}>
            <div className="school-password-details">
              <h2 className="school-password-accountname">
                {schoolPassword.accountName}
              </h2>
              <button
                onClick={() => openMyUpdateSchoolPasswordModal(schoolPassword)}
              >
                Update or delete login info
              </button>
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
            </div>
          </div>
        ))}
      </div>
      {selectedSchoolPassword && (
        <SchoolPasswordModal
          schoolPassword={selectedSchoolPassword}
          schoolPasswordId={schoolPasswords.id}
          closeModal={closeUpdateMySchoolPasswordModal}
        />
      )}

      {addMySchoolPasswordModalOpen && (
        <AddSchoolPasswordForm
          closeModal={closeAddMySchoolPasswordModal}
          schoolPasswordId={schoolPasswords.id}
        />
      )}
    </div>
  );
}
