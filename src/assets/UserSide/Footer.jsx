import logo from '../Images/logo.png';
import React from "react";
import "./Footer.css";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo & Brand */}
        <div className="footer-brand">
          <img
            src={logo}   // place your logo in public folder
            alt="CryptoX Logo"
            className="footer-logo"
          />
          <h2 className="footer-title">TradeNexus</h2>
          <p className="footer-slogan">
            Trade Smarter. Invest Faster. Grow Stronger.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <ul>
            <li><Link to="/userdashboard/portfolio">Portfolio</Link></li>
            <li><Link to="/userdashboard/watchlist">Watchlist</Link></li>
            <li><Link to="/userdashboard/market">Wallet</Link></li>
            <li><Link to="/userdashboard/feedback">Feedback</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>Cryptocurrency trading involves substantial risk.The information on this site is for education purposes only and does not constitute financial advice</p>
      </div>
    </footer>
  );
};

export default Footer;