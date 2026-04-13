import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./InvestorPortfolio.css";
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
        const currentValue = coin ? d.quantity * coin.current_price : 0;
        const profitLoss = currentValue - d.net_invested;
        const profitLossPercent =
          d.net_invested > 0 ? (profitLoss / d.net_invested) * 100 : 0;

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

  const { totalInvestment, totalEarnings } = useMemo(() => {
    return investedCoins.reduce(
      (acc, item) => {
        acc.totalInvestment += Number(item.net_invested);
        acc.totalEarnings += Number(item.profitLoss);
        return acc;
      },
      { totalInvestment: 0, totalEarnings: 0 }
    );
  }, [investedCoins]);

  return (
    <div className="in-pl-container">

      <div className="in-pl-header">
        <h2>Investor Portfolio</h2>

        <div className="in-pl-summary">
          <div>
            <p>Total Invested</p>
            <h3>${totalInvestment.toFixed(2)}</h3>
          </div>

          <div>
            <p>Total Earnings</p>
            <h3 className={totalEarnings >= 0 ? "in-pl-profit" : "in-pl-loss"}>
              ${totalEarnings.toFixed(2)}
            </h3>
          </div>
          <div>
            <p>Return of Investment</p>
            <h3 className={totalEarnings >= 0 ? "in-pl-profit" : "in-pl-loss"}>
              ${Number(totalEarnings / totalInvestment * 100).toFixed(2)}%
            </h3>
          </div>
        </div>
      </div>

      <div className="in-pl-grid">
        {investedCoins.map((item, index) => (
          <div className="in-pl-card" key={index}>

            <div className="in-pl-card-top">
              <img src={item.coin?.image} alt="" />
              <h3>{item.crypto_name}</h3>
            </div>

            <div className="in-pl-card-body">

              <div className="in-pl-row">
                <span>Quantity</span>
                <span>{item.quantity}</span>
              </div>

              <div className="in-pl-row">
                <span>Avg Price</span>
                <span>${item.avg_price}</span>
              </div>
  
              <div className="in-pl-row">
                <span>Invested</span>
                <span>${Number(item.net_invested).toFixed(2)}</span>
              </div>

              <div className="in-pl-row">
                <span>Current Price</span>
                <span>${item.coin?.current_price}</span>
              </div>

              <div className="in-pl-row">
                <span>Current Value</span>
                <span>${item.currentValue.toFixed(2)}</span>
              </div>

              <div className="in-pl-pl">
                <p>P/L</p>
                <span
                  className={
                    item.profitLoss >= 0 ? "in-pl-profit" : "in-pl-loss"
                  }
                >
                  ${item.profitLoss.toFixed(2)} ({item.profitLossPercent.toFixed(2)}%)
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default InvestorPortfolio;