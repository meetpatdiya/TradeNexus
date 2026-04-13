import "./Coins.css";
import React, { useEffect, useState, useMemo } from "react";
import { useCoins } from "./CoinsContext";
import CoinRows from "./CoinRows";
const Coins = () => {
  const [search, setsearch] = useState("");
  const { coins } = useCoins();
  const [debouncedSearch, setDebouncedSearch] = useState("");
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 300);

  return () => clearTimeout(timer);
}, [search]);
const top50 = useMemo(() => coins.slice(0, 50), [coins]);

const displayedCoins = useMemo(() => {
  if (!debouncedSearch) return top50;

  const lower = debouncedSearch.toLowerCase();
  return top50.filter((coin) =>
    coin.name.toLowerCase().includes(lower)
  );
}, [top50, debouncedSearch]);
   return (
    <>
    <div className="search-cont">
      <input
        type="text"
        value={search}
         placeholder="Search coins (e.g. Bitcoin, ETH...)"
        className="coins-search"
        onChange={(e) => setsearch(e.target.value)
        }
      />
    </div>
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
        {displayedCoins.map((coin) => (
          <CoinRows key={coin.id} coin={coin} search={debouncedSearch} />
        ))}
      </div>
    </>
  );
};

export default Coins;
