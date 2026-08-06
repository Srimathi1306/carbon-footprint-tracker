function UserTable({ users, onDelete, onEdit }) {
  if (users.length === 0) {
    return (
      <div className="table-container">
        <table className="admin-table">
          <tbody>
            <tr>
              <td colSpan="5">No users found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>

              <td>{user.username}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>

              <td>
                <div className="action-buttons">
                  <button className="edit-btn" onClick={() => onEdit(user)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
