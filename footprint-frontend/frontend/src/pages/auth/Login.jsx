import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaLeaf } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import "../../styles/auth.css";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data);

      if (res.data.user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="auth-page">
      {/* LEFT PANEL */}

      <div className="left-panel">
        <div className="brand">
          <FaLeaf className="logo-icon" />

          <h1>Carbon Footprint Tracker</h1>

          <p className="tagline">Track • Analyze • Reduce</p>

          <p className="description">
            Monitor your daily carbon emissions, gain sustainability insights
            and build a greener future.
          </p>
        </div>

        <div className="feature-card">
          <h3>🌱 Daily Tracking</h3>
          <p>Track all your daily carbon activities.</p>
        </div>

        <div className="feature-card">
          <h3>📊 Smart Analytics</h3>
          <p>Visualize your carbon footprint.</p>
        </div>

        <div className="feature-card">
          <h3>🎯 Sustainability Goals</h3>
          <p>Achieve a greener lifestyle.</p>
        </div>
      </div>

      {/* RIGHT PANEL */}

      <div className="right-panel">
        <div className="login-card">
          <h2>Welcome Back 👋</h2>

          <p className="login-subtitle">Sign in to continue</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <FaEnvelope className="input-icon" />

              <input
                type="email"
                placeholder="Email Address"
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

            <button className="login-btn">Sign In</button>
          </form>

          <p className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
