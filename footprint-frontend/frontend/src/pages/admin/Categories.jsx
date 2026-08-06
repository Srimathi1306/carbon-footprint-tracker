import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

import CategoryTable from "../../components/admin/CategoryTable";
import AddCategoryModal from "../../components/admin/AddCategoryModal";
import EditCategoryModal from "../../components/admin/EditCategoryModal";

import { getCategories, deleteCategory } from "../../services/categoryService";

import "../../styles/admin.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredCategories(filtered);
  }, [search, categories]);

  const loadCategories = async () => {
    try {
      setLoading(true);

      const response = await getCategories();

      setCategories(response.data);
      setFilteredCategories(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);

      loadCategories();
    } catch (error) {
      console.error(error);
      alert("Unable to delete category.");
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  return (
    <DashboardLayout role="ADMIN">
      <DashboardHeader
        title="Category Management"
        subtitle="Manage all activity categories."
      />

      <div className="user-toolbar">
        <input
          className="search-box"
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          + Add Category
        </button>
      </div>

      {loading ? (
        <h3>Loading categories...</h3>
      ) : (
        <CategoryTable
          categories={filteredCategories}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      <AddCategoryModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadCategories}
      />

      <EditCategoryModal
        show={showEditModal}
        category={selectedCategory}
        onClose={() => setShowEditModal(false)}
        onSuccess={loadCategories}
      />
    </DashboardLayout>
  );
}

export default Categories;
