import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import ProfileImg from "../Images/profile.svg";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>  
      <nav className="navbar">
        {/* LEFT */}
        <div className="left">
          {/* Hamburger (mobile only) */}
          <div className="menu-btn" onClick={() => setOpen(true)}>
            ☰
          </div>

          <img src={logo} alt="Logo" className="logo" />
        </div>

        {/* CENTER LINKS (DESKTOP) */}
        <ul className="nav-links">
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="portfolio">Portfolio</Link>
          </li>
          <li>
            <Link to="watchlist">Watchlist</Link>
          </li>
          <li>
            <Link to="wallet">Wallet</Link>
          </li>
          <li>
            <Link to="feedback">Feedback</Link>
          </li>
        </ul>
        <div className="search-box">
          <input type="text" placeholder="Search coins " />
        </div>
        <div className="profile">
          <img src={ProfileImg} alt="Profile" />
        </div>
      </nav>

      {/* BACKDROP (MOBILE) */}
      <div
        className={`backdrop ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      ></div>

      {/* SIDEBAR (MOBILE) */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="close-btn" onClick={() => setOpen(false)}>
          ✖
        </div>
        <ul>
          <li>
            <Link to="#">Market</Link>
          </li>
          <li>
            <Link to="#">Trade</Link>
          </li>
          <li>
            <Link to="#">Watchlist</Link>
          </li>
          <li>
            <Link to="#">Feedback</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
