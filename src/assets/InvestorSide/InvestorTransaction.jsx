
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import "./InvestorTransaction.css";

const InvestorTransaction = () => {
    const [transactionData, settransactionData] = useState([])
    useEffect(() => {
       const getTransactionData = async()=>{
        try {
           const {data} = await axios.get("http://localhost:5000/invest/transactions",{withCredentials:true}) 
           console.log(data);
           settransactionData(data)
        } catch (error) {
           console.log(error);
        }
        }
        getTransactionData()
    }, [])
  
  return (
  <div className="transaction-page">
    <h2 className="transaction-title">Investment Transactions</h2>
    <div className="transaction-table">
      <div className="transaction-header">
        <span>Coin</span>
        <span>Type</span>
        <span>Price </span>
        <span>Quantity</span>
        <span>Amount ($)</span>
        <span>Date</span>
      </div>

      {transactionData.map((item, index) => (
        <div className="transaction-row" key={index}>
          <span>{item.crypto_name}</span>
          <span className={item.type === "invest" ? "type-invest" : "type-withdraw"}>
            {item.type}
          </span>
          <span>${Number(item.price).toFixed(2)}</span>
          <span>{Number(item.quantity).toFixed(6)}</span>
          <span>${item.amount}</span>
          <span>{new Date(item.created_at).toLocaleDateString()}</span>
        </div>
      ))}

    </div>
  </div>
);
}

export default InvestorTransaction