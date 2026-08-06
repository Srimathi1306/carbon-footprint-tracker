import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import GoalProgress from "../../components/dashboard/GoalProgress";
import RecommendationCard from "../../components/dashboard/RecommendationCard";
import { useEffect, useState } from "react";
import { getUserActivities } from "../../services/activityService";
import { getDashboard } from "../../services/dashboardService";

import Chatbot from "../../components/chatbot/Chatbot";

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

import {
  FaLeaf,
  FaCar,
  FaBolt,
  FaBullseye,
  FaClipboardList,
  FaChartLine,
  FaTrophy,
  FaCalendarAlt,
} from "react-icons/fa";
import "../../styles/dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    totalCarbon: 0,
    transportCarbon: 0,
    electricityCarbon: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const dashboardResponse = await getDashboard();

      setDashboard(dashboardResponse.data);

      const activityResponse = await getUserActivities();

      const activities = activityResponse.data;

      setActivities(activities);

      const totalCarbon = activities.reduce(
        (sum, activity) => sum + activity.carbonEmission,
        0,
      );

      const transportCarbon = activities
        .filter((activity) => activity.category === "Transport")
        .reduce((sum, activity) => sum + activity.carbonEmission, 0);

      const electricityCarbon = activities
        .filter((activity) => activity.category === "Electricity")
        .reduce((sum, activity) => sum + activity.carbonEmission, 0);

      setStats({
        totalCarbon,
        transportCarbon,
        electricityCarbon,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Total Activities
  // const totalActivities = activities.length;

  // // Average Emission
  // const averageEmission =
  //   totalActivities === 0 ? 0 : stats.totalCarbon / totalActivities;

  // Total Activities
  const totalActivities = dashboard?.totalActivities ?? 0;

  // Average Emission
  const averageEmission = dashboard?.averageCarbonEmission ?? 0;

  // Highest Category
  const categoryTotals = {};

  activities.forEach((activity) => {
    categoryTotals[activity.category] =
      (categoryTotals[activity.category] || 0) + activity.carbonEmission;
  });

  const highestCategory =
    Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  const pieChartData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));
  // This Month Activities
  const today = new Date();

  // const thisMonthActivities = activities.filter((activity) => {
  //   const date = new Date(activity.activityDate);

  //   return (
  //     date.getMonth() === today.getMonth() &&
  //     date.getFullYear() === today.getFullYear()
  //   );
  // });

  // const thisMonthCount = thisMonthActivities.length;

  const thisMonthCarbon = activities
    .filter((activity) => {
      const date = new Date(activity.activityDate);

      return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, activity) => sum + activity.carbonEmission, 0);

  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());

  const thisWeekCarbon = activities
    .filter((activity) => {
      const date = new Date(activity.activityDate);
      return date >= weekStart && date <= today;
    })
    .reduce((sum, activity) => sum + activity.carbonEmission, 0);

  // Recent Activities
  const recentActivities = [...activities]
    .sort((a, b) => new Date(b.activityDate) - new Date(a.activityDate))
    .slice(0, 5);

  const COLORS = [
    "#16a34a",
    "#2563eb",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  const dailyTotals = {};

  activities.forEach((activity) => {
    dailyTotals[activity.activityDate] =
      (dailyTotals[activity.activityDate] || 0) + activity.carbonEmission;
  });

  const lineChartData = Object.entries(dailyTotals).map(([date, emission]) => ({
    date,
    emission,
  }));

  return (
    <DashboardLayout role="USER">
      <h1>User dashboard</h1>
      <div className="dashboard">
        <div className="dashboard-grid">
          <StatCard
            icon={<FaLeaf />}
            title="Total Carbon"
            value={`${dashboard?.totalCarbonEmission?.toFixed(2) ?? "0.00"} kg`}
            color="#16a34a"
          />

          <StatCard
            icon={<FaCar />}
            title="Transport"
            value={`${stats.transportCarbon.toFixed(2)} kg`}
            color="#2563eb"
          />

          <StatCard
            icon={<FaBolt />}
            title="Electricity"
            value={`${stats.electricityCarbon.toFixed(2)} kg`}
            color="#f59e0b"
          />

          <StatCard
            icon={<FaBullseye />}
            title="Goal Progress"
            value={`${dashboard?.goalProgress?.toFixed(1) ?? "0.0"}%`}
            color="#dc2626"
          />

          <StatCard
            icon={<FaTrophy />}
            title="XP"
            value={dashboard?.xp ?? 0}
            color="#7c3aed"
          />

          <StatCard
            icon={<FaLeaf />}
            title="Badges"
            value={dashboard?.badgeCount ?? 0}
            color="#16a34a"
          />

          <StatCard
            icon={<FaChartLine />}
            title="Streak"
            value={dashboard?.currentStreak ?? 0}
            color="#f97316"
          />

          <StatCard
            icon={<FaCalendarAlt />}
            title="Daily Missions"
            value={dashboard?.completedDailyMissions ?? 0}
            color="#0891b2"
          />

          <StatCard
            icon={<FaClipboardList />}
            title="Activities"
            value={dashboard?.totalActivities ?? 0}
            color="#0891b2"
          />

          <StatCard
            icon={<FaChartLine />}
            title="Average"
            value={`${dashboard?.averageCarbonEmission?.toFixed(2) ?? "0.00"} kg`}
            color="#7c3aed"
          />

          <StatCard
            icon={<FaTrophy />}
            title="Top Category"
            value={highestCategory}
            color="#f97316"
          />

          <StatCard
            icon={<FaCalendarAlt />}
            title="This Month"
            value={`${dashboard?.monthlyEmission?.toFixed(2) ?? "0.00"} kg`}
            color="#0f766e"
          />

          <StatCard
            icon={<FaCalendarAlt />}
            title="This Week"
            value={`${dashboard?.weeklyEmission?.toFixed(2) ?? "0.00"} kg`}
            color="#9333ea"
          />
        </div>

        <div className="dashboard-row">
          <div className="chart-card">
            <h3>Weekly Carbon Emission</h3>

            <ResponsiveContainer width="100%" height={250}>
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

          <div className="chart-card">
            <h3>Emission by Category</h3>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
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
        </div>

        {/* <GoalProgress />

        <RecommendationCard /> */}
        {/* <Chatbot /> */}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
