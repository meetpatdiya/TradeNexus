import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState({});
 
  const fetchPortfolio = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/portfolio", {
        withCredentials: true,
      });
      console.log(data);
      setPortfolio(data);
    } catch (err) {
      console.error("Portfolio fetch failed");
    }
  };

  useEffect(() => {
    // if(!user) return;
    fetchPortfolio();
  }, []); 

  return (
    <PortfolioContext.Provider value={{ portfolio, fetchPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
