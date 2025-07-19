import { useState } from "react";
import DashboardLayout from "../Layout/DashboardLayout";

export default function Settings() {
  const [settings, setSettings] = useState({
    displayName: "Samman",
    email: "samman@example.com",
    language: "en",
    theme: "light",
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Settings saved:", settings);
    alert("Settings saved!");
  };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-extrabold text-blue-800 mb-10 text-center drop-shadow-sm">
        Settings
      </h1>
      <div className="bg-white p-10 rounded-3xl shadow-2xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Name
            </label>
            <input
              type="text"
              name="displayName"
              value={settings.displayName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-5 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-5 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
              className="w-full border border-gray-300 px-5 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="en">English</option>
              <option value="np">Nepali</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              className="w-full border border-gray-300 px-5 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors duration-200"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
