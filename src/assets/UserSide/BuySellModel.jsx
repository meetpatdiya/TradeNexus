import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import "./BuySellModel.css";
import { useWallet } from "./WalletContext";
import { usePortfolio } from "./PortfolioContext";

const BuySellModal = ({ coin, type, onClose, onSuccess }) => {
  const price = coin.current_price;
  const { balance, setBalance } = useWallet();
  const { portfolio } = usePortfolio();
  const [mode, setMode] = useState("amount");
  const [value, setValue] = useState("");
  const feePercent = 0.2;
  const amount = mode === "amount" ? Number(value) : Number(value) * price;
  const quantity = mode === "quantity" ? Number(value) : amount / price;
  const fee = (amount * feePercent) / 100;
  const total = amount + (type === "buy" ? fee : -fee);
  const ownedQty = portfolio[coin.id]?.quantity || 0;
  const isBuyInvalid = amount <= 0 || total > balance;
  const isSellInvalid = amount <= 0 || quantity > ownedQty;
  const { fetchPortfolio } = usePortfolio();
  useEffect(() => {
    const getwalletData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/wallet", {
          withCredentials: true,
        });
        console.log(data);
        setBalance(Number(data.balance));
        if (data.bank_last_4 === null) setHasEnteredAccDigits(false);
      } catch (err) {
        console.log("Error fetching wallet:", err);
      }
    };
    getwalletData();
  }, []);
  const setPercent = (p) => {
    setMode("amount");
    setValue(((balance * p) / 100).toFixed(2));
  };

  const confirmTrade = async () => {
    if ((type === "buy" && isBuyInvalid) || (type === "sell" && isSellInvalid))
      return;

    try {
      const { data } = await axios.post(
        "http://localhost:5000/trade",
        {
          coin_id: coin.id,
          quantity,
          price,
          total,
          type,
        },
        { withCredentials: true },
      );
      setBalance(data.newBalance);
      onSuccess((msg, status) => {
        fetchPortfolio(); 
        setShowAlert({ msg, status });
        setSelectedCoin(null);
      });
      onClose();
    } catch (err) {
      console.log(err);
         console.log(err.response.data);
      onSuccess(err.response?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="bs-overlay">
      <div className="bs-modal">
        <IoClose size={22} className="bs-close" onClick={onClose} />
        <h2>
          {type.toUpperCase()} {coin.symbol.toUpperCase()}
        </h2>
        <p>Price: ${price}</p>
        <p>Balance: ${balance}</p>
        <p>Available Quantity: {ownedQty}</p>

        <div className="bs-toggle">
          <button
            className={mode === "amount" ? "active" : ""}
            onClick={() => setMode("amount")}
          >
            Amount
          </button>
          <button
            className={mode === "quantity" ? "active" : ""}
            onClick={() => setMode("quantity")}
          >
            Quantity
          </button>
        </div>

        <input
          type="number"
          className="bs-input"
          placeholder={mode === "amount" ? "Enter amount $" : "Enter quantity"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="bs-quick">
          {[25, 50, 75, 100].map((p) => (
            <button key={p} onClick={() => setPercent(p)}>
              {p}%
            </button>
          ))}
        </div>

        <div className="bs-summary">
          <p>Quantity: {quantity.toFixed(10)}</p>
          <p>Fee: ${fee.toFixed(2)}</p>
          <p>Total: ${total.toFixed(2)}</p>
        </div>

        {type === "buy" && isBuyInvalid && (
          <p className="bs-error">Insufficient balance</p>
        )}
        {type === "sell" && isSellInvalid && (
          <p className="bs-error">Insufficient quantity</p>
        )}

        <button
          className="bs-confirm"
          disabled={type === "buy" ? isBuyInvalid : isSellInvalid}
          onClick={confirmTrade}
        >
          Confirm {type === "buy" ? "Buy" : "Sell"}
        </button>
      </div>
    </div>
  );
};
export default BuySellModal;