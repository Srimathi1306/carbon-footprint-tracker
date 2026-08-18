import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import OrganizationNotificationBell from "../../components/organization/OrganizationNotificationBell";
import { getOrganizationActivities } from "../../services/organizationService";
import "../../styles/admin.css";

function OrganizationActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await getOrganizationActivities();
      setActivities(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load organization activities.");
    } finally {
      setLoading(false);
    }
  };

  const filteredActivities = activities.filter((activity) => {
    const searchText = search.toLowerCase();

    return (
      activity.userName?.toLowerCase().includes(searchText) ||
      activity.category?.toLowerCase().includes(searchText) ||
      activity.activityType?.toLowerCase().includes(searchText)
    );
  });

  return (
    <DashboardLayout role="ORGANIZATION">
      <DashboardHeader
        title="Activity Monitoring"
        subtitle="Monitor activities and carbon emissions of your organization."
        notificationComponent={<OrganizationNotificationBell />}
      />

      <div className="user-toolbar">
        <input
          className="search-box"
          type="text"
          placeholder="Search activities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <h3>Loading activities...</h3>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Category</th>
                <th>Activity</th>
                <th>Quantity</th>
                <th>Carbon Emission</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan="6">No activities found</td>
                </tr>
              ) : (
                filteredActivities.map((activity) => (
                  <tr key={activity.id}>
                    <td>{activity.userName}</td>
                    <td>{activity.category}</td>
                    <td>{activity.activityType}</td>
                    <td>
                      {activity.quantity} {activity.unit}
                    </td>
                    <td>{Number(activity.carbonEmission).toFixed(2)} kg</td>
                    <td>{activity.activityDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}

export default OrganizationActivities;
