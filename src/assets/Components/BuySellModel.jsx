import { useState } from "react";
import { IoClose } from "react-icons/io5";
import "./BuySellModel.css";
import { useWallet } from "./WalletContext";
import AlertBox from "./AlertBox";
const BuySellModal = ({ coin, type, onClose , onSuccess }) => {
  const price = coin.current_price;
  const {balance , setBalance} = useWallet();
  const feePercent = 0.2;
  const [mode, setMode] = useState("amount");
  const [value, setValue] = useState("");
  const amount =
    mode === "amount" ? Number(value) : Number(value) * price;

  const quantity =
    mode === "quantity" ? Number(value) : amount / price;

  const fee = (amount * feePercent) / 100;
  const total = amount + fee;

  const invalid = amount <= 0 || total > balance;

  const setPercent = (p) => {
    setMode("amount");
    setValue(((balance * p) / 100).toFixed(2));
  };
  const confirmBuy = ()=>{
   if (invalid) return;
  if (type === "buy") {
    setBalance(prev => prev - total);
    onSuccess("Congratulations! Coin bought successfully 🎉", "success");
  }
  onClose();
  }
  return (
    <div className="bs-overlay">
      <div className="bs-modal">
        <IoClose size={22} className="bs-close" onClick={onClose} />

        <h2>{type.toUpperCase()} {coin.symbol.toUpperCase()}</h2>
        <p>Price: ${price}</p>
        <p>Balance: ${balance.toFixed(2)}</p>

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
          {[25, 50, 75, 100].map(p => (
            <button key={p} onClick={() => setPercent(p)}>{p}%</button>
          ))}
        </div>  

        <div className="bs-summary">
          <p>Quantity: {quantity.toFixed(10)}</p>
          <p>Fee: ${fee.toFixed(2)}</p>
          <p>Total: ${total.toFixed(2)}</p>
        </div>

        {invalid && <p className="bs-error">Invalid amount or insufficient balance</p>}
        <button className="bs-confirm" disabled={invalid} onClick={()=>confirmBuy()}>
          Confirm {type === "buy" ? "Buy" : "Sell"}
        </button>
      </div>
    </div>
  );
};

export default BuySellModal;
