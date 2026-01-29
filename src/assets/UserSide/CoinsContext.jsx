// context/CoinsContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  // const toggleWatchlist = (id) => {
  //   setWatchlist(prev =>
  //   prev.includes(id)
  //     ? prev.filter(c => c !== id)
  //     : [...prev, id]
  // );
  // };
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h,24h,7d"
    )
    .then(res => res.json())
    .then(data => setCoins(data));
   
  }, []);
const toggleWatchlist = (coinId) => {
  setWatchlist(prev => {
    if (prev.includes(coinId)) {
      return prev.filter(id => id !== coinId);
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


  //  const getCoinInfo = async () => {
    //       const data = await getBasicData();
    //       setCoins(data);
    //       console.log(data)
    //     };
    // getCoinInfo();