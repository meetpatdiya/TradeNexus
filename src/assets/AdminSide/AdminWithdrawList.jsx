import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminWithdrawList = () => {
  const [withdraws, setWithdraws] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState([]); 
  const [commission, setcommission] = useState([])
  const fetchWithdraws = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/wallet/trans/pending", { withCredentials: true } );
      console.log(data);      
      setWithdraws(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setWithdraws([]);
      setLoading(false);
    }
  };
  const fetchCommissionWithdraws = async()=>{
    try {
      const { data } = await axios.get("http://localhost:5000/admin/getcommissionpending", { withCredentials: true } );
      console.log(data);  
      setcommission(data)
    } catch (error) {
      console.log(error.response.message);
    }
  }
  useEffect(() => {
    fetchWithdraws();
    fetchCommissionWithdraws();
  }, []);

  const approveWithdraw = async (transactionId) => {
    try {
      setApproving((prev) => [...prev, transactionId]); 
      const res = await axios.post("http://localhost:5000/admin/withdraw/approve", { transactionId });
      alert(`Approved: ${res.data.withdraw_amount}, commission: ${res.data.commission}`);
      fetchWithdraws();
    } catch (err) {
      console.error(err);
      alert("Approval failed");
    } finally {
      setApproving((prev) => prev.filter((id) => id !== transactionId));
    }
  };
  const approveCommission = async(id)=>{
    try {
      const {data} = await axios.put("http://localhost:5000/admin/approvecommission",{transactionId:id},{withCredentials:true})
      console.log(data);
      fetchCommissionWithdraws()
    } catch (error) {
      console.log(error);
    }
  }
  if (loading) return <p>Loading...</p>;

  return (
    <>
    <div className="admin-withdraws">
      <h2>Pending Withdraws</h2>
      {withdraws.length === 0 ? (
        <p>No pending withdraws</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>User ID</th>
              <th>Withdraw Amount</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {withdraws.map((w) => (
              <tr key={w.id}>
                <td>{w.id}</td>
                <td>{w.user_id}</td>
                <td>{w.amount}</td>
                <td>
                  <button
                    onClick={() => approveWithdraw(w.id)}
                    disabled={approving.includes(w.id)}
                  >
                    {approving.includes(w.id) ? "Approving..." : "Approve"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    {commission.length == 0 ?(<p>No Investor Commission to approve</p>) : (
      <div>
        {commission.map((item,index)=>(
          <div key={index}>
            <p> {item.id} </p>
            <p>{item.user_id}</p>
            <p>{item.amount}</p>
            <button onClick={()=>approveCommission(item.id)}>Approve</button>
          </div>
        ))}
      </div>
    )}
    </>
  );
};

export default AdminWithdrawList;
