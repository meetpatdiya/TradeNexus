import React, { useEffect, useState } from "react";
import "./CoinDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useCoins } from "./CoinsContext";
import CoinDetailGraph from "./CoinDetailGraph";
const CoinDetails = ({ }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { coins  , watchlist , toggleWatchlist} = useCoins();
    const [activeCoin, setActiveCoin] = useState(id);
    const [graphTime, setGraphTime] = useState([])
    const coin = coins.find((c) => c.id === id);
    const prices = coin?.sparkline_in_7d?.price || []
    const data1D = prices.slice(-24);
    const data3D = prices.slice(-72);
    const data7D = prices.slice();
    // console.log(coins);
    useEffect(() => {
        if (prices.length) setGraphTime(prices.slice(-24));
    }, [prices]);
    const addToWatchList = ()=>{
        toggleWatchlist(coin.id)
        console.log(watchlist.includes(coin.id))
    }
    if (!coin) return <p>coin not avaiable...</p>;
    return (
        <>
        <div className="cd-container">
            <div className="cd-coin-names">
                {coins.map((item, index) => {
                    return <div key={item.id} className={activeCoin === item.id ? "coin-item active" : "coin-item"} onClick={() => {
                        setActiveCoin(item.id);
                        navigate(`/coin/${item.id}`)
                    }}>{item.name}</div>;
                })}
            </div>
            <div className="cd-right">
                <div className="cd-coin-info">
                    <div className="cd-img">
                        <img src={coin.image} alt={coin.name} />
                    </div>
                    <h3>{coin.name}</h3>
                    <h1>Price: ${coin.current_price}</h1>
                    <p style={{ color: coin.price_change_percentage_24h > 0 ? "green" : "red" }}>
                        24h Change: {coin.price_change_percentage_24h}%
                    </p>
                    {/* <p>Change (24h): {coin.price_change_percentage_24h}%</p> */}
                    <p><span>Market Cap :</span> {coin.market_cap}</p>
                    <p><span>Total Supply :</span> {coin.total_supply}</p>
                     <p><span>24h High :</span> ${coin.high_24h}</p>
                    <p><span>24h Low :</span> ${coin.low_24h}</p>
                      <p><span>All Time High :</span> ${coin.ath}</p>
                    <p><span>All Time Law :</span> ${coin.atl}</p>
                    <p><span>Circulating Supply :</span> {coin.circulating_supply}</p>
                    <p><span>Market Cap Rank :</span> #{coin.market_cap_rank}</p>
                    <div className="cd-trade">
                        <button>BUY</button>
                        <button>SELL</button>
                    </div>
                    <button onClick={()=>addToWatchList(coin)}>⭐ {watchlist.includes(coin.id)?"Remove from Watchlist":"Add to Watchlist"}</button>
                </div>

                <div className="cd-graph">
                    <div className="gp-buttons">
                        <ul>
                            <button onClick={() => setGraphTime(data7D)}>7 Days</button>
                            <button onClick={() => setGraphTime(data3D)}>3 Days</button>
                            <button onClick={() => setGraphTime(data1D)}>1 Day</button>
                        </ul>
                    </div>
                    <CoinDetailGraph prices={graphTime} />
                </div>
            </div>
        </div>
        {/* <Footer/> */}
        </>
    );
};

export default CoinDetails;