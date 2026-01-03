import './Login.css'
import  { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';

const Registration = () => {
  const [eye, setEye] = useState(true)
  const [loginError, setLoginError] = useState("hey there")
  const changeEye = ()=>{
    setEye(!eye)
  }
  return (
    <>
      <div className="login">
        <div class="login-content">
          <div class="card">
            <div class="logo">TradeNexus</div>
            <h1>Welcome Back</h1>
            <p class="subtitle">
              Enter your email and password to access your account
            </p>
            <form>
              <label>Email</label>
              <input type="email" placeholder="Enter your email" required />
              <label>Password</label>
              <div class="password-box">
                <input
                  type={ eye ?"password" : "text"}
                  placeholder="Enter your password"
                  required 
                />
                <span class="eye" onClick={()=> setEye(!eye)}>{ eye ?<FaEye/>:<FaEyeSlash/>}</span>
              </div>
              <p className="login-error">{loginError}</p>
              <div class="options">
                <label class="remember">
                  <input type="checkbox" /> <span className="r">Remember me</span>
                </label>
                <a href="#">Forgot Password</a>
              </div>

              <button type="submit" className="sign-in">Sign In</button>
            </form>

            <p class="signup">
              Don't have an account? <a href="#">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
