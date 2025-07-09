import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

export default function AppRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="*"
          element={<h1 className="p-4 text-red-500">404 Not Found</h1>}
        />
      </Routes>
    );
}