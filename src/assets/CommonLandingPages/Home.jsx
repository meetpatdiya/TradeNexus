import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Home = () => {
    const navigate = useNavigate()
    const syncCoins = async () => {
  await axios.post("http://localhost:5000/sync-coins");
};
  return (
    <div>
      hye i am home page i have diff components Here
      <button onClick={()=>navigate('/register/user')}>Register as User</button>
      <button onClick={()=>navigate('/login')}>Login</button>
      <button onClick={()=>navigate('/register/investor')}>Register as Investor</button>
      <button onClick={()=>syncCoins()}>Insert coins</button>
    </div>
  )
}

export default Home
