import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import OrganizationNotificationBell from "../../components/organization/OrganizationNotificationBell";
import UserTable from "../../components/admin/UserTable";
import OrganizationAddUserModal from "../../components/organization/OrganizationAddUserModal";
import OrganizationEditUserModal from "../../components/organization/OrganizationEditUserModal";
import {
  getOrganizationUsers,
  deleteOrganizationUser,
} from "../../services/organizationService";
import "../../styles/admin.css";

function OrganizationUsers() {
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
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.username?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredUsers(filtered);
  }, [search, users]);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await getOrganizationUsers();

      setUsers(response);
      setFilteredUsers(response);
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
      await deleteOrganizationUser(id);

      loadUsers();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Unable to delete user.");
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  return (
    <DashboardLayout role="ORGANIZATION">
      <DashboardHeader
        title="User Management"
        subtitle="Manage users belonging to your organization."
        notificationComponent={<OrganizationNotificationBell />}
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

      <OrganizationAddUserModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadUsers}
      />

      <OrganizationEditUserModal
        show={showEditModal}
        user={selectedUser}
        onClose={() => {
          setShowEditModal(false);
          setSelectedUser(null);
        }}
        onSuccess={loadUsers}
      />
    </DashboardLayout>
  );
}

export default OrganizationUsers;
