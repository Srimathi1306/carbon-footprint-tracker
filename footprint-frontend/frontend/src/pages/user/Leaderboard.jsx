import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import { getLeaderboard } from "../../services/leaderboardService";
import "../../styles/leaderboard.css";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const res = await getLeaderboard();

      setLeaders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout role="USER">
      <DashboardHeader
        title="Community Leaderboard"
        subtitle="See how you rank among eco-friendly users."
      />

      <div className="leaderboard-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>XP</th>
              <th>Streak</th>
              <th>Badges</th>
              <th>Total Emission (kg)</th>
            </tr>
          </thead>

          <tbody>
            {leaders.map((user) => (
              <tr key={user.userId}>
                <td>
                  {user.rank === 1
                    ? "🥇"
                    : user.rank === 2
                      ? "🥈"
                      : user.rank === 3
                        ? "🥉"
                        : `#${user.rank}`}
                </td>

                <td>{user.name}</td>

                <td>
                  <strong>{user.xp}</strong>
                </td>

                <td>🔥 {user.streak}</td>

                <td>🏅 {user.badgeCount}</td>

                <td>{user.totalEmission.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Leaderboard;
