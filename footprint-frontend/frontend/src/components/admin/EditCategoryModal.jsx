import { useEffect, useState } from "react";
import { updateCategory } from "../../services/categoryService";

function EditCategoryModal({ show, category, onClose, onSuccess }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  if (!show || !category) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCategory(category.id, { name });

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Unable to update category.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Category</h2>

        <form onSubmit={handleSubmit}>
          <label>Category Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCategoryModal;
