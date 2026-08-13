import {
  FaHome,
  FaClipboardList,
  FaChartPie,
  FaChartBar,
  FaBullseye,
  FaUser,
  FaUsersCog,
  FaSignOutAlt,
  FaLeaf,
  FaHistory,
  FaList,
  FaChartLine,
  FaLightbulb,
  FaTrophy,
  FaTasks,
  FaHeadset,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Sidebar.css";

function Sidebar({ role }) {
  const { logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        {/* {collapsed ? "☰" : "✕"} */}☰
      </button>
      <div className="sidebar-logo">
        <FaLeaf />
        <span>Carbon Tracker</span>
      </div>

      <nav>
        {role === "USER" && (
          <>
            <NavLink to="/dashboard" className="nav-item">
              <FaHome />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/activities" className="nav-item">
              <FaClipboardList />
              <span>Activities</span>
            </NavLink>

            <NavLink to="/activity-history" className="nav-item">
              <FaHistory />
              <span>Activity History</span>
            </NavLink>

            <NavLink to="/analytics" className="nav-item">
              <FaChartPie />
              <span>Analytics</span>
            </NavLink>

            <NavLink to="/goals" className="nav-item">
              <FaBullseye />
              <span>Goals</span>
            </NavLink>

            <NavLink to="/recommendations" className="nav-item">
              <FaLightbulb />
              <span>Recommendations</span>
            </NavLink>

            {/* <NavLink to="/benchmark" className="nav-item">
              <FaChartLine />
              <span>Benchmark</span>
            </NavLink> */}

            <NavLink to="/daily-missions" className="nav-item">
              <FaTasks />
              <span>Daily Missions</span>
            </NavLink>

            <NavLink to="/leaderboard" className="nav-item">
              <FaTrophy />
              <span>Leaderboard</span>
            </NavLink>

            <NavLink to="/badges" className="nav-item">
              <FaLeaf />
              <span>Badges</span>
            </NavLink>

            <NavLink to="/support" className="nav-item">
              <FaHeadset />
              <span>Support</span>
            </NavLink>

            <NavLink to="/profile" className="nav-item">
              <FaUser />
              <span>Profile</span>
            </NavLink>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <NavLink to="/admin/dashboard" className="nav-item">
              <FaUsersCog />
              <span>Admin Dashboard</span>
            </NavLink>

            <NavLink to="/admin/analytics" className="nav-item">
              <FaChartPie />
              <span>Analytics</span>
            </NavLink>

            <NavLink to="/admin/users" className="nav-item">
              <FaUsersCog />
              <span>Users</span>
            </NavLink>

            <NavLink to="/admin/categories" className="nav-item">
              <FaList />
              <span>Categories</span>
            </NavLink>

            <NavLink to="/admin/emission-factors" className="nav-item">
              <FaLeaf />
              <span>Emission Factors</span>
            </NavLink>

            <NavLink to="/admin/activity-monitoring" className="nav-item">
              <FaChartBar />
              <span>Activity Monitoring</span>
            </NavLink>

            <NavLink to="/admin/support" className="nav-item">
              <FaHeadset />
              <span>Support</span>
            </NavLink>
          </>
        )}

        {/* ================= ORGANIZATION ================= */}
        {role === "ORGANIZATION" && (
          <>
            <NavLink to="/organization/dashboard" className="nav-item">
              <FaBuilding />
              <span>Organization Dashboard</span>
            </NavLink>

            <NavLink to="/organization/users" className="nav-item">
              <FaUsersCog />
              <span>Users</span>
            </NavLink>

            <NavLink to="/organization/activities" className="nav-item">
              <FaClipboardList />
              <span>Activities</span>
            </NavLink>

            <NavLink to="/organization/support" className="nav-item">
              <FaHeadset />
              <span>Support</span>
            </NavLink>

            <NavLink to="/organization/profile" className="nav-item">
              <FaUser />
              <span>Profile</span>
            </NavLink>
          </>
        )}
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;
