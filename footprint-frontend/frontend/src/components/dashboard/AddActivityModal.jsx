import { useEffect, useState } from "react";
import { addActivity } from "../../services/activityService";
import {
  getActiveEmissionFactors,
  userCreateEmissionFactor,
} from "../../services/emissionFactorService";

import "./AddActivityModal.css";

function AddActivityModal({ closeModal, refreshActivities }) {
  const [emissionFactors, setEmissionFactors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [saving, setSaving] = useState(false);
  const [showCustomActivity, setShowCustomActivity] = useState(false);

  const [customActivity, setCustomActivity] = useState({
    categoryName: "",
    activityType: "",
    unit: "",
    factorValue: "",
  });
  const getToday = () =>
    new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  const [form, setForm] = useState({
    emissionFactorId: "",
    quantity: "",
    activityDate: getToday(),
  });

  useEffect(() => {
    loadEmissionFactors();
  }, []);

  const loadEmissionFactors = async () => {
    try {
      const res = await getActiveEmissionFactors();
      console.log(res.data);
      setEmissionFactors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const categories = [
    ...new Set(emissionFactors.map((factor) => factor.categoryName)),
  ];

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setSaving(true);

  //   try {
  //     await addActivity({
  //       emissionFactorId: Number(form.emissionFactorId),
  //       quantity: Number(form.quantity),
  //       activityDate: form.activityDate,
  //     });

  //     refreshActivities();
  //     closeModal();
  //   } catch (err) {
  //     console.log(err);
  //     alert("Unable to add activity.");
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let emissionFactorId = form.emissionFactorId;

      if (showCustomActivity) {
        const category = emissionFactors.find(
          (factor) => factor.categoryName === selectedCategory,
        );

        const factorResponse = await userCreateEmissionFactor({
          categoryId: category.categoryId,
          activityType: customActivity.activityType,
          unit: customActivity.unit,
          emissionFactor: Number(customActivity.factorValue),
          status: true,
        });

        emissionFactorId = factorResponse.data.id;
      }

      await addActivity({
        emissionFactorId: Number(emissionFactorId),
        quantity: Number(form.quantity),
        activityDate: form.activityDate,
      });

      refreshActivities();
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Unable to add activity.");
    } finally {
      setSaving(false);
    }
  };

  const filteredActivities = emissionFactors.filter(
    (factor) => factor.categoryName === selectedCategory,
  );

  const selectedFactor = emissionFactors.find(
    (factor) => factor.id === Number(form.emissionFactorId),
  );

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Log New Activity</h2>
        <p>Select a category and record your activity.</p>

        <form onSubmit={handleSubmit}>
          <label>Select Category</label>

          <div className="category-grid">
            {categories.map((category) => (
              <div
                key={category}
                className={`category-card ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => {
                  // If the same category is clicked again, deselect it
                  if (selectedCategory === category) {
                    setSelectedCategory("");
                    setShowCustomActivity(false);

                    setForm((prev) => ({
                      ...prev,
                      emissionFactorId: "",
                    }));

                    setCustomActivity({
                      categoryName: "",
                      activityType: "",
                      unit: "",
                      factorValue: "",
                    });

                    return;
                  }

                  // Select the new category
                  setSelectedCategory(category);

                  setShowCustomActivity(category === "Other");

                  setForm((prev) => ({
                    ...prev,
                    emissionFactorId: "",
                  }));

                  setCustomActivity({
                    categoryName: "",
                    activityType: "",
                    unit: "",
                    factorValue: "",
                  });
                }}
              >
                <span>{category}</span>

                {selectedCategory === category && (
                  <span className="selected-icon">✓</span>
                )}
              </div>
            ))}
          </div>

          {!showCustomActivity ? (
            <>
              <label>Activity Type</label>

              <select
                disabled={!selectedCategory}
                name="emissionFactorId"
                value={form.emissionFactorId}
                onChange={handleChange}
                required
              >
                <option value="">
                  {selectedCategory
                    ? "Select Activity"
                    : "Select Category First"}
                </option>

                {filteredActivities.map((factor) => (
                  <option key={factor.id} value={factor.id}>
                    {factor.activityType} ({factor.unit})
                  </option>
                ))}
              </select>

              {selectedCategory && selectedCategory !== "Other" && (
                <button
                  type="button"
                  className="custom-link"
                  onClick={() => setShowCustomActivity(true)}
                >
                  + Can't find your activity?
                </button>
              )}
            </>
          ) : (
            <>
              {selectedCategory === "Other" && (
                <>
                  <label>Category Name</label>

                  <input
                    type="text"
                    placeholder="e.g. Office Supplies, Laboratory"
                    value={customActivity.categoryName}
                    onChange={(e) =>
                      setCustomActivity({
                        ...customActivity,
                        categoryName: e.target.value,
                      })
                    }
                    required
                  />
                </>
              )}

              <label>Activity Name</label>

              <input
                type="text"
                value={customActivity.activityType}
                onChange={(e) =>
                  setCustomActivity({
                    ...customActivity,
                    activityType: e.target.value,
                  })
                }
              />

              <label>Unit</label>

              <input
                type="text"
                placeholder="km / kg / litre / kWh"
                value={customActivity.unit}
                onChange={(e) =>
                  setCustomActivity({
                    ...customActivity,
                    unit: e.target.value,
                  })
                }
              />

              <label>Emission Factor</label>

              <input
                type="number"
                step="0.0001"
                placeholder="Example: 0.192"
                value={customActivity.factorValue}
                onChange={(e) =>
                  setCustomActivity({
                    ...customActivity,
                    factorValue: e.target.value,
                  })
                }
              />

              <small className="factor-note">
                Use the nearest available emission factor. This can be updated
                later by the administrator.
              </small>
            </>
          )}

          <label>Quantity</label>

          <input
            type="number"
            min="0.1"
            step="0.1"
            name="quantity"
            placeholder={
              selectedFactor
                ? `Enter quantity (${selectedFactor.unit})`
                : "Enter quantity"
            }
            value={form.quantity}
            onChange={handleChange}
            required
          />

          {selectedFactor && (
            <small className="unit-text">Unit: {selectedFactor.unit}</small>
          )}

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

            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? "Saving..." : "Log Activity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddActivityModal;
