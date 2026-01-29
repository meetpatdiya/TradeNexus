import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import "./Dashboard.css";
import AdminWithdrawList from "./AdminWithdrawList";
const HomePage = () => {
  return (
    <div className="admin-wrapper">
      <AdminNavbar/>
           <AdminWithdrawList/>
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