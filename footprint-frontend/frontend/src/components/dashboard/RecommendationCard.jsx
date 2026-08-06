import { useEffect, useState } from "react";
import { getRecommendations } from "../../services/recommendationService";

function RecommendationCard() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const response = await getRecommendations();
      setRecommendations(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="recommendation-card">
        <h3>🤖 AI Recommendations</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="recommendation-card">
        <h3>🤖 AI Recommendations</h3>
        <p>No recommendations available.</p>
      </div>
    );
  }

  return (
    <div className="recommendation-card">
      <h3>🤖 AI Recommendations</h3>

      {recommendations.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: "18px",
            paddingBottom: "12px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <h4>{item.activity}</h4>

          <p>
            <strong>Emission:</strong> {item.emission.toFixed(2)} kg CO₂
          </p>

          <p>{item.recommendation}</p>
        </div>
      ))}
    </div>
  );
}

export default RecommendationCard;
