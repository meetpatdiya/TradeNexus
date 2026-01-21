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
  {coins.map((coin) => (
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