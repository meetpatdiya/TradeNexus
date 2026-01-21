import logo from '../Images/logo.png';
import React from "react";
import "./Footer.css";

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
            <li><a href="/market">Market</a></li>
            <li><a href="/portfolio">Portfolio</a></li>
            <li><a href="/feedback">Feedback</a></li>
            <li><a href="/watchlist">Watchlist</a></li>
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