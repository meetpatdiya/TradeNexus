import { useCoins } from "./CoinsContext";

const Watchlist = () => {
  const { coins, watchlist, toggleWatchlist } = useCoins();

  const watchlistCoins = coins.filter(coin =>
    watchlist.includes(coin.id)
  );

  if (watchlistCoins.length === 0) {
    return <p>No coins in watchlist</p>;
  }

  return (
    <div>
      {watchlistCoins.map(coin => (
        <div key={coin.id}>
          <h3>{coin.name}</h3>
          <p>${coin.current_price}</p>

          <button onClick={() => toggleWatchlist(coin.id)}>
            Remove ⭐
          </button>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;
