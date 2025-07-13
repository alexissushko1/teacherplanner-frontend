import React, { useState } from "react";
import toastr from "toastr";
import { useAddMyPersonalPasswordMutation } from "../../slices/personalPasswordsSlice";
import PersonalPasswords from "./PersonalPasswords";
import "../../css/AddPersonalPasswordsModal.css";

export default function AddPersonalPasswordForm({
  closeModal,
  personalPasswordId,
}) {
  const [userId, setUserId] = useState(1);
  const [accountName, setAccountName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addPersonalPassword] = useAddMyPersonalPasswordMutation();

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!accountName || !username || !password) {
      toastr.error("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Send request to add the event
      await addPersonalPassword({ userId, accountName, username, password });

      // Success
      toastr.success("Event added successfully!", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
      // Close modal after successful submission
      closeModal();
    } catch (error) {
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
    <div className="personalpassword-modal">
      <div className="personalpassword-modal-content">
        <h3>Add Personal Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label
              className="accountname-label"
              htmlFor={`accountName-${personalPasswordId}`}
            >
              Account Name:
            </label>
            <input
              type="text"
              className="accountname-input"
              id={`accountName-${personalPasswordId}`}
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label
              className="username-label"
              htmlFor={`username-${personalPasswordId}`}
            >
              Username:{" "}
            </label>
            <input
              type="text"
              className="username-input"
              id={`username-${personalPasswordId}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label
              className="password-label"
              htmlFor={`password-${personalPasswordId}`}
            >
              {" "}
              Password:{" "}
            </label>
            <input
              className="password-input"
              type="text"
              id={`password-${personalPasswordId}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="add-password-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Login Info"}
          </button>
          <button className="add-password-close-button" onClick={closeModal}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}
