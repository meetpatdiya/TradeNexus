import { useCoins } from "../UserSide/CoinsContext";
import React, { useState } from "react";
import "./InvestorCoins.css"
import { useNavigate } from "react-router-dom";
const InvestorCoins = () => {
  const { coins } = useCoins();
  const [showAll, setShowAll] = useState(false);
  const visibleCoins = showAll ? coins : coins.slice(0, 16);
  const navigate = useNavigate()
  return (
    <div className="in-cn-wrapper">
      <div className="in-cn-grid">
        {visibleCoins.map((coin,index) => (
          <div key={index} className="in-cn-card" onClick={() =>{ navigate(`/investordashboard/coin/${coin.id}`)}}>
            <img src={coin.image} alt={coin.name} className="in-cn-img" />
            <p className="in-cn-name">{coin.name}</p>
            <p className="in-cn-price">${coin.current_price}</p>
          </div>
        ))}
      </div>
      {coins.length > 16 && (
        <button
          className="in-cn-btn" 
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "View Less" : "View More"}
        </button>
      )}
    </div>
  );
};

export default InvestorCoins;
