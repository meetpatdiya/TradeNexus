import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import "./AdminTrades.css";

const AdminTrades = () => {
  const [tradeData, setTradeData] = useState([]);
  const [tradeType, setTradeType] = useState("");
  const [cryptoId, setCryptoId] = useState("");
  const [userId, setUserId] = useState("");
  const [coins, setCoins] = useState([]);

  const [, setSearchParams] = useSearchParams();
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/admin/gettrades/coinlist"
        );
        setCoins(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCoins();
  }, []);
  useEffect(() => {
    const getTradeData = async () => {
      try {
        const params = {};
        if (tradeType) params.trade_type = tradeType;
        if (cryptoId) params.crypto_id = cryptoId;
        if (userId) params.user_id = userId;

        setSearchParams(params);

        const { data } = await axios.get(
          "http://localhost:5000/admin/gettrades",
          { params }
        );

        setTradeData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getTradeData();
  }, [tradeType, cryptoId, userId]);

  return (
    <div className="admin-trade-page">
      <div className="trade-filters">
        <select onChange={(e) => setTradeType(e.target.value)}>
          <option value="">All Type</option>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>

        <select onChange={(e) => setCryptoId(e.target.value)}>
          <option value="">All Crypto</option>
          {coins.map((coin) => (
            <option key={coin.crypto_id} value={coin.crypto_id}>
              {coin.crypto_id.toUpperCase()}
            </option>
          ))}
        </select>

        <input
          placeholder="User ID"
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div className="trade-table-wrapper">
        <table className="trade-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Crypto</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {tradeData.length === 0 ? (
              <tr>
                <td colSpan="8">No trades found</td>
              </tr>
            ) : (
              tradeData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.user_id}</td>
                  <td>{item.crypto_id}</td>
                  <td
                    className={
                      item.trade_type === "buy"
                        ? "trade-buy"
                        : "trade-sell"
                    }
                  >
                    {item.trade_type}
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.total}</td>
                  <td>
                    {new Date(item.created_at).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTrades;