import React, { useState } from "react";
import axios from "axios";
import "./Forgot.css";
import { Link } from "react-router-dom";
import LoaderToast from "../UserSide/LoaderToast";
const Forgot = () => {
  const [email, setemail] = useState("");
  const [emailerror, setemailerror] = useState("");
  const [otperror, setotperror] = useState("");
  const [OTP, setOTP] = useState("");
  const [showsubmit, setshowsubmit] = useState(false);
  const [showpassword, setshowpassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showButton, setshowButton] = useState(false)
  const [showToast, setShowToast] = useState(false);
  const [passworderror, setpassworderror] = useState("");
  const generateOtp = async () => {
    let isvalid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      isvalid = false;
      setemailerror("Field is empty");
    } else if (!emailRegex.test(email)) {
      isvalid = false;
      setemailerror("Not valid email formate");
    } else {
      setemailerror("");
    }
    if (!isvalid) return;
    try {
      const { data } = await axios.post("http://localhost:5000/checkemail", {
        email: email,
      });
      console.log(data);
      setshowsubmit(true);
    } catch (error) {
      if (error.response.status === 404) {
        setemailerror("Email id not registered");
      } else {
        console.log(error);
      }
    }
  };
  const submitOPT = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/checkotp", {
        email: email,
        otp: OTP,
      });
      setshowpassword(true);
    } catch (error) {
      if (error.response.status === 401) {
        setotperror("Incorrect OTP");
      } else if (error.response.status === 400) {
        setotperror("OTP expired");
      } else {
        console.log(error);
      }
    }
  };
  const changePassword = async () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let isvalid = true;
    if (password == "" || confirm == "") {
      isvalid = false;
      setpassworderror("fields are empty");
    } else if (!passwordRegex.test(password) && !passwordRegex.test(confirm)) {
      setpassworderror("Password must contain letters, numbers & 8 chars");
      isvalid = false;
    } else if (password != confirm) {
      isvalid = false;
      setpassworderror("Both values must match");
    } else setpassworderror("");
    if (!isvalid) return;
    try {
      const res = await axios.post("http://localhost:5000/changepassword", {
        newPassword: password,
        email: email,
      });
      console.log(res.data);
      if (res.status === 200) {setShowToast(true),setshowButton(true)};
    } catch (error) {
      if (error.response.status === 400) {
        setpassworderror("Invalid Password formate");
      }
    }
  };
  return (
    <div className="frgt-container">
      <div className="frgt-card">
        <h2>Reset Password</h2>

        <div className="frgt-group">
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <span className="error">{emailerror}</span>
          <button onClick={generateOtp}>Get OTP</button>
        </div>

        {showsubmit && (
          <div className="frgt-group">
            <input
              type="number"
              placeholder="Enter OTP"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
            />
            <span className="error">{otperror}</span>
            <button onClick={submitOPT}>Verify OTP</button>
          </div>
        )}

        {showpassword && (
          <div className="frgt-group">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <span className="error">{passworderror}</span>
            <button onClick={changePassword}>Change Password</button>
            {showButton && (
              <Link to="/login" className="login-link">
                Go to Login →
              </Link>
            )}
          </div>
        )}
      </div>
      {showToast && (
        <LoaderToast
          type="success"
          shape="circle"
          message="Password Changed Successfully"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Forgot;
