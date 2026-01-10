import { usePortfolio } from "./PortfolioContext";
import { useCoins } from "./CoinsContext";
import BuySellModel from "./BuySellModel";
import { useState } from "react";
import AlertBox from "./AlertBox";
import "./Portfolio.css";
const Portfolio = () => {
  const { portfolio } = usePortfolio();
  const { coins } = useCoins();
  const [showAlert, setShowAlert] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [type, setType] = useState("");
console.log(portfolio)
  const getCoinData = (coinId) => coins.find((c) => c.id === coinId);

  return (
    <div className="pf-container">
      <h2 className="pf-title">My Portfolio</h2>
      {Object.keys(portfolio).length === 0 && (
        <p className="pf-empty">No assets yet. Start trading 🚀</p>
      )}
      <div className="pf-grid">
        {Object.entries(portfolio).map(([coinId, data]) => {
          const coin = getCoinData(coinId);
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
                <strong>${currentValue.toFixed(2)}</strong>
              </div>

              <div className={`pf-pnl ${pnl >= 0 ? "profit" : "loss"}`}>
                {pnl >= 0 ? "+" : ""}${pnl.toFixed(2)}
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
        <AlertBox
          message={showAlert.msg}
          type={showAlert.status}
          onClose={() => setShowAlert(null)}
        />
      )}
    </div>
  );
};

export default Portfolio;