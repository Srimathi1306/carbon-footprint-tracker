import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import OrganizationNotificationBell from "../../components/organization/OrganizationNotificationBell";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getOrganizationAnalytics } from "../../services/organizationService";
import "../../styles/admin.css";

function OrganizationAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getOrganizationAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load organization analytics.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="ORGANIZATION">
        <h3>Loading analytics...</h3>
      </DashboardLayout>
    );
  }

  if (!analytics) {
    return (
      <DashboardLayout role="ORGANIZATION">
        <h3>No analytics data available.</h3>
      </DashboardLayout>
    );
  }

  const monthlyData = analytics.monthlyEmissions.map((item) => ({
    month: `${item.year}-${String(item.month).padStart(2, "0")}`,
    emission: item.carbonEmission,
  }));

  const categoryData = analytics.categoryEmissions.map((item) => ({
    category: item.category,
    emission: item.carbonEmission,
  }));

  const userData = analytics.userEmissions.map((item) => ({
    user: item.userName,
    emission: item.carbonEmission,
  }));

  return (
    <DashboardLayout role="ORGANIZATION">
      <DashboardHeader
        title="Organization Analytics"
        subtitle="Analyze carbon emissions and activity trends across your organization."
        notificationComponent={<OrganizationNotificationBell />}
      />

      <div className="admin-card-container">
        <div className="chart-card">
          <h3>Total Activities</h3>
          <h2>{analytics.totalActivities}</h2>
        </div>

        <div className="chart-card">
          <h3>Total Carbon Emission</h3>
          <h2>{Number(analytics.totalCarbonEmission).toFixed(2)} kg</h2>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Monthly Carbon Emission</h3>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="emission"
                name="Carbon Emission (kg)"
                stroke="#22c55e"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Emission by Category</h3>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="emission"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {categoryData.map((_, index) => (
                  <Cell key={index} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <h3>Emission by User</h3>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={userData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="user" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar
              dataKey="emission"
              name="Carbon Emission (kg)"
              fill="#3b82f6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
}

export default OrganizationAnalytics;
