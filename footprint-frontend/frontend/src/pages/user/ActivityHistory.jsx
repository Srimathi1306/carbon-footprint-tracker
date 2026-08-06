import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import ActivityTable from "../../components/dashboard/ActivityTable";
import { getUserActivities } from "../../services/activityService";

import "../../styles/activityHistory.css";

function ActivityHistory() {
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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

  const filteredActivities = activities
    .filter((activity) => {
      const matchesSearch =
        activity.activityType.toLowerCase().includes(search.toLowerCase()) ||
        activity.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === "" || activity.category === category;

      const matchesFrom = fromDate === "" || activity.activityDate >= fromDate;

      const matchesTo = toDate === "" || activity.activityDate <= toDate;

      return matchesSearch && matchesCategory && matchesFrom && matchesTo;
    })
    .sort((a, b) => new Date(b.activityDate) - new Date(a.activityDate));

  const categories = [...new Set(activities.map((a) => a.category))];
  const totalCarbon = filteredActivities.reduce(
    (sum, item) => sum + item.carbonEmission,
    0,
  );

  return (
    <DashboardLayout role="USER">
      <DashboardHeader
        title="Activity History"
        subtitle="View and filter all your logged activities."
      />

      <div className="history-filter-card">
        <input
          type="text"
          placeholder="Search activity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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
            setFromDate("");
            setToDate("");
          }}
        >
          Clear Filters
        </button>
      </div>

      <div className="history-summary">
        <div className="summary-card">
          <h2>{filteredActivities.length}</h2>
          <p>Total Activities</p>
        </div>

        <div className="summary-card">
          <h2>{totalCarbon.toFixed(2)} kg</h2>
          <p>Total Carbon Emission</p>
        </div>
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
            <h3>🌱 No activities found</h3>
            <p>No activities match the selected filters.</p>
          </div>
        ) : (
          <ActivityTable
            activities={filteredActivities}
            refreshActivities={loadActivities}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default ActivityHistory;
