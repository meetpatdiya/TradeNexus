import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import logo from "../Images/logo.png";
import ProfileImg from "../Images/profile.svg";
import Settings from "./Settings"
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [settings, setsettings] = useState(false)
  const handleSettings = ()=>{
    setsettings(prev=>!prev)
  }
  return (
    <>  
      <nav className="navbar">
        <div className="left">
          <div className="menu-btn" onClick={() => setOpen(true)}>
            ☰
          </div>
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <ul className="nav-links">
          <li>
            <NavLink  className={({ isActive }) => isActive ? "active" : ""} to="" end>Home</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="portfolio">Portfolio</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="analytics">Analytics</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="watchlist">Watchlist</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="wallet">Wallet</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="feedback">Feedback</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="news">News</NavLink>
          </li>
        </ul>
        <div className="profile">
          <img src={ProfileImg} onClick={()=>handleSettings()} alt="Profile" />
        </div>
      </nav>

      <div
        className={`backdrop ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      ></div>

      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="close-btn" onClick={() => setOpen(false)}>
          ✖
        </div>
        <ul>
          <li>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="#">Market</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? "active" : ""}to="#">Trade</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="#">Watchlist</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="#">Feedback</NavLink>
          </li>
        </ul>
      </div>
      {
        settings && <Settings onClose={()=>setsettings(p=>!p)}/>
      }
    </>
  );
};

export default Navbar;
