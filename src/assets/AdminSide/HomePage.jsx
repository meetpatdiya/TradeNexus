import React, { useState, useEffect } from "react";
import AdminWithdrawList from "./AdminWithdrawList";
import axios from "axios";
import ChartsUsers from "./ChartsUsers";
import ChartsTrades from "./ChartsTrades";
import ChartsCoins from "./ChartsCoins";
import ChartsProfitable from "./ChartsProfitable";
import ChartsTotalInvest from "./ChartsTotalInvest";
import "./Homepage.css";
const HomePage = () => {
  const [usersData, setusersData] = useState([]);
  const [tradesData, settradesData] = useState([]);
  const [coinsData, setcoinsData] = useState([]);
  const [lastTrades, setlastTrades] = useState([]);
  const [profitablecoins, setprofitablecoins] = useState([]);
  const [totalinvestment, settotalinvestment] = useState([]);
  const getUsersCharts = async () => {
    const { data } = await axios.get("http://localhost:5000/charts/users", {
      withCredentials: true,
    });
    setusersData(data);
  };
  const getTradesCharts = async () => {
    const { data } = await axios.get("http://localhost:5000/charts/trades", {
      withCredentials: true,
    });
    settradesData(data.volume);
    setlastTrades(data.lastTrades);
  };
  const getCoinsCharts = async () => {
    const { data } = await axios.get("http://localhost:5000/charts/coins", {
      withCredentials: true,
    });
    setcoinsData(data);
  };
  const getMostProfitableCoin = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/charts/profitablecoin",
      { withCredentials: true },
    );
    setprofitablecoins(data);
  };
  const getTotalInvestments = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/charts/totalinvestments",
      { withCredentials: true },
    );
    console.log(data);
    settotalinvestment(data);
  };
  useEffect(() => {
    getUsersCharts();
    getTradesCharts();
    getCoinsCharts();
    getMostProfitableCoin();
    getTotalInvestments();
  }, []);

  return (
    <>
      <div className="ah-gc">
                <div className="ah-gd">
        <ChartsTotalInvest data={totalinvestment} />
        </div>
      </div>
      <div className="ah-gc">
        <div className="ah-gd">
          <ChartsProfitable data={profitablecoins} />
        </div>
        <div className="ah-gd">
          <ChartsUsers data={usersData} />
        </div>
      </div>
      <div className="ah-gc"  >
        <div className="ah-gd">
          <ChartsTrades trades={tradesData} />
        </div>
        <div className="ah-gd">
          <ChartsCoins data={coinsData} />
        </div>
      </div>
      <AdminWithdrawList />
      <div className="ah-recentTrades-header">
        <h3>Latest Trade Activity</h3>
      </div>

      <table className="ah-recentTrades-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Coin</th>
            <th>Type</th>
            <th>Total</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {lastTrades.map((item, index) => (
            <tr key={index}>
              <td>#{item.id}</td>
              <td>{item.user_id}</td>
              <td className="ah-coin">{item.crypto_id}</td>
              <td>
                <span className={`ah-badge ah-${item.trade_type}`}>
                  {item.trade_type}
                </span>
              </td>
              <td>${item.total}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td className="ah-time">{new Date(item.created_at).toLocaleString("en-IN")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default HomePage;
