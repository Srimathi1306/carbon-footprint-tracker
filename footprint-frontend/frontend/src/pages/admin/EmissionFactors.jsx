import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

import EmissionFactorTable from "../../components/admin/EmissionFactorTable";
import AddEmissionFactorModal from "../../components/admin/AddEmissionFactorModal";
import EditEmissionFactorModal from "../../components/admin/EditEmissionFactorModal";

import {
  getAllEmissionFactors,
  deleteEmissionFactor,
} from "../../services/emissionFactorService";

import "../../styles/admin.css";

function EmissionFactors() {
  const [emissionFactors, setEmissionFactors] = useState([]);
  const [filteredEmissionFactors, setFilteredEmissionFactors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedEmissionFactor, setSelectedEmissionFactor] = useState(null);

  useEffect(() => {
    loadEmissionFactors();
  }, []);

  useEffect(() => {
    const filtered = emissionFactors.filter(
      (factor) =>
        factor.categoryName.toLowerCase().includes(search.toLowerCase()) ||
        factor.activityType.toLowerCase().includes(search.toLowerCase()) ||
        factor.unit.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredEmissionFactors(filtered);
  }, [search, emissionFactors]);

  const loadEmissionFactors = async () => {
    try {
      setLoading(true);

      const response = await getAllEmissionFactors();

      setEmissionFactors(response.data);
      setFilteredEmissionFactors(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load emission factors.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this emission factor?",
    );

    if (!confirmDelete) return;

    try {
      await deleteEmissionFactor(id);
      loadEmissionFactors();
    } catch (error) {
      console.error(error);
      alert("Unable to delete emission factor.");
    }
  };

  const handleEdit = (factor) => {
    setSelectedEmissionFactor(factor);
    setShowEditModal(true);
  };

  return (
    <DashboardLayout role="ADMIN">
      <DashboardHeader
        title="Emission Factor Management"
        subtitle="Manage all emission factors."
      />

      <div className="user-toolbar">
        <input
          className="search-box"
          type="text"
          placeholder="Search emission factors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          + Add Emission Factor
        </button>
      </div>

      {loading ? (
        <h3>Loading emission factors...</h3>
      ) : (
        <EmissionFactorTable
          emissionFactors={filteredEmissionFactors}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      <AddEmissionFactorModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadEmissionFactors}
      />

      <EditEmissionFactorModal
        show={showEditModal}
        emissionFactor={selectedEmissionFactor}
        onClose={() => setShowEditModal(false)}
        onSuccess={loadEmissionFactors}
      />
    </DashboardLayout>
  );
}

export default EmissionFactors;
