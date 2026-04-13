import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ChartsTotalInvest = ({ data }) => {
  const formattedData = data.map((item) => ({
    date: item.date,
    total_investment: Number(item.total_investment),
  }));

  return (
    <div
      style={{
        width: "100%",
        height: 450,
        background: "#fff",
        padding: "20px 50px 40px",
          borderRadius: "10px",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>
        Investor Total Investment Over Time
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            style={{fontSize:"14px"}}
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              })
            }
          />
          <YAxis />

          <Tooltip
            labelFormatter={(value) =>
              new Date(value).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            }
          />
          <Area
            type="monotone"
            dataKey="total_investment"
            stroke="#4CAF50"
            fill="#A5D6A7"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartsTotalInvest;
