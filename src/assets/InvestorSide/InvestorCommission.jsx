import React, { useEffect, useState, useMemo } from "react";
import api from "../ApiServices/Api";
import "./InvestorCommission.css";
import LoaderToast from "../UserSide/LoaderToast";
const InvestorCommission = () => {
  const [history, setHistory] = useState([]);
  const [summary, setSummary] = useState({
    total_commission: 0,
    withdrawn_commission: 0,
    available_commission: 0,
  });
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setalertMessage] = useState("")
  const fetchCommission = async () => {
    try {
      const res = await api.get("/investor/getcommission");
      setHistory(res.data.history);
      setSummary({
        total_commission: res.data.total_commission,
        withdrawn_commission: res.data.withdrawn_commission,
        available_commission: res.data.available_commission,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCommission();
  }, []);

  const totalRecords = history.length;

  const withdrawCommission = async () => {
    try {
      const {data} = await api.post("/investor/withdrawcommission",{amount:summary.available_commission})
      setalertMessage(data.message);
    } catch (error) {
      console.log(error.response);
    }
    fetchCommission()
    setShowAlert(true)
  };
  const btndis = summary.available_commission < 10;
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
    return Object.keys(map).reduce((a, b) => (map[a] > map[b] ? a : b));
  }, [history]);

  return (
    <div className="inv-cms-container">
      <div className="inv-cms-header">
        <h1>Investor Commission Dashboard</h1>
        <p>Commission earned from user trades on your listed cryptocurrencies.</p>
      </div>

      <div className="inv-cms-action">
        <p className="inv-cms-note">Minimum withdrawal: $10</p>
        <button
          className="inv-cms-withdraw-btn"
          onClick={() => withdrawCommission()}
          disabled={btndis}
        >
          Withdraw Commission
        </button>
      </div>

      <div className="inv-cms-summary">

        <div className="inv-cms-card inc-blue">
          <h3>Total Commission</h3>
          <p>$ {Number(summary.total_commission).toFixed(2)}</p>
        </div>

        <div className="inv-cms-card inc-green">
          <h3>Withdrawn Commission</h3>
          <p>$ {Number(summary.withdrawn_commission).toFixed(2)}</p>
        </div>

        <div className="inv-cms-card inc-orange">
          <h3>Available Commission</h3>
          <p>$ {Number(summary.available_commission).toFixed(2)}</p>
        </div>

        <div className="inv-cms-card inc-purple">
          <h3>Total Records</h3>
          <p>{totalRecords}</p>
        </div>

        <div className="inv-cms-card inc-pink">
          <h3>Last Commission</h3>
          <p>{lastCommissionDate}</p>
        </div>

        <div className="inv-cms-card inc-teal">
          <h3>Top Earning Crypto</h3>
          <p>{topCrypto}</p>
        </div>

      </div>

      <div className="inv-cms-table-section">
        <h2>Commission History</h2>

        <div className="inv-cms-table-wrapper">
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
      {showAlert && (
              <LoaderToast
                message={alertMessage}
                type={"success"}
                onClose={() => setShowAlert(false)}
                shape={'circle'}
              />
            )}
    </div>
  );
};

export default InvestorCommission;