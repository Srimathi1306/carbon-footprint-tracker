import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header style={styles.navbar}>
      <h2 style={styles.logo}>🌱 Carbon Tracker</h2>

      <div style={styles.right}>
        <div>
          <strong>{user?.username}</strong>
          <br />
          <small>{user?.role}</small>
        </div>

        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    </header>
  );
}

const styles = {
  navbar: {
    height: "70px",
    background: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    borderBottom: "1px solid #ddd",
  },

  logo: {
    margin: 0,
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  button: {
    padding: "8px 16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "6px",
    background: "#ef4444",
    color: "white",
  },
};

export default Navbar;
