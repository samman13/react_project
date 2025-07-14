import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../context/UserContext"; //  import path
import {
  faTachometerAlt,
  faUsers,
  faCog,
  faSignOutAlt,
  faEdit,
  faTrashAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function Users() {
  const navigate = useNavigate();

  const { currentUser } = useUser();

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
  const [editingUserId, setEditingUserId] = useState(null);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateUser = (e) => {
    e.preventDefault();
    if (editingUserId !== null) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUserId
            ? { ...u, userId: newUser.userId, role: newUser.role }
            : u
        )
      );
    } else {
      const isDuplicate = users.some((u) => u.userId === newUser.userId);
      if (isDuplicate) return alert("User ID already exists!");
      const nextId =
        users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      setUsers([
        ...users,
        { id: nextId, userId: newUser.userId, role: newUser.role },
      ]);
    }
    setNewUser({ userId: "", password: "", role: "user" });
    setShowModal(false);
    setEditingUserId(null);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleEditUser = (user) => {
    setEditingUserId(user.id);
    setNewUser({ userId: user.userId, password: "", role: user.role });
    setShowModal(true);
  };

  // Enhanced Sidebar Navigation Item Component
  const NavItem = ({ icon, text, path }) => {
    const isActive = window.location.pathname === path;
    const activeClasses = isActive
      ? "bg-blue-600 text-white font-semibold shadow-lg"
      : "text-gray-700 hover:text-blue-700 hover:bg-blue-50";

    return (
      <button
        onClick={() => navigate(path)}
        className={`flex items-center w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeClasses}`}
      >
        <FontAwesomeIcon icon={icon} className="mr-4 text-xl" />
        <span className="text-base">{text}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-100 p-8 font-sans gap-8">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-2xl rounded-3xl border border-gray-100 p-8 hidden md:flex flex-col justify-between">
        <div>
          <div className="mb-12 text-center border-b pb-6 border-gray-100">
            <h2 className="text-4xl font-extrabold text-blue-800 tracking-tight">
              CMS Panel
            </h2>
            <p className="text-sm text-gray-500 mt-3">
              Tenant:{" "}
              <span className="font-semibold text-indigo-700">
                {currentUser.tenant}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Logged in as:{" "}
              <span className="font-semibold text-gray-800">
                {currentUser.userId}
              </span>
            </p>
          </div>
          <nav className="space-y-4">
            <NavItem
              icon={faTachometerAlt}
              text="Dashboard"
              path="/dashboard"
            />
            <NavItem icon={faUsers} text="Users" path="/users" />
            <NavItem icon={faCog} text="Settings" path="/settings" />
          </nav>
        </div>

        {/* Logout Button */}
        <div className="pt-6 border-t border-gray-200">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center w-full text-left px-4 py-3 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 font-medium"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-4 text-xl" />
            <span className="text-base">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center drop-shadow-sm">
          Welcome, {currentUser.userId}!
          <span className="block text-xl font-medium text-blue-600 mt-2">
            You are logged in as an{" "}
            <span className="capitalize">{currentUser.role}</span>.
          </span>
        </h1>
        <div className="bg-white p-10 rounded-3xl shadow-2xl">
          <h1 className="text-5xl font-extrabold text-blue-800 mb-8 text-center">
            User Directory
          </h1>
          <p></p>

          {currentUser.role === "admin" && (
            <div className="flex justify-end mb-6">
              <button
                onClick={() => {
                  setShowModal(true);
                  setEditingUserId(null);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-3" />
                Add New User
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="p-4 text-gray-600 font-semibold text-sm rounded-tl-xl">
                    ID
                  </th>
                  <th className="p-4 text-gray-600 font-semibold text-sm">
                    User ID
                  </th>
                  <th className="p-4 text-gray-600 font-semibold text-sm">
                    Role
                  </th>
                  <th className="p-4 text-gray-600 font-semibold text-sm rounded-tr-xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, index) => (
                  <tr
                    key={u.id}
                    className={`transition-colors duration-150 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 border-b border-gray-200`}
                  >
                    <td className="p-4 text-gray-800">{u.id}</td>
                    <td className="p-4 font-medium text-gray-900">
                      {u.userId}
                    </td>
                    <td className="p-4 capitalize">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          u.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 space-x-3">
                      <button
                        onClick={() => handleEditUser(u)}
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-150 p-2 rounded-full hover:bg-blue-100"
                        title="Edit User"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-150 p-2 rounded-full hover:bg-red-100"
                        title="Delete User"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-blue-100 bg-opacity-60 flex justify-center items-center z-50 animate-fade-in">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg transform scale-95 transition-transform duration-200 ease-out">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">
                {editingUserId ? "Edit User" : "Add New User"}
              </h3>
              <form onSubmit={handleAddOrUpdateUser} className="space-y-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="userId"
                    className="text-sm font-medium text-gray-700 mb-2"
                  >
                    User ID
                  </label>
                  <input
                    type="text"
                    id="userId"
                    name="userId"
                    placeholder="Enter User ID"
                    value={newUser.userId}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-5 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    value={newUser.password}
                    onChange={handleChange}
                    required={!editingUserId}
                    className="w-full border border-gray-300 px-5 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="role"
                    className="text-sm font-medium text-gray-700 mb-2"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={newUser.role}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-5 py-3 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors duration-200"
                  >
                    {editingUserId ? "Update User" : "Add User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
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
