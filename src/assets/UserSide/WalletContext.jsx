import { createContext, useContext, useState, useEffect } from "react";
import api from "../ApiServices/Api";
const WalletContext = createContext();
export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const fetchWallet = async () => {
    try {
      const {data} = await api.get("/wallet");
      setBalance(data.balance[0].balance);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchWallet();
  }, []);
  const deposit = (amount) => {
    setBalance((prev) => prev + amount);
  };

  const withdraw = (amount) => {
    setBalance((prev) => prev - amount);
  };

  return (
    <WalletContext.Provider value={{ balance,fetchWallet, setBalance, deposit, withdraw }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
