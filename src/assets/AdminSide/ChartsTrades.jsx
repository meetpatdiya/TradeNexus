import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartsTrades = ({ trades }) => {
const chartData = trades.map((item) => ({
  date: item.date,
  total: Number(item.total),
}));

  return (
    <div style={{ background:"#fff" }}>
         <h3>
      Trades Data
    </h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date"  
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              })
            } />
          <YAxis />
          <Tooltip labelFormatter={(value) =>
              new Date(value).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            } />
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartsTrades;