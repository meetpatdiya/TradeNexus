import React,{useState,useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useCoins } from "../UserSide/CoinsContext";
import InvestPage from './InvestPage';
import WithdrawPage from './WithdrawPage';
import "./InvestorCoinDetail.css"
import axios from 'axios';
const InvestorCoinDetail = () => {
  const [showModel, setshowModel] = useState(false)
  const [withdrawcheck, setwithdrawcheck] = useState(false)
  const [type, settype] = useState("")
  const { id } = useParams();
  const { coins } = useCoins();
  const coin = coins.find(c => c.id === id);
useEffect(() => {
  if (!coin) return;
  const withdrawCheck = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/invest/withdrawcoincheck",
        {
          withCredentials: true,
          params: {gecko_id: coin.id }
        }
      );
      console.log(data);
        
    if (data.length === 0) {
      setwithdrawcheck(true);
    } else {
      setwithdrawcheck(false);
    }
    } catch (error) {
      console.log(error);
    }
  }
  withdrawCheck();
}, [coin]);

    const handleInvest = async ()=>{
      setshowModel(true)
      settype("invest")
    }
    const handleWithdraw = async()=>{
      setshowModel(true)
      settype("withdraw")
    }
  return (  
    <>
    <h2>this is {id}</h2>
    <h3>Minimum Investment = 100$</h3>
    <h3>Lock In Period = 30Days</h3>
    <button onClick={()=>handleInvest()}>Invest now</button>
    <button onClick={()=>handleWithdraw()} disabled={withdrawcheck}>Withdraw Investment</button>
    {showModel && type=="invest" &&<InvestPage onClose={()=>setshowModel(false)} type={type} coin={coin} /> }
    {showModel && type=="withdraw" &&<WithdrawPage onClose={()=>setshowModel(false)} type={type} coin={coin} /> }
    </> 
  )
}

export default InvestorCoinDetail
