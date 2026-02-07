import { createContext, useContext, useState,useEffect } from "react";
import axios from "axios";
const WalletContext = createContext();
export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await axios.get("http://localhost:5000/wallet", { withCredentials: true });
        console.log(res);
        setBalance(res.data.balance);
      } catch (err) {
        console.error(err);
      }  
    };
    fetchWallet();
  }, [balance]);
   const deposit = (amount) => {
    setBalance((prev) => prev + amount);
  };

  const withdraw = (amount) => {
    setBalance((prev) => prev - amount);
  };

  return (
    <WalletContext.Provider value={{ balance,setBalance , deposit , withdraw }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
