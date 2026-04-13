import React, { useEffect, useState, useMemo } from "react";
import "./AdminCryptocurrencies.css";
import { useCoins } from "../UserSide/CoinsContext";
import axios from "axios";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const AdminCryptocurrencies = () => {
  const { coins } = useCoins();
  const { id } = useParams();
  const [dbCoins, setDbCoins] = useState([]);
  const [coinSearch, setcoinSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();
  const fetchDB = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/admin/getcryptocurrencies",
        { withCredentials: true }
      );
      setDbCoins(data);      
    } catch (error) {
      console.log(error?.response);
    }
  };

  useEffect(() => {
    fetchDB();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(coinSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [coinSearch]);
const top50 = useMemo(() => coins.slice(0, 50), [coins]);

  const mergedCoins = top50.map((coin) => {
    const dbCoin = dbCoins.find((c) => c.gecko_id === coin.id);
    return {
      ...coin,
      is_active: dbCoin?.is_active ?? 1,
      total_quantity: dbCoin?.total_quantity ?? 0,
      available_quantity: dbCoin?.available_quantity ?? 0,
    };
  });

  const sortedCoins = useMemo(() => {
    if (!debouncedSearch) return mergedCoins;
    const lower = debouncedSearch.toLowerCase();
    return [
      ...mergedCoins.filter((c) => c.name.toLowerCase().includes(lower)),
      ...mergedCoins.filter((c) => !c.name.toLowerCase().includes(lower)),
    ];
  }, [mergedCoins, debouncedSearch]);

  const toggleStatus = async (coinId, status) => {
    try {
      await axios.put(
        "http://localhost:5000/admin/disablecoin",
        { coinId, status },
        { withCredentials: true }
      );
      fetchDB();
    } catch (error) {
      console.log(error?.response?.message);
    }
  };

  return (
    <>
      {!id && (
        <div className="ad-coin-container">

          <div className="ad-coin-header">
            <h2>Cryptocurrencies</h2>

            <input
              className="ad-coin-search"
              type="text"
              placeholder="Search coin..."
              value={coinSearch}
              onChange={(e) => setcoinSearch(e.target.value)}
            />
          </div>

          <table className="ad-coin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Coin</th>
                <th>Symbol</th>
                <th>Price</th>
                <th>24h</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {sortedCoins.map((coin) => (
                <tr
                  key={coin.id}
                  onClick={() =>
                    navigate(`/admindashboard/cryptocurrencies/${coin.id}`, {
                      state: { coin },
                    })
                  }
                >
                  <td>{coin.market_cap_rank}</td>

                  <td className="ad-coin-name">
                    <img src={coin.image} alt="" />
                    {coin.name}
                  </td>

                  <td>{coin.symbol.toUpperCase()}</td>

                  <td>${coin.current_price}</td>

                  <td
                    className={
                      coin.price_change_percentage_24h > 0
                        ? "ad-coin-positive"
                        : "ad-coin-negative"
                    }
                  >
                    {coin.price_change_percentage_24h?.toFixed(2) || 0}%
                  </td>

                  <td>
                    <span
                      className={
                        coin.is_active
                          ? "ad-coin-status active"
                          : "ad-coin-status disabled"
                      }
                    >
                      {coin.is_active ? "Active" : "Disabled"}
                    </span>
                  </td>

                  <td>
                    <button
                      className={
                        coin.is_active
                          ? "ad-coin-btn-disable"
                          : "ad-coin-btn-enable"
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStatus(coin.id, coin.is_active ? 0 : 1);
                      }}
                    >
                      {coin.is_active ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default AdminCryptocurrencies;