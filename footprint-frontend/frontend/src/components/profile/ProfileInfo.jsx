import {
  FaUser,
  FaIdBadge,
  FaEnvelope,
  FaUserShield,
  FaEdit,
  FaBolt,
  FaFire,
  FaAward,
  FaLeaf,
  FaBullseye,
  FaClipboardList,
} from "react-icons/fa";

function ProfileInfo({ user, onEdit }) {
  return (
    <div className="profile-info">
      <h3>Personal Information</h3>

      <div className="info-item">
        <FaUser className="info-icon" />
        <div>
          <label>Name</label>
          <p>{user.name}</p>
        </div>
      </div>

      <div className="info-item">
        <FaIdBadge className="info-icon" />
        <div>
          <label>Username</label>
          <p>{user.username}</p>
        </div>
      </div>

      <div className="info-item">
        <FaEnvelope className="info-icon" />
        <div>
          <label>Email</label>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="info-item">
        <FaUserShield className="info-icon" />
        <div>
          <label>Role</label>
          <p>{user.role}</p>
        </div>
      </div>

      <hr />

      <h3>Eco Statistics</h3>

      <div className="info-item">
        <FaBolt className="info-icon" />
        <div>
          <label>XP</label>
          <p>{user.xp}</p>
        </div>
      </div>

      <div className="info-item">
        <FaFire className="info-icon" />
        <div>
          <label>Current Streak</label>
          <p>{user.currentStreak} Days</p>
        </div>
      </div>

      <div className="info-item">
        <FaFire className="info-icon" />
        <div>
          <label>Longest Streak</label>
          <p>{user.longestStreak} Days</p>
        </div>
      </div>

      <div className="info-item">
        <FaClipboardList className="info-icon" />
        <div>
          <label>Total Activities</label>
          <p>{user.totalActivities}</p>
        </div>
      </div>

      <div className="info-item">
        <FaLeaf className="info-icon" />
        <div>
          <label>Total Carbon Emission</label>
          <p>{user.totalCarbonEmission} kg CO₂</p>
        </div>
      </div>

      <div className="info-item">
        <FaAward className="info-icon" />
        <div>
          <label>Badges Earned</label>
          <p>{user.badgeCount}</p>
        </div>
      </div>

      <div className="info-item">
        <FaBullseye className="info-icon" />
        <div>
          <label>Completed Goals</label>
          <p>{user.completedGoals}</p>
        </div>
      </div>

      <button className="edit-profile-btn" onClick={onEdit}>
        <FaEdit /> Edit Profile
      </button>
    </div>
  );
}

export default ProfileInfo;
