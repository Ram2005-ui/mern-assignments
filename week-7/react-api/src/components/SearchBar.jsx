import { useRef, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const inputRef = useRef(null);
  const debounceTimer = useRef(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleChange(e) {
    const value = e.target.value;

    // Debounce: wait 400ms after user stops typing
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      onSearch(value.trim());
    }, 400);
  }

  return (
    <input
      ref={inputRef}
      type="text"
      onChange={handleChange}
      placeholder="Search by country name..."
      className="w-full max-w-md border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}