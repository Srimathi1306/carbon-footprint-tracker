import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLeaf, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import api from "../../services/api";
import "../../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);
      alert("Registration Successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="left-panel">
        <div className="brand">
          <FaLeaf className="logo-icon" />

          <h1>Carbon Footprint Tracker</h1>

          <p className="tagline">Track • Analyze • Reduce</p>

          <p className="description">
            Create your account and begin your sustainability journey. Every
            activity you record contributes to understanding and reducing your
            environmental impact.
          </p>

          <div className="fact-box">
            <h3>🌍 Sustainability Fact</h3>
            <p>
              Small daily actions can lead to significant reductions in annual
              carbon emissions.
            </p>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <div className="login-card">
          <h2>Create Account</h2>

          <p className="login-subtitle">Join Carbon Footprint Tracker</p>

          <form onSubmit={handleRegister}>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="login-btn">Create Account</button>
          </form>

          <p className="register-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
