import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="cl-n-navbar">
      <div className="cl-n-logo">
        <Link to="/">TradeNexus</Link>
      </div>

      <div className="cl-n-actions">
        <Link to="/login" className="cl-n-login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
