import { NavLink } from "react-router-dom";
import logo from "../Images/logo.png";
import ProfileImg from "../Images/profile.svg";
import "./InvestorNavbar.css"
import { useState } from "react";
import Settings from "../UserSide/Settings";
const InvestorNavbar = () => {
  const [settings, setsettings] = useState(false)
  return (
    <>
    <div className="in-navbar">
      <div className="in-nav-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div>
        <NavLink className={({ isActive }) => isActive ? "active-link" : ""} to={''} end>Home</NavLink> 
        <NavLink className={({ isActive }) => isActive ? "active-link" : ""} to={'wallet'}>Wallet</NavLink>
        <NavLink className={({ isActive }) => isActive ? "active-link" : ""} to={'portfolio'}>Portfolio</NavLink>
        <NavLink className={({ isActive }) => isActive ? "active-link" : ""} to={'analytics'}>Analytics</NavLink>
        <NavLink className={({ isActive }) => isActive ? "active-link" : ""} to={'commission'}>Commission</NavLink>
        <NavLink className={({ isActive }) => isActive ? "active-link" : ""} to={'news'}>News</NavLink>

      </div>
        <div className="profile">
          <img src={ProfileImg} alt="Profile" onClick={()=>setsettings(p=>!p)}  />
        </div>
    </div>
    {settings && <Settings onClose={()=>setsettings(p=>!p)}/>}
    </>
  );
};

export default InvestorNavbar;