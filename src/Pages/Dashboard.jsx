// src/Pages/Dashboard.jsx
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; //  import path
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const blogs = [
    {
      id: 1,
      title: "How to Build a CMS with React",
      author: "Samman Basnet",
      date: "2025-07-14",
      summary:
        "A step-by-step guide on building a Content Management System with React and best practices.",
    },
    {
      id: 2,
      title: "Understanding React Router",
      author: "Samman Basnet",
      date: "2025-07-10",
      summary:
        "Exploring routing in React apps with react-router-dom and hooks.",
    },
  ];

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
      <main className="flex-1 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center drop-shadow-sm">
          Welcome, {currentUser.userId}!
          <span className="block text-xl font-medium text-blue-600 mt-2">
            You are logged in as an{" "}
            <span className="capitalize">{currentUser.role}</span>.
          </span>
        </h1>

        <section className="bg-white p-10 rounded-3xl shadow-2xl">
          <h2 className="text-5xl font-extrabold text-blue-800 mb-8 text-center">
            Latest Blogs
          </h2>

          {blogs.length === 0 ? (
            <p className="text-center text-gray-600">No blogs to display.</p>
          ) : (
            <div className="space-y-8">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow duration-200"
                >
                  <h3 className="text-2xl font-bold text-blue-800 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    By <span className="font-semibold">{blog.author}</span> on{" "}
                    {new Date(blog.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">{blog.summary}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
