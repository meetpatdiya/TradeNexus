import React, { useState } from "react";
import "./Settings.css";
import Logout from "./Logout";
import axios from "axios";
const Settings = () => {

  const [change, setchange] = useState("");
  const [value, setValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");
  const [message, setmessage] = useState("");
  const updateCredentials = async (getData) => {
    try {
      const { data } = await axios.put(
        "http://localhost:5000/updatecredentials",
        { type: change, data: getData },
        { withCredentials: true },
      );
      console.log(data);
      setValue("")
      setConfirmValue("")
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
    <div>
      <button onClick={() => setchange("name")}>Change name</button>
      <button onClick={() => setchange("email")}>Change email</button>
      {change && (
        <>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <input
            value={confirmValue}
            onChange={(e) => setConfirmValue(e.target.value)}
          />
        </>
      )}
      <p>{message}</p>
      <button onClick={() => handleSubmit()}>Submit</button>
      logout
      <Logout />
    </div>
  );
};

export default Settings;
