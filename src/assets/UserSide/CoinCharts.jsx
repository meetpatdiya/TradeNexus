import React from 'react'
import { LineChart, Line, ResponsiveContainer , YAxis } from "recharts";
const CoinCharts = ({prices , change}) => {
const chartData = prices?.map((price, index) => ({
    index,price,}));

  const color = change >= 0 ? "#16c784" : "#ea3943";
  return (
    <div>
        <ResponsiveContainer width={140} height={50}>
      <LineChart data={chartData}>
         <YAxis
          hide={true} 
          domain={["dataMin", "dataMax"]} 
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
    </div>
  )
}

export default CoinCharts
