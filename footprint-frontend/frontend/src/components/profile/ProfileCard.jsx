function ProfileCard({ user }) {
  return (
    <div className="profile-summary-card">
      <div className="profile-avatar">{user.name?.charAt(0).toUpperCase()}</div>

      <h2>{user.name}</h2>

      <span className="role-badge">{user.role}</span>
    </div>
  );
}

export default ProfileCard;
