import { useState, useEffect } from "react";

export default function TenantForm({ onAddTenant, existingTenant }) {
  // State for form fields, initialized based on existingTenant or empty
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  // Effect to populate form fields when an existingTenant is provided (for editing)
  // or clear them when existingTenant becomes null (for adding a new tenant)
  useEffect(() => {
    if (existingTenant) {
      setUsername(existingTenant.username || "");
      setPassword(existingTenant.password || ""); // In a real app, don't pre-fill sensitive data like passwords
      setRole(existingTenant.role || "user");
    } else {
      // Clear fields for adding a new tenant
      setUsername("");
      setPassword("");
      setRole("user");
    }
  }, [existingTenant]); // Re-run effect when existingTenant prop changes

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!username.trim() || !password.trim()) {
      // In a real application, you might use a custom modal or toast notification
      // instead of alert() for a better user experience.
      alert("Username and password cannot be empty.");
      return;
    }

    // Call the parent's handler with the current form data
    onAddTenant({ username, password, role });

    // Fields are reset by the useEffect when existingTenant is cleared by Home component
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-7 border border-gray-200 transform transition-all duration-300 ease-in-out hover:shadow-3xl"
    >
      <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-7 tracking-tight">
        {existingTenant ? "Edit Tenant Details" : "Register New Tenant"}
      </h2>

      {/* Username Input Group */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="e.g., Samman12"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 ease-in-out text-gray-800 placeholder-gray-400"
          required
          disabled={!!existingTenant} // Disable username input when editing an existing tenant
        />
        {existingTenant && (
          <p className="text-xs text-gray-500 mt-1.5 italic">
            Username cannot be changed for existing tenants.
          </p>
        )}
      </div>

      {/* Password Input Group */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 ease-in-out text-gray-800 placeholder-gray-400"
          required
        />
      </div>

      {/* Role Selection Group */}
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Role
        </label>
        <div className="relative">
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm bg-white appearance-none focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 ease-in-out text-gray-800"
          >
            <option value="user">User</option>
            <option value="tenant-admin">Tenant Admin</option>
          </select>
          {/* Custom arrow for select dropdown */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3.5 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-3 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 active:scale-95"
      >
        {existingTenant ? "Update Tenant" : "Add Tenant"}
      </button>
    </form>
  );
}
