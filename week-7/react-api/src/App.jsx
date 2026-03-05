import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.jsx";
import CountryList from "./components/CountryList.jsx";

const ALL_URL =
  "https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // Fetch all countries on page load
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch(ALL_URL);
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sorted);
        setFiltered(sorted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  // Filter when query changes
  useEffect(() => {
    if (!query) { setFiltered(countries); return; }
    const result = countries.filter((c) =>
      c.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  }, [query, countries]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-1">Country Explorer</h1>
      <p className="text-gray-500 text-sm mb-6">Browse all countries of the world</p>

      <div className="mb-6">
        <SearchBar onSearch={setQuery} />
        {!loading && !error && (
          <p className="text-gray-400 text-xs mt-2">Showing {filtered.length} countries</p>
        )}
      </div>

      {loading && <p className="text-blue-400 text-center mt-20">Loading countries...</p>}
      {error && <p className="text-red-400 text-center mt-20">Error: {error}</p>}
      {!loading && !error && <CountryList countries={filtered} />}
    </div>
  );
}