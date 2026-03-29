import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCoins } from "../UserSide/CoinsContext";
import { useWallet } from "../UserSide/WalletContext";
import InvestPage from "./InvestPage";
import WithdrawPage from "./WithdrawPage";
import "./InvestorCoinDetail.css";
import CoinDetailGraph from "../UserSide/CoinDetailGraph";
import axios from "axios";
import LoaderToast from "../UserSide/LoaderToast";
  
const InvestorCoinDetail = () => {
  const [coinQuantity, setcoinQuantity] = useState({
    investor_quantity: "",
    platform_quantity: "",
    lockin_period:""
  });
  const [showModel, setshowModel] = useState(false);
  const [withdrawcheck, setwithdrawcheck] = useState(false);
  const [graphTime, setGraphTime] = useState([]);
  const [type, settype] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const { coins } = useCoins();
  const { balance } = useWallet();

  const coin = coins.find((c) => c.id === id);
  const coinNames = coins.map((c) => c.id);

  const prices = coin?.sparkline_in_7d?.price || [];

  const data1D = prices.slice(-24);
  const data3D = prices.slice(-72);
  const data7D = prices.slice();

  useEffect(() => {
    if (!coin) return;

    const withdrawCheck = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/invest/withdrawcoincheck",
          {
            withCredentials: true,
            params: { gecko_id: coin.id },
          },
        ); 
        setcoinQuantity({
          investor_quantity: data.investor_quantity,
          platform_quantity: data.platform_quantity,
          lockin_period:data.lock_time
        });
        console.log(data);
        if (Number(data.investor_quantity) === 0) setwithdrawcheck(true);
        else setwithdrawcheck(false);
      } catch (error) {
        console.log(error);
      }
    };

    withdrawCheck();
  }, [coin]);

  useEffect(() => {
    if (prices.length) setGraphTime(prices.slice(-24));
  }, [prices]);

  const handleInvest = () => {
    setshowModel(true);
    settype("invest");
  };

  const handleWithdraw = () => {
    setshowModel(true);
    settype("withdraw");
  };
  const handleTradeSuccess = (msg, type) => {
    setAlertData({ message: msg, type });
    setShowAlert(true);
  };
  if (!coin) return null;

  return (
    <div className="in-cd-container">
      <div className="in-cd-main">
        <div className="in-cd-header">
          <img src={coin.image} alt={coin.id} />
          <div>
            <h2>
              {coin.name} ({coin.symbol.toUpperCase()})
            </h2>
            <p>Current Price: ${coin.current_price}</p>
            <p>24H Change: {coin.price_change_24h}</p>
          </div>
        </div>

        <div className="in-cd-stats">
          <div>
            <p>Wallet Balance</p>
            <h3>${Number(balance)}</h3>
          </div>

          <div>
            <p>Your Coins</p>
            <h3>{Number(coinQuantity.investor_quantity).toFixed(4)}</h3>
          </div>

          <div>
            <p>Platform Coins</p>
            <h3>{Number(coinQuantity.platform_quantity).toFixed(4)}</h3>
          </div>
          <div>
            <p>Lock Period</p>
            <h3> {coinQuantity.investor_quantity > 0
    ? coinQuantity.lockin_period.replace("days", "d").replace("hours", "h") + " left"
    : "Not Applicable"}</h3>
          </div>

          <div>
            <p>Minimum Invest</p>
            <h3>$100</h3>
          </div>


        </div>

        <div className="in-cd-actions">
          <button className="in-cd-invest" onClick={handleInvest}>
            Invest
          </button>

          <button
            className="in-cd-withdraw"
            onClick={handleWithdraw}
            disabled={withdrawcheck}
          >
            Withdraw
          </button>
        </div>

        <div className="in-cd-graph-box">
          <div className="in-cd-graph-buttons">
            <button onClick={() => setGraphTime(data7D)}>7D</button>
            <button onClick={() => setGraphTime(data3D)}>3D</button>
            <button onClick={() => setGraphTime(data1D)}>1D</button>
          </div>
          <CoinDetailGraph prices={graphTime} />
        </div>
      </div>

      <div className="in-cd-sidebar">
        {coinNames.map((item, index) => (
          <div
            key={index}
            className="in-cd-coin-item"
            onClick={() => navigate(`/investordashboard/coin/${item}`)}
          >
            {item}
          </div>
        ))}
      </div>

      {showModel && type === "invest" && (
        <InvestPage
          onClose={() => setshowModel(false)}
          type={type}
          coin={coin}
          onSuccess={handleTradeSuccess}
        />
      )}

      {showModel && type === "withdraw" && (
        <WithdrawPage
          onClose={() => setshowModel(false)}
          type={type}
          coin={coin}
          onSuccess={handleTradeSuccess}
        />
      )}  
      {showAlert && (
        <LoaderToast
          message={alertData.message}
          type={alertData.type}
          onClose={() => setShowAlert(false)}
          shape={'lines'}
        />
      )}
    </div>
  );
};

export default InvestorCoinDetail;
