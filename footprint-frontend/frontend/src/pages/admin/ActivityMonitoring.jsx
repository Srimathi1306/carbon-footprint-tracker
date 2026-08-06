import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

import AdminActivityTable from "../../components/admin/AdminActivityTable";

import { getAllActivities } from "../../services/activityService";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

import "../../styles/activityHistory.css";
import "../../styles/activityMonitoring.css";

function ActivityMonitoring() {
  const [activities, setActivities] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [user, setUser] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const res = await getAllActivities();
      setActivities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.activityType.toLowerCase().includes(search.toLowerCase()) ||
      activity.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "" || activity.category === category;

    const matchesUser = user === "" || activity.userName === user;

    const matchesFrom = fromDate === "" || activity.activityDate >= fromDate;

    const matchesTo = toDate === "" || activity.activityDate <= toDate;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesUser &&
      matchesFrom &&
      matchesTo
    );
  });

  const categories = [...new Set(activities.map((a) => a.category))];

  const users = [...new Set(activities.map((a) => a.userName))];

  const totalCarbon = filteredActivities.reduce(
    (sum, item) => sum + item.carbonEmission,
    0,
  );

  const totalUsers = new Set(filteredActivities.map((a) => a.userName)).size;
  const COLORS = [
    "#16a34a",
    "#2563eb",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  // ---------- Pie Chart ----------

  const categoryTotals = {};

  filteredActivities.forEach((activity) => {
    categoryTotals[activity.category] =
      (categoryTotals[activity.category] || 0) + activity.carbonEmission;
  });

  const pieChartData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  // ---------- Line Chart ----------

  const dailyTotals = {};

  filteredActivities.forEach((activity) => {
    dailyTotals[activity.activityDate] =
      (dailyTotals[activity.activityDate] || 0) + activity.carbonEmission;
  });

  const lineChartData = Object.entries(dailyTotals).map(([date, emission]) => ({
    date,
    emission,
  }));

  // ---------- Bar Chart ----------

  const activityTotals = {};

  filteredActivities.forEach((activity) => {
    activityTotals[activity.activityType] =
      (activityTotals[activity.activityType] || 0) + activity.carbonEmission;
  });

  const barChartData = Object.entries(activityTotals)
    .map(([activity, emission]) => ({
      activity,
      emission,
    }))
    .sort((a, b) => b.emission - a.emission)
    .slice(0, 10);

  return (
    <DashboardLayout role="ADMIN">
      <DashboardHeader
        title="Activity Monitoring"
        subtitle="Monitor all user activities and carbon emissions."
      />

      {/* Filters */}

      <div className="history-filter-card">
        <input
          type="text"
          placeholder="Search Activity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={user} onChange={(e) => setUser(e.target.value)}>
          <option value="">All Users</option>

          {users.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>

          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button
          className="clear-filter-btn"
          onClick={() => {
            setSearch("");
            setCategory("");
            setUser("");
            setFromDate("");
            setToDate("");
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Summary */}

      <div className="history-summary">
        <div className="summary-card">
          <h2>{filteredActivities.length}</h2>
          <p>Total Activities</p>
        </div>

        <div className="summary-card">
          <h2>{totalCarbon.toFixed(2)} kg</h2>
          <p>Total Carbon Emission</p>
        </div>

        <div className="summary-card">
          <h2>{totalUsers}</h2>
          <p>Total Users</p>
        </div>
      </div>
      <div className="dashboard-card">
        <h3>Emission by Category</h3>

        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-card">
        <h3>Daily Carbon Emission Trend</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="emission"
              stroke="#16a34a"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-card">
        <h3>Top Activities by Carbon Emission</h3>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="activity" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="emission" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="history-info">
        <p>
          Showing <strong>{filteredActivities.length}</strong> of{" "}
          <strong>{activities.length}</strong> activities
        </p>
      </div>

      <div className="history-table-card">
        {filteredActivities.length === 0 ? (
          <div className="empty-history">
            <h3>No activities found</h3>
            <p>No activities match the selected filters.</p>
          </div>
        ) : (
          <AdminActivityTable activities={filteredActivities} />
        )}
      </div>
    </DashboardLayout>
  );
}

export default ActivityMonitoring;
