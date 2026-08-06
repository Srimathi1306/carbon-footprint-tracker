import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

import {
  createGoal,
  updateGoal,
  cancelGoal,
  getGoal,
  getCategories,
} from "../../services/goalService";

import "../../styles/goals.css";

function Goals() {
  const [goal, setGoal] = useState(null);

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    categoryId: "",
    reductionPercentage: "",
    durationDays: 5,
  });

  // useEffect(() => {
  //   loadCategories();
  // }, []);

  // useEffect(() => {
  //   if (categories.length > 0) {
  //     loadGoal();
  //   }
  // }, [categories]);

  useEffect(() => {
    loadGoal();
    loadCategories();
  }, []);

  const loadGoal = async () => {
    try {
      const res = await getGoal();

      if (res.status === 204 || !res.data) {
        setGoal(null);
        return;
      }

      setGoal(res.data);

      // Fill form when updating
      setFormData({
        categoryId: res.data.categoryId ?? "",
        reductionPercentage: res.data.reductionPercentage,
        durationDays: res.data.durationDays,
      });
    } catch (err) {
      console.log("No active goal");
      setGoal(null);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "categoryId" || e.target.name === "durationDays"
          ? Number(e.target.value)
          : e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (goal && goal.status === "ACTIVE") {
        await updateGoal(goal.goalId, formData);

        alert("Goal Updated Successfully");
      } else {
        await createGoal(formData);

        alert("Goal Created Successfully");
      }

      loadGoal();
    } catch (err) {
      console.log(err);

      alert(err?.response?.data?.message || "Unable to save goal.");
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this goal?")) return;

    try {
      await cancelGoal(goal.goalId);

      alert("Goal Cancelled");

      setGoal(null);

      setFormData({
        categoryId: "",
        reductionPercentage: "",
        durationDays: 5,
      });

      loadGoal();
    } catch (err) {
      console.log(err);

      alert("Unable to cancel goal.");
    }
  };
  return (
    <DashboardLayout role="USER">
      <DashboardHeader title="Carbon Reduction Goal" />

      <div className="dashboard-card goal-progress">
        <h3>{goal ? "Update Goal" : "Create Goal"}</h3>

        <form className="goal-form" onSubmit={handleSubmit}>
          <label>Category</label>

          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <br />
          <br />

          <label>Reduction Percentage</label>

          <input
            type="number"
            name="reductionPercentage"
            min="1"
            max="100"
            value={formData.reductionPercentage}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <label>Goal Duration</label>

          <select
            name="durationDays"
            value={formData.durationDays}
            onChange={handleChange}
          >
            <option value={5}>5 Days</option>
            <option value={7}>7 Days</option>
            <option value={15}>15 Days</option>
            <option value={30}>30 Days</option>
          </select>

          <br />
          <br />

          <button type="submit">
            {goal && goal.status === "ACTIVE" ? "Update Goal" : "Create Goal"}
          </button>

          {goal && goal.status === "ACTIVE" && (
            <button
              type="button"
              className="cancel-goal-btn"
              onClick={handleCancel}
              style={{ marginLeft: "10px" }}
            >
              Cancel Goal
            </button>
          )}
        </form>
      </div>

      {goal && (
        <>
          <div className="dashboard-grid">
            <div className="dashboard-card goal-progress">
              <h3>Category</h3>
              <h2>{goal.category}</h2>
            </div>

            <div className="dashboard-card goal-progress">
              <h3>Duration</h3>
              <h2>{goal.durationDays} Days</h2>
            </div>

            <div className="dashboard-card goal-progress">
              <h3>Baseline</h3>
              <h2>{goal.baselineEmission?.toFixed(2)} kg</h2>
            </div>

            <div className="dashboard-card goal-progress">
              <h3>Current</h3>
              <h2>{goal.currentEmission?.toFixed(2)} kg</h2>
            </div>

            <div className="dashboard-card goal-progress">
              <h3>Target</h3>
              <h2>{goal.targetEmission?.toFixed(2)} kg</h2>
            </div>

            <div className="dashboard-card goal-progress">
              <h3>Remaining</h3>
              <h2>{goal.remainingEmission?.toFixed(2)} kg</h2>
            </div>

            <div className="dashboard-card goal-progress">
              <h3>Reduction Goal</h3>
              <h2>{goal.reductionPercentage}%</h2>
            </div>

            <div className="dashboard-card goal-progress">
              <h3>Days Left</h3>
              <h2>{goal.daysLeft}</h2>
            </div>

            <div className="dashboard-card goal-progress">
              <h3>Status</h3>

              <span
                className={`goal-status ${
                  goal.status === "COMPLETED"
                    ? "completed"
                    : goal.status === "FAILED"
                      ? "failed"
                      : "active"
                }`}
              >
                {goal.status}
              </span>
            </div>
          </div>

          <div className="dashboard-card goal-progress">
            <h3>Goal Progress</h3>

            <div className="progress-container">
              <div
                className="progress-fill"
                style={{
                  width: `${goal.progressPercentage ?? 0}%`,
                }}
              ></div>
            </div>

            <h2>{goal.progressPercentage?.toFixed(1)}%</h2>

            <br />

            <p>
              <strong>Current Emission:</strong>{" "}
              {goal.currentEmission?.toFixed(2)} kg
            </p>

            <p>
              <strong>Remaining Emission:</strong>{" "}
              {goal.remainingEmission?.toFixed(2)} kg
            </p>

            <p>
              <strong>Target Emission:</strong>{" "}
              {goal.targetEmission?.toFixed(2)} kg
            </p>

            <br />

            <p>
              <strong>Goal Period:</strong> {goal.startDate} → {goal.endDate}
            </p>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Goals;
