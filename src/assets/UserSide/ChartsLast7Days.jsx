import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const ChartsWeekly = ({ data }) => {
  const formattedData = data.map((d) => ({
    week: d.week_start,
    total_trades: d.total_trades,
  }));

  return (
    <BarChart width={650} height={350} data={formattedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="week"
        tickFormatter={(value) => {
          const start = new Date(value);
          const end = new Date(start);
          end.setDate(start.getDate() + 6);
          return `${start.getDate()}-${end.getDate()} ${start.toLocaleString("en-US", { month: "short" })}`;
        }}
      />
      <YAxis allowDecimals={false} />
      <Tooltip
        formatter={(value) => [`${value} trades`, "Trades"]}
        labelFormatter={(label) => {
          const start = new Date(label);
          const end = new Date(start);
          end.setDate(start.getDate() + 6);
          return `Week: ${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
        }}
      />
      <Bar dataKey="total_trades" fill="#3b82f6" />
    </BarChart>
  );
};

export default ChartsWeekly;
