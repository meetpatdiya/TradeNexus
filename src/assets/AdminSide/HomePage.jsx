import React,{useState,useEffect} from 'react'
import AdminWithdrawList from "./AdminWithdrawList"
import axios from "axios"
import ChartsUsers from './ChartsUsers'
import ChartsTrades from './ChartsTrades'
import ChartsCoins from './ChartsCoins'
const HomePage = () => {
  const [usersData, setusersData] = useState([])
  const [tradesData, settradesData] = useState([])
  const [coinsData, setcoinsData] = useState([])
  const getUsersCharts = async()=>{
    const {data} = await axios.get("http://localhost:5000/charts/users",{withCredentials:true})
    setusersData(data)
  }
  const getTradesCharts = async()=>{
    const {data} = await axios.get("http://localhost:5000/charts/trades",{withCredentials:true})
    settradesData(data)
  }
  const getCoinsCharts = async()=>{
    const {data} = await axios.get("http://localhost:5000/charts/coins",{withCredentials:true})
    console.log(data);
    setcoinsData(data)
  }
  useEffect(() => {
    getUsersCharts()
    getTradesCharts()
    getCoinsCharts()
  }, [])
  
  return (
    <div>
      {/* <AdminWithdrawList/> */}
      <ChartsUsers data={usersData}/>
        <ChartsTrades trades={tradesData}/>
        <ChartsCoins data={coinsData}/>
    </div>
  )
}

export default HomePage
