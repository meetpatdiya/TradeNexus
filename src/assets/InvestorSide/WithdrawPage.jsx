import React, { useState, useEffect } from "react";
import axios from "axios";
import "./InvestorCoinDetail.css";

const WithdrawPage = ({ onClose, coin, onSuccess }) => {
  const [avlblqnty, setavlblqnty] = useState({});
  const [amount, setAmount] = useState("");
  useEffect(() => {
    const coinCheck = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/invest/withdrawcoincheck",
          {
            withCredentials: true,
            params: { gecko_id: coin.id },
          },
        );
        setavlblqnty(data);
      } catch (err) {
        console.log(err);
      }
    };

    coinCheck();
  }, [coin.id]);

  const withdrawQty = amount ? Number(amount) / Number(coin.current_price) : 0;

  let errorMsg = "";

  if (withdrawQty > avlblqnty.investor_quantity) {
    errorMsg = "Amount exceeds your investment";
  } else if (withdrawQty > avlblqnty.platform_quantity) {
    errorMsg = "Platform liquidity too low";
  }

  const handleWithdraw = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/withdrawcoin",
        {
          coin: coin.id,
          quantity: withdrawQty,
          amount,
          price: coin.current_price,
        },
        { withCredentials: true },
      );
      onSuccess(data.message, "success");
      onClose();
    } catch (error) {
        onSuccess(
          error.response?.data?.message || "Something went wrong",
          "error",
        );
        onClose();
      console.log(error);
    }
  };
  const isDisabled = !amount || withdrawQty <= 0 || errorMsg !== "";
  return (
    <div className="in-withd-overlay">
      <div className="in-withd-card">
        <div className="in-withd-header">
          <h2>Withdraw {coin.name}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="in-withd-info">
          <div>
            <p>Coin Price</p>
            <span>${coin.current_price}</span>
          </div>

          <div>
            <p>Your Holdings</p>
            <span>{avlblqnty.investor_quantity}</span>
          </div>

          <div>
            <p>Platform Pool</p>
            <span>{avlblqnty.platform_quantity}</span>
          </div>
        </div>

        <p className="in-withd-lock">
          Withdraw allowed after 30 day lock period
        </p>

        <div className="in-withd-input">
          <label>Withdraw Amount ($)</label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="in-withd-result">
          <p>You will withdraw</p>
          <h3>
            {withdrawQty.toFixed(8)} {coin.symbol.toUpperCase()}
          </h3>
        </div>

        {errorMsg && <p className="in-withd-error">{errorMsg}</p>}

        <button
          className="in-withd-btn"
          disabled={isDisabled}
          onClick={handleWithdraw}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default WithdrawPage;
