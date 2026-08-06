import { useContext, useEffect, useState } from "react";
import { updateProfile } from "../../services/userService";
import { AuthContext } from "../../context/AuthContext";

function EditProfileModal({ show, user, onClose, onSuccess }) {
  const { updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        username: user.username,
        email: user.email,
        password: "",
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
      const response = await updateProfile(formData);

      updateUser(response.data);

      alert("Profile updated successfully.");

      setFormData({
        name: response.data.name,
        username: response.data.username,
        email: response.data.email,
        password: "",
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      console.log(error.response);

      alert(error.response?.data?.message || "Unable to update profile.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Profile</h2>

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

          <input
            name="password"
            type="password"
            placeholder="Leave blank to keep current password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="modal-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setFormData({
                  name: user.name,
                  username: user.username,
                  email: user.email,
                  password: "",
                });

                onClose();
              }}
            >
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

export default EditProfileModal;
