function EmissionFactorTable({ emissionFactors, onEdit, onDelete }) {
  if (emissionFactors.length === 0) {
    return (
      <div className="table-container">
        <table className="admin-table">
          <tbody>
            <tr>
              <td colSpan="7">No emission factors found.</td>
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
            <th>Category</th>
            <th>Activity Type</th>
            <th>Unit</th>
            <th>Emission Factor</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {emissionFactors.map((factor) => (
            <tr key={factor.id}>
              <td>{factor.categoryName}</td>

              <td>{factor.activityType}</td>

              <td>{factor.unit}</td>

              <td>{factor.emissionFactor}</td>

              <td>{factor.status ? "Active" : "Inactive"}</td>

              <td>
                <div className="action-buttons">
                  <button className="edit-btn" onClick={() => onEdit(factor)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(factor.id)}
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

export default EmissionFactorTable;
