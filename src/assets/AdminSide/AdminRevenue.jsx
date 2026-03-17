import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./AdminRevenue.css";

const AdminRevenue = () => {
  const [adminWithdrawn, setadminWithdrawn] = useState(0);
  const [adminAvailableCommission, setadminAvailableCommission] = useState(0);
  const [totalPlatfromCommission, settotalPlatfromCommission] = useState(0);
  const [buyTradeCommission, setbuyTradeCommission] = useState(0);
  const [sellTradeCommission, setsellTradeCommission] = useState(0);
  const [investorCommission, setinvestorCommission] = useState([]);

  const getRevenueData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/admin/getrevenue",
        { withCredentials: true }
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
      await axios.post(
        "http://localhost:5000/admin/collectCommission",
        {},
        { withCredentials: true }
      );
      getRevenueData();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleAdminWithdraw = async () => {
    try {
      await axios.post(
        "http://localhost:5000/admin/withdrawCommission",
        {},
        { withCredentials: true }
      );
      getRevenueData();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="ad-r-container">
      <h1 className="ad-r-title">Platform Revenue Monitor</h1>
      <div className="ad-r-stats">

        <div className="ad-r-stat">
          <span className="ad-r-label">Platform Commission</span>
          <span className="ad-r-value">{totalPlatfromCommission.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <span className="ad-r-label">Trade Commission</span>
          <span className="ad-r-value">{totalTradeCommission.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <span className="ad-r-label">Withdraw Commission</span>
          <span className="ad-r-value">{withdrawCommission.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <span className="ad-r-label">Buy Commission</span>
          <span className="ad-r-value">{buyTradeCommission.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <span className="ad-r-label">Sell Commission</span>
          <span className="ad-r-value">{sellTradeCommission.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <span className="ad-r-label">Admin Trade Share</span>
          <span className="ad-r-value">{adminTradeShare.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <span className="ad-r-label">Admin Withdrawn</span>
          <span className="ad-r-value">{adminWithdrawn.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <span className="ad-r-label">Admin Available</span>
          <span className="ad-r-value">{adminAvailableCommission.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <span className="ad-r-label">Total Admin Commission</span>
          <span className="ad-r-value">{totalAdminCommission.toFixed(2)}</span>
        </div>

        <div className="ad-r-stat">
          <span className="ad-r-label">Investor Total Share</span>
          <span className="ad-r-value">{investorTotalShare.toFixed(2)}</span>
        </div>

      </div>

      <div className="ad-r-actions">
        <button className="ad-r-btn collect" onClick={handleAdminCollect}>
          Collect Revenue
        </button>

        <button className="ad-r-btn withdraw" onClick={handleAdminWithdraw}>
          Withdraw to Bank
        </button>
      </div>

      <h2 className="ad-r-subtitle">Investor Commission Distribution</h2>

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
  );
};

export default AdminRevenue;