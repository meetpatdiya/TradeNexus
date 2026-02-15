import React, { useState, useEffect } from "react";
import axios from "axios";

const WithdrawPage = ({ onClose, type, coin }) => {
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
    errorMsg = "Entered amount exceeds your invested quantity";
  } else if (withdrawQty > avlblqnty.platform_quantity) {
    errorMsg = "Entered amount exceeds platform available quantity";
  }
  const handleWithdraw = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/withdrawcoin",
        { coin: coin.id, quantity: amount / coin.current_price, amount: amount },
        { withCredentials: true },
      );
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  };
  const isDisabled = !amount || withdrawQty <= 0 || errorMsg !== "";

  return (
    <div>
      <p>You can withdraw only after 30 days of investment</p>

      <p>Coin price: {coin.current_price}</p>
      <p>You have invested: {avlblqnty.investor_quantity}</p>
      <p>Platform pool: {avlblqnty.platform_quantity}</p>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <p>Quantity you withdraw: {withdrawQty}</p>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <button disabled={isDisabled} onClick={() => handleWithdraw()}>
        Withdraw
      </button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default WithdrawPage;
