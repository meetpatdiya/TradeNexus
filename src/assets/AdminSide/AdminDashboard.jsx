import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import "./Dashboard.css";
const HomePage = () => {
  return (
    <div className="admin-wrapper">
      <AdminNavbar/>
      <div className="admin-container">
        <Sidebar/>
        <div className="main-container">
          <div className="page-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;