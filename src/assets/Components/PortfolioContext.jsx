import { createContext, useContext, useState } from "react";

const PortfolioContext = createContext();
export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState({}); 
  const buyCoin = (coinId, buyQty, buyPrice) => {
    setPortfolio(prev => {
      const coin = prev[coinId];

      if (!coin) {
        return {
          ...prev,
          [coinId]: { quantity: buyQty, avgBuyPrice: buyPrice }
        };
      }

      const totalCost =
        coin.quantity * coin.avgBuyPrice + buyQty * buyPrice;
      const newQty = coin.quantity + buyQty;

      return {
        ...prev,
        [coinId]: {
          quantity: newQty,
          avgBuyPrice: totalCost / newQty
        }
      };
    });
  };

  const sellCoin = (coinId, sellQty) => {
    setPortfolio(prev => {
      const coin = prev[coinId];
      if (!coin) return prev;

      const newQty = coin.quantity - sellQty;

      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[coinId];
        return updated;
      }

      return {
        ...prev,
        [coinId]: {
          ...coin,
          quantity: newQty
        }
      };
    });
  };

  return (
    <PortfolioContext.Provider value={{ setPortfolio , portfolio, buyCoin, sellCoin }}>
      {children}
    </PortfolioContext.Provider>
  );
};
