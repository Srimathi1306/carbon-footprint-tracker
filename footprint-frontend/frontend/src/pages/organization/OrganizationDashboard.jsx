import { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import OrganizationNotificationBell from "../../components/organization/OrganizationNotificationBell";
import StatCard from "../../components/dashboard/StatCard";
import { OrganizationAuthContext } from "../../context/OrganizationAuthContext";
import { getOrganizationDashboard } from "../../services/organizationService";
import "../../styles/admin.css";

function OrganizationDashboard() {
  const { organization } = useContext(OrganizationAuthContext);

  const [stats, setStats] = useState({
    organizationId: null,
    organizationName: "",
    organizationEmail: "",
    totalUsers: 0,
    totalActivities: 0,
    totalCarbonEmission: 0,
    totalBadges: 0,
    completedGoals: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await getOrganizationDashboard();
        setStats(response);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Failed to load organization dashboard",
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout role="ORGANIZATION">
        <DashboardHeader
          title="Organization Dashboard"
          subtitle="Monitor your organization's sustainability activities."
          notificationComponent={<OrganizationNotificationBell />}
        />

        <p>Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout role="ORGANIZATION">
        <DashboardHeader
          title="Organization Dashboard"
          subtitle="Monitor your organization's sustainability activities."
        />

        <p>{error}</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="ORGANIZATION">
      <DashboardHeader
        title="Organization Dashboard"
        subtitle={`Welcome, ${organization?.name || stats.organizationName}`}
      />

      <div className="admin-card-container">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          color="#3b82f6"
          icon="👥"
          subtitle="Users in organization"
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
          value={`${Number(stats.totalCarbonEmission).toFixed(2)} kg`}
          color="#f59e0b"
          icon="🌍"
          subtitle="Total organization emission"
        />

        <StatCard
          title="Badges"
          value={stats.totalBadges}
          color="#8b5cf6"
          icon="🏆"
          subtitle="Badges earned"
        />

        <StatCard
          title="Completed Goals"
          value={stats.completedGoals}
          color="#ef4444"
          icon="🎯"
          subtitle="Goals completed"
        />
      </div>

      <div className="admin-dashboard-grid">
        <div className="admin-dashboard-card">
          <h3>Organization Overview</h3>

          <p>
            <strong>Organization:</strong> {stats.organizationName}
          </p>

          <p>
            <strong>Email:</strong> {stats.organizationEmail}
          </p>

          <p>
            <strong>Organization ID:</strong> {stats.organizationId}
          </p>
        </div>

        <div className="admin-dashboard-card">
          <h3>Sustainability Summary</h3>

          <p>
            <strong>Total Activities:</strong> {stats.totalActivities}
          </p>

          <p>
            <strong>Total Carbon Emission:</strong>{" "}
            {Number(stats.totalCarbonEmission).toFixed(2)} kg
          </p>

          <p>
            <strong>Completed Goals:</strong> {stats.completedGoals}
          </p>

          <p>
            <strong>Badges Earned:</strong> {stats.totalBadges}
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default OrganizationDashboard;
