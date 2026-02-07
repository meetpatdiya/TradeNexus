import React, { useState, useEffect } from "react";
import axios from "axios";
const AdminFiatWallet = () => {
  const [fiatWalletData, setfiatWalletData] = useState([]);
  const [userId, setUserId] = useState("")
  const [type, setType] = useState("")
  const [amount, setAmount] = useState("")
  useEffect(() => {
    const getWalletData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/admin/getfiatwallet",
        );
        console.log(Array.isArray(data));
        setfiatWalletData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getWalletData();
  }, []);
  const adminAdjustment = async (e) => {
    e.preventDefault()
    console.log(userId , amount , type);
    
  };
  adminAdjustment();
  return (
    <>
      <form onSubmit={adminAdjustment}>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">Select Type</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
        {/* <input
          type="text"
          placeholder="Reason (optional)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        /> */}
        <button type="submit">Submit Adjustment</button>
      </form>

      {fiatWalletData.map((item, index) => (
        <div key={index}>
          <p>Id: {item.id}</p>
          <p>User Id:{item.user_id}</p>
          <p>
            {Number(item.balance) > 0
              ? `Balance: ${item.balance}`
              : "Not Deposited"}
          </p>
          <p>
            {item.bank_last_4
              ? `Bank Account: ********${item.bank_last_4}`
              : "Not entered last 4 digits"}
          </p>
          <p>Created at: {new Date(item.updated_at).toLocaleString("en-IN")}</p>
          <br />
        </div>
      ))}
    </>
  );
};

export default AdminFiatWallet;
