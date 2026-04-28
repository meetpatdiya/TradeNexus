import React from "react";
import ReactECharts from "echarts-for-react";

const CoinDetailGraph = ({ prices }) => {
  if (!prices || prices.length === 0) return <div>Loading chart...</div>;
  const time = prices.map((_, idx) => idx + 1);
  const values = prices;
  const isUp = values[values.length - 1] >= values[0];
  const color = isUp ? "#0ecb81" : "#f6465d";
  const areaTop = isUp
  ? "rgba(14,203,129,0.4)"
  : "rgba(246,70,93,0.4)";

const areaBottom = isUp
  ? "rgba(14,203,129,0)"
  : "rgba(246,70,93,0)";
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "line" },
      backgroundColor: "#1e2329",
      borderWidth: 0,
      textStyle: { color: "#fff" },
      formatter: (params) => {
        const p = params[0];
        return `$${Number(p.data || 0).toFixed(2)}`;
      },
    },

    grid: { left: "2%", right: "2%", top: "5%", bottom: "5%" },

    xAxis: {
      type: "category",
      data: time,
      boundaryGap: false,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: true },
    },

    yAxis: {
      type: "value",
      scale: true,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: true },
    },

    series: [
      {
        data: values,
        type: "line",
        smooth: false,
        symbol: "none",
        lineStyle: {
          width: 2,
          color: color,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: areaTop },
              { offset: 1, color: areaBottom },
            ],
          },
        },
      },
    ],

    dataZoom: [{ type: "inside" }],
  };

  return (
    <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
  );
};

export default CoinDetailGraph;
