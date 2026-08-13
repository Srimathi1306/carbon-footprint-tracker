import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">
      {/* Header */}
      <header className="header">
        <div className="logo">🌿 Carbon Tracker</div>

        <nav>
          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/register" className="register-btn">
            Register
          </Link>
        </nav>
      </header>

      {/* Hero */}

      <section className="hero">
        <div className="hero-left">
          <span className="hero-tag">🌍 Build a Sustainable Future</span>

          <h1>
            Track Your Carbon
            <br />
            Footprint Smarter
          </h1>

          <p>
            Monitor your daily carbon emissions, receive intelligent reduction
            suggestions, complete sustainability goals, earn rewards, and
            compete with your community—all in one platform.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="hero-btn">
              Get Started
            </Link>

            <Link to="/login" className="hero-secondary-btn">
              Explore Dashboard
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="/carbon-hero.png"
            alt="Sustainable future with renewable energy and nature"
            className="hero-image"
          />
        </div>
      </section>

      {/* Statistics */}

      <section className="stats">
        <div className="stat-card">
          <h2>10K+</h2>
          <p>Activities Tracked</p>
        </div>

        <div className="stat-card">
          <h2>3.8T</h2>
          <p>CO₂ Saved (kg)</p>
        </div>

        <div className="stat-card">
          <h2>1500+</h2>
          <p>Active Users</p>
        </div>

        <div className="stat-card">
          <h2>600+</h2>
          <p>Goals Completed</p>
        </div>
      </section>

      {/* How It Works */}

      <section className="how-it-works">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">
            <span>1️⃣</span>
            <h3>Log Activities</h3>
            <p>Add transport, electricity, food and shopping activities.</p>
          </div>

          <div className="step">
            <span>2️⃣</span>
            <h3>Track Emissions</h3>
            <p>Automatically calculate your carbon footprint.</p>
          </div>

          <div className="step">
            <span>3️⃣</span>
            <h3>Achieve Goals</h3>
            <p>Reduce emissions and complete sustainability goals.</p>
          </div>

          <div className="step">
            <span>4️⃣</span>
            <h3>Earn Rewards</h3>
            <p>Gain XP, badges and climb the community leaderboard.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}

      <section className="why-us">
        <h2>Why Choose Carbon Tracker?</h2>

        <div className="why-grid">
          <div>🤖 AI Powered Recommendations</div>

          <div>🏆 XP & Badge System</div>

          <div>🌍 Community Leaderboard</div>

          <div>📈 Smart Analytics Dashboard</div>

          <div>🎯 Personalized Goals</div>

          <div>🔔 Daily Sustainability Missions</div>
        </div>
      </section>

      {/* Leaderboard Preview */}

      {/* <section className="leaderboard-preview">
        <h2>Community Leaderboard</h2>

        <p>
          Compete with eco-conscious users and climb the sustainability
          rankings.
        </p>

        <div className="leaderboard-card">
          <div className="leaderboard-row first">
            <span>🥇</span>
            <span>Emma Green</span>
            <span>2450 XP</span>
          </div>

          <div className="leaderboard-row">
            <span>🥈</span>
            <span>Alex Carter</span>
            <span>2280 XP</span>
          </div>

          <div className="leaderboard-row">
            <span>🥉</span>
            <span>Sophia Lee</span>
            <span>2140 XP</span>
          </div>

          <div className="leaderboard-row current-user">
            <span>⭐</span>
            <span>You</span>
            <span>1850 XP</span>
          </div>
        </div>
      </section> */}

      {/* Features */}

      <section className="features">
        <div className="feature-card">
          <h3>🌱 Activity Tracking</h3>
          <p>Record daily activities and monitor carbon emissions.</p>
        </div>

        <div className="feature-card">
          <h3>📊 Analytics</h3>
          <p>Visualize your carbon footprint with insightful charts.</p>
        </div>

        <div className="feature-card">
          <h3>🎯 Goals</h3>
          <p>Set sustainability goals and track your progress.</p>
        </div>

        <div className="feature-card">
          <h3>👨‍💼 Admin Dashboard</h3>
          <p>Manage users, activities, and monitor the platform.</p>
        </div>
      </section>

      {/* CTA */}

      <section className="cta">
        <h2>Start Your Sustainability Journey Today</h2>

        <p>
          Join thousands of users reducing their carbon footprint every day.
        </p>

        <Link to="/register" className="hero-btn">
          Join Now
        </Link>
      </section>

      {/* Footer */}

      <footer className="footer">
        © 2026 Carbon Footprint Tracker. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Home;
