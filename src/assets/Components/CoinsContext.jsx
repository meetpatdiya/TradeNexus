// context/CoinsContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h,24h,7d"
    )
      .then(res => res.json())
      .then(data => setCoins(data));
    //  const getCoinInfo = async () => {
    //       const data = await getBasicData();
    //       setCoins(data);
    //       console.log(data)
    //     };
        // getCoinInfo();
  }, []);
const coinNames = coins.map(c => c.name);
  return (
    <CoinsContext.Provider value={{ coins , coinNames}}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => useContext(CoinsContext);
