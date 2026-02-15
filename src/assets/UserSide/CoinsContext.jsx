// context/CoinsContext.jsx
import { createContext, useContext, useEffect, useState,useRef } from "react";
import axios from "axios";
const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  console.log("it is rendering");
  
  const lastFetchRef = useRef(0);
  useEffect(() => {
    const now = Date.now();
    if (coins.length && now - lastFetchRef.current < 60_000) return;
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h,24h,7d",
        );
        const data = await res.json();
        setCoins(data);
        lastFetchRef.current = Date.now();
      } catch (e) {
        console.error(e);
      }
    };
    fetchCoins();
     const interval = setInterval(fetchCoins, 60_000); 

  return () => clearInterval(interval); 
  }, []);

  const toggleWatchlist = (coinId) => {
    setWatchlist((prev) => {
      if (prev.includes(coinId)) {
        return prev.filter((id) => id !== coinId);
      } else {
        return [...prev, coinId];
      }
    });
  };

  return (
    <CoinsContext.Provider value={{ coins, watchlist, toggleWatchlist }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => useContext(CoinsContext);
