import { useState } from "react";

export default function Dashboard() {
  const currentUser = {
    userId: "samman",
    role: "admin", // Change to "user" to test view
    tenant: "student",
  };

  const [users, setUsers] = useState([
    { id: 1, userId: "sam12", role: "user" },
    { id: 2, userId: "ram12", role: "admin" },
    { id: 3, userId: "testuser", role: "user" },
    { id: 4, userId: "manager", role: "admin" },
  ]);

  const [newUser, setNewUser] = useState({
    userId: "",
    password: "",
    role: "user",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUser.userId && newUser.password) {
      const nextId =
        users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      setUsers([
        ...users,
        {
          id: nextId,
          userId: newUser.userId,
          role: newUser.role,
        },
      ]);
      setNewUser({ userId: "", password: "", role: "user" });
      setShowModal(false); //close modal
    }
  };

  const handleDeleteUser = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center drop-shadow-sm">
          Welcome, {currentUser.userId}!
          <span className="block text-xl font-medium text-blue-600 mt-2">
            You are logged in as an{" "}
            <span className="capitalize">{currentUser.role}</span>.
          </span>
        </h1>

        {/* Add user Button */}
        {currentUser.role === "admin" && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 roubded shadow transition"
            >
              <i className="fas fa-user-plus mr-2"></i>Add User
            </button>
          </div>
        )}

        {/* User Directory Table */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
            <i className="fas fa-users text-blue-500 mr-2"></i> User Directory
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-700">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  {currentUser.role === "admin" && (
                    <th className="py-3 px-4">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {users.map((u, index) => (
                  <tr
                    key={u.id}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="py-3 px-4">{u.id}</td>
                    <td className="py-3 px-4">{u.userId}</td>
                    <td className="py-3 px-4 capitalize">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          u.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {u.role === "admin" ? (
                          <i className="fas fa-user-shield mr-1"></i>
                        ) : (
                          <i className="fas fa-user mr-1"></i>
                        )}
                        {u.role}
                      </span>
                    </td>
                    {currentUser.role === "admin" && (
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="text-red-600 hover:text-red-800 font-semibold text-sm"
                        >
                          <i className="fas fa-trash mr-1"></i>Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Form */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100 bg-opacity-70 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg transform transition-all duration-300 scale-100 opacity-100 animate-fade-in">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h3 className="text-3xl font-extrabold text-gray-900">
                  <i className="fas fa-user-plus mr-3 text-blue-600"></i> Create New User
                </h3>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <i className="fas fa-times text-2xl"></i>
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleAddUser} className="space-y-6">
                {/* User ID Input */}
                <div>
                  <label htmlFor="modal-userId" className="block text-sm font-semibold text-gray-700 mb-2">
                    User ID
                  </label>
                  <input
                    type="text"
                    id="modal-userId"
                    name="userId"
                    value={newUser.userId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 text-base"
                    placeholder="e.g., new_employee_id"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="modal-password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="modal-password"
                    name="password"
                    value={newUser.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 text-base"
                    placeholder="Enter your Password"
                  />
                </div>

                {/* Role Select */}
                <div>
                  <label htmlFor="modal-role" className="block text-sm font-semibold text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    id="modal-role"
                    name="role"
                    value={newUser.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 text-base appearance-none pr-8" // appearance-none for custom arrow
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  {/* Optional custom arrow for select */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15 8.172l-1.414-1.415L10 10.95l-3.293-3.293-1.414 1.414L9.293 12.95z"/></svg>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105 active:scale-95 font-semibold"
                  >
                    <i className="fas fa-check-circle mr-2"></i> Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Info for non-admin users */}
        {currentUser.role !== "admin" && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-6 rounded-xl shadow-md flex items-center justify-center space-x-3 mt-6">
            <i className="fas fa-info-circle text-yellow-600 text-xl"></i>
            <p className="font-medium text-lg">
              You are logged in as a{" "}
              <strong className="capitalize">{currentUser.role}</strong>. Only
              administrators can add or remove users.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
