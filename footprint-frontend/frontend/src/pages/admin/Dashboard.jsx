import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";
import { getDashboard } from "../../services/adminService";
import DashboardCharts from "../../components/dashboard/DashboardCharts";
import "../../styles/admin.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalActivities: 0,
    totalCarbonEmission: 0,
    recentUsers: [],
    recentActivities: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboard();
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout role="ADMIN">
      <DashboardHeader
        title="Admin Dashboard"
        subtitle="Manage users and monitor the system."
      />

      <div className="admin-card-container">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          color="#3b82f6"
          icon="👥"
          subtitle="Registered users"
        />

        <StatCard
          title="Activities"
          value={stats.totalActivities}
          color="#22c55e"
          icon="🌱"
          subtitle="Activities logged"
        />

        <StatCard
          title="Carbon Emission"
          value={`${stats.totalCarbonEmission.toFixed(2)} kg`}
          color="#f59e0b"
          icon="🌍"
          subtitle="Total emission"
        />

        <StatCard
          title="Recent Users"
          value={stats.recentUsers.length}
          color="#ef4444"
          icon="🆕"
          subtitle="Latest registrations"
        />
      </div>
      <DashboardCharts />

      <div className="admin-dashboard-grid">
        <div className="admin-dashboard-card">
          <h3>Recent Users</h3>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {stats.recentUsers.length === 0 ? (
                <tr>
                  <td colSpan="2">No users found</td>
                </tr>
              ) : (
                stats.recentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-dashboard-card">
          <h3>Recent Activities</h3>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Carbon</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {stats.recentActivities.length === 0 ? (
                <tr>
                  <td colSpan="3">No activities found</td>
                </tr>
              ) : (
                stats.recentActivities.map((activity) => (
                  <tr key={activity.id}>
                    <td>{activity.category}</td>
                    <td>{activity.carbonEmission.toFixed(2)} kg</td>
                    <td>{activity.activityDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
