import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartInvestorComm = ({ data }) => {
  const chartData = useMemo(() => {
    return data.map((item) => ({
      name: item.name,
      total_commission: Number(item.total_commission),
    }));
  }, [data]);

  return (
    <div
      style={{
        width: "100%",
        height: 400,
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        style={{
          marginBottom: "20px",
          fontSize: "18px",
          fontWeight: "600",
          color: "#1f2937",
        }}
      >
        Investor Commission Distribution
      </h3>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#374151", fontSize: 12 }}
          />
          <YAxis
            tick={{ fill: "#374151", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          />
          <Bar
            dataKey="total_commission"
            fill="#2563eb"
            radius={[6, 6, 0, 0]}
            barSize={100}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartInvestorComm;