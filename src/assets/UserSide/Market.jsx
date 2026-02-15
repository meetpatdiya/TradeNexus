// import React from "react";
// import "./Market.css";
// import { useCoins } from "./CoinsContext";
// import { useNavigate } from "react-router-dom";
// const Market = () => {
//   const { coins } = useCoins();
//   const top_10_gainers_24h = [...coins]
//     .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
//     .slice(0, 10);
//   const top_10_losers_24h =[...coins]
//     .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
//     .slice(0, 10);
//   const total_volume =[...coins]
//   .sort((a,b)=>b.total_volume - a.total_volume)
//   .slice(0,10);
//   const recently_acitve = [...coins]
//   .sort((a,b)=>(b.high_24h - b.low_24h) - (a.high_24h - a.low_24h))
//   .slice(0,10)
//   const all_time_high =[...coins]
//   .sort((a,b)=>b.ath_change_percentage - a.ath_change_percentage)
//   .slice(0,10)
//   console.log(coins);

//   const navigate = useNavigate();
//   return (
//     <>
//       <h2>Top Gainers (24h)</h2>
//       {top_10_gainers_24h.map((item) => {
//         return (
//           <div key={item.id}>
//             <p>{item.name}</p>
//             <p>{item.price_change_percentage_24h}</p>
//           </div>
//         );
//       })}
//       <h2>Top Losers (24h)</h2>
//       {top_10_losers_24h.map((item) => {
//         return (
//           <div key={item.id}>
//             <p>{item.name}</p>
//             <p>{item.price_change_percentage_24h}</p>
//           </div>
//         );
//       })}
//       <h2>Most Traded (24h)</h2>
//       {total_volume.map((item) => {
//         return (
//           <div key={item.id}>
//             <p>{item.name}</p>
//             <p>{item.total_volume}</p>
//           </div>
//         );
//       })}
//       <h2>Most Volatile (24h)</h2>
//       {recently_acitve.map((item) => {
//         return (
//           <div key={item.id}>
//             <p>{item.name}</p>
//           </div>
//         );
//       })}
//       <h2>Near ATH</h2>
//       {all_time_high.map((item) => {
//         return (
//           <div key={item.id}>
//             <p>{item.name}</p>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default Market;
import React, { useMemo } from "react";
import "./Market.css";
import { useCoins } from "./CoinsContext";
import { useNavigate } from "react-router-dom";

const MarketCard = ({ title, data, type }) => {
  const navigate = useNavigate();

  return ( 
    <div className={`mk-card mk-${type}`}>
      <h3 className="mk-card-title">{title}</h3>

      <div className="mk-list">
        {data.map((coin, index) => (
          <div
            key={coin.id}
            className="mk-row"
            onClick={() => navigate(`/userdashboard/coin/${coin.id}`)}
          >
            <span className="mk-rank">#{index + 1}</span>
            <span className="mk-name">{coin.name}</span>

            {type === "gainers" || type === "losers" ? (
              <span className="mk-value">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            ) : type === "volume" ? (
              <span className="mk-value">
                {coin.total_volume.toLocaleString()}
              </span>
            ) : (
              <span className="mk-value">
                {(coin.high_24h - coin.low_24h).toFixed(2)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Market = () => {
  const { coins } = useCoins();

  const { gainers, losers, volume, volatile } = useMemo(() => {
    return {
      gainers: [...coins]
        .sort(
          (a, b) =>
            b.price_change_percentage_24h -
            a.price_change_percentage_24h
        )
        .slice(0, 5),

      losers: [...coins]
        .sort(
          (a, b) =>
            a.price_change_percentage_24h -
            b.price_change_percentage_24h
        )
        .slice(0, 5),

      volume: [...coins]
        .sort((a, b) => b.total_volume - a.total_volume)
        .slice(0, 5),

      volatile: [...coins]
        .sort(
          (a, b) =>
            (b.high_24h - b.low_24h) -
            (a.high_24h - a.low_24h)
        )
        .slice(0, 5),
    };
  }, [coins]);

  return (
    <div className="mk-container">
      <MarketCard title="Top Gainers (24h)" data={gainers} type="gainers" />
      <MarketCard title="Top Losers (24h)" data={losers} type="losers" />
      <MarketCard title="Most Traded (24h)" data={volume} type="volume" />
      <MarketCard title="Most Volatile (24h)" data={volatile} type="volatile" />
    </div>
  );
};

export default Market;
