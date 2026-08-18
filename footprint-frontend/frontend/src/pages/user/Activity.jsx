import { useEffect, useState } from "react";
import { FaLeaf, FaTasks } from "react-icons/fa";

import DashboardLayout from "../../layouts/DashboardLayout";
import ActivityTable from "../../components/dashboard/ActivityTable";
import AddActivityModal from "../../components/dashboard/AddActivityModal";
import StatCard from "../../components/dashboard/StatCard";

import { getUserActivities } from "../../services/activityService";

import "../../styles/activity.css";
import "../../styles/dashboard.css";

function Activity() {
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  // Today's date
  const now = new Date();

  const today =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0");

  // Show only today's activities
  const todayActivities = activities.filter(
    (activity) => activity.activityDate === today,
  );

  // Today's total carbon emission
  const todayCarbon = todayActivities.reduce(
    (sum, activity) => sum + activity.carbonEmission,
    0,
  );

  return (
    <DashboardLayout role="USER">
      <div className="activity-page">
        {/* Header */}
        <div className="activity-header">
          <div>
            <h2>Today's Activities</h2>
            <p>Track your carbon footprint for today.</p>
          </div>

          <button className="add-btn" onClick={() => setShowModal(true)}>
            + Add Activity
          </button>
        </div>

        {/* Summary Cards */}
        <div className="stats-grid">
          <StatCard
            icon={<FaTasks />}
            title="Today's Activities"
            value={todayActivities.length}
            color="#2563eb"
          />

          <StatCard
            icon={<FaLeaf />}
            title="Today's Carbon"
            value={`${todayCarbon.toFixed(2)} kg`}
            color="#16a34a"
          />
        </div>

        {/* Activity Table */}
        <ActivityTable
          activities={todayActivities}
          refreshActivities={loadActivities}
        />
      </div>

      {/* Add Activity Modal */}
      {showModal && (
        <AddActivityModal
          closeModal={() => setShowModal(false)}
          refreshActivities={loadActivities}
        />
      )}
    </DashboardLayout>
  );
}

export default Activity;
