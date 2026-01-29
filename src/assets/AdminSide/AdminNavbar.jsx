import "./AdminNavbar.css";
import Logo from "../Images/logo.png";
import profile from "../Images/profile.svg";

const AdminNavbar = () => {
  return (
    <>
      <header className="ad-navbar">
        <div className="nav-left">
          <img src={Logo} alt="Tradenexus" className="nav-img"/>
          <span className="nav-title">TradeNexus</span>
        </div>

        <div className="nav-center">
          <input type="text" name="Searchbox" placeholder="Search users, trades, wallets..." className="nav-search"/>
        </div>

        <div className="nav-right">
          <img src={profile} alt="" className="profile-avatar"/>
          <span>Jatin Prajapati</span>
        </div>
      </header>
    </>
  );
};

export default AdminNavbar;