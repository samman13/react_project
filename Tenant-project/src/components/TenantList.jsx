import React, { useState } from "react";

export default function TenantList({ tenants, onDelete, onEdit }) {
  // State to control the visibility of the delete confirmation modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // State to store the username of the tenant pending deletion
  const [tenantToDeleteUsername, setTenantToDeleteUsername] = useState(null);

  // Function to initiate the delete confirmation process
  const confirmDelete = (username) => {
    setTenantToDeleteUsername(username); // Store the username of the tenant to be deleted
    setShowDeleteConfirm(true); // Show the confirmation modal
  };

  // Function to handle the actual deletion after user confirmation
  const handleDeleteConfirmed = () => {
    if (tenantToDeleteUsername) {
      onDelete(tenantToDeleteUsername); // Call the onDelete prop (from Home component)
      setTenantToDeleteUsername(null); // Clear the pending tenant
      setShowDeleteConfirm(false); // Close the modal
    }
  };

  // Function to cancel the deletion process
  const cancelDelete = () => {
    setTenantToDeleteUsername(null); // Clear the pending tenant
    setShowDeleteConfirm(false); // Close the modal
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md space-y-6 border border-gray-200 transform transition-all duration-300 ease-in-out hover:shadow-3xl">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-7 tracking-tight">
          Tenant List
        </h2>
        {tenants.length === 0 ? (
          <p className="text-center text-gray-600 text-lg py-4">
            No tenants added yet. Start by adding a new tenant!
          </p>
        ) : (
          <ul className="space-y-4">
            {tenants.map((tenant, index) => (
              <li
                key={tenant.username || index} // Use username as key for better performance
                className="bg-gray-50 p-5 rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 transition duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-lg"
              >
                <div className="mb-3 sm:mb-0 sm:mr-4">
                  <p className="text-xl font-bold text-gray-800 mb-1">
                    Username:{" "}
                    <span className="font-semibold text-blue-700">
                      {tenant.username}
                    </span>
                  </p>
                  <p className="text-md text-gray-600">
                    Role:{" "}
                    <span className="font-medium capitalize text-gray-700">
                      {tenant.role}
                    </span>
                  </p>
                  {/* For security, we do not display the actual password */}
                  <p className="text-sm text-gray-500 mt-1 italic">
                    Password: <span className="font-mono">********</span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                  <button
                    onClick={() => onEdit(tenant)} // Call onEdit from Home, passing the tenant object
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md hover:from-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 active:scale-95 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(tenant.username)} // Open confirmation modal
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 active:scale-95 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-blue-100 bg-opacity-60 flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm text-center border border-gray-300 transform scale-100 transition-all duration-300 ease-out">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Are you sure you want to delete tenant "
              <span className="font-extrabold text-red-600">
                {tenantToDeleteUsername}
              </span>
              "? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteConfirmed}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
