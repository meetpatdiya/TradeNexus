import React from "react";
import "./Registration.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setconfirmError] = useState("");
  const [eye, setEye] = useState(true);
  const [eye2, setEye2] = useState(true);
  const { role } = useParams();
  const handleRegister = async (e) => {
    e.preventDefault();
    let isValid = true;
    if (formData.name.length < 6) {
      setNameError("Name should be greater than 6 characters");
      isValid = false;
    } else setNameError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError("Invalid Email Format");
      isValid = false;
    } else setEmailError("");

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError("Password must contain letters, numbers & 8 chars");
      isValid = false;
    } else setPasswordError("");

    if (!formData.confirm) {
      setconfirmError("Confirm password must not be empty");
      isValid = false;
    } else if (formData.confirm !== formData.password) {
      setconfirmError("Passwords do not match");
      isValid = false;
    } else setconfirmError("");

    if (!isValid) return;

    try {
      await axios.post("http://localhost:5000/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role,
      });
      // alert("Posted successfully");
      setFormData({ name: "", email: "", password: "", confirm: "" });
    } catch (err) {
      if (err.response?.status === 409) {
        setEmailError("Email Already Exists");
      }
      console.error(err);
    }
    // console.log(formData);
  };
  const formDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <div class="regi-wrapper">
        <div class="regi-card">
          <h1 class="regi-title">Create Account</h1>
          <p class="regi-subtitle">
            Create your account to securely access our trading platform.
          </p>
          <form class="regi-form" method="POST">
            <div class="regi-field">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your Name"
                name="name"
                value={formData.name}
                onChange={(e) => formDataChange(e)}
              />
              <p className="regi-error regi-name">{nameError}</p>
            </div>

            <div class="regi-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={(e) => formDataChange(e)}
              />
              <p className="regi-error regi-email">{emailError}</p>
            </div>
            <div class="regi-field regi-password">
              <label>Password</label>
              <input
                type={eye ? "password" : "text"}
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={(e) => formDataChange(e)}
              />
              <p className="regi-error regi-email">{passwordError}</p>
              <span class="regi-eye" onClick={() => setEye(!eye)}>
                {eye ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <div class="regi-field regi-password">
              <label>Confirm Password</label>
              <input
                type={eye2 ? "password" : "text"}
                placeholder="Confirm your password"
                name="confirm"
                value={formData.confirm}
                onChange={(e) => formDataChange(e)}
              />
              <p className="regi-error regi-email">{confirmError}</p>
              <span class="regi-eye" onClick={() => setEye2(!eye2)}>
                {eye2 ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <button
              type="submit"
              class="regi-btn"
              onClick={(e) => handleRegister(e)}
            >
              Register as {role}
            </button>
          </form>
          <p class="regi-footer">
            Already have an account?
            <Link to="/login">Login In</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Registration;
