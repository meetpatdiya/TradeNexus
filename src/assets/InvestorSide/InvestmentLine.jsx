import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function InvestmentLine({ data }) {
  return (
    <div style={{ height: "400px", background: "white",padding:"10px" }}>
      <h2
        style={{
          textAlign: "center",
          margin: "10px 0",
          fontWeight: "600",
          color: "#0f172a",
        }}
      >
        Investment Growth Over Time
      </h2>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) =>
              new Date(date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })
            }
            angle={-30}
            height={60}
            textAnchor="end"
          />
          <YAxis />
          <Tooltip
            labelFormatter={(date) => {
              const d = new Date(date);
              return `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })} ${d.getFullYear()}`;
            }}
            formatter={(value) => [
              `$${Number(value).toLocaleString()}`,
              "Investment",
            ]}
          />{" "}
          <Line
            type="monotone"
            dataKey="cumulative_investment"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
