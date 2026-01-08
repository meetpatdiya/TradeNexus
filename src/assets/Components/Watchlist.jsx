import { useCoins } from "./CoinsContext";
import CoinRows from "./CoinRows";
import { FiX } from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";
import './Watchlist.css'
import EmptyList from '../Images/EmptyList.svg'
const Watchlist = () => {
  const navigate = useNavigate()
  const { coins, watchlist, toggleWatchlist } = useCoins();
  const watchlistCoins = coins.filter((coin) => watchlist.includes(coin.id));
  if (watchlistCoins.length === 0) {
   return <div className="empty-state">
        <img src={EmptyList} alt="" className="empty-svg"/>
        <h3>Your watchlist is empty</h3>
        <p>Add coins to track the market 📈</p>
        <button className="watch-coins-btn" onClick={()=>navigate('/coin/bitcoin')}>➕ Add Coins</button>
      </div>
  }
  return (
    <div>
      <h2 className="watchlist-title">My Watchlist</h2>
      {watchlistCoins.map((coin) => (
        <div className="watchlist-row">
          <CoinRows key={coin.id} coin={coin} />
          <button onClick={() => toggleWatchlist(coin.id)} className="watchlist-btn"><FiX/></button>
        </div>
      ))} 
    </div>
  );
};

export default Watchlist;
