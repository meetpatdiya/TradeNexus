import React, { useState } from "react";
import "./Settings.css";
import Logout from "./Logout";
import axios from "axios";
import LoaderToast from "./LoaderToast";
const Settings = ({ onClose }) => {
  const [change, setchange] = useState("");
  const [value, setValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");
  const [message, setmessage] = useState("");
  const [oldPassword, setoldPassword] = useState("");
  const [showAlert, setshowAlert] = useState(false);
  const updateCredentials = async (getData, oldpass) => {
    try {
      const { data } = await axios.put(
        "http://localhost:5000/updatecredentials",
        { type: change, data: getData, oldPassword: oldpass },
        { withCredentials: true },
      );
      console.log(data);
      setshowAlert(true);
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

    if (change === "name" || change === "email") {
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
    if (change == "password") {
      if (oldPassword.length < 8) {
        return setmessage("Old Password must be at least 8 characters");
      }
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(value)) {
        return setmessage("Password must contain letters, numbers & 8 chars");
      }
    }
    setmessage("");
    updateCredentials(value, oldPassword);
  };

  return (
    <div className="sts-overlay">
      <div className="sts-panel">
        <div className="sts-header">
          <h2 className="sts-title">Account Settings</h2>
          <button className="sts-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="sts-actions">
          <button
            className={`sts-btn ${change === "name" ? "active" : ""}`}
            onClick={() => setchange("name")}
          >
            Change Name
          </button>

          <button
            className={`sts-btn ${change === "email" ? "active" : ""}`}
            onClick={() => setchange("email")}
          >
            Change Email
          </button>
          <button
            className={`sts-btn ${change === "password" ? "active" : ""}`}
            onClick={() => setchange("password")}
          >
            Change Password
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

            {change == "password" && (
              <div className="sts-old-pass-box">
                <input
                  value={oldPassword}
                  onChange={(e) => setoldPassword(e.target.value)}
                  className="sts-input sts-old-pass"
                  placeholder="Enter old password"
                />
              </div>
            )}

            <button className="sts-submit" onClick={handleSubmit}>
              Update
            </button>
          </div>
        )}
        <div className="sts-divider"></div>

        <div className="sts-logout">
          <Logout className={"sts-logout-btn"} />
        </div>
      </div>
      {showAlert && (
        <LoaderToast
          message={`${change} Update Successfully`}
          type="success"
          onClose={() => setshowAlert(false)}
          shape={"circle"}
        />
      )}
    </div>
  );
};

export default Settings;
