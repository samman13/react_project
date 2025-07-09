import { useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState({
        "userID" : "",
        "password" : "",
    });
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault() ;
        console.log("login Data:", formData);
        //we can call api here
    }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* main card container */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-10">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User ID Input */}
          <div>
            <label className="block mb-2 text-md font-semibold text-gray-700">
              User ID
            </label>
            <input
              type="text"
              name="userID"
              value={formData.userID}
              onChange={handleChange}
              placeholder="Enter your user ID"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
              required
            />
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-md font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your Password"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
              required
            />
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-bold py-3.5 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-3 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105 active:scale-95"
          >
            Login
          </button>
          {/* Forgot Password Link */}
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline font-medium">
                Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
