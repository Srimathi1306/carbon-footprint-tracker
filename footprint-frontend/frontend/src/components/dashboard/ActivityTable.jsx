import { deleteActivity } from "../../services/activityService";
import { useState } from "react";
import EditActivityModal from "./EditActivityModal";
function ActivityTable({ activities, refreshActivities }) {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this activity?",
    );

    if (!confirmDelete) return;

    try {
      await deleteActivity(id);
      refreshActivities();
    } catch (err) {
      console.log(err);
      alert("Failed to delete activity");
    }
  };

  return (
    <>
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Activity Type</th>
              <th>Quantity</th>
              <th>Carbon Emission (kg CO₂)</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {activities.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No activities found.
                </td>
              </tr>
            ) : (
              activities.map((activity) => (
                <tr key={activity.id}>
                  <td>
                    <span className="category-badge">{activity.category}</span>
                  </td>

                  <td>{activity.activityType}</td>

                  <td>
                    {activity.quantity} {activity.unit}
                  </td>

                  <td>{activity.carbonEmission?.toFixed(2)} kg CO₂</td>

                  <td>{activity.activityDate}</td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => setSelectedActivity(activity)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(activity.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {selectedActivity && (
        <EditActivityModal
          activity={selectedActivity}
          closeModal={() => setSelectedActivity(null)}
          refreshActivities={refreshActivities}
        />
      )}
    </>
  );
}

export default ActivityTable;
