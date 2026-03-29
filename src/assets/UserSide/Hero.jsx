import React from "react";
import { FaChartLine, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import "./Hero.css";
import userHero from "../Images/userHero.jpeg"
const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-top">
        <div className="hero-left">
          <h1 className="hero-title">
            Trade Smart. <br /> Grow Faster.
          </h1>

          <p className="hero-subtext">
            Join the next-gen crypto platform with real-time insights and secure
            investments.
          </p>

          <div className="hero-cta">
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">24/7</span>
                <span className="stat-label">Market Access</span>
              </div>

              <div className="stat">
                <span className="stat-value">100+</span>
                <span className="stat-label">Crypto Assets</span>
              </div>

              <div className="stat">
                <span className="stat-value">Secure</span>
                <span className="stat-label">Transactions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img
            src={userHero}
            alt="crypto"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
