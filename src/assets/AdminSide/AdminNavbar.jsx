import "./AdminNavbar.css";
import Logo from "../Images/logo.png";
import profile from "../Images/profile.svg";
import { useState } from "react";
import AdminSettings from "./AdminSettings";
const AdminNavbar = () => {
const [settings, setsettings] = useState(false)
  return (
    <>
      <header className="ad-navbar">
        <div className="nav-left">
          <img src={Logo} alt="Tradenexus" className="nav-img"/>
          <span className="nav-title">TradeNexus</span>
        </div>

        <div className="nav-center">
        </div>

        <div className="nav-right">
          <img src={profile} alt="" className="profile-avatar" onClick={()=>setsettings(true)}/>
        </div>
      </header>
      {settings && <AdminSettings onClose={()=>setsettings(p=>!p)}/>}
    </>
  );
};

export default AdminNavbar;