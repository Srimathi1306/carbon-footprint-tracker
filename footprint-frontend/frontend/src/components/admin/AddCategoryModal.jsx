import { useState } from "react";
import { createCategory } from "../../services/categoryService";

function AddCategoryModal({ show, onClose, onSuccess }) {
  const [name, setName] = useState("");

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCategory({ name });

      setName("");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Unable to create category.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Category</h2>

        <form onSubmit={handleSubmit}>
          <label>Category Name</label>

          <input
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategoryModal;
