import React, { useState } from "react";
import toastr from "toastr";
import { useAddMySchoolPasswordMutation } from "../../slices/schoolPasswordsSlice";
import SchoolPasswords from "./SchoolPasswords";

export default function AddSchoolPasswordForm({
  closeModal,
  schoolPasswordId,
}) {
  const [userId, setUserId] = useState(1);
  const [accountName, setAccountName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addSchoolPassword] = useAddMySchoolPasswordMutation();

  //Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", { userId, accountName, username, password });
    setIsSubmitting(true);

    if (!accountName || !username || !password) {
      toastr.error("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Send request to add the event
      console.log("Adding school password...");
      await addSchoolPassword({
        userId,
        accountName,
        username,
        password,
        isTeacher,
      });

      // Success
      toastr.success("Event added successfully!", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
      // Close modal after successful submission
      closeModal();
    } catch (error) {
      console.error("Error adding school password:", error);

      // Error handling
      toastr.error("Could not add event. Please try again.", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="schoolpassword-modal">
      <div className="schoolpassword-modal-content">
        <h3>Add School Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor={`accountName-${schoolPasswordId}`}>
              Account Name
            </label>
            <input
              type="text"
              id={`accountName-${schoolPasswordId}`}
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={`username-${schoolPasswordId}`}>Username</label>
            <textarea
              id={`username-${schoolPasswordId}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={`password-${schoolPasswordId}`}> Password</label>
            <textarea
              id={`password-${schoolPasswordId}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={`isTeacher-${schoolPasswordId}`}>
              Are you a teacher?
            </label>
            <input
              type="radio"
              name={`isTeacher-${schoolPasswordId}`}
              value={true}
              checked={isTeacher === true}
              onChange={() => setIsTeacher(true)} // Set isTeacher to true when selected
            />
            Yes
          </div>
          <label>
            <input
              type="radio"
              name={`isTeacher-${schoolPasswordId}`}
              value={false}
              checked={isTeacher === false}
              onChange={() => setIsTeacher(false)} // Set isTeacher to false when selected
            />
            No
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Login Info"}
          </button>
        </form>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}
