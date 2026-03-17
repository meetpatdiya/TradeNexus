import React,{useState,useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CoinDetailGraph from "../UserSide/CoinDetailGraph";
import "./AdminCryptoDetail.css";

const AdminCryptoDetail = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const coin = state?.coin;  
  const [graphTime,setGraphTime] = useState([]);
  const prices = coin?.sparkline_in_7d?.price || [];
  const data1D = prices.slice(-24);
  const data3D = prices.slice(-72);
  const data7D = prices.slice();

  useEffect(()=>{
    if(prices.length) setGraphTime(prices.slice(-24));
  },[prices]);

  const totalQty = Number(coin.total_quantity || 0).toFixed(6)
  const availableQty = Number(coin.available_quantity || 0).toFixed(6)
  const soldQty = Number(totalQty - availableQty).toFixed(6);

  return (

    <div className="ad-coindetail-container">

      <button
      className="ad-coindetail-back"
      onClick={()=>navigate("/admindashboard/cryptocurrencies")}
      >
      ← Back
      </button>


      {/* HEADER */}

      <div className="ad-coindetail-header">

        <div className="ad-coindetail-title">

          <img src={coin?.image} alt="" />

          <div>
            <h2>{coin?.name}</h2>
            <span>{coin?.symbol?.toUpperCase()}</span>
          </div>

        </div>

        <div className="ad-coindetail-price">

          <h1>${coin?.current_price}</h1>

          <p
          className={
          coin?.price_change_percentage_24h > 0
          ? "ad-coindetail-green"
          : "ad-coindetail-red"
          }
          >
          {coin?.price_change_percentage_24h?.toFixed(2)}%
          </p>

        </div>

      </div>



      <div className="ad-coindetail-grid">

        <div className="ad-coindetail-left">

          <div className="ad-coindetail-card">

            <h3>Platform Holdings</h3>

            <div className="ad-coindetail-stats">

              <div>
                <p>Total Quantity</p>
                <h4>{totalQty}</h4>
              </div>

              <div>
                <p>Available</p>
                <h4>{availableQty}</h4>
              </div>

              <div>
                <p>Sold</p>
                <h4>{soldQty}</h4>
              </div>

            </div>

          </div>

          <div className="ad-coindetail-card">

            <h3>Market Info</h3>

            <div className="ad-coindetail-stats">

              <div>
                <p>Rank</p>
                <h4>{coin?.market_cap_rank}</h4>
              </div>

              <div>
                <p>Market Cap</p>
                <h4>${coin?.market_cap}</h4>
              </div>

              <div>
                <p>Volume</p>
                <h4>${coin?.total_volume}</h4>
              </div>

            </div>

          </div>



          {/* SUPPLY */}

          <div className="ad-coindetail-card">

            <h3>Supply</h3>

            <div className="ad-coindetail-stats">

              <div>
                <p>Circulating</p>
                <h4>{coin?.circulating_supply}</h4>
              </div>

              <div>
                <p>Total</p>
                <h4>{coin?.total_supply}</h4>
              </div>

              <div>
                <p>Max</p>
                <h4>{coin?.max_supply}</h4>
              </div>

            </div>

          </div>


        </div>



        {/* RIGHT SECTION */}

        <div className="ad-coindetail-right">

          <div className="ad-coindetail-card">

            <h3>Price Chart</h3>

            <div className="ad-coindetail-chart-buttons">

              <button onClick={()=>setGraphTime(data7D)}>7D</button>
              <button onClick={()=>setGraphTime(data3D)}>3D</button>
              <button onClick={()=>setGraphTime(data1D)}>1D</button>

            </div>

            <CoinDetailGraph prices={graphTime} />

          </div>


          <div className="ad-coindetail-card">

            <h3>All Time Stats</h3>

            <div className="ad-coindetail-stats">

              <div>
                <p>ATH</p>
                <h4>${coin?.ath}</h4>
              </div>

              <div>
                <p>ATL</p>
                <h4>${coin?.atl}</h4>
              </div>

            </div>

          </div>


        </div>

      </div>

    </div>

  );
};

export default AdminCryptoDetail;