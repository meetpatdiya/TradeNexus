import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaUserSecret, FaBitcoin } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { TbMessageReportFilled } from "react-icons/tb";
const Sidebar = () => {
  return (
    <div className="sd-container">
      <NavLink to="/admindashboard" end className="sd-link">
        <MdSpaceDashboard className="sd-icon" />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/admindashboard/users" className="sd-link">
        <FaUsers className="sd-icon" />
        <span>Users</span>
      </NavLink>

      <NavLink to="/admindashboard/invester" className="sd-link">
        <FaUserSecret className="sd-icon" />
        <span>Investor</span>
      </NavLink>
      <NavLink to="/admindashboard/cryptocurrencies" className="sd-link">
        <FaBitcoin className="sd-icon" />
        <span>Cryptocurrencies </span>
      </NavLink>
      <NavLink to="/admindashboard/wallet" className="sd-link">
        <GiWallet className="sd-icon" />
        <span>Wallet and Transactions</span>
      </NavLink>

      <NavLink to="/admindashboard/trade" className="sd-link">
        <FaChartLine className="sd-icon" />
        <span>Trade Monitering</span>
      </NavLink>
      <NavLink to="/admindashboard/revenue" className="sd-link">
        <MdOutlineAttachMoney className="sd-icon" />
        <span>Revenue Generation</span>
      </NavLink>
      <NavLink to="/admindashboard/feedback" className="sd-link">
        <TbMessageReportFilled className="sd-icon" />
        <span>Feedback</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;
