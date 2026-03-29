import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InvestorPodium from './InvestorPodium';

const InvestorPerformance = () => {
  const [invData, setInvData] = useState(null);

  const getPerformanceData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/investor/performance",
        { withCredentials: true }
      );
      setInvData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPerformanceData();
  }, []);

  if (!invData) return <div>Loading...</div>;

  const {
    totalTrades,
    avgCommission,
    totalVolume,
    totalUsers,
    repeatUsers,
    top3,
    rank
  } = invData;

  return (
    <div className="inv-performance">

      {/* 🔹 Top Stats */}
      <div className="inv-pr-stats">
        <div className="pr-card">
          <p>Total Trades</p>
          <h2>{totalTrades}</h2>
        </div>

        <div className="pr-card">
          <p>Avg Commission</p>
          <h2>{parseFloat(avgCommission).toFixed(2)}</h2>
        </div>

        <div className="pr-card">
          <p>Total Volume</p>
          <h2>{parseFloat(totalVolume).toLocaleString()}</h2>
        </div>

        <div className="pr-card">
          <p>Total Users</p>
          <h2>{totalUsers}</h2>
        </div>

        <div className="pr-card">
          <p>Repeat Users</p>
          <h2>{repeatUsers}</h2>
        </div>
      </div>

      {top3?.length === 3 && (
        <InvestorPodium data={top3} />
      )}

      <div className="pr-rank-card">
        <p>Your Rank</p>
        <h1>#{rank}</h1>
      </div>

    </div>
  );
};

export default InvestorPerformance;