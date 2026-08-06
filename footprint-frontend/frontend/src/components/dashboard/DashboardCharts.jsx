import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

const lineData = [
  { month: "Jan", emission: 15 },
  { month: "Feb", emission: 20 },
  { month: "Mar", emission: 12 },
  { month: "Apr", emission: 28 },
  { month: "May", emission: 18 },
];

const pieData = [
  { name: "Transport", value: 40 },
  { name: "Electricity", value: 30 },
  { name: "Food", value: 20 },
  { name: "Waste", value: 10 },
];

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

function DashboardCharts() {
  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h3>Carbon Emission Trend</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="emission"
              stroke="#22c55e"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Activity Distribution</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={100}>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardCharts;
