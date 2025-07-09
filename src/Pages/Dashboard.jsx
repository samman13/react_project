import { useState } from "react";

export default function Dashboard() {
  const currentUser = {
    userId: "samman",
    role: "admin", 
    tenant: "student",
  };

  const [users, setUsers] = useState([
    { id: 1, userId: "sam12", role: "user" },
    { id: 2, userId: "ram12", role: "admin" },
  ]);

  const [newUser, setNewUser] = useState({
    userId: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUser.userId && newUser.password) {
      const nextId = users.length + 1;
      setUsers([...users, { id: nextId, ...newUser }]);
      setNewUser({ userId: "", password: "", role: "user" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Welcome, {currentUser.userId} ({currentUser.role})
      </h1>

      {/* User List */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <table className="w-full text-left border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">User ID</th>
              <th className="p-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="p-2 border">{u.id}</td>
                <td className="p-2 border">{u.userId}</td>
                <td className="p-2 border capitalize">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New User - Only for Admins */}
      {currentUser.role === "admin" ? (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add New User</h2>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div className="flex flex-col">
              <label>User ID</label>
              <input
                type="text"
                name="userId"
                value={newUser.userId}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
            </div>
            <div className="flex flex-col">
              <label>Role</label>
              <select
                name="role"
                value={newUser.role}
                onChange={handleChange}
                className="p-2 border rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add User
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow">
          You are logged in as a <strong>user</strong>. Only admins can add
          users.
        </div>
      )}
    </div>
  );
}
