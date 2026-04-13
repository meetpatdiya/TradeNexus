import React, { useState, useEffect } from "react";
import axios from "axios";
import "./InvestorAnalytics.css";
import InvestmentLine from "./InvestmentLine";
import InvestmentPie from "./InvestmentPie";
import { useCoins } from "../UserSide/CoinsContext"
const InvestorAnalytics = () => {
  const [transactionData, settransactionData] = useState([]);
  const [InvestorData, setInvestorData] = useState({});
  const [showTransactions, setshowTransactions] = useState(false)
  const { coins } = useCoins();
  useEffect(() => {
    const getTransactionData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/invest/transactions",
          { withCredentials: true },
        );
        console.log(data);
        setInvestorData(data);
        settransactionData(data.rows);
      } catch (error) {
        console.log(error);
      }
    };
    getTransactionData();
  }, []);
const calculateUnrealized = (holdings, coins) => {
  let total = 0;

  holdings.forEach(h => {
    const coin = coins.find(c => c.id === h.crypto_name);
    if (coin) {
      const currentPrice = coin.current_price;
      total += (currentPrice - h.avg_buy_price) * h.quantity;
    }
  });

  return total;
};
const getBestWorstCoins = (transactions, coins) => {
  const map = {};
  transactions.forEach(t => {
    if (t.type === "invest") {
      if (!map[t.crypto_name]) {
        map[t.crypto_name] = { totalQty: 0, totalCost: 0 };
      }
      map[t.crypto_name].totalQty += Number(t.quantity);
      map[t.crypto_name].totalCost += Number(t.quantity) * Number(t.price);
    }
  });
  const performance = [];

  Object.keys(map).forEach(name => {
    const coinData = coins.find(
      c => c.id.toLowerCase() === name.toLowerCase()
    );

    if (!coinData) return;

    const avgBuy = map[name].totalCost / map[name].totalQty;
    const current = coinData.current_price;

    const percent = ((current - avgBuy) / avgBuy) * 100;

    performance.push({
      name,
      percent
    });
  });

  if (performance.length === 0) return {};
  performance.sort((a, b) => b.percent - a.percent);

  return {
    best: performance[0],
    worst: performance[performance.length - 1]
  };
};
const unrealizedProfit = calculateUnrealized(
  InvestorData?.holdings || [],
  coins
);
const { best, worst } = getBestWorstCoins(
  transactionData,
  coins
);
  return (
   <div className="inv-a-page">

  <div className="inv-a-stats">
    <div className="inv-a-card inv-a-profit">
      <p>Realized Profit</p>
      <h2 className={InvestorData?.profitData?.[0]?.realized_profit > 0 ?"inv-a-green":"inv-a-red"}>${Number(InvestorData?.profitData?.[0]?.realized_profit || 0).toFixed(2)}</h2>
    </div>

    <div className="inv-a-card inv-a-profit">
      <p>Unrealized Profit</p>
      <h2 className={unrealizedProfit > 0?"inv-a-green":"inv-a-red"}>${unrealizedProfit.toFixed(2)}</h2>
    </div>

    <div className="inv-a-card">
      <p>Best Performer</p>
      <div className="inv-a-coin">
        <img src={coins.find(c=>c.id===best?.name)?.image} alt="" />
        <span>{best?.name}</span>
      <h3 className="inv-a-green">{best?.percent?.toFixed(2)}%</h3>
      </div>
    </div>

    <div className="inv-a-card">
      <p>Worst Performer</p>
      <div className="inv-a-coin">
        <img src={coins.find(c=>c.id===worst?.name)?.image} alt="" />
        <span>{worst?.name}</span>
      <h3 className="inv-a-red">{worst?.percent?.toFixed(2)}%</h3>
      </div>
    </div>
  </div>

  <div className="inv-a-charts">
    <div className="inv-a-chart-card">
      <InvestmentLine data={InvestorData.lineChart || []} />
    </div>
    <div className="inv-a-chart-card">
      <InvestmentPie data={InvestorData.pieChart || []} />
    </div>
  </div>

  <button className="inv-a-btn" onClick={()=>setshowTransactions(p=>!p)}>
    {showTransactions ? "Hide Transactions" : "Show Transactions"}
  </button>

  {showTransactions && (
    <>
      <h2 className="inv-a-title">Investment Transactions</h2>

      <div className="inv-a-table">
        <div className="inv-a-header">
          <span>Coin</span>
          <span>Type</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Amount ($)</span>
          <span>Date</span>
        </div>

        {transactionData?.map((item, index) => (
          <div className="inv-a-row" key={index}>
            <span>{item.crypto_name}</span>
            <span className={item.type === "invest" ? "inv-a-invest" : "inv-a-withdraw"}>
              {item.type}
            </span>
            <span>${Number(item.price).toFixed(2)}</span>
            <span>{Number(item.quantity).toFixed(6)}</span>
            <span>${item.amount}</span>
            <span>{new Date(item.created_at).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </>
  )}

</div>
  );
};

export default InvestorAnalytics;
