import React from "react";
import "./Extra.css";
import { FaChartLine, FaWallet, FaHeadset } from "react-icons/fa";

const Extra = () => {
  return (
    <div className="ext-container">

      <div className="ext-card">
        <div className="ext-icon">
          <FaChartLine />
        </div>

        <h3 className="ext-title">Advanced Crypto Trading</h3>

        <p className="ext-text">
          TradeNexus provides a fast and secure environment to buy, sell, and
          monitor cryptocurrencies with real-time market insights and smooth
          trade execution.
        </p>

      </div>


      <div className="ext-card">
        <div className="ext-icon">
          <FaWallet />
        </div>

        <h3 className="ext-title">Your Assets, Your Control</h3>

        <p className="ext-text">
          Manage your crypto portfolio with complete transparency. Track wallet
          balances, monitor trades, and stay in control of your digital assets
          anytime.
        </p>

      </div>


      <div className="ext-card">
        <div className="ext-icon">
          <FaHeadset />
        </div>

        <h3 className="ext-title">Support When You Need It</h3>

        <p className="ext-text">
          TradeNexus provides reliable support and feedback channels so users
          can quickly resolve issues and improve their trading experience.
        </p>

      </div>

    </div>
  );
};

export default Extra;