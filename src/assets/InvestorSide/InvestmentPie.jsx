import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

const COLORS = [
  "#2563eb", // blue
  "#16a34a", // green
  "#9333ea", // purple
  "#f59e0b", // amber
  "#ef4444", // red
  "#06b6d4"  // cyan
];
export default function InvestmentPie({ data = [] }) {

  const formattedData = data.map(item => ({
    ...item,
    total: Number(item.total)
  }));

  return (
    <div style={{ height: "350px",background:"white" }}>
        <h2 style={{ 
  textAlign: "center", 
  marginTop: "10px",
  fontWeight: "600",
  color: "#0f172a"
}}>
  Investment Distribution
</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formattedData}
            dataKey="total"
            nameKey="crypto_name"
            cx="50%"
            cy="50%"
            outerRadius={110}
  innerRadius={65}   
  paddingAngle={2}
          >
            {formattedData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}