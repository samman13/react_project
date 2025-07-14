import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Settings from "./Pages/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/settings" element={<Settings />} />
      <Route
        path="*"
        element={<h1 className="p-4 text-red-500">404 Not Found</h1>}
      />
    </Routes>
  );
}
