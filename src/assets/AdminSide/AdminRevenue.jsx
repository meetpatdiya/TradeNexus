import React, { useState, useEffect, useMemo } from "react";
import api from "../ApiServices/Api";
import "./AdminRevenue.css";

import {
  FaChartBar,
  FaExchangeAlt,
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaCoins
} from "react-icons/fa";

const AdminRevenue = () => {
  const [adminWithdrawn, setadminWithdrawn] = useState(0);
  const [adminAvailableCommission, setadminAvailableCommission] = useState(0);
  const [totalPlatfromCommission, settotalPlatfromCommission] = useState(0);
  const [buyTradeCommission, setbuyTradeCommission] = useState(0);
  const [sellTradeCommission, setsellTradeCommission] = useState(0);
  const [investorCommission, setinvestorCommission] = useState([]);

  const getRevenueData = async () => {
    try {
      const { data } = await api.get(
        "/admin/getrevenue",
      );

      setadminAvailableCommission(
        parseFloat(
          data?.adminAvailableCommission?.admin_available_commission || 0
        )
      );

      settotalPlatfromCommission(
        parseFloat(data?.totalPlatformCommission?.total_platform_commission || 0)
      );

      setadminWithdrawn(parseFloat(data?.adminWithdrawn?.admin_withdrawn || 0));
      setinvestorCommission(data?.investorCommission || []);

      setbuyTradeCommission(
        parseFloat(data?.buyTradeCommission?.buy_trade_commission || 0)
      );

      setsellTradeCommission(
        parseFloat(data?.sellTradeCommission?.sell_trade_commission || 0)
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getRevenueData();
  }, []);

  const totalTradeCommission = useMemo(() => {
    return buyTradeCommission + sellTradeCommission;
  }, [buyTradeCommission, sellTradeCommission]);

  const withdrawCommission = useMemo(() => {
    return totalPlatfromCommission - totalTradeCommission;
  }, [totalPlatfromCommission, totalTradeCommission]);

  const adminTradeShare = useMemo(() => {
    return totalTradeCommission * 0.2;
  }, [totalTradeCommission]);

  const totalAdminCommission =
    parseFloat(adminWithdrawn) + parseFloat(adminAvailableCommission);

  const investorTotalShare = useMemo(() => {
    return investorCommission.reduce(
      (acc, curr) => acc + parseFloat(curr.total_commission || 0),
      0
    );
  }, [investorCommission]);

  const handleAdminCollect = async () => {
    try {
     const {data} = await api.post(
        "/admin/collectCommission",);
      console.log(data);
      
      getRevenueData();
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

  const handleAdminWithdraw = async () => {
    try {
      await api.post(
        "/admin/withdrawCommission",
      );
      getRevenueData();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="ad-r-container">

      <h1 className="ad-r-title">Revenue Dashboard</h1>
      <div className="ad-r-stats">

        <div className="ad-r-stat">
          <div className="ad-r-stat-top">
            <FaChartBar className="ad-r-icon blue" />
            <span className="ad-r-label">Platform Commission</span>
          </div>
          <span className="ad-r-value">{totalPlatfromCommission.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <div className="ad-r-stat-top">
            <FaExchangeAlt className="ad-r-icon purple" />
            <span className="ad-r-label">Total Trade Commission</span>
          </div>
          <span className="ad-r-value">{totalTradeCommission.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <div className="ad-r-stat-top">
            <FaWallet className="ad-r-icon green" />
            <span className="ad-r-label">Withdraw Commission</span>
          </div>
          <span className="ad-r-value">{withdrawCommission.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <div className="ad-r-stat-top">
            <FaArrowUp className="ad-r-icon green" />
            <span className="ad-r-label">Buy Commission</span>
          </div>
          <span className="ad-r-value">{buyTradeCommission.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <div className="ad-r-stat-top">
            <FaArrowDown className="ad-r-icon red" />
            <span className="ad-r-label">Sell Commission</span>
          </div>
          <span className="ad-r-value">{sellTradeCommission.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <div className="ad-r-stat-top">
            <FaCoins className="ad-r-icon orange" />
            <span className="ad-r-label">Admin Trade Share</span>
          </div>
          <span className="ad-r-value">{adminTradeShare.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <div className="ad-r-stat-top">
            <FaWallet className="ad-r-icon blue" />
            <span className="ad-r-label">Admin Withdrawn</span>
          </div>
          <span className="ad-r-value">{adminWithdrawn.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <div className="ad-r-stat-top">
            <FaWallet className="ad-r-icon purple" />
            <span className="ad-r-label">Admin Available</span>
          </div>
          <span className="ad-r-value">{adminAvailableCommission.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <div className="ad-r-stat-top">
            <FaCoins className="ad-r-icon green" />
            <span className="ad-r-label">Total Admin Commission</span>
          </div>
          <span className="ad-r-value">{totalAdminCommission.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <div className="ad-r-stat-top">
            <FaCoins className="ad-r-icon purple" />
            <span className="ad-r-label">Investor Total Share</span>
          </div>
          <span className="ad-r-value">{investorTotalShare.toFixed(2)}</span>
        </div>

      </div>

      {/* ===== ACTIONS ===== */}
      <div className="ad-r-actions">
        <button className="ad-r-btn collect" onClick={handleAdminCollect}>
          Collect Revenue
        </button>

        <button className="ad-r-btn withdraw" onClick={handleAdminWithdraw}>
          Withdraw to Bank
        </button>
      </div>

      {/* ===== BOTTOM SECTION ===== */}
      <div className="ad-r-bottom">

        <div className="ad-r-investor-box">
          <h2 className="ad-r-subtitle">Investor Commission</h2>

          <div className="ad-r-investor-list">
            {investorCommission.map((item, index) => (
              <div key={index} className="ad-r-investor-row">

                <span className="ad-r-investor-id">
                  #{item.user_id}
                </span>

                <span className="ad-r-investor-name">
                  {item.name}
                </span>

                <span className="ad-r-investor-amount">
                  {parseFloat(item.total_commission).toFixed(2)}
                </span>

              </div>
            ))}
          </div>
        </div>

        {/* <div className="ad-r-chart-box">
          <h2 className="ad-r-subtitle">Commission Growth</h2>
          <div className="ad-r-chart-placeholder">
            Chart Coming
          </div>
        </div> */}

      </div>

    </div>
  );
};

export default AdminRevenue;