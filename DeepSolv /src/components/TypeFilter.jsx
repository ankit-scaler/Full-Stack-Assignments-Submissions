function getTypeColor(type) {
  const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  return typeColors[type] || '#68A090';
}

export default function TypeFilter({ types, selectedTypes, onTypeToggle }) {
  return (
    <div className="w-full rounded-2xl bg-white/80 border border-slate-200/80 shadow-card p-4 sm:p-5">
      <h3 className="text-sm font-bold text-slate-600 mb-3 uppercase tracking-wider">Filter by Type</h3>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => {
          const isSelected = selectedTypes.includes(type);
          return (
            <button
              key={type}
              onClick={() => onTypeToggle(type)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 capitalize ${
                isSelected
                  ? 'text-white shadow-md scale-105 ring-2 ring-offset-2 ring-white/50'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-sm'
              }`}
              style={isSelected ? { backgroundColor: getTypeColor(type) } : {}}
            >
              {type}
            </button>
          );
        })}
      </div>
      {selectedTypes.length > 0 && (
        <button
          onClick={() => selectedTypes.forEach(onTypeToggle)}
          className="mt-3 text-sm font-semibold text-slate-600 hover:text-slate-800 underline underline-offset-2"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
