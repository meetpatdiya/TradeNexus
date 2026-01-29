import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="cl-h-hero">
      <div className="cl-h-left">
        <h1>Trade Crypto Securely with Real-Time Liquidity</h1>
        <p>
          Buy, sell, and invest in top cryptocurrencies with speed,
          transparency, and full control.
        </p>

        <div className="cl-h-actions">
          <button
            className="cl-h-primary"
            onClick={() => navigate("/register/user")}
          >
            Get Started
          </button>
          <button
            className="cl-h-secondary"
            onClick={() => navigate("/register/investor")}
          >
            Become an Investor
          </button>
        </div>

        <div className="cl-h-trust">
          <span>🔒 Secure Wallets</span>
          <span>⚡ Fast Trades</span>
          <span>📊 Live Market Data</span>
        </div>
      </div>

      <div className="cl-h-right">
        <div className="cl-h-mock">
          Market • Portfolio • Wallet
        </div>
      </div>
    </section>
  );
};

export default Hero;
