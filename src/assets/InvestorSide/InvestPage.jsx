import React, { useState } from "react";
import axios from "axios";
import { useWallet } from "../UserSide/WalletContext";
import "./InvestorCoinDetail.css";
const InvestWithdraw = ({ onClose, type, coin ,onSuccess}) => {
  const { balance } = useWallet();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const minInvestment = 100;
  const qty = Number(amount) / Number(coin.current_price);
  const isDisabled =
    loading ||
    !amount ||
    Number(amount) > Number(balance) ||
    Number(amount) < minInvestment;

  const handleInvest = async () => {
    try {
      setLoading(true);
      const {data} = await axios.post(
        "http://localhost:5000/investCoin",
        {
          type,
          coin: coin.id,
          quantity: qty.toFixed(8),
          amount,
          price: coin.current_price,
        },
        { withCredentials: true }
      );
      onSuccess(data.message, "success")
      onClose()
    } catch (err) {
      console.log(err);
      onSuccess(err.response?.data?.message || "Something went wrong", "error");
      onClose()
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="in-invst-overlay">

      <div className="in-invst-card">

        <div className="in-invst-header">
          <h2>Invest in {coin.name}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="in-invst-info">

          <div>
            <p>Price</p>
            <span>${coin.current_price}</span>
          </div>

          <div>
            <p>Wallet Balance</p>
            <span>${balance}</span>
          </div>

          <div>
            <p>Minimum</p>
            <span>$100</span>
          </div>

        </div>
        <div className="in-invst-btns">
          {[25, 50, 75, 100].map((p) => (
            <button key={p} className="in-invst-b" onClick={() => setAmount(balance *(p /100))}>
              {p}%
            </button>
          ))}
        </div>
        <div className="in-invst-input">

          <label>Investment Amount ($)</label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="in-invst-result">
          <p>You will receive</p>
          <h3>{amount ? qty.toFixed(8) : 0} {coin.symbol.toUpperCase()}</h3>
        </div>

        {Number(amount) < minInvestment && amount && (
          <p className="in-invst-error">Minimum investment is $100</p>
        )}

        {Number(amount) > balance && (
          <p className="in-invst-error">Insufficient wallet balance</p>
        )}

        <button
          className="in-invst-btn"
          disabled={isDisabled}
          onClick={handleInvest}
        >
          {loading ? "Processing..." : "Confirm Investment"}
        </button>
      </div>
    </div>
  );
};

export default InvestWithdraw;