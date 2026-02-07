import React,{useState,useEffect} from 'react'
import axios from 'axios'
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
    <>
      hey i will show transaction of a investor that will occur here
      {transactionData.map((item,index)=>(
        <div key={index}>
            <p></p>{item.crypto_name}
            <p></p>{item.type}
            <p></p>{item.quantity}
            <p></p>{item.amount}
            <p></p>{item.created_at}
        </div>
      ))}
    </>
  )
}

export default InvestorTransaction
