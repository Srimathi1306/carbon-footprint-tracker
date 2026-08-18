import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaLeaf } from "react-icons/fa";
import { OrganizationAuthContext } from "../../context/OrganizationAuthContext";
import api from "../../services/api";
import "../../styles/auth.css";

function OrganizationLogin() {
  const { login } = useContext(OrganizationAuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/organization/auth/login", {
        email,
        password,
      });

      login(res.data);

      navigate("/organization/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Organization Login Failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="left-panel">
        <div className="brand">
          <FaLeaf className="logo-icon" />

          <h1>Carbon Tracker</h1>

          <p className="tagline">Organization Portal</p>

          <p className="description">
            Manage your organization's sustainability activities, monitor carbon
            emissions and track environmental performance.
          </p>
        </div>

        <div className="feature-card">
          <h3>🏢 Organization Management</h3>
          <p>Manage your organization's sustainability information.</p>
        </div>

        <div className="feature-card">
          <h3>📊 Carbon Analytics</h3>
          <p>Monitor your organization's carbon footprint.</p>
        </div>

        <div className="feature-card">
          <h3>🌱 Sustainability</h3>
          <p>Build a greener and more sustainable organization.</p>
        </div>
      </div>

      <div className="right-panel">
        <div className="login-card">
          <h2>Organization Login 🏢</h2>

          <p className="login-subtitle">Sign in to your organization account</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <FaEnvelope className="input-icon" />

              <input
                type="email"
                placeholder="Organization Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="login-btn" type="submit">
              Sign In
            </button>
          </form>

          <p className="register-link">
            Don't have an organization account?{" "}
            <Link to="/organization/register">Register</Link>
          </p>

          <p className="register-link">
            <Link to="/login">User Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrganizationLogin;
