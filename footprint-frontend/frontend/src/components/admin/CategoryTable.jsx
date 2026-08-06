function CategoryTable({ categories, onDelete, onEdit }) {
  if (categories.length === 0) {
    return (
      <div className="table-container">
        <table className="admin-table">
          <tbody>
            <tr>
              <td colSpan="3">No categories found.</td>
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
            <th>ID</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>

              <td>{category.name}</td>

              <td>
                <div className="action-buttons">
                  <button className="edit-btn" onClick={() => onEdit(category)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(category.id)}
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

export default CategoryTable;
