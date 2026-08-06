function RecentActivities({ activities }) {
  return (
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
          {activities.length === 0 ? (
            <tr>
              <td colSpan="3">No activities found</td>
            </tr>
          ) : (
            activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.category}</td>
                <td>{activity.carbonEmission}</td>
                <td>{activity.activityDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecentActivities;
