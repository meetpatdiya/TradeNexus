import React from 'react'
import './Registration.css'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react'
const Registration = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmError, setconfirmError] = useState("")
  const [eye, setEye] = useState(true)
  const [eye2, setEye2] = useState(true)
  const handleSignIn = (e) =>{
    e.preventDefault()
    if(name.length < 6){
      setNameError("Name should be greater than 6 charechters")
    }else{
      setNameError("")
    }
    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(EmailRegex.test(email) ? "" : "Invalid Email Formate")

    const passwordRegex  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    setPasswordError(passwordRegex.test(password) ? "" : "Password must include Letters , Numbers and consist of 8 charechters")

    setconfirmError(confirm ==="" ? "Confirm password must not be empty":
      confirm===password ? "" : " Confirm password must be same as Password")
  }
  const handleNameChange = (e)=>{
    setName(e.target.value)
  }
  const handleEmailChange = (e)=>{
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e)=>{
    setPassword(e.target.value)
  }
  const handleConfirmChange = (e)=>{
    setConfirm(e.target.value)
  }
  return (
    <>
       <div class="regi-wrapper">
    <div class="regi-card">

      <div class="regi-logo">
        <span>Trade Nexus</span>
      </div>

      <h1 class="regi-title">Create Account</h1>
      <p class="regi-subtitle">
        Enter your email and password to access your account
      </p>

      <form class="regi-form" method='POST'>

        <div class="regi-field">
          <label>Name</label>
          <input type="text" placeholder="Enter your Name" value={name} onChange={(e)=>handleNameChange(e)} />
          <p className='regi-error regi-name'>{nameError}</p>
        </div>

        <div class="regi-field">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>handleEmailChange(e)} />
           <p className='regi-error regi-email'>{emailError}</p>
        </div>

        <div class="regi-field regi-password">
          <label>Password</label>
          <input type={ eye ?"password" : "text"} placeholder="Enter your password" value={password} onChange={(e)=>handlePasswordChange(e)} />
          <p className='regi-error regi-email'>{passwordError}</p>
          <span class="regi-eye" onClick={()=> setEye(!eye)}>{ eye ?<FaEye/>:<FaEyeSlash/>}</span> 
        </div>

        <div class="regi-field regi-password">
          <label>Confirm Password</label>
          <input type={eye2 ?"password" : "text"} placeholder="Confirm your password" value={confirm} onChange={(e)=>handleConfirmChange(e)} />
          <p className='regi-error regi-email'>{confirmError}</p>

          <span class="regi-eye" onClick={()=> setEye2(!eye2)}>{ eye2 ?<FaEye/>:<FaEyeSlash/>}</span>
        </div>

        <button type="submit" class="regi-btn" onClick={(e)=>handleSignIn(e)}>
          Sign In
        </button> 

      </form>

      <p class="regi-footer">
        Already have an account?
        <a href="/">Login In</a>
      </p>

    </div>
  </div>

    </>
  )
}

export default Registration
