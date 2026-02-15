// import React, { useState } from "react";
// import axios from "axios";
// import { useWallet } from "../UserSide/WalletContext";

// const InvestWithdraw = ({ onClose, type, coin }) => {
//   const { balance, setBalance } = useWallet();
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const minInvestment = 100;
//   const isDisabled =
//     Number(amount) < minInvestment ||
//     Number(amount) > Number(balance) ||
//     !amount ||
//     loading;
//   const qty = Number(amount) / Number(coin.current_price);
//   const handleInvest = async () => {
//     const investData = async()=>{
//     try {
//         const {data} = await axios.post('http://localhost:5000/investCoin',{type:type,coin:coin.id,quantity:qty.toFixed(8),amount:amount},{withCredentials:true})
//         console.log(data);
//       }
//      catch (error) {
//       console.log(error);
//     }
//   }
//     investData()
//   };
//   if (type === "withdraw") return (
//     <>
//     <p>You will be able to withdraw after 30days of your investment</p>
//     </>
//   );
//   return (
//     <>
//       <div className="in-iw">
//         <p>Name: {coin.name}</p>
//         <p>Price: ${coin.current_price}</p>
//         <p>Minimum Investment: $100</p>
//         <p>Wallet Balance: ${balance}</p>
//         <p>Quantity you will get ${qty}</p>
//         <input
//           type="number"
//           placeholder="Enter amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />
//         <button disabled={isDisabled} onClick={() => handleInvest()}>
//           {loading ? "Investing..." : "Invest"}
//         </button>
//         {Number(amount) < minInvestment && amount && (
//           <p>Minimum investment is $100</p>
//         )}
//         {Number(amount) > balance && <p>Insufficient wallet balance</p>}
//       </div>
//       <button onClick={onClose}>Close</button>
//     </>
//   );
// };

// export default InvestWithdraw;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useWallet } from "../UserSide/WalletContext";

const InvestWithdraw = ({ onClose, type, coin }) => {
  const { balance, setBalance } = useWallet();
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
      const { data } = await axios.post(
        "http://localhost:5000/investCoin",
        {
          type,
          coin: coin.id,
          quantity: qty.toFixed(8),
          amount,
        },
        { withCredentials: true },
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="in-iw">
        <p>Name: {coin.name}</p>
        <p>Price: ${coin.current_price}</p>

        <p>Minimum Investment: $100</p>
        <p>Wallet Balance: ${balance}</p>

        <p>Quantity you will get: {amount ? qty.toFixed(8) : 0}</p>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button disabled={isDisabled} onClick={handleInvest}>
          {loading ? "Processing..." : "Invest"}
        </button>

        {Number(amount) < minInvestment && amount && (
          <p>Minimum investment is $100</p>
        )}

        {Number(amount) > balance && <p>Insufficient wallet balance</p>}
      </div>
      <button onClick={onClose}>Close</button>
    </>
  );
};

export default InvestWithdraw;
