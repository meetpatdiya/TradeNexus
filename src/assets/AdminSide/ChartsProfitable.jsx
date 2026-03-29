import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function ChartsProfitable({ data }) {

  const chartData = data.map((d) => ({
    coin: d.symbol.toUpperCase(),
    profit: Number(d.profit)
  }));  

  return (
    <div style={{ width: "100%", height: 250,padding:10, background: "#fff" }}>
      <h3 >Most Profitable Coins</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="coin" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="profit"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartsProfitable;