export default function SearchBar({ value, onChange, placeholder = 'Search Pokémon by name...' }) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-5 py-3.5 text-slate-800 placeholder-slate-400 bg-white border border-slate-200 rounded-2xl shadow-card focus:ring-2 focus:ring-slate-800/20 focus:border-slate-400 outline-none transition-all duration-200 font-medium"
      />
    </div>
  );
}
