export default function CountryCard({ country }) {
  const name       = country.name?.common    ?? "N/A";
  const capital    = country.capital?.[0]    ?? "N/A";
  const population = country.population?.toLocaleString() ?? "N/A";
  const region     = country.region          ?? "N/A";
  const flag       = country.flags?.svg ?? country.flags?.png ?? "";

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <img
        src={flag}
        alt={`Flag of ${name}`}
        className="w-full h-36 object-cover"
      />
      <div className="p-4">
        <h2 className="text-gray-800 font-bold text-base mb-2">{name}</h2>
        <p className="text-gray-500 text-sm">
          <span className="font-medium text-gray-700">Capital: </span>{capital}
        </p>
        <p className="text-gray-500 text-sm">
          <span className="font-medium text-gray-700">Population: </span>{population}
        </p>
        <p className="text-gray-500 text-sm">
          <span className="font-medium text-gray-700">Region: </span>{region}
        </p>
      </div>
    </div>
  );
}