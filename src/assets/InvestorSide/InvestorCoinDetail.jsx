import React,{useState,useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useCoins } from "../UserSide/CoinsContext";
import InvestWithdraw from './InvestWithdraw';
import "./InvestorCoinDetail.css"
import axios from 'axios';
const InvestorCoinDetail = () => {
  const [showModel, setshowModel] = useState(false)
  const [withdrawcheck, setwithdrawcheck] = useState([])
  const [type, settype] = useState("")
    const { id } = useParams();
    const { coins } = useCoins();
   const coin = coins.find(c => c.id === id);
useEffect(() => {
  if (!coin) return;
  const withdrawCheck = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/invest/withdrawcheck",
      {
        withCredentials: true,
        params: { crypto_name: coin.id }
      }
    );
    console.log(data);
    setwithdrawcheck(data);
  };

  withdrawCheck();
}, [coin]);

    const handleInvest = async ()=>{
      setshowModel(true)
      settype("invest")
    }
    const handleWithdraw = async()=>{
      settype("withdraw")
      setshowModel(true)
    }
  return (  
    <>
    <h2>this is {id}</h2>
    <h3>Minimum Investment = 100$</h3>
    <h3>Lock In Period = 30Days</h3>
    <button onClick={()=>handleInvest()}>Invest now</button>
    <button onClick={()=>handleWithdraw()}>Withdraw Investment</button>
    {showModel && <InvestWithdraw onClose={()=>setshowModel(false)} type={type} coin={coin} /> }
    </> 
  )
}

export default InvestorCoinDetail
