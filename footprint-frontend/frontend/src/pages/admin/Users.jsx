import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import UserTable from "../../components/admin/UserTable";
import AddUserModal from "../../components/admin/AddUserModal";
import EditUserModal from "../../components/admin/EditUserModal";
import { getAllUsers, deleteUser } from "../../services/adminService";
import "../../styles/admin.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredUsers(filtered);
  }, [search, users]);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await getAllUsers();

      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      loadUsers();
    } catch (error) {
      console.error(error);
      alert("Unable to delete user.");
    }
  };
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  return (
    <DashboardLayout role="ADMIN">
      <DashboardHeader
        title="User Management"
        subtitle="Manage all registered users."
      />

      <div className="user-toolbar">
        <input
          className="search-box"
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          + Add User
        </button>
      </div>

      {loading ? (
        <h3>Loading users...</h3>
      ) : (
        <UserTable
          users={filteredUsers}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      <AddUserModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadUsers}
      />

      <EditUserModal
        show={showEditModal}
        user={selectedUser}
        onClose={() => setShowEditModal(false)}
        onSuccess={loadUsers}
      />
    </DashboardLayout>
  );
}

export default Users;
