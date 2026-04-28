import { NavLink } from "react-router-dom";
import logo from "../Images/logo.png";
import ProfileImg from "../Images/profile.svg";
import "./InvestorNavbar.css";
import { useState } from "react";
import Settings from "../UserSide/Settings";
const InvestorNavbar = () => {
  const [settings, setsettings] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="in-navbar">
        <div className="in-nav-left">
          <div className="hamburger" onClick={() => setMenuOpen((p) => !p)}>
          ☰
        </div>
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className={`in-nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to={""} end onClick={() => setMenuOpen((p) => !p)}>
            Home
          </NavLink>
          <NavLink to={"wallet"} onClick={() => setMenuOpen((p) => !p)}>
            Wallet
          </NavLink>
          <NavLink to={"portfolio"} onClick={() => setMenuOpen((p) => !p)}>
            Portfolio
          </NavLink>
          <NavLink to={"analytics"} onClick={() => setMenuOpen((p) => !p)}>
            Analytics
          </NavLink>
          <NavLink to={"commission"} onClick={() => setMenuOpen((p) => !p)}>
            Commission
          </NavLink>
          <NavLink to={"news"} onClick={() => setMenuOpen((p) => !p)}>
            News
          </NavLink>
        </div>
        <div className="profile">
          <img
            src={ProfileImg}
            alt="Profile"
            onClick={() => setsettings((p) => !p)}
          />
        </div>
      </div>
      {settings && <Settings onClose={() => setsettings((p) => !p)} />}
    </>
  );
};

export default InvestorNavbar;
