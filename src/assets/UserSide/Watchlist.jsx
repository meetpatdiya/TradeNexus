import { useCoins } from "./CoinsContext";
import CoinRows from "./CoinRows";
import { FiX } from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";
import "./Watchlist.css";
import { useEffect } from "react";
import EmptyList from "../Images/EmptyList.svg";
import axios from "axios";
import { useState } from "react";
const Watchlist = () => {
  const [watchlistCoin, setwatchlistCoin] = useState([]);
  const { coins, watchlist, toggleWatchlist } = useCoins();
  useEffect(() => {
    const getWatchlistData = async () => {
      const { data } = await axios.get("http://localhost:5000/watchlist");
      setwatchlistCoin(data);
    };
    getWatchlistData();
  }, [watchlist]);
  const navigate = useNavigate();
  const watchlistCoins = coins.filter((c) => watchlistCoin.includes(c.id));
  const removeCoin = async (coinId) => {
    await axios.post("http://localhost:5000/watchlist", {
      coin_gecko_id: coinId,
    });
    setwatchlistCoin((prev) => prev.filter((id) => id !== coinId));
  };
  if (watchlistCoin.length === 0) {
    return (
      <div className="empty-state">
        <img src={EmptyList} alt="" className="empty-svg" />
        <h3>Your watchlist is empty</h3>
        <p>Add coins to track the market 📈</p>
        <button
          className="watch-coins-btn"
          onClick={() => navigate("/coin/bitcoin")}
        >
          ➕ Add Coins
        </button>
      </div>
    );
  }
  return (
    <div>
      <h2 className="watchlist-title">My Watchlist</h2>
      {watchlistCoins.map((coin, i) => (
        <div className="watchlist-row">
          <CoinRows key={i} coin={coin} />
          <button onClick={() => removeCoin(coin.id)} className="watchlist-btn">
            <FiX />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;