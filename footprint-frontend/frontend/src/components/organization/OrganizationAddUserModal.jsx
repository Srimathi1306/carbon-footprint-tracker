import { useState } from "react";
import { createOrganizationUser } from "../../services/organizationService";

function OrganizationAddUserModal({ show, onClose, onSuccess }) {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  if (!show) return null;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createOrganizationUser(user);

      alert("User created successfully.");

      setUser({
        name: "",
        username: "",
        email: "",
        password: "",
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to create user.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New User</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrganizationAddUserModal;
