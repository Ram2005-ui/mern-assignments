import CountryCard from "./CountryCard";

export default function CountryList({ countries }) {
  if (countries.length === 0)
    return <p className="text-center text-gray-400 mt-16">No countries found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {countries.map((country) => (
        <CountryCard key={country.name?.common} country={country} />
      ))}
    </div>
  );
}