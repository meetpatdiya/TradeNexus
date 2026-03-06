import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const ChartsInvestorPortfolio = ({ data }) => {
  // Sort + take top 10
  const formattedData = data
    .map((item) => ({
      name: item.crypto_name,
      value: Number(item.net_invested_amount),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  return (
    <div
      style={{
        width: "100%",
        height: 500,
        padding: 25,
        borderRadius: 20,
        background: "#ffffff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: 25,
          color: "#111827",
          fontWeight: 600,
          fontSize: 22,
        }}
      >
        Top 10 Coins by Total Investment
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={formattedData}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            type="number"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />

          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "#374151", fontSize: 13 }}
            width={120}
          />

          <Tooltip
            formatter={(value) => `$${value.toLocaleString()}`}
            contentStyle={{
              borderRadius: 10,
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              color: "#111827",
            }}
          />

          <Bar dataKey="value" fill="#2563EB" radius={[0, 10, 10, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartsInvestorPortfolio;
