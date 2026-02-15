import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./InvestorCommission.css";

const InvestorCommission = () => {
  const [history, setHistory] = useState([]);
  const [summary, setSummary] = useState({
    total_commission: 0,
    withdrawn_commission: 0,
    available_commission: 0,
  });

  useEffect(() => {
    const fetchCommission = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/investor/getcommission",
          { withCredentials: true }
        );
        setHistory(res.data.history);
        setSummary({
          total_commission: res.data.total_commission,
          withdrawn_commission: res.data.withdrawn_commission,
          available_commission: res.data.available_commission,
        });
        console.log(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };

    fetchCommission();
  }, []);

  const totalRecords = history.length;
  const withdrawCommission = async()=>{
    try {
      const {data} = await axios.post("http://localhost:5000/investor/withdrawcommission",{amount:summary.available_commission},{withCredentials:true})
      console.log(data);
      
    } catch (error) {
      console.log(error.response.message);
      
    }
  }
  const btndis  = summary.available_commission < 10;
  const lastCommissionDate = useMemo(() => {
    if (!history.length) return "N/A";
    const sorted = [...history].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    return new Date(sorted[0].created_at).toLocaleString();
  }, [history]);

  const topCrypto = useMemo(() => {
    if (!history.length) return "N/A";
    const map = {};
    history.forEach((item) => {
      map[item.crypto_name] =
        (map[item.crypto_name] || 0) + Number(item.amount);
    });
    return Object.keys(map).reduce((a, b) =>
      map[a] > map[b] ? a : b
    );
  }, [history]);

  return (
    <div className="inv-cms-container">
      <h1 className="inv-cms-title">Investor Commission Dashboard</h1>
      <p className="inv-cms-subtitle">
        Commission earned from user trades on your listed cryptocurrencies.
      </p>
      <p>Minimum commission withdraw is 10$</p>

        <div className="inv-cms-withbtn">
          <button onClick={()=>withdrawCommission()} disabled={btndis}>Withdraw Commission</button>
        </div>
      {/* Summary Section */}
      <div className="inv-cms-summary">
        <div className="inv-cms-card">
          <h3>Total Commission</h3>
          <p>$ {Number(summary.total_commission).toFixed(2)}</p>
        </div>


        <div className="inv-cms-card">
          <h3>Withdrawn Commission</h3>
          <p>$ {Number(summary.withdrawn_commission).toFixed(2)}</p>
        </div>

        <div className="inv-cms-card">
          <h3>Available Commission</h3>
          <p>$ {Number(summary.available_commission).toFixed(2)}</p>
        </div>

        <div className="inv-cms-card">
          <h3>Total Records</h3>
          <p>{totalRecords}</p>
        </div>

        <div className="inv-cms-card">
          <h3>Last Commission</h3>
          <p>{lastCommissionDate}</p>
        </div>

        <div className="inv-cms-card">
          <h3>Top Earning Crypto</h3>
          <p>{topCrypto}</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="inv-cms-table-section">
        <h2>Commission History</h2>
        <table className="inv-cms-table">
          <thead>
            <tr>
              <th>Trade ID</th>
              <th>Crypto</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.trade_id}</td>
                <td>{item.crypto_name}</td>
                <td>$ {Number(item.amount).toFixed(2)}</td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestorCommission;
