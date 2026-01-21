import React, { useEffect, useState } from "react";
import "./CoinDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useCoins } from "./CoinsContext";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { usePortfolio } from "./PortfolioContext";
import CoinDetailGraph from "./CoinDetailGraph";
import BuySellModel from "./BuySellModel";
import AlertBox from "./AlertBox";
import axios from 'axios'
axios.defaults.withCredentials = true;
const CoinDetails = ({}) => {
  const { id } = useParams();
  const { portfolio } = usePortfolio();
  const { coins, watchlist, toggleWatchlist } = useCoins();
  const [activeCoin, setActiveCoin] = useState(id);
  const [graphTime, setGraphTime] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const coin = coins.find((c) => c.id === id);
  const prices = coin?.sparkline_in_7d?.price || [];
  const data1D = prices.slice(-24);
  const data3D = prices.slice(-72);
  const data7D = prices.slice();
  // console.log(id);
  const handleTradeSuccess = (msg, type) => {
    setAlertData({ message: msg, type });
    setShowAlert(true);
  };
  useEffect(() => {
    if (prices.length) setGraphTime(prices.slice(-24));
  }, [prices]);
  const addToWatchList = async (coinId) => {
  try {
    const res = await axios.post("http://localhost:5000/watchlist", {
      coin_gecko_id: coinId});
    // console.log("Watchlist response:", res.data);
     toggleWatchlist(coin.id);
  } catch (err) {
    console.error("Watchlist error:", err.response?.data || err.message);
  }
};

  const ownedQty = portfolio[id]?.quantity || 0;

  const handleSell = () => {
    if (ownedQty <= 0) {
      setShowAlert(true);
      setAlertData({ message: "You must buy this coin first", type: "error" });
      return;
    }
    setType("sell");
    setShowModal(true);
  };

  const handleBuy = () => {
    setType("buy");
    setShowModal(true);
  };
  if (!coin) return <p>coin not avaiable...</p>;
  return (
    <>
      <div className="cd-container">
        <div className="cd-coin-names">
          {coins.map((item) => {
            return (
              <div
                key={item.id}
                className={
                  activeCoin === item.id ? "coin-item active" : "coin-item"
                }
                onClick={() => {
                  setActiveCoin(item.id);
                  navigate(`/coin/${item.id}`);
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
        <div className="cd-right">
          <div className="cd-coin-info">
            <div className="cd-img">
              <img src={coin.image} alt={coin.name} />
            </div>
            <h3>{coin.name}</h3>
            <h1>Price: ${coin.current_price}</h1>
            <p
              style={{
                color: coin.price_change_percentage_24h > 0 ? "green" : "red",
              }}
            >
              24h Change: {coin.price_change_percentage_24h}%
            </p>
            <p>
              <span>Market Cap :</span> {coin.market_cap}
            </p>
            <p>
              <span>Total Supply :</span> {coin.total_supply}
            </p>
            <p>
              <span>24h High :</span> ${coin.high_24h}
            </p>
            <p>
              <span>24h Low :</span> ${coin.low_24h}
            </p>
            <p>
              <span>All Time High :</span> ${coin.ath}
            </p>
            <p>
              <span>All Time Law :</span> ${coin.atl}
            </p>
            <p>
              <span>Circulating Supply :</span> {coin.circulating_supply}
            </p>
            <p>
              <span>Market Cap Rank :</span> #{coin.market_cap_rank}
            </p>
            <div className="cd-trade">
              <button onClick={handleBuy}>BUY</button>
              <button onClick={()=>handleSell()}>
                SELL
              </button>
            </div>
            <button onClick={()=>addToWatchList(coin.id)}>
              {" "}
              {watchlist.includes(coin.id) ? (
                <>
                  <FaBookmark /> Remove from Watchlist
                </>
              ) : (
                <>{<FaRegBookmark />}Add to Watchlist</>
              )}
            </button>
          </div>
          <div className="cd-graph">
            <div className="gp-buttons">
              <ul>
                <button onClick={() => setGraphTime(data7D)}>7 Days</button>
                <button onClick={() => setGraphTime(data3D)}>3 Days</button>
                <button onClick={() => setGraphTime(data1D)}>1 Day</button>
              </ul>
            </div>
            <CoinDetailGraph prices={graphTime} />
          </div>
        </div>
      </div>
      {showModal && (
        <BuySellModel
          coin={coin}
          type={type}
          onClose={() => setShowModal(false)}
          onSuccess={handleTradeSuccess}
        />
      )}
      {showAlert && (
        <AlertBox
          message={alertData.message}
          type={alertData.type}
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
};
export default CoinDetails;
