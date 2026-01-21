import React from "react";
import ReactECharts from "echarts-for-react";

const CoinDetailGraph = ({ prices }) => {
  if (!prices || prices.length === 0) return <div>Loading chart...</div>;
  // x-axis labels (using index since sparkline has no timestamps)
  const time = prices.map((_, idx) => idx + 1); // 1,2,3,...  
  const values = prices;
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
      formatter: (params) => {
        const p = params[0];
        return `Point: ${p.axisValue}<br/>Price: $${p.data.toFixed(2)}`;
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "10%",
      bottom: "10%",
    },
    xAxis: {
      type: "category",
      data: time,
      boundaryGap: false,
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      scale: true,
      axisLine: { show: false },
      splitLine: { lineStyle: { opacity: 0.3 } },
    },
    dataZoom: [
      { type: "inside", throttle: 50 },
      { type: "slider" },
    ],
    series: [
      {
        data: values,
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: { width: 2 },
        areaStyle: { opacity: 0.3 },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />;
};

export default CoinDetailGraph;
