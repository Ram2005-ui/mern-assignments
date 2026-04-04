import { useUsers } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function UserList() {
  const { users, loading, error, message, deleteUser } = useUsers();

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">All Users</h1>
            <p className="text-gray-500 text-sm mt-1">
              {loading ? "Loading..." : `${users.length} active user${users.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <Link
            to="/add-user"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow hover:shadow-indigo-400/40 hover:scale-105 transition-all duration-200 text-sm"
          >
            ➕ Add User
          </Link>
        </div>

        {/* Toast messages */}
        {message && (
          <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium">
            ✅ {message}
          </div>
        )}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
            ❌ {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Empty state */}
        {!loading && users.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🙈</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">No users found</h2>
            <p className="text-gray-400 text-sm mb-6">Get started by adding your first user.</p>
            <Link
              to="/add-user"
              className="inline-block bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition"
            >
              Add First User
            </Link>
          </div>
        )}

        {/* Table */}
        {!loading && users.length > 0 && (
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <th className="text-left px-6 py-4 font-semibold">#</th>
                    <th className="text-left px-6 py-4 font-semibold">Name</th>
                    <th className="text-left px-6 py-4 font-semibold">Email</th>
                    <th className="text-left px-6 py-4 font-semibold">Mobile</th>
                    <th className="text-left px-6 py-4 font-semibold">Date of Birth</th>
                    <th className="text-left px-6 py-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user, idx) => (
                    <tr
                      key={user._id}
                      className="hover:bg-indigo-50/40 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 text-gray-400 font-mono">{idx + 1}</td>
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold uppercase">
                            {user.name?.charAt(0)}
                          </div>
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-gray-600">{user.mobileNumber}</td>
                      <td className="px-6 py-4 text-gray-600">{formatDate(user.dateOfBirth)}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${user.name}?`)) {
                              deleteUser(user._id);
                            }
                          }}
                          className="inline-flex items-center gap-1 bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-100 hover:scale-105 transition-all duration-150"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
