import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useSearchParams } from "react-router-dom";

const AdminWalletTransaction = () => {

  const [WlTransData, setWlTransData] = useState([])
  const [type, setType] = useState("")   
  const [status, setStatus] = useState("") 
  const [userId, setUserId] = useState("") 
  const [, setSearchParams] = useSearchParams();
  useEffect(() => {
  const getWlTransData = async () => {
    try {
      const params = {}
      if (type) params.type = type
      if (status) params.status = status
      if (userId) params.user_id = userId

      setSearchParams(params)

      const { data } = await axios.get(
        "http://localhost:5000/admin/wallettransaction",
        { params }
      )

      setWlTransData(data)
    } catch (error) {
      console.log(error)
    }
  }

  getWlTransData()
}, [type, status, userId])

  return (
    <>
      <select onChange={(e) => setType(e.target.value)}>
        <option value="">All</option>
        <option value="deposit">Deposit</option>
        <option value="withdraw">Withdraw</option>
      </select>
      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <input
        placeholder="User ID"
        onChange={(e) => setUserId(e.target.value)}
      />

      <div className="wl-trsn">
        {WlTransData.map((item) => (
          <div className="wl-trans-data" key={item.id}>
            <p>Id: {item.id}</p>
            <p>User Id: {item.user_id}</p>
            <p>Type: {item.type}</p>
            <p>Amount: {item.amount}</p>
            <p>Status: {item.status}</p>
            <p>Balance after: {item.balance_after}</p>
            <p>
              Created At: {new Date(item.created_at).toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdminWalletTransaction
