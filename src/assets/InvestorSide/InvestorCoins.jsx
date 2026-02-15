import { useCoins } from "../UserSide/CoinsContext";
import React, { useState, useMemo } from "react";
import "./InvestorCoins.css";
import { useNavigate } from "react-router-dom";

const InvestorCoins = () => {
  const { coins } = useCoins();
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredCoins = useMemo(() => {
    if (!search) return coins;

    const lower = search.toLowerCase();

    const matched = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(lower)
    );

    const others = coins.filter(
      (coin) =>
        !coin.name.toLowerCase().includes(lower) 
    );

    return [...matched, ...others];
  }, [coins, search]);

  const visibleCoins = showAll ? filteredCoins : filteredCoins.slice(0, 16);

  return (
    <div className="in-cn-wrapper">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search coin..."
        className="in-cn-search"
      />

      <div className="in-cn-grid">
        {visibleCoins.map((coin, index) => {
          const isMatched =
            search &&
            (coin.name.toLowerCase().includes(search.toLowerCase()));

          return (
            <div
              key={index}
              className={`in-cn-card ${isMatched ? "in-cn-card-highlight" : ""}`}
              onClick={() => navigate(`/investordashboard/coin/${coin.id}`)}
            >
              <img src={coin.image} alt={coin.name} className="in-cn-img" />
              <p className="in-cn-name">{coin.name}</p>
              <p className="in-cn-price">${coin.current_price}</p>
            </div>
          );
        })}
      </div>

      {coins.length > 16 && (
        <button className="in-cn-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "View Less" : "View More"}
        </button>
      )}
    </div>
  );
};

export default InvestorCoins;
