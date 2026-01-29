import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="cl-n-navbar">
      <div className="cl-n-logo">
        <Link to="/">TradeNexus</Link>
      </div>

      <ul className="cl-n-links">
        <li><Link to="/markets">Markets</Link></li>
        <li><Link to="/fees">Fees</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <div className="cl-n-actions">
        <Link to="/login" className="cl-n-login">Login</Link>

        {/* <div className="cl-n-register">
          <span>Register ▾</span>
          <div className="cl-n-dropdown">
            <Link to="/register/user">User</Link>
            <Link to="/register/investor">Investor</Link>
          </div>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
