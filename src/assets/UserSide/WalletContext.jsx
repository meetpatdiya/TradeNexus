import { createContext, useContext, useState, useEffect } from "react";
const WalletContext = createContext();
import api from "../ApiServices/Api";
export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const { data } = await api.get("/wallet")
        console.log(data);
        setBalance(data.balance[0].balance);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWallet();
  }, []);
  const fetchWallet = async () => {
    try {
      const {data} = await api.get("/wallet");
      setBalance(data.balance[0].balance);
    } catch (err) {
      console.error(err);
    }
  };
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
