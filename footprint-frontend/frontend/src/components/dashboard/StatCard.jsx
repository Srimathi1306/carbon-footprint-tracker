import "./StatCard.css";

function StatCard({ title, value, color, icon, subtitle }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>

      <div className="stat-content">
        <p className="stat-title">{title}</p>

        <h3 className="stat-value">{value}</h3>

        <span className="stat-subtitle">{subtitle}</span>
      </div>
    </div>
  );
}

export default StatCard;
