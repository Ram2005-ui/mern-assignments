import { Link } from "react-router-dom";
import { useUsers } from "../context/UserContext";

export default function Home() {
  const { users, loading } = useUsers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span>🚀</span>
          <span>MERN Stack User Management</span>
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Manage Your Users{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Effortlessly
          </span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10">
          A modern, fast, and robust user management system built with React,
          Node.js, Express, and MongoDB.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/add-user"
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-indigo-400/40 hover:scale-105 transition-all duration-200"
          >
            ➕ Add New User
          </Link>
          <Link
            to="/users"
            className="inline-block border-2 border-indigo-600 text-indigo-600 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 hover:scale-105 transition-all duration-200"
          >
            👥 View All Users
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="text-4xl font-extrabold text-indigo-600 mb-1">
              {loading ? "..." : users.length}
            </div>
            <div className="text-gray-500 text-sm font-medium">Active Users</div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="text-4xl font-extrabold text-purple-600 mb-1">REST</div>
            <div className="text-gray-500 text-sm font-medium">API Architecture</div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="text-4xl font-extrabold text-pink-600 mb-1">100%</div>
            <div className="text-gray-500 text-sm font-medium">Responsive UI</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Everything You Need
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "➕", title: "Create Users", desc: "Add users with full validation via React Hook Form." },
            { icon: "📋", title: "View Users", desc: "Browse all users in a clean, sortable table." },
            { icon: "🗑️", title: "Delete Users", desc: "Soft-delete users — data stays safe in MongoDB." },
            { icon: "⚡", title: "Real-time State", desc: "Context API keeps the UI instantly in sync." },
            { icon: "🔒", title: "Validated Data", desc: "Schema-level validation via Mongoose on the backend." },
            { icon: "📱", title: "Fully Responsive", desc: "Works beautifully on mobile, tablet, and desktop." },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
