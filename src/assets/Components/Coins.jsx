import "./Coins.css";
import React, { useEffect, useState } from "react";
import { getBasicData } from "../ApiServices/CryptoApiCalls";
import CoinRows from "./CoinRows";
import { useNavigate } from "react-router-dom";
const Coins = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    const getCoinInfo = async () => {
      const data = await getBasicData();
      setCoins(data);
    };
    getCoinInfo();
  }, []);

  return (

<>
<div className="coins-container">
    <div className="coin-header">
    <span>#</span>
    <span>Coin</span>
    <span>Price</span>
    <span>1h</span>
    <span>24h</span>
    <span>7d</span>
    <span>24h Volume</span>
    <span>Market Cap</span>
    <span>Last 7 Days</span>
  </div>
  {coins.map((coin,index) => (
    // <div className="coin-row" onClick={() =>{ navigate(`/coin/${coin.id}`)}} key={coin.id}>

    //   <div className="coin-rank">{coin.market_cap_rank}</div>

    //   <div className="coin-info">
    //     <img src={coin.image} alt={coin.name} />
    //     <span className="coin-name">
    //       {coin.name}
    //       <small>{coin.symbol.toUpperCase()}</small>
    //     </span>
    //   </div>

    //   <div className="coin-price">
    //     ${coin.current_price.toLocaleString()}
    //   </div>

    //   <div className={`coin-change ${coin.price_change_percentage_1h_in_currency < 0 ? "red" : "green"}`}>
    //     {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
    //   </div>

    //   <div className={`coin-change ${coin.price_change_percentage_24h < 0 ? "red" : "green"}`}>
    //     {coin.price_change_percentage_24h?.toFixed(2)}%
    //   </div>

    //   <div className={`coin-change ${coin.price_change_percentage_7d_in_currency < 0 ? "red" : "green"}`}>
    //     {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
    //   </div>

    //   <div className="coin-volume">
    //     ${coin.total_volume.toLocaleString()}
    //   </div>

    //   <div className="coin-marketcap">
    //     ${coin.market_cap.toLocaleString()}
    //   </div>

    //   <div className="coin-chart">
    //     <CoinCharts
    //       prices={coin.sparkline_in_7d.price}
    //       change={coin.price_change_percentage_24h}
    //     />
    //   </div>
    // </div>
    <CoinRows
    key={coin.id}
    coin={coin}
  />
  ))}
</div>
</>
  );
};

export default Coins;