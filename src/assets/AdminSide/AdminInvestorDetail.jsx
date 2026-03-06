import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useCoins } from "../UserSide/CoinsContext";
import { useParams, useNavigate } from "react-router-dom";
import "./AdminInvestorDetail.css"
const AdminInvestorDetail = () => {
  const [investorData, setinvestorData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { coins } = useCoins();

  const getInvestorData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/admin/getinvestordata",
        { params: { id }, withCredentials: true },
      );
      setinvestorData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInvestorData();
  }, [id]);
  const summary = investorData.summary || {};
  const holdings = Array.isArray(investorData.holdings)
    ? investorData.holdings
    : [];
  const transactions = Array.isArray(investorData.transactions)
    ? investorData.transactions
    : [];
  const commissions = Array.isArray(investorData.commissions)
    ? investorData.commissions
    : [];
  const withdrawals = Array.isArray(investorData.withdrawals)
    ? investorData.withdrawals
    : [];
  const matchedCoins = useMemo(() => {
    return coins.filter((c) => holdings.some((h) => h.crypto_name === c.id));
  }, [coins, holdings]);
  const prices = useMemo(() => {
    return Object.fromEntries(
      matchedCoins.map((pr) => [pr.id, pr.current_price]),
    );
  }, [matchedCoins]);

  // return (
  //   <div className="ad-id-container">
  //     <button
  //       className="ad-id-backbtn"
  //       onClick={() => navigate("/admindashboard/invester")}
  //     >
  //       ← Back
  //     </button>
  //     <div className="ad-id-basic-grid">
  //       <h2 className="ad-id-title">Basic Information</h2>
  //       <div className="ad-id-card">
  //         <p className="ad-id-label">Id</p>
  //         <p className="ad-id-value">{summary.user_id}</p>
  //       </div>
  //       <div className="ad-id-card">
  //         <p className="ad-id-label">Name</p>
  //         <p className="ad-id-value">{summary.name}</p>
  //       </div>
  //       <div className="ad-id-card">
  //         <p className="ad-id-label">Email</p>
  //         <p className="ad-id-value">{summary.email}</p>
  //       </div>
  //       <div className="ad-id-card">
  //         <p className="ad-id-label">Joined</p>
  //         <p className="ad-id-value">
  //           {new Date(summary.joined).toLocaleString()}
  //         </p>
  //       </div>
  //     </div>
  //     <div className="ad-id-section">
  //       <h2 className="ad-id-title">Investor Summary</h2>
  //       {(() => {
  //         const realizedProfit = Number(summary.realized_profit || 0);
  //         const portfolioCost = Number(summary.total_portfolio_cost || 0);
  //         const unrealizedProfit = holdings.reduce((acc, item) => {
  //           const currentPrice = Number(prices[item.crypto_name] || 0);
  //           const avgPrice = Number(item.avg_buy_price);
  //           const qty = Number(item.quantity);

  //           return acc + (currentPrice - avgPrice) * qty;
  //         }, 0);

  //         const totalProfit = realizedProfit + unrealizedProfit;
  //         const isProfit = totalProfit >= 0;

  //         return (
  //           <div className="ad-id-summary-grid">
  //             <div className="ad-id-card">
  //               <p className="ad-id-label">Total Portfolio Value</p>
  //               <p className="ad-id-value">
  //                 ${(portfolioCost + unrealizedProfit).toFixed(2)}
  //               </p>
  //             </div>

  //             <div className="ad-id-card">
  //               <p className="ad-id-label">Realized Profit</p>
  //               <p className="ad-id-value">${realizedProfit.toFixed(2)}</p>
  //             </div>

  //             <div className="ad-id-card">
  //               <p className="ad-id-label">Unrealized Profit</p>
  //               <p className="ad-id-value">${unrealizedProfit.toFixed(2)}</p>
  //             </div>
  //             <div className="ad-id-card">
  //               <p className="ad-id-label">Total Commission earned</p>
  //               <p className="ad-id-value">
  //                 ${Number(summary.total_commission_earned)}
  //               </p>
  //             </div>
  //             <div className="ad-id-card">
  //               <p className="ad-id-label">Total Commission Withdrawn</p>
  //               <p className="ad-id-value">
  //                 ${Number(summary.total_commission_withdrawn)}
  //               </p>
  //             </div>
  //             <div className="ad-id-card">
  //               <p className="ad-id-label">Available Commission</p>
  //               <p className="ad-id-value">
  //                 ${Number(summary.available_commission)}
  //               </p>
  //             </div>

  //             <div className="ad-id-card">
  //               <p className="ad-id-label">Total Profit / Loss</p>
  //               <p
  //                 className="ad-id-value"
  //                 style={{
  //                   color: isProfit ? "green" : "red",
  //                   fontWeight: "600",
  //                 }}
  //               >
  //                 {isProfit ? "+" : "-"}${Math.abs(totalProfit).toFixed(2)}
  //               </p>
  //             </div>
  //           </div>
  //         );
  //       })()}
  //     </div>

  //     <div className="ad-id-section">
  //       <h2 className="ad-id-title">Crypto Holdings</h2>
  //       <div className="ad-id-table-wrapper">
  //         <table className="ad-id-table">
  //           <thead>
  //             <tr>
  //               <th>Crypto</th>
  //               <th>Avg_Buy_price</th>
  //               <th>Quantity</th>
  //               <th>Total Cost</th>
  //               <th>Current Price</th>
  //               <th>Current Value</th>
  //               <th>Profit/Loss</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {holdings.length > 0 ? (
  //               holdings.map((item, index) => {
  //                 const currentPrice = Number(prices[item.crypto_name] || 0);
  //                 const avgPrice = Number(item.avg_buy_price);
  //                 const qty = Number(item.quantity);
  //                 const totalCost = Number(item.total_cost);

  //                 const currentValue = currentPrice * qty;
  //                 const profitLoss = currentValue - totalCost;
  //                 const isProfit = profitLoss >= 0;

  //                 return (
  //                   <tr key={index}>
  //                     <td>{item.crypto_name.toUpperCase()}</td>
  //                     <td>${avgPrice.toFixed(2)}</td>
  //                     <td>{qty.toFixed(4)}</td>
  //                     <td>${totalCost.toFixed(2)}</td>
  //                     <td>${currentPrice.toFixed(2)}</td>
  //                     <td>${currentValue.toFixed(2)}</td>
  //                     <td
  //                       style={{
  //                         color: isProfit ? "green" : "red",
  //                         fontWeight: "600",
  //                       }}
  //                     >
  //                       {isProfit ? "+" : "-"}${Math.abs(profitLoss).toFixed(2)}
  //                     </td>
  //                   </tr>
  //                 );
  //               })
  //             ) : (
  //               <tr>
  //                 <td colSpan="6" className="ad-id-empty">
  //                   No Holdings Found
  //                 </td>
  //               </tr>
  //             )}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>

  //     <div className="ad-id-section">
  //       <h2 className="ad-id-title">Transactions</h2>
  //       <div className="ad-id-table-wrapper">
  //         <table className="ad-id-table">
  //           <thead>
  //             <tr>
  //               <th>Id</th>
  //               <th>Type</th>
  //               <th>Crypto</th>
  //               <th>Amount</th>
  //               <th>Quantity</th>
  //               <th>Date</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {transactions.length > 0 ? (
  //               transactions.map((item, index) => (
  //                 <tr key={index}>
  //                   <td>{item.id}</td>
  //                   <td>{item.type}</td>
  //                   <td>{item.crypto_name}</td>
  //                   <td>{item.amount}</td>
  //                   <td>{item.quantity}</td>
  //                   <td>{new Date(item.created_at).toLocaleString()}</td>
  //                 </tr>
  //               ))
  //             ) : (
  //               <tr>
  //                 <td colSpan="4" className="ad-id-empty">
  //                   No Transactions Found
  //                 </td>
  //               </tr>
  //             )}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>

  //     <div className="ad-id-section">
  //       <h2 className="ad-id-title">Commissions</h2>
  //       <div className="ad-id-table-wrapper">
  //         <table className="ad-id-table">
  //           <thead>
  //             <tr>
  //               <th>Trade ID</th>
  //               <th>Crypto</th>
  //               <th>Amount</th>
  //               <th>Date</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {commissions.length > 0 ? (
  //               commissions.map((item, index) => (
  //                 <tr key={index}>
  //                   <td>{item.trade_id}</td>
  //                   <td>{item.crypto_name}</td>
  //                   <td>{item.amount}</td>
  //                   <td>{new Date(item.created_at).toLocaleString()}</td>
  //                 </tr>
  //               ))
  //             ) : (
  //               <tr>
  //                 <td colSpan="4" className="ad-id-empty">
  //                   No Commissions Found
  //                 </td>
  //               </tr>
  //             )}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>

  //     <div className="ad-id-section">
  //       <h2 className="ad-id-title">Withdrawals</h2>
  //       <div className="ad-id-table-wrapper">
  //         <table className="ad-id-table">
  //           <thead>
  //             <tr>
  //               <th>Id</th>
  //               <th>Amount</th>
  //               <th>Status</th>
  //               <th>Date</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {withdrawals.length > 0 ? (
  //               withdrawals.map((item, index) => (
  //                 <tr key={index}>
  //                   <td>{item.id}</td>
  //                   <td>{item.amount}</td>
  //                   <td>{item.status}</td>
  //                   <td>{new Date(item.created_at).toLocaleString()}</td>
  //                 </tr>
  //               ))
  //             ) : (
  //               <tr>
  //                 <td colSpan="3" className="ad-id-empty">
  //                   No Withdrawals Found
  //                 </td>
  //               </tr>
  //             )}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </div>
  // );
