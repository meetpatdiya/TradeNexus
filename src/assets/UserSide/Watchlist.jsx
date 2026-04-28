import { useCoins } from "./CoinsContext";
import CoinRows from "./CoinRows";
import { FiX } from "react-icons/fi";
import {  useNavigate } from "react-router-dom";
import "./Watchlist.css";
import { useEffect } from "react";
import EmptyList from "../Images/EmptyList.svg";
import axios from "axios";
import { useState } from "react";
import api from "../ApiServices/Api";
import Loader from "./Loader";
const Watchlist = () => {
  const [watchlistCoin, setwatchlistCoin] = useState([]);
  const { coins, watchlist } = useCoins();
  const [loading, setloading] = useState(true)
  useEffect(() => {
    const getWatchlistData = async () => {
      const {data} = await api.get("/watchlist")
      setwatchlistCoin(data);
      setloading(false)
    };
    getWatchlistData();
  }, [watchlist]);
  const navigate = useNavigate();
  const watchlistCoins = coins.filter((c) => watchlistCoin.includes(c.id));
  const removeCoin = async (coinId) => {
    await api.post('/watchlist',{coin_gecko_id:coinId})
    setwatchlistCoin((prev) => prev.filter((id) => id !== coinId));
  };
  if (!loading && watchlistCoin.length === 0) {
    return (
      <div className="empty-state">
        <img src={EmptyList} alt="" className="empty-svg" />
        <h3>Your watchlist is empty</h3>
        <p>Add coins to track the market 📈</p>
        <button
          className="watch-coins-btn"
          onClick={() => navigate("/userdashboard/coin/bitcoin")}
        >
          ➕ Add Coins
        </button>
      </div>
    );
  }
  return (
    <div className="watchlist-container">
      {loading ? <Loader/>:<>
      <h2 className="watchlist-title">My Watchlist</h2>
      <div className="coins-container">
      {watchlistCoins.map((coin, i) => (
        <div className="watchlist-row">
          <CoinRows key={i} coin={coin} />
          <button onClick={() => removeCoin(coin.id)} className="watchlist-btn">
            <FiX />
          </button>
        </div>
      ))}
      </div>
      </>
}
    </div>
  );
};

export default Watchlist;