import React, { useState } from "react";
import "./Settings.css";
import Logout from "./Logout";
import axios from "axios";

const Settings = ({ onClose }) => {
  const [change, setchange] = useState("");
  const [value, setValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");
  const [message, setmessage] = useState("");

  const updateCredentials = async (getData) => {
    try {
      const { data } = await axios.put(
        "http://localhost:5000/updatecredentials",
        { type: change, data: getData },
        { withCredentials: true }
      );
      console.log(data);
      setValue("");
      setConfirmValue("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (!value || !confirmValue) {
      return setmessage("Fields cannot be empty");
    }

    if (value !== confirmValue) {
      return setmessage("Both values must match");
    }

    if (change === "name") {
      if (value.length < 8) {
        return setmessage("Name must be at least 8 characters");
      }
    }

    if (change === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value) || !emailRegex.test(confirmValue)) {
        return setmessage("Invalid email format");
      }
    }

    setmessage("");
    updateCredentials(value);
  };

  return (
    <div className="sts-overlay">
      <div className="sts-panel">

        <div className="sts-header">
          <h2 className="sts-title">Account Settings</h2>
          <button className="sts-close" onClick={onClose}>✕</button>
        </div>

        <div className="sts-actions">
          <button
            className="sts-btn"
            onClick={() => setchange("name")}
          >
            Change Name
          </button>

          <button
            className="sts-btn"
            onClick={() => setchange("email")}
          >
            Change Email
          </button>
        </div>

        {change && (
          <div className="sts-form">
            <input
              className="sts-input"
              placeholder={`Enter new ${change}`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <input
              className="sts-input"
              placeholder={`Confirm ${change}`}
              value={confirmValue}
              onChange={(e) => setConfirmValue(e.target.value)}
            />

            {message && <p className="sts-message">{message}</p>}

            <button className="sts-submit" onClick={handleSubmit}>
              Update
            </button>
          </div>
        )}

        <div className="sts-divider"></div>

        <div className="sts-logout">
          <Logout />
        </div>

      </div>
    </div>
  );
};

export default Settings;