import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF"];

const ChartsCoins = ({ data }) => {
  if (!data || data.length === 0) return null;

  const formattedData = data.map(item => ({
    ...item,
    total_volume: Number(item.total_volume)
  }));

  return (
    <>
      <h3>Most Traded Coin:</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="crypto_id" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total_volume">
          {formattedData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    </>
  );
};

export default ChartsCoins;