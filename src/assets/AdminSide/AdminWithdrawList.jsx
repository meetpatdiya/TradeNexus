import React, { useEffect, useState } from "react";
import axios from "axios";
import LoaderToast from "../UserSide/LoaderToast";
const AdminWithdrawList = () => {
  const [withdraws, setWithdraws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState([]);
  const [commission, setcommission] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [loaderMessage, setloaderMessage] = useState("")
  const fetchWithdraws = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/wallet/trans/pending",
        { withCredentials: true },
      );
      console.log(data);
      setWithdraws(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setWithdraws([]);
      setLoading(false);
    }
  };
  const fetchCommissionWithdraws = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/admin/getcommissionpending",
        { withCredentials: true },
      );
      console.log(data);
      setcommission(data);
    } catch (error) {
      console.log(error.response.message);
    }
  };
  useEffect(() => {
    fetchWithdraws();
    fetchCommissionWithdraws();
  }, []);

  const approveWithdraw = async (transactionId) => {
    try {
      setApproving((prev) => [...prev, transactionId]);
      const res = await axios.post(
        "http://localhost:5000/admin/withdraw/approve",
        { transactionId },
        { withCredentials: true },
      );
      setloaderMessage("Withdrawal request approved successfully.")
      setisLoading(true);
      fetchWithdraws();
    } catch (err) {
      console.error(err);
      alert("Approval failed");
    } finally {
      setApproving((prev) => prev.filter((id) => id !== transactionId));
    }
  };
  const approveCommission = async (id) => {
    try {
      const { data } = await axios.put(
        "http://localhost:5000/admin/approvecommission",
        { transactionId: id },
        { withCredentials: true },
      );
      console.log(data);
       setloaderMessage("Investor commission withdrawal approved successfully.")
      setisLoading(true);
      fetchCommissionWithdraws();
    } catch (error) {
      console.log(error);
    }
  };
  const rejectWithdraw = async (id) => {
    try {
      await axios.post(
        "http://localhost:5000/admin/withdraw/reject",
        { transactionId: id },
        { withCredentials: true },
      );
      setloaderMessage("Withdrawal request rejected successfully.")
      setisLoading(true);
      fetchWithdraws();
    } catch (err) {
      console.error(err);
      alert("Approval failed");
    }
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div className="ad-wtl-container">
      <div className="ad-wtl-card">
        <div className="ad-wtl-header">
          <h2>Pending Withdraw Requests</h2>
        </div>

        {withdraws.length === 0 ? (
          <div className="ad-wtl-empty">No pending withdraws</div>
        ) : (
          <div className="ad-wtl-table-wrapper">
            <table className="ad-wtl-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Approve</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {withdraws.map((w) => (
                  <tr key={w.id}>
                    <td>#{w.id}</td>
                    <td>{w.user_id}</td>
                    <td>{w.name}</td>
                    <td className="ad-wtl-amount">${w.amount}</td>
                    <td>
                      <button
                        className="ad-wtl-btn ad-wtl-approve"
                        onClick={() => approveWithdraw(w.id)}
                        disabled={approving.includes(w.id)}
                      >
                        {approving.includes(w.id) ? "Processing..." : "Approve"}
                      </button>
                    </td>

                    <td>
                      <button
                        className="ad-wtl-btn ad-wtl-reject"
                        onClick={() => rejectWithdraw(w.id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="ad-wtl-card">
        <div className="ad-wtl-header">
          <h2>Investor Commission Requests</h2>
        </div>

        {commission.length === 0 ? (
          <div className="ad-wtl-empty">No commission requests</div>
        ) : (
          <div className="ad-wtl-table-wrapper">
            <table className="ad-wtl-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Investor ID</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {commission.map((item) => (
                  <tr key={item.id}>
                    <td>#{item.id}</td>
                    <td>{item.investor_id}</td>
                    <td>{item.name}</td>
                    <td className="ad-wtl-amount">${item.amount}</td>
                    <td>
                      <button
                        className="ad-wtl-btn ad-wtl-approve"
                        onClick={() => approveCommission(item.id)}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {isLoading && (
        <LoaderToast
          message={loaderMessage}
          type={"success"}
          onClose={() => setisLoading(false)}
          shape={"dots"}
        />
      )}
    </div>
  );
};

export default AdminWithdrawList;
