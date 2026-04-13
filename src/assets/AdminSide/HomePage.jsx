import React, { useState, useEffect } from "react";
import AdminWithdrawList from "./AdminWithdrawList";
import axios from "axios";
import ChartsUsers from "./ChartsUsers";
import ChartsTrades from "./ChartsTrades";
import ChartsCoins from "./ChartsCoins";
import ChartsProfitable from "./ChartsProfitable";
import ChartsTotalInvest from "./ChartsTotalInvest";
import { FaUsers, FaUserTie, FaArrowDown, FaArrowUp, FaClock } from "react-icons/fa";
import "./Homepage.css";
const HomePage = () => {
  const [usersData, setusersData] = useState([]);
  const [tradesData, settradesData] = useState([]);
  const [coinsData, setcoinsData] = useState([]);
  const [lastTrades, setlastTrades] = useState([]);
  const [systemData, setsystemData] = useState({});
  const [profitablecoins, setprofitablecoins] = useState([]);
  const [totalinvestment, settotalinvestment] = useState([]);
  const getSystemInfo = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/admin/getsysteminfo",
      {
        withCredentials: true,
      },
    );
    console.log(data);
    setsystemData(data);
  };
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
    getSystemInfo();
  }, []);
  const users = systemData?.totalUsers?.[0] || {};
  const financial = systemData?.financialInfo?.[0] || {};
  const topInvestor = systemData?.topInvestor?.[0] || {};
  const topInvestorsList = systemData?.totalInvestorFunds || [];
  const traders = systemData?.totalTradeVolume || [];

  return (
    <>
      <div className="ah-st-container">
        <div className="ah-st-row">

  <div className="ah-st-card">
    <div className="ah-st-top">
      <FaUsers className="ah-st-icon blue" />
      <h3>Users</h3>
    </div>
    <p>{users.users || 0}</p>
  </div>

  <div className="ah-st-card">
    <div className="ah-st-top">
      <FaUserTie className="ah-st-icon purple" />
      <h3>Investors</h3>
    </div>
    <p>{users.investors || 0}</p>
  </div>

  <div className="ah-st-card">
    <div className="ah-st-top">
      <FaArrowDown className="ah-st-icon green" />
      <h3>Deposits</h3>
    </div>
    <p>$ {financial.total_deposits || 0}</p>
  </div>

  <div className="ah-st-card">
    <div className="ah-st-top">
      <FaArrowUp className="ah-st-icon red" />
      <h3>Withdrawals</h3>
    </div>
    <p>$ {financial.total_withdrawals || 0}</p>
  </div>

  <div className="ah-st-card">
    <div className="ah-st-top">
      <FaClock className="ah-st-icon orange" />
      <h3>Pending</h3>
    </div>
    <p>{financial.pending_withdrawals || 0}</p>
  </div>

</div>

        
        <div className="ah-st-hero">
  <div className="ah-st-hero-content">
    <p className="ah-st-hero-label">🏆 Top Investor</p>
    <h1 className="ah-st-hero-name">{topInvestor.name}</h1>
    <p className="ah-st-hero-amount">
      $ {parseFloat(topInvestor.total_investment || 0).toFixed(2)}
    </p>
  </div>
</div>
      

        <div className="ah-st-tables">
          <div className="ah-st-table-box">
            <h3>Top 3 Investors</h3>
            <table className="ah-st-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Investment</th>
                </tr>
              </thead>
              <tbody>
                {topInvestorsList.map((inv) => (
                  <tr key={inv.investor_id}>
                    <td>{inv.investor_id}</td>
                    <td>{inv.name}</td>
                    <td>
                      $ {parseFloat(inv.total_invested_volume).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ah-st-table-box">
            <h3>Top 3 Traders</h3>
            <table className="ah-st-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Trades</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                {traders.map((tr) => (
                  <tr key={tr.user_id}>
                    <td>{tr.user_id}</td>
                    <td>{tr.name}</td>
                    <td>{tr.total_trades}</td>
                    <td>$ {tr.total_volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
      <div className="ah-gc">
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
              <td className="ah-time">
                {new Date(item.created_at).toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default HomePage;
