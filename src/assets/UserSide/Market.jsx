import React from "react";
import "./Market.css";
import { useCoins } from "./CoinsContext";
import { useNavigate } from "react-router-dom";
const Market = () => {
  const { coins } = useCoins();
  const top_10_gainers_24h = [...coins]
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 10);
  const top_10_losers_24h =[...coins]
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 10);
  const total_volume =[...coins]
  .sort((a,b)=>b.total_volume - a.total_volume)
  .slice(0,10);
  const recently_acitve = [...coins]
  .sort((a,b)=>(b.high_24h - b.low_24h) - (a.high_24h - a.low_24h))
  .slice(0,10)
  const all_time_high =[...coins]
  .sort((a,b)=>b.ath_change_percentage - a.ath_change_percentage)
  .slice(0,10)
  console.log(coins);
  
  const navigate = useNavigate();
  return (
    <>
      <h2>Top Gainers (24h)</h2>
      {top_10_gainers_24h.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.price_change_percentage_24h}</p>
          </div>
        );
      })}
      <h2>Top Losers (24h)</h2>
      {top_10_losers_24h.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.price_change_percentage_24h}</p>
          </div>
        );
      })}
      <h2>Most Traded (24h)</h2>
      {total_volume.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.total_volume}</p>
          </div>
        );
      })}
      <h2>Most Volatile (24h)</h2>
      {recently_acitve.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
          </div>
        );
      })}
      <h2>Near ATH</h2>
      {all_time_high.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
          </div>
        );
      })}
    </>
  );
};

export default Market;
