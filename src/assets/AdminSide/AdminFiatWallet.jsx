import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminFiatWallet.css";
import LoaderToast from "../UserSide/LoaderToast";
const AdminFiatWallet = () => {
  const [fiatWalletData, setfiatWalletData] = useState([]);
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [userId, setuserId] = useState(0);
  const [transactiontype, setTransactionType] = useState("");
  const [status, setStatus] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [amountMessage, setamountMessage] = useState("");
  const [typeMessage, settypeMessage] = useState("");
  const [walletTransactionsData, setwalletTransactionsData] = useState(null);
  const [showAdjustment, setshowAdjustment] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    amount: "",
    type: "",
  });
  const getWalletData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/admin/getfiatwallet",
      );
      setfiatWalletData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWalletData();
  }, []);
  const handleViewTransactions = async (uId, tType, stat) => {
    if (!uId) return;

    try {
      const { data } = await axios.get(
        "http://localhost:5000/admin/wallettransaction",
        {
          params: {
            user_id: uId,
            type: tType || "",
            status: stat || "",
          },
          withCredentials: true,
        },
      );

      setwalletTransactionsData(data);
    } catch (error) {
      setwalletTransactionsData([]);
    }
  };

  const handleAdjustment = (userId) => {
    setuserId(userId);
    setshowAdjustment(true);
  };

  const handleAdjustmentCancel = () => {
    setshowAdjustment(false);
    setamountMessage("");
    settypeMessage("");
    setAmount("");
    setType("");
  };

  const handleAdjustmentSubmit = async () => {
    let isValid = true;

    if (!amount.trim()) {
      setamountMessage("Amount is empty");
      isValid = false;
    }

    if (!type) {
      settypeMessage("Please select Type");
      isValid = false;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      setamountMessage("Invalid amount");
      isValid = false;
    }

    if (!isValid) return;

    try {
      await axios.post(
        "http://localhost:5000/admin/adjustwallet",
        { userId, type, amount },
        { withCredentials: true },
      );
      setAlertData({ amount, type });
      setshowAlert(true);
      handleAdjustmentCancel();
      getWalletData();
    } catch (error) {
      console.log(error?.response);
    }
  };

  return (
    <div className="ad-wlt-container">
      <h1 className="ad-wlt-heading">Wallet Management</h1>
      <table className="ad-wlt-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Role</th>
            <th>Balance</th>
            <th>Bank</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fiatWalletData.map((item) => (
            <tr key={item.user_id}>
              <td>{item.user_id}</td>
              <td>{item.role}</td>
              <td>{item.balance}</td>
              <td>
                {item.bank_last_4 ? `********${item.bank_last_4}` : "Not Added"}
              </td>
              <td>{new Date(item.updated_at).toLocaleString("en-IN")}</td>
              <td>
                <button
                  className="ad-wlt-btn ad-wlt-view-btn"
                  onClick={() => {
                    const uId = item.user_id;
                    setSelectedUserId(uId);
                    setTransactionType("");
                    setStatus("");
                    handleViewTransactions(uId, "", "");
                  }}
                >
                  View
                </button>
                <button
                  className="ad-wlt-btn ad-wlt-adjust-btn"
                  onClick={() => handleAdjustment(item.user_id)}
                >
                  Adjust
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAdjustment && (
        <div className="ad-wlt-adjust-box">
          <h2>Wallet Adjustment</h2>

          <input
            type="number"
            className="ad-wlt-input"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p className="ad-wlt-error">{amountMessage}</p>

          <select
            className="ad-wlt-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
          <p className="ad-wlt-error">{typeMessage}</p>

          <div className="ad-wlt-adjust-actions">
            <button
              className="ad-wlt-btn ad-wlt-submit-btn"
              onClick={handleAdjustmentSubmit}
            >
              Submit
            </button>
            <button
              className="ad-wlt-btn ad-wlt-cancel-btn"
              onClick={handleAdjustmentCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {walletTransactionsData?.length > 0 && (
        <div className="ad-wlt-transaction-box">
          <h2>Transactions</h2>
          <button
            className="ad-wlt-btn ad-wlt-close-btn"
            onClick={() => setwalletTransactionsData([])}
          >
            Close
          </button>
          <select
            value={transactiontype}
            onChange={(e) => {
              const newType = e.target.value;
              const uId = selectedUserId;

              setTransactionType(newType);

              handleViewTransactions(uId, newType, status);
            }}
          >
            {" "}
            <option value="">All</option>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
            <option value="commission_withdraw">Commission</option>
          </select>
          <select
            value={status}
            onChange={(e) => {
              const newStatus = e.target.value;
              const uId = selectedUserId;

              setStatus(newStatus);

              handleViewTransactions(uId, transactiontype, newStatus);
            }}
          >
            {" "}
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <table className="ad-wlt-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Balance After</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {walletTransactionsData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.type}</td>
                  <td>{item.amount}</td>
                  <td>{item.status}</td>
                  <td>{item.balance_after}</td>
                  <td>{new Date(item.created_at).toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {walletTransactionsData?.length === 0 && (
        <div className="ad-wlt-transaction-box">
          <h2>No transactions Available for this user</h2>
        </div>
      )}
      {showAlert && (
        <LoaderToast
          message={` ${alertData.amount}$ is ${alertData.type}ed to id ${userId}`}
          type={"success"}
          shape={"lines"}
          onClose={() => setshowAlert(false)}
        />
      )}
    </div>
  );
};

export default AdminFiatWallet;
