// src/Layout/DashboardLayout.jsx
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faCog,
  faEnvelope,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../context/UserContext";

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const { currentUser } = useUser();

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
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-12">
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
            <NavItem icon={faEnvelope} text="Contact Us" path="/contact" />
          </nav>
        </div>

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

      {/* Main Content */}
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
}
