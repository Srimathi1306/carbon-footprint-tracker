import { useEffect, useState } from "react";
import { updateUser } from "../../services/adminService";

function EditUserModal({ show, user, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        username: user.username,
        email: user.email,
        password: "",
        role: user.role,
      });
    }
  }, [user]);

  if (!show) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(user.id, formData);

      alert("User updated successfully.");

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Unable to update user.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit User</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* <input
            name="password"
            type="password"
            placeholder="Leave blank to keep current password"
            value={formData.password}
            onChange={handleChange}
          /> */}

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
