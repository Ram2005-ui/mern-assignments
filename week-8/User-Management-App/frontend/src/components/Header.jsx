import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <span className="text-2xl">👥</span>
          <span>UserManager</span>
        </NavLink>
        <nav className="flex gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm font-medium transition-all duration-200 px-3 py-1.5 rounded-full ${
                isActive
                  ? "bg-white text-indigo-700"
                  : "text-white/80 hover:text-white hover:bg-white/15"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/add-user"
            className={({ isActive }) =>
              `text-sm font-medium transition-all duration-200 px-3 py-1.5 rounded-full ${
                isActive
                  ? "bg-white text-indigo-700"
                  : "text-white/80 hover:text-white hover:bg-white/15"
              }`
            }
          >
            Add User
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `text-sm font-medium transition-all duration-200 px-3 py-1.5 rounded-full ${
                isActive
                  ? "bg-white text-indigo-700"
                  : "text-white/80 hover:text-white hover:bg-white/15"
              }`
            }
          >
            Users
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
