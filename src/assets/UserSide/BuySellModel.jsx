import { useState } from "react";
import { IoClose } from "react-icons/io5";
import "./BuySellModel.css";
import { useWallet } from "./WalletContext";
import { usePortfolio } from "./PortfolioContext";
const BuySellModal = ({ coin, type, onClose, onSuccess }) => {
  const price = coin.current_price;
  const { balance, setBalance } = useWallet();
  const { portfolio, buyCoin, sellCoin } = usePortfolio();
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

  const setPercent = (p) => {
    setMode("amount");
    setValue(((balance * p) / 100).toFixed(2));
  };
  const confirmBuy = () => {
    if (type === "buy" && isBuyInvalid) return;
    if (type === "sell" && isSellInvalid) return;
    if (type == "buy") {
      buyCoin(coin.id, quantity, coin.current_price);
      setBalance((prev) => prev - total);
      onSuccess("Congratulations! Coin bought successfully 🎉", "success");
      onClose();
    }
    if (type == "sell") {
      if (quantity > ownedQty) return;
      sellCoin(coin.id, quantity);
      setBalance((prev) => prev + total);
      onSuccess("Congratulations! Coin sold successfully 🎉", "success");
      onClose();
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
        <p>Balance: ${balance.toFixed(2)}</p>
        <p>Avilabel Quantity : {portfolio?.[coin.id]?.quantity ?? 0.00}</p>
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
          onClick={() => confirmBuy()}
        >
          Confirm {type === "buy" ? "Buy" : "Sell"}
        </button>
      </div>
    </div>
  );
};

export default BuySellModal;
