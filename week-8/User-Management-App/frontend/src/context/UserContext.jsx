import { createContext, useContext, useState, useEffect, useCallback } from "react";

const UserContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const clearMessage = () => setTimeout(() => setMessage(null), 3000);
  const clearError = () => setTimeout(() => setError(null), 3000);

  // Fetch all active users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/user-api/users`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setUsers(data.payload);
    } catch (err) {
      setError(err.message || "Failed to fetch users");
      clearError();
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new user
  const addUser = async (userData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/user-api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage("User created successfully!");
      clearMessage();
      await fetchUsers();
      return { success: true };
    } catch (err) {
      setError(err.message || "Failed to create user");
      clearError();
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Delete (soft) a user
  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/user-api/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage("User deleted successfully!");
      clearMessage();
      await fetchUsers();
    } catch (err) {
      setError(err.message || "Failed to delete user");
      clearError();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <UserContext.Provider
      value={{ users, loading, error, message, fetchUsers, addUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUsers must be used within a UserProvider");
  return ctx;
}
