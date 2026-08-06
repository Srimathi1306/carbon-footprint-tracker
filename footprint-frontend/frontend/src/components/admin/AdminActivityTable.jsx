function AdminActivityTable({ activities }) {
  return (
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Category</th>
            <th>Activity</th>
            <th>Quantity</th>
            <th>Emission Factor</th>
            <th>Carbon Emission</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {activities.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No activities found.
              </td>
            </tr>
          ) : (
            activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.userName}</td>

                <td>
                  <span className="category-badge">{activity.category}</span>
                </td>

                <td>{activity.activityType}</td>

                <td>
                  {activity.quantity} {activity.unit}
                </td>

                <td>
                  {(activity.carbonEmission / activity.quantity).toFixed(4)}
                </td>

                <td>{activity.carbonEmission.toFixed(2)} kg CO₂</td>

                <td>{activity.activityDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminActivityTable;
