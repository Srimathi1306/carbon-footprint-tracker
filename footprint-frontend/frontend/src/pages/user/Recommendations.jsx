import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import { getRecommendations } from "../../services/recommendationService";
import "../../styles/Recommendations.css";

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const res = await getRecommendations();

      setRecommendations(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout role="USER">
      <DashboardHeader
        title="Personalized Recommendations"
        subtitle="Reduce your carbon footprint with smart suggestions."
      />

      <div className="recommendation-grid">
        {recommendations.map((item, index) => (
          <div className="recommendation-card" key={index}>
            <h3>🌿 {item.activity}</h3>

            <p>
              <strong>Current Emission :</strong> {item.emission.toFixed(2)} kg
              CO₂e
            </p>

            <p>
              <strong>Recommendation</strong>
            </p>

            <p>{item.recommendation}</p>

            <div className="saving-box">
              <h3>💡 Suggested Action</h3>

              <p>
                Focus on reducing your <strong>{item.activity}</strong>{" "}
                emissions first. This activity currently contributes the highest
                carbon footprint among your tracked activities.
              </p>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Recommendations;
