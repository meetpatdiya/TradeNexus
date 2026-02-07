import React, { useState, useEffect } from "react";
import axios from "axios";
import "./InvestorProfitLoss.css"
import { useCoins } from "../UserSide/CoinsContext";

const InvestorPortfolio = () => {
  const { coins } = useCoins();
  const [investedCoins, setInvestedCoins] = useState([]);

  useEffect(() => {
    const getpldata = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/investor/viewprofitloss",
        { withCredentials: true }
      );

      const result = data.map((d) => {
        const coin = coins.find((c) => c.id === d.crypto_name);

        const currentValue = coin
          ? d.quantity * coin.current_price
          : 0;

        const profitLoss = currentValue - d.net_invested;
        const profitLossPercent =
          d.net_invested > 0
            ? (profitLoss / d.net_invested) * 100
            : 0;

        return {
          ...d,
          coin,
          currentValue,
          profitLoss,
          profitLossPercent,
        };
      });

      setInvestedCoins(result);
    };

    if (coins.length) getpldata();
  }, [coins]);

  return (
    <div className="in-pl-container">
      <h2 className="in-pl-title">Investor Profit & Loss</h2>

      {investedCoins.map((item, index) => (
        <div className="in-pl-card" key={index}>
          <div className="in-pl-header">
            <h3 className="in-pl-coin-name">{item.crypto_name}</h3>
            <span
              className={
                item.profitLoss >= 0
                  ? "in-pl-profit"
                  : "in-pl-loss"
              }
            >
              {item.profitLoss >= 0 ? "Profit" : "Loss"}
            </span>
          </div>

          <div className="in-pl-row">
            <span>Quantity</span>
            <span>{item.quantity}</span>
          </div>

          <div className="in-pl-row">
            <span>Net Invested</span>
            <span>${item.net_invested}</span>
          </div>

          <div className="in-pl-row">
            <span>Current Price</span>
            <span>${item.coin?.current_price}</span>
          </div>

          <div className="in-pl-row">
            <span>Current Value</span>
            <span>${item.currentValue.toFixed(2)}</span>
          </div>

          <div className="in-pl-row in-pl-highlight">
            <span>P/L</span>
            <span
              className={
                item.profitLoss >= 0
                  ? "in-pl-profit"
                  : "in-pl-loss"
              }
            >
              ${item.profitLoss.toFixed(2)} (
              {item.profitLossPercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvestorPortfolio;
