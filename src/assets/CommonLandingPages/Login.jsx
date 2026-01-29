import "./Login.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const Registration = () => {
  const [formCheck, setformCheck] = useState({
    email: "",
    password: "",
  });
  const [eye, setEye] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const formDataChange = (e) => {
    const { name, value } = e.target;
    setformCheck((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formCheck.email)) {
      setEmailError("Invalid Email Format");
      isValid = false;
    } else setEmailError("");
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formCheck.password)) {
      setPasswordError("Password must contain letters, numbers & 8 chars");
      isValid = false;
    } else setPasswordError("");

    if (!isValid) return;

    try {
      const res = await axios.post("http://localhost:5000/login", formCheck);
      const roles = res.data.role;
      // console.log(res.data);
      // console.log(res.data.role);

      if (roles === "user") {
        try {
          const data = await axios.post("http://localhost:5000/wallet",{},{withCredentials: true,});
          console.log(data);
          navigate("/userdashboard");
        } catch (err) {
          console.log("Wallet creation failed", err);
        }
        navigate("/userdashboard");
      } 
      else if (roles === "admin"){
        navigate("/admindashboard")
      }
      else if (roles === "investor") {
        navigate("/investordashboard");
      } else {
        alert("role not defined" + res.data);
      }
      setformCheck({
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setEmailError(error.response.data.message);
        } else if (error.response.status === 401) {
          setPasswordError(error.response.data.message);
        }
      } else {
        console.log(error);
        alert("Server error");
      }
    }
  };
  return (
    <>
      <div className="login">
        <div class="login-content">
          <div class="card">
            <h1>Welcome Back</h1>
            <p class="subtitle">
              Enter your email and password to access your account
            </p>
            <form method="GET">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formCheck.email}
                onChange={(e) => formDataChange(e)}
                placeholder="Enter your email"
              />
              <p className="login-error">{emailError}</p>
              <label>Password</label>
              <div class="password-box">
                <input
                  type={eye ? "password" : "text"}
                  name="password"
                  onChange={(e) => formDataChange(e)}
                  value={formCheck.password}
                  placeholder="Enter your password"
                />
                <span class="eye" onClick={() => setEye(!eye)}>
                  {eye ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <p className="login-error">{passwordError}</p>
              <div class="options">
                <label class="remember">
                  <input type="checkbox" />{" "}
                  <span className="r">Remember me</span>
                </label>
                <a href="#">Forgot Password</a>
              </div>
              <button
                type="submit"
                className="sign-in"
                onClick={(e) => onSubmit(e)}
              >
                Sign In
              </button>
            </form>
            <p class="signup">
              Don't have an account? <Link to="/register/user">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Registration;
