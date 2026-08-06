import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import "../../styles/analytics.css";

import { getUserActivities } from "../../services/activityService";
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
function Analytics() {
  const [activities, setActivities] = useState([]);
  const [analyticsFilter, setAnalyticsFilter] = useState("ALL");

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const res = await getUserActivities();
      setActivities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredActivities = activities.filter((activity) => {
    if (analyticsFilter === "ALL") return true;

    const activityDate = new Date(activity.activityDate);
    const today = new Date();

    switch (analyticsFilter) {
      case "TODAY":
        return activity.activityDate === today.toISOString().split("T")[0];

      case "WEEK": {
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 6);
        return activityDate >= weekAgo;
      }

      case "MONTH":
        return (
          activityDate.getMonth() === today.getMonth() &&
          activityDate.getFullYear() === today.getFullYear()
        );

      case "YEAR":
        return activityDate.getFullYear() === today.getFullYear();

      default:
        return true;
    }
  });

  const totalCarbon = filteredActivities.reduce(
    (sum, activity) => sum + activity.carbonEmission,
    0,
  );

  const totalActivities = filteredActivities.length;

  const averageEmission =
    totalActivities === 0 ? 0 : totalCarbon / totalActivities;

  const categoryTotals = {};

  filteredActivities.forEach((activity) => {
    categoryTotals[activity.category] =
      (categoryTotals[activity.category] || 0) + activity.carbonEmission;
  });

  const highestCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1],
  )[0];

  const pieChartData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  const groupedTotals = {};

  filteredActivities.forEach((activity) => {
    const date = activity.activityDate;

    groupedTotals[date] = (groupedTotals[date] || 0) + activity.carbonEmission;
  });

  const lineChartData = Object.entries(groupedTotals)
    .map(([date, emission]) => ({
      date,
      emission,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const activityTypeTotals = {};

  filteredActivities.forEach((activity) => {
    activityTypeTotals[activity.activityType] =
      (activityTypeTotals[activity.activityType] || 0) +
      activity.carbonEmission;
  });

  const barChartData = Object.entries(activityTypeTotals)
    .map(([activity, emission]) => ({
      activity,
      emission: Number(emission.toFixed(2)),
    }))
    .sort((a, b) => b.emission - a.emission);
  //.slice(0, 8);

  const categoriesUsed = Object.keys(categoryTotals).length;

  const highestEmissionDay =
    lineChartData.length > 0
      ? lineChartData.reduce((a, b) => (a.emission > b.emission ? a : b))
      : null;

  const COLORS = [
    "#16a34a",
    "#2563eb",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  return (
    <DashboardLayout role="USER">
      <DashboardHeader
        title="Analytics Dashboard"
        subtitle="Visualize and analyze your carbon footprint."
      />

      <div className="analytics-filter">
        <select
          value={analyticsFilter}
          onChange={(e) => setAnalyticsFilter(e.target.value)}
        >
          <option value="ALL">All Time</option>
          <option value="TODAY">Today</option>
          <option value="WEEK">Last 7 Days</option>
          <option value="MONTH">This Month</option>
          <option value="YEAR">This Year</option>
        </select>
      </div>

      <div className="analytics-stats-grid">
        <div className="analytics-stat-card">
          <h3>Total Carbon Emission</h3>
          <h2>{totalCarbon.toFixed(2)} kg CO₂</h2>
        </div>

        <div className="analytics-stat-card">
          <h3>Total Activities</h3>
          <h2>{totalActivities}</h2>
        </div>

        <div className="analytics-stat-card">
          <h3>Average Emission</h3>
          <h2>{averageEmission.toFixed(2)} kg</h2>
        </div>

        <div className="analytics-stat-card">
          <h3>Highest Category</h3>
          <h2>{highestCategory ? highestCategory[0] : "-"}</h2>
        </div>
      </div>

      <div className="analytics-chart">
        <h3>Carbon Emission Trend</h3>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line dataKey="emission" stroke="#16a34a" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="analytics-chart-grid">
        <div className="analytics-card">
          <h3>Carbon Emission by Category</h3>

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

        <div className="analytics-card">
          <h3>Top Activity Types</h3>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="activity"
                angle={-35}
                textAnchor="end"
                interval={0}
                height={90}
              />

              <YAxis />

              <Tooltip formatter={(value) => [`${value} kg CO₂`, "Emission"]} />

              <Bar
                dataKey="emission"
                fill="#16a34a"
                radius={[6, 6, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="analytics-chart-grid">
        <div className="analytics-card">
          <h3>Categories Used</h3>
          <h2>{categoriesUsed}</h2>
        </div>

        <div className="analytics-card">
          <h3>Highest Emission Day</h3>

          <h2>{highestEmissionDay ? highestEmissionDay.date : "-"}</h2>

          <p>
            {highestEmissionDay
              ? `${highestEmissionDay.emission.toFixed(2)} kg CO₂`
              : ""}
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Analytics;
