import "./InvestorFooter.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../Images/Logo.png"
const InvestorFooter = () => {
  return (
    <footer className="in-footer">
      <div className="footer-container">
        
        <div className="footer-left">
          <div className="i-footer-brand">

            <img src={logo} alt="" />
          <h2>TradeNexus</h2>
          </div>
          <p>Your trusted crypto investment platform.</p>
        </div>

        <div className="footer-links">
          <Link to={'/investordashboard'}>Home</Link> 
        <Link to={'/investordashboard/wallet'}>Wallet</Link>
        <Link to={'/investordashboard/portfolio'}>Portfolio</Link>
        <Link to={'/investordashboard/transactions'}>Transactions</Link>
        <Link to={'/investordashboard/commission'}>Commission</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 TradeNexus . All rights reserved.</p>
      </div>
    </footer>
  );
};

export default InvestorFooter;