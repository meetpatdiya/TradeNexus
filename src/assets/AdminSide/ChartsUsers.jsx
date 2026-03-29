import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";

const ChartsUsers = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
      <div  style={{ width: "100%", height: 250,padding:10, background: "#fff" }}>
        <h3>User Growth</h3>
        <ResponsiveContainer width="100%" height={250} >
          <LineChart
            data={data}
          >
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
                       dataKey="date"
                       tickFormatter={(value) =>
                         new Date(value).toLocaleDateString("en-IN", {
                           day: "2-digit",
                           month: "short",
                         })
                       }
                     />
            <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />

            <Tooltip
              contentStyle={{ borderRadius: "10px", border: "none" }}
              labelStyle={{ fontWeight: "bold" }}
              labelFormatter={(value) =>
              new Date(value).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            }
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
    
  );
};

export default ChartsUsers;
