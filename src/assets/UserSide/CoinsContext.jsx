import { createContext, useContext, useEffect, useState,useRef } from "react";
import api from "../ApiServices/Api";
const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  // console.log("it is rendering");
  const lastFetchRef = useRef(0);
  useEffect(() => {
    const now = Date.now();
    if (coins.length && now - lastFetchRef.current < 60_000) return;
    const fetchCoins = async () => {
      try {
        const cached = sessionStorage.getItem("coingecko_cache");
        const cacheTime = sessionStorage.getItem("coingecko_cache_time");
        if (cached && cacheTime && now - parseInt(cacheTime) < 60000) {
          setCoins(JSON.parse(cached));
          lastFetchRef.current = Date.now();
          return;
        }

        const res = await api.get("/proxy/coins");
        const data = res.data;
        setCoins(data);
        sessionStorage.setItem("coingecko_cache", JSON.stringify(data));
        sessionStorage.setItem("coingecko_cache_time", Date.now().toString());
        lastFetchRef.current = Date.now();
      } catch (e) {
        console.error("CoinGecko API Error:", e);
        const cached = sessionStorage.getItem("coingecko_cache");
        if (cached) setCoins(JSON.parse(cached));
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
