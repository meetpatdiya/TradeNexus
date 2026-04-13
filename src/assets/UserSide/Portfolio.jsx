import { usePortfolio } from "./PortfolioContext";
import { useCoins } from "./CoinsContext";
import BuySellModel from "./BuySellModel";
import { useState, useMemo, useEffect } from "react";
import Pfimg from "../Images/Pfimg.svg";
import LoaderToast from "./LoaderToast";
import "./Portfolio.css";
const Portfolio = () => {
  const { portfolio } = usePortfolio();
  const { coins } = useCoins();
  const [showAlert, setShowAlert] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [type, setType] = useState("");
  const coinMap = useMemo(() => {
    const map = {};
    coins.forEach((c) => {
      map[c.id] = c;
    });
    return map;
  }, [coins, portfolio]);

  const { totalInvested, totalProfit } = useMemo(() => {
    let invested = 0;
    let current = 0;

    Object.entries(portfolio).forEach(([coinId, data]) => {
      const coin = coinMap[coinId];
      if (!coin) return;

      invested += data.quantity * data.avgBuyPrice;
      current += data.quantity * coin.current_price;
    });

    return {
      totalInvested: invested,
      totalProfit: current - invested,
    };
  }, [portfolio, coinMap]);
  return (
    <div className="pf-body">
      <div className="pf-container">
        <h2 className="pf-title">My Portfolio</h2>
        {Object.keys(portfolio).length === 0 && (
          <div className="pf-empty-wrapper">
            <div className="pf-empty">
              <img src={Pfimg} alt="" srcset="" />
              <p>No assets yet. Start trading 🚀</p>
            </div>
          </div>
        )}
                {Object.keys(portfolio).length != 0 && (

        <div className="pf-summary">
          <div className="pf-item">
            <p>Total Invested:</p>
            <span>${totalInvested.toFixed(2)}</span>
          </div>

          <div className="pf-item">
            <p>Profit:</p>
            <span className={totalProfit >= 0 ? "profit" : "loss"}>
              ${totalProfit.toFixed(2)}
            </span>
          </div>
        </div>
        )}
        <div className="pf-grid">
          {Object.entries(portfolio).map(([coinId, data]) => {
            const coin = coinMap[coinId];
            if (!coin) return null;
            const currentValue = data.quantity * coin.current_price;
            const invested = data.quantity * data.avgBuyPrice;
            const pnl = currentValue - invested;
            return (
              <div key={coinId} className="pf-card">
                <div className="pf-header">
                  <img src={coin.image} className="pf-coin-img" />
                  <div>
                    <h3 className="pf-coin-name">{coin.name}</h3>
                    <span className="pf-coin-symbol">
                      {coin.symbol.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="pf-stats">
                  <div>
                    <span>Quantity</span>
                    <strong>{data.quantity}</strong>
                  </div>
                  <div>
                    <span>Avg Buy</span>
                    <strong>${data.avgBuyPrice}</strong>
                  </div>
                  <div>
                    <span>Current</span>
                    <strong>${coin.current_price}</strong>
                  </div>
                </div>

                <div className="pf-value">
                  <span>Value</span>
                  <div className="pf-right">
                    <strong>${currentValue.toFixed(2)}</strong>
                    <div className={`pf-pnl ${pnl >= 0 ? "profit" : "loss"}`}>
                      {pnl >= 0 ? "+" : ""}(${pnl.toFixed(2)})
                    </div>
                  </div>
                </div>
                <div className="pf-actions">
                  <button
                    className="pf-btn pf-buy"
                    onClick={() => {
                      setSelectedCoin(coin);
                      setType("buy");
                    }}
                  >
                    Buy More
                  </button>

                  <button
                    className="pf-btn pf-sell"
                    disabled={data.quantity <= 0}
                    onClick={() => {
                      setSelectedCoin(coin);
                      setType("sell");
                    }}
                  >
                    Sell
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {selectedCoin && (
          <BuySellModel
            coin={selectedCoin}
            type={type}
            onClose={() => setSelectedCoin(null)}
            onSuccess={(msg, status) => {
              setShowAlert({ msg, status });
              setSelectedCoin(null);
            }}
          />
        )}{" "}
        {showAlert && (
          <LoaderToast
            message={showAlert.msg}
            type={showAlert.status}
            onClose={() => setShowAlert(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Portfolio;
