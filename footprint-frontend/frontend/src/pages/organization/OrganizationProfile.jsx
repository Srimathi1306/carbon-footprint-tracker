import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import OrganizationNotificationBell from "../../components/organization/OrganizationNotificationBell";
import {
  getOrganizationProfile,
  updateOrganizationProfile,
} from "../../services/organizationService";
import "../../styles/admin.css";

function OrganizationProfile() {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getOrganizationProfile();

      setProfile({
        id: data.id,
        name: data.name,
        email: data.email,
      });
    } catch (error) {
      console.error(error);
      alert("Unable to load organization profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = await updateOrganizationProfile({
        name: profile.name,
        email: profile.email,
      });

      setProfile({
        id: data.id,
        name: data.name,
        email: data.email,
      });

      alert("Organization profile updated successfully.");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to update organization profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="ORGANIZATION">
        <DashboardHeader
          title="Organization Profile"
          subtitle="Manage your organization information."
          notificationComponent={<OrganizationNotificationBell />}
        />

        <h3>Loading profile...</h3>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="ORGANIZATION">
      <DashboardHeader
        title="Organization Profile"
        subtitle="View and manage your organization information."
      />

      <div className="admin-dashboard-card">
        <h3>Organization Information</h3>

        <form onSubmit={handleSubmit}>
          <div className="profile-field">
            <label>Organization ID</label>

            <input type="text" value={profile.id} disabled />
          </div>

          <div className="profile-field">
            <label>Organization Name</label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="profile-field">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="save-btn" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default OrganizationProfile;
