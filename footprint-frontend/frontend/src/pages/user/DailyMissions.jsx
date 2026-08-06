import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getTodayMissions } from "../../services/dailyMissionService";
import { getWeeklyMissions } from "../../services/weeklyMissionService";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

function DailyMissions() {
  const [missions, setMissions] = useState([]);
  const [weeklyMissions, setWeeklyMissions] = useState([]);

  useEffect(() => {
    loadMissions();
    loadWeeklyMissions();
  }, []);

  const loadMissions = async () => {
    const res = await getTodayMissions();

    setMissions(res.data);
  };

  const loadWeeklyMissions = async () => {
    try {
      const res = await getWeeklyMissions();
      setWeeklyMissions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderMissionCard = (mission) => (
    <div key={mission.id} className="dashboard-card">
      <h3>{mission.title}</h3>

      <p>{mission.description}</p>

      <p>
        {mission.currentValue} / {mission.targetValue}
      </p>

      <h4>{mission.status}</h4>
    </div>
  );

  return (
    <DashboardLayout role="USER">
      <DashboardHeader title="Missions" />
      <h2>Today's Missions</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        {missions.map(renderMissionCard)}
      </div>

      <h2 style={{ marginTop: "30px" }}>Weekly Missions</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        {weeklyMissions.map(renderMissionCard)}
      </div>
    </DashboardLayout>
  );
}

export default DailyMissions;
