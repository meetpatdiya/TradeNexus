import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import "./AdminTrades.css";

const AdminTrades = () => {
  const [tradeData, setTradeData] = useState([]);
  const [tradeType, setTradeType] = useState("");
  const [cryptoId, setCryptoId] = useState("");
  const [userId, setUserId] = useState("");
  const [coins, setCoins] = useState([]);
  const [allTrades, setAllTrades] = useState([]);
  const [, setSearchParams] = useSearchParams();
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/admin/gettrades/coinlist",
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
          { params },
        );
        if (!tradeType && !cryptoId && !userId) {
          setAllTrades(data);
        }
        setTradeData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTradeData();
  }, [tradeType, cryptoId, userId]);
  const tradeAnalytics = useMemo(() => {
    if (!allTrades.length) return null;

    let totalTrades = allTrades.length;
    let totalPlatformVolume = 0;

    const moneyPerCoin = {};
    const tradesPerUser = {};

    allTrades.forEach((trade) => {
      const total = parseFloat(trade.total) || 0;

      totalPlatformVolume += total;

      moneyPerCoin[trade.crypto_id] =
        (moneyPerCoin[trade.crypto_id] || 0) + total;

      tradesPerUser[trade.user_id] = (tradesPerUser[trade.user_id] || 0) + 1;
    });

    let topCoin = null;
    let maxMoney = 0;

    for (let coin in moneyPerCoin) {
      if (moneyPerCoin[coin] > maxMoney) {
        maxMoney = moneyPerCoin[coin];
        topCoin = coin;
      }
    }

    let topUser = null;
    let maxTrades = 0;

    for (let user in tradesPerUser) {
      if (tradesPerUser[user] > maxTrades) {
        maxTrades = tradesPerUser[user];
        topUser = user;
      }
    }

    return {
      totalTrades,
      totalPlatformVolume,
      mostTradedCoinByMoney: {
        coin: topCoin,
        totalMoney: maxMoney,
      },
      mostActiveUser: {
        userId: topUser,
        tradeCount: maxTrades,
      },
    };
  }, [allTrades]);
  console.log(tradeAnalytics);

  return (
    <div className="admin-trade-page">
      <div className="admin-tradeinfo-container">
        <div className="admin-tradeinfo-card admin-tradeinfo-totaltrades">
          <h3>Total Trades</h3>
          <p>{tradeAnalytics?.totalTrades}</p>
        </div>

        <div className="admin-tradeinfo-card admin-tradeinfo-volume">
          <h3>Total Platform Volume</h3>
          <p>{tradeAnalytics?.totalPlatformVolume}</p>
        </div>

        <div className="admin-tradeinfo-card admin-tradeinfo-topcoin">
          <h3>Top Coin (By Money)</h3>
          <p>{tradeAnalytics?.mostTradedCoinByMoney?.coin}</p>
          <span>{tradeAnalytics?.mostTradedCoinByMoney?.totalMoney}</span>
        </div>

        <div className="admin-tradeinfo-card admin-tradeinfo-activeuser">
          <h3>Most Active User</h3>
          <p>User {tradeAnalytics?.mostActiveUser?.userId}</p>
          <span>{tradeAnalytics?.mostActiveUser?.tradeCount} Trades</span>
        </div>
      </div>

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
                      item.trade_type === "buy" ? "trade-buy" : "trade-sell"
                    }
                  >
                    {item.trade_type}
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.total}</td>
                  <td>{new Date(item.created_at).toLocaleString("en-IN")}</td>
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
