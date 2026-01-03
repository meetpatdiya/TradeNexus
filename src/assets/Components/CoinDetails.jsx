import React, { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import { useCoins } from "./CoinsContext";
import CoinDetailGraph from "./CoinDetailGraph";
const CoinDetails = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { coins , coinNames } = useCoins();
  const [graphTime, setGraphTime] = useState([])
  const coin = coins.find((c) => c.id === id);
  const prices = coin?.sparkline_in_7d?.price || []
  const data1D = prices.slice(-24);   
  const data3D = prices.slice(-72);   
  const data7D = prices.slice();              
    console.log(coins);

useEffect(() => {
  if (prices.length) setGraphTime(prices.slice(-24));
}, [prices]);
  

  if (!coin) return <p>coin not avaiable...</p>;
  return (
    <div>
      <div className="cd-coin-names">
        {coins.map((item, index) => {
          return <div key={item.id} onClick={() => navigate(`/coin/${item.id}`)}>{item.name}</div>;
        })}
      </div>
      <div className="cd-coin-info">
        <h1>{coin.name}</h1>
        <p>Price: ${coin.current_price}</p>
        <p>Change (24h): {coin.price_change_percentage_24h}%</p>
        <p>Market Cap {coin.market_cap}</p>
        <p>Total Supply {coin.total_supply}</p>
        <div className="cd-img">
          <img src={coin.image} alt={coin.name} />
        </div>
        <p>Circulating Supply {coin.circulating_supply}</p>
        <p>Market Cap Rank : #{coin.market_cap_rank}</p>
      </div>
      <div className="cd-graph">
        <div className="gp-buttons">
          <ul>
            <button onClick={()=>setGraphTime(data7D)}>7 Days</button>
            <button onClick={()=>setGraphTime(data3D)}>3 Days</button>
            <button onClick={()=>setGraphTime(data1D)}>1 Day</button>
          </ul>
        </div>
        <CoinDetailGraph prices={graphTime}/>
      </div>
    </div>
  );
};

export default CoinDetails;

