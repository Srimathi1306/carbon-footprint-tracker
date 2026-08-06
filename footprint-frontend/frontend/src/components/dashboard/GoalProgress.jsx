function GoalProgress() {
  return (
    <div className="goal-card">
      <h3>Monthly Goal</h3>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: "72%" }}></div>
      </div>

      <p>72% of your monthly goal achieved.</p>
    </div>
  );
}

export default GoalProgress;
