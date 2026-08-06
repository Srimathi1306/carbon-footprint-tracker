import { useState } from "react";
import { updateActivity } from "../../services/activityService";
import "./AddActivityModal.css";

function EditActivityModal({ activity, closeModal, refreshActivities }) {
  const [form, setForm] = useState({
    quantity: activity.quantity,
    activityDate: activity.activityDate,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateActivity(activity.id, {
        emissionFactorId: activity.emissionFactorId,
        quantity: Number(form.quantity),
        activityDate: form.activityDate,
      });

      refreshActivities();
      closeModal();
    } catch (err) {
      console.log(err);
      alert("Unable to update activity.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Activity</h2>

        <form onSubmit={handleSubmit}>
          <label>Activity Type</label>

          <input
            type="text"
            value={`${activity.category} - ${activity.activityType}`}
            disabled
          />

          <label>Quantity</label>

          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />

          <label>Activity Date</label>

          <input
            type="date"
            name="activityDate"
            value={form.activityDate}
            onChange={handleChange}
            required
          />

          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Update Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditActivityModal;