return (
  <div className="ad-id-container">
    <button
      className="ad-id-back-btn"
      onClick={() => navigate("/admindashboard/invester")}
    >
      ← Back
    </button>

    {/* Basic Info */}
    <div className="ad-id-basic-section">
      <h2 className="ad-id-heading">Basic Information</h2>
      <table className="ad-id-basic-table">
        <tbody>
          <tr><td>Id</td><td>{summary.user_id}</td></tr>
          <tr><td>Name</td><td>{summary.name}</td></tr>
          <tr><td>Email</td><td>{summary.email}</td></tr>
          <tr>
            <td>Joined</td>
            <td>{new Date(summary.joined).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Summary */}
    <div className="ad-id-section">
      <h2 className="ad-id-heading">Investor Summary</h2>
      {(() => {
        const realizedProfit = Number(summary.realized_profit || 0);
        const portfolioCost = Number(summary.total_portfolio_cost || 0);

        const unrealizedProfit = holdings.reduce((acc, item) => {
          const currentPrice = Number(prices[item.crypto_name] || 0);
          const avgPrice = Number(item.avg_buy_price);
          const qty = Number(item.quantity);
          return acc + (currentPrice - avgPrice) * qty;
        }, 0);

        const totalProfit = realizedProfit + unrealizedProfit;
        const isProfit = totalProfit >= 0;

        return (
          <table className="ad-id-sm-table">
            <tbody>
              <tr>
                <td>Total Portfolio Value</td>
                <td>${(portfolioCost + unrealizedProfit).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Realized Profit</td>
                <td>${realizedProfit.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Unrealized Profit</td>
                <td>${unrealizedProfit.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Total Commission Earned</td>
                <td>${Number(summary.total_commission_earned)}</td>
              </tr>
              <tr>
                <td>Total Commission Withdrawn</td>
                <td>${Number(summary.total_commission_withdrawn)}</td>
              </tr>
              <tr>
                <td>Available Commission</td>
                <td>${Number(summary.available_commission)}</td>
              </tr>
              <tr>
                <td>Total Profit / Loss</td>
                <td className={isProfit ? "ad-id-profit" : "ad-id-loss"}>
                  {isProfit ? "+" : "-"}${Math.abs(totalProfit).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        );
      })()}
    </div>

    {/* Holdings */}
    <div className="ad-id-section">
      <h2 className="ad-id-heading">Crypto Holdings</h2>
      <div className="ad-id-table-wrapper">
        <table className="ad-id-hd-table">
          <thead>
            <tr>
              <th>Crypto</th>
              <th>Avg Buy</th>
              <th>Qty</th>
              <th>Total Cost</th>
              <th>Current</th>
              <th>Value</th>
              <th>P/L</th>
            </tr>
          </thead>
          <tbody>
            {holdings.length > 0 ? (
              holdings.map((item, index) => {
                const currentPrice = Number(prices[item.crypto_name] || 0);
                const avgPrice = Number(item.avg_buy_price);
                const qty = Number(item.quantity);
                const totalCost = Number(item.total_cost);
                const currentValue = currentPrice * qty;
                const profitLoss = currentValue - totalCost;
                const isProfit = profitLoss >= 0;

                return (
                  <tr key={index}>
                    <td>{item.crypto_name.toUpperCase()}</td>
                    <td>${avgPrice.toFixed(2)}</td>
                    <td>{qty.toFixed(4)}</td>
                    <td>${totalCost.toFixed(2)}</td>
                    <td>${currentPrice.toFixed(2)}</td>
                    <td>${currentValue.toFixed(2)}</td>
                    <td className={isProfit ? "ad-id-profit" : "ad-id-loss"}>
                      {isProfit ? "+" : "-"}${Math.abs(profitLoss).toFixed(2)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="ad-id-empty">No Holdings Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

    {/* Transactions */}
    <div className="ad-id-section">
      <h2 className="ad-id-heading">Transactions</h2>
      <table className="ad-id-tr-table">
        <thead>
          <tr>
            <th>Id</th><th>Type</th><th>Crypto</th>
            <th>Amount</th><th>Qty</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.type}</td>
                <td>{item.crypto_name}</td>
                <td>{item.amount}</td>
                <td>{item.quantity}</td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="ad-id-empty">No Transactions</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Commissions */}
    <div className="ad-id-section">
      <h2 className="ad-id-heading">Commissions</h2>
      <table className="ad-id-cm-table">
        <thead>
          <tr>
            <th>Trade ID</th><th>Crypto</th><th>Amount</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {commissions.length > 0 ? (
            commissions.map((item, index) => (
              <tr key={index}>
                <td>{item.trade_id}</td>
                <td>{item.crypto_name}</td>
                <td>{item.amount}</td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="ad-id-empty">No Commissions</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Withdrawals */}
    <div className="ad-id-section">
      <h2 className="ad-id-heading">Withdrawals</h2>
      <table className="ad-id-wd-table">
        <thead>
          <tr>
            <th>Id</th><th>Amount</th><th>Status</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.length > 0 ? (
            withdrawals.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.amount}</td>
                <td>{item.status}</td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="ad-id-empty">No Withdrawals</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default AdminInvestorDetail;
