import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useUsers } from "../context/UserContext";

export default function RootLayout() {
  const { message, error } = useUsers();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Global toast notifications */}
      {message && (
        <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-bounce">
          ✅ {message}
        </div>
      )}
      {error && (
        <div className="fixed top-5 right-5 z-50 bg-red-500 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-bounce">
          ❌ {error}
        </div>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
