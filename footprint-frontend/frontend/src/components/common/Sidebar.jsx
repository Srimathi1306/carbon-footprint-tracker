import { NavLink } from "react-router-dom";

function Sidebar({ role }) {
  const userMenu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Activity Logging", path: "/activity" },
    { name: "Analytics", path: "/analytics" },
    { name: "Goals", path: "/goals" },
    { name: "Profile", path: "/profile" },
  ];

  const adminMenu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Emission Factors", path: "/admin/emission-factors" },
  ];

  const menu = role === "ADMIN" ? adminMenu : userMenu;

  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.title}>Carbon Tracker</h2>

      {menu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            ...styles.link,
            backgroundColor: isActive ? "#2563eb" : "transparent",
          })}
        >
          {item.name}
        </NavLink>
      ))}
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    background: "#1f2937",
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    gap: "10px",
  },

  title: {
    marginBottom: "20px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    padding: "12px",
    borderRadius: "6px",
  },
};

export default Sidebar;
