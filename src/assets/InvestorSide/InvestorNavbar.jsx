import { Link } from "react-router-dom";
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
        <Link to={''}>Home</Link> 
        <Link to={'wallet'}>Wallet</Link>
        <Link to={'portfolio'}>Portfolio</Link>
        <Link to={'transactions'}>Transactions</Link>
        <Link to={'commission'}>Commission</Link>
      </div>
        <div className="profile">
          <img src={ProfileImg} alt="Profile" onClick={()=>setsettings(p=>!p)}  />
        </div>
    </div>
    {settings && <Settings/>}
    </>
  );
};

export default InvestorNavbar;