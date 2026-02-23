import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

const ChartsInvestorPortfolio = ({ data }) => {
  const formattedData = data.map((item) => ({
    name: item.crypto_name,
    size: Number(item.net_invested_amount),
  }));
  const COLORS = [
    "#6366F1", // indigo
    "#22C55E", // green
    "#F59E0B", // amber
    "#EF4444", // red
    "#3B82F6", // blue
    "#A855F7", // purple
    "#14B8A6", // teal
    "#F43F5E", // rose
    "#8B5CF6", // violet
    "#10B981", // emerald
  ];
  const CustomizedContent = (props) => {
    const { x, y, width, height, name, size, index } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: COLORS[index % COLORS.length],
            stroke: "#fff",
            strokeWidth: 2,
          }}
        />
        {width > 80 && height > 40 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="#fff"
            fontSize={18}
            fontWeight="normal"
          >
            {name}
          </text>
        )}
      </g>
    );
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2 style={{ textAlign: "center" }}>Total Investment Distribution</h2>

      <ResponsiveContainer>
        <Treemap
          data={formattedData}
          dataKey="size"
          stroke="#fff"
          fill="#8884d8"
          content={<CustomizedContent />}
        >
          <Tooltip />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartsInvestorPortfolio;
