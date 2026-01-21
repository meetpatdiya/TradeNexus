import React from "react";
import axios from "axios";
import { useState } from "react";
const TempRegi = () => {
  const [books, setbooks] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setbooks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    console.log("button clicked");
    try {
      await axios.post("http://localhost:5000/db", books);
      alert("posted successfully")
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div>
      <br />
      name{" "}
      <input
        type="text"
        onChange={handleChange}
        placeholder="name"
        name="name"
      />{" "}
      <br />
      email{" "}
      <input
        type="text"
        onChange={handleChange}
        placeholder="email"
        name="email"
      />{" "}
      <br />
      password{" "}
      <input
        type="text"
        onChange={handleChange}
        placeholder="password"
        name="password"
      />{" "}
      <br />
           <button onClick={(e) => handleAdd(e)}> Submit </button>
    </div>
  );
};

export default TempRegi;
