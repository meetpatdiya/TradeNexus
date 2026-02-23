import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip,Area,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const ChartsUsers = ({ data }) => {
  if (!data || data.length === 0) return null;
  const totals = data.reduce(
  (acc, item) => {
    acc.users += Number(item.total_users_role);
    acc.admins += Number(item.total_admins);
    acc.investors += Number(item.total_investors);
    return acc;
  },
  { users: 0, admins: 0, investors: 0 }
);
const totalPersons = totals.users + totals.admins + totals.investors;
const pieData = [
  { name: "Users", value: totals.users },
  { name: "Admin", value: totals.admins },
  { name: "Investors", value: totals.investors },
];

  return (
    <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: "400px" }}>
      <h2>User Growth</h2>
        <ResponsiveContainer width="100%" height={320}>
  <LineChart
    data={data}
    margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
  >
    <defs>
      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
      </linearGradient>
    </defs>

    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
    
    <XAxis 
      dataKey="date" 
      tick={{ fontSize: 12 }}
      stroke="#6b7280"
    />
    
    <YAxis 
      tick={{ fontSize: 12 }}
      stroke="#6b7280"
    />
    
    <Tooltip 
      contentStyle={{ borderRadius: "10px", border: "none" }}
      labelStyle={{ fontWeight: "bold" }}
    />

    <Line
      type="monotone"
      dataKey="total_users"
      stroke="#4f46e5"
      strokeWidth={3}
      dot={{ r: 5 }}
      activeDot={{ r: 8 }}
    />

    <Area
      type="monotone"
      dataKey="total_users"
      stroke="none"
      fillOpacity={1}
      fill="url(#colorUsers)"
    />
  </LineChart>
</ResponsiveContainer>
      </div>

      <div style={{ flex: 1, minWidth: "400px" }}>
              <h2>Total Participents</h2>
        <ResponsiveContainer width="100%" height={320}>
  <PieChart>
    <Tooltip />
    <Pie
      data={pieData}
      dataKey="value"
      innerRadius={70}
      outerRadius={100}
      paddingAngle={3}
    >
      {pieData.map((entry, index) => (
        <Cell key={index} fill={COLORS[index]} />
      ))}
    </Pie>

    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="middle"
      style={{ fontSize: "20px", fontWeight: "bold" }}
    >
      Total : {totalPersons}
    </text>

    <text x="50%" y="92%" textAnchor="middle" fontSize="14">
      🔵 Users   🟢 Admin   🟡 Investors
    </text>

  </PieChart>
</ResponsiveContainer>
      </div>

    </div>
  );
};

export default ChartsUsers;