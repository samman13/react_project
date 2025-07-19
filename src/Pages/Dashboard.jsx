import { useUser } from "../context/UserContext"; // import path
import DashboardLayout from "../Layout/DashboardLayout";

export default function Dashboard() {
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

  return (
    <DashboardLayout>
      
      <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center drop-shadow-sm">
        Welcome, {currentUser.userId}!
        <span className="block text-xl font-medium text-blue-600 mt-2">
          You are logged in as an{" "}
          <span className="capitalize">{currentUser.role}</span>.
        </span>
      </h1>

      {/* Kept the inner content styling for the Latest Blogs section */}
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
    </DashboardLayout>
  );
}
