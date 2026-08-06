import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import ProfileCard from "../../components/profile/ProfileCard";
import ProfileInfo from "../../components/profile/ProfileInfo";
import { getProfile } from "../../services/userService";
import EditProfileModal from "../../components/profile/EditProfileModal";
import "../../styles/profile.css";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);
  const [showEditModal, setShowEditModal] = useState(false);
  const loadProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load profile.");
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };
  return (
    <DashboardLayout role="USER">
      <DashboardHeader
        title="My Profile"
        subtitle="Manage your account information."
      />

      <div className="profile-container">
        <ProfileCard user={user} />

        <ProfileInfo user={user} onEdit={handleEdit} />
      </div>
      <EditProfileModal
        show={showEditModal}
        user={user}
        onClose={() => setShowEditModal(false)}
        onSuccess={loadProfile}
      />
    </DashboardLayout>
  );
}

export default Profile;
