import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";
import { updateEmissionFactor } from "../../services/emissionFactorService";

function EditEmissionFactorModal({ show, emissionFactor, onClose, onSuccess }) {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    categoryId: "",
    activityType: "",
    unit: "",
    emissionFactor: "",
    status: true,
  });

  useEffect(() => {
    if (show) {
      loadCategories();
    }
  }, [show]);

  useEffect(() => {
    if (emissionFactor) {
      setForm({
        categoryId: emissionFactor.categoryId,
        activityType: emissionFactor.activityType,
        unit: emissionFactor.unit,
        emissionFactor: emissionFactor.emissionFactor,
        status: emissionFactor.status,
      });
    }
  }, [emissionFactor]);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "status" ? value === "true" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateEmissionFactor(emissionFactor.id, {
        categoryId: Number(form.categoryId),
        activityType: form.activityType,
        unit: form.unit,
        emissionFactor: Number(form.emissionFactor),
        status: form.status,
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Unable to update emission factor.");
    }
  };

  if (!show || !emissionFactor) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Emission Factor</h2>

        <form onSubmit={handleSubmit}>
          <label>Category</label>

          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <label>Activity Type</label>

          <input
            type="text"
            name="activityType"
            value={form.activityType}
            onChange={handleChange}
            required
          />

          <label>Unit</label>

          <input
            type="text"
            name="unit"
            value={form.unit}
            onChange={handleChange}
            required
          />

          <label>Emission Factor</label>

          <input
            type="number"
            step="0.01"
            name="emissionFactor"
            value={form.emissionFactor}
            onChange={handleChange}
            required
          />

          <label>Status</label>

          <select name="status" value={form.status} onChange={handleChange}>
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>

          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmissionFactorModal;
