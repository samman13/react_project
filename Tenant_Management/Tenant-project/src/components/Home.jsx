import { useState, useEffect } from "react";
import TenantForm from "./TenantForm";
import TenantList from "./TenantList";

export default function Home() {
  const [tenants, setTenants] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null); // Track tenant being edited

  // Load tenants from localStorage
  useEffect(() => {
    try {
      const savedTenants = JSON.parse(localStorage.getItem("tenants")) || [];
      setTenants(savedTenants);
    } catch (error) {
      console.error("Failed to parse tenants from localStorage:", error);
      setTenants([]);
    }
  }, []);

  const saveToLocalStorage = (updatedTenants) => {
    try {
      localStorage.setItem("tenants", JSON.stringify(updatedTenants));
    } catch (error) {
      console.error("Failed to save tenants:", error);
    }
  };

  // Add or Update tenant
  const handleAddOrEditTenant = (tenant) => {
    let updatedTenants;
    if (editingTenant) {
      // Edit mode
      updatedTenants = tenants.map((t) =>
        t.username === editingTenant.username ? tenant : t
      );
      setEditingTenant(null); // Clear editing state
    } else {
      // Add mode
      updatedTenants = [...tenants, tenant];
    }

    setTenants(updatedTenants);
    saveToLocalStorage(updatedTenants);
    setShowFormModal(false); // Close modal
  };

  const handleDeleteTenant = (username) => {
    const updatedTenants = tenants.filter((t) => t.username !== username);
    setTenants(updatedTenants);
    saveToLocalStorage(updatedTenants);
  };

  const handleEditTenant = (tenant) => {
    setEditingTenant(tenant);
    setShowFormModal(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl space-y-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-6">
          Tenant Management System
        </h1>

        <section className="text-center">
          <button
            onClick={() => {
              setEditingTenant(null); // Reset edit mode
              setShowFormModal(true);
            }}
            className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition"
          >
            Add new Tenant
          </button>
        </section>

        <TenantList
          tenants={tenants}
          onDelete={handleDeleteTenant}
          onEdit={handleEditTenant}
        />
      </div>

      {showFormModal && (
        <div className="fixed inset-0 bg-blue-100 bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="relative bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-300">
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-4 right-4 text-gray-500 text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <TenantForm
              onAddTenant={handleAddOrEditTenant}
              existingTenant={editingTenant}
            />
          </div>
        </div>
      )}
    </div>
  );
}
