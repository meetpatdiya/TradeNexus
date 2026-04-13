import React, { useState, useEffect } from "react";
import "./Analytics.css";
import axios from "axios";
import ChartsBuySell from "./ChartsBuySell";
import ChartsLast7Days from "./ChartsLast7Days";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [showtransactions, setshowtransactions] = useState(false)
  useEffect(() => {
    const getAnalyticsData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/useranalytics",
          { withCredentials: true },
        );
        setAnalytics(data);
      } catch (error) {
        console.log(error?.response);
      }
    };

    getAnalyticsData();
  }, []);

  if (!analytics) return null;

  return (
    <div className="us-an-container">
      <h1 className="us-an-heading">Trading Analytics</h1>

      <div className="us-an-topcards">
        <div className="us-an-card">
          <h2>{analytics.totalTrades[0]?.totalTrades}</h2>
          <p>Total Trades</p>
        </div>

        <div className="us-an-card">
          <h2>${analytics.totalInvested[0]?.total_invested}</h2>
          <p>Total Invested</p>
        </div>

        <div className="us-an-card">
          <h3>Highest Trade</h3>
          <p>{analytics.highestValueTrade[0]?.crypto_id}</p>
          <span>${analytics.highestValueTrade[0]?.total}</span>
        </div>

        <div className="us-an-card">
          <h3>Lowest Trade</h3>
          <p>{analytics.lowestValueTrade[0]?.crypto_id}</p>
          <span>${analytics.lowestValueTrade[0]?.total}</span>
        </div>
      </div>

      <div className="us-an-middle">
        <div className="us-an-fav">
          <h3>Favorite Coins</h3>

          {analytics.favCoins.map((coin) => (
            <div key={coin.crypto_id} className="us-an-favrow">
              <div>
                <h4>{coin.crypto_id}</h4>
                <p>Trades : {coin.total_trades}</p>
              </div>

              <div>
                <p>Volume</p>
                <span>${coin.total_volume}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="us-an-charts">
          <ChartsLast7Days data={analytics.tradesPerDay} />

          <div className="us-an-divider"></div>

          <ChartsBuySell data={analytics.buySellDistributon} />
        </div>
      </div>
      <div className="us-an-transaction">
  <button onClick={() => setshowtransactions(p => !p)} className="toggle-btn">
    {showtransactions ? "Hide" : "Show"} Transactions
  </button>

  {showtransactions && (
    <table className="us-an-trans">
      <thead>
        <tr>
          <th>Id</th>
          <th>Crypto Name</th>
          <th>Trade Type</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {analytics.userTransactions.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.crypto_id}</td>
            <td className={item.trade_type === "buy" ? "buy" : "sell"}>
              {item.trade_type}
            </td>
            <td>{item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.total}</td>
            <td>{new Date(item.created_at).toLocaleString("en-IN")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
    </div>
  );
};

export default Analytics;
