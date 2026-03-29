import "./InvestorPodium.css"
const InvestorPodium = ({ data }) => {
  const podium = [
    data[1], 
    data[0], 
    data[2], 
  ];

  return (
    <div className="podium-container">
      {podium.map((item, index) => {
        const rank = index === 1 ? 1 : index === 0 ? 2 : 3;
        return (
          <div key={index} className={`podium-card rank-${rank}`}>
            <div className="rank-badge">#{rank}</div>

            <div className="investor">
            ID:{item.investor_id}  {item.name}
            </div>

            <div className="value">
              {parseFloat(item.total_commission).toFixed(2)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InvestorPodium;