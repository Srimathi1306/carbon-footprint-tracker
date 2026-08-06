import { useEffect, useState } from "react";

import {
  getDashboardStats,
  getTrend,
  getCategoryBreakdown,
} from "../../services/adminAnalyticsService";

import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";
import "../../styles/dashboard.css";

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
} from "recharts";

import { FaUsers, FaLeaf, FaClipboardList, FaChartLine } from "react-icons/fa";

function AdminAnalytics() {
  const [stats, setStats] = useState({});
  const [trendData, setTrendData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [filter, setFilter] = useState("Monthly");

  useEffect(() => {
    loadAnalytics();
  }, [filter]);

  const loadAnalytics = async () => {
    try {
      const [statsRes, trendRes, categoryRes] = await Promise.all([
        getDashboardStats(),
        getTrend(filter),
        getCategoryBreakdown(),
      ]);

      setStats(statsRes.data);
      setTrendData(trendRes.data);
      setCategoryData(categoryRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const COLORS = [
    "#16a34a",
    "#2563eb",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  return (
    <>
      <DashboardLayout role="ADMIN">
        <DashboardHeader
          title="Analytics"
          subtitle="Organization Carbon Insights"
        />

        <div className="chart-header">
          <h2>Analytics Overview</h2>

          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>

        <div className="dashboard-grid">
          <StatCard
            icon={<FaUsers />}
            title="Users"
            value={stats.totalUsers}
            color="#2563eb"
          />

          <StatCard
            icon={<FaClipboardList />}
            title="Activities"
            value={stats.totalActivities}
            color="#14b8a6"
          />

          <StatCard
            icon={<FaLeaf />}
            title="Total Carbon"
            value={`${stats.totalCarbon?.toFixed(2)} kg`}
            color="#16a34a"
          />

          <StatCard
            icon={<FaChartLine />}
            title="Average/User"
            value={`${stats.averageCarbonPerUser?.toFixed(2)} kg`}
            color="#8b5cf6"
          />
        </div>

        <div className="dashboard-row">
          <div className="chart-card">
            <h3>Carbon Trend</h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="label" />

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

          <div className="chart-card">
            <h3>Emission by Category</h3>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="totalEmission"
                  nameKey="category"
                  outerRadius={110}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default AdminAnalytics;
