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
