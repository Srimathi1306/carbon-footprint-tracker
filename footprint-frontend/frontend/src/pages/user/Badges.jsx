import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import { getBadges } from "../../services/badgeService";
import "../../styles/Badges.css";

function Badges() {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    loadBadges();
  }, []);

  const loadBadges = async () => {
    try {
      const res = await getBadges();

      console.log(res.data);

      setBadges(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);

      setBadges([]);
    }
  };

  return (
    <DashboardLayout role="USER">
      <DashboardHeader title="My Badges" />

      <div className="badge-grid">
        {badges.length === 0 ? (
          <div className="no-badges">
            <h3>No Badges Yet 🏅</h3>

            <p>
              Complete activities, goals and missions to unlock your first
              badge.
            </p>
          </div>
        ) : (
          badges.map((badge) => (
            <div className="badge-card" key={badge.id}>
              <div className="badge-icon">🏅</div>

              <h3>{badge.badgeName}</h3>

              <p>{badge.description}</p>

              <small>
                Earned on
                <br />
                {badge.createdAt?.substring(0, 10)}
              </small>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

export default Badges;
