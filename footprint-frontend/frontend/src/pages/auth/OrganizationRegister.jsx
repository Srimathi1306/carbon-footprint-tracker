import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBuilding, FaEnvelope, FaLock, FaLeaf } from "react-icons/fa";
import api from "../../services/api";
import "../../styles/auth.css";

function OrganizationRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/organization/auth/register", {
        name,
        email,
        password,
      });

      alert("Organization registered successfully!");

      navigate("/organization/login");
    } catch (err) {
      alert(err.response?.data?.message || "Organization Registration Failed");
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
            Create an organization account and start monitoring your
            sustainability performance.
          </p>
        </div>

        <div className="feature-card">
          <h3>🏢 Organization Profile</h3>
          <p>Create and manage your organization account.</p>
        </div>

        <div className="feature-card">
          <h3>📈 Track Performance</h3>
          <p>Monitor your organization's carbon footprint.</p>
        </div>

        <div className="feature-card">
          <h3>🌍 Make an Impact</h3>
          <p>Work towards a more sustainable future.</p>
        </div>
      </div>

      <div className="right-panel">
        <div className="login-card">
          <h2>Create Organization 🏢</h2>

          <p className="login-subtitle">Register your organization</p>

          <form onSubmit={handleRegister}>
            <div className="input-group">
              <FaBuilding className="input-icon" />

              <input
                type="text"
                placeholder="Organization Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              Register Organization
            </button>
          </form>

          <p className="register-link">
            Already have an organization account?{" "}
            <Link to="/organization/login">Login</Link>
          </p>

          <p className="register-link">
            <Link to="/login">User Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrganizationRegister;
