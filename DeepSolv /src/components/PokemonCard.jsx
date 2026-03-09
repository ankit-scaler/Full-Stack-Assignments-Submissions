import { addFavorite, removeFavorite } from '../lib/storage';
import { useFavorite } from '../lib/useFavorite';

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

export default function PokemonCard({ pokemon, onClick }) {
  const favorited = useFavorite(pokemon.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (favorited) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon.id);
    }
  };

  const primaryColor = getTypeColor(pokemon.types[0] || 'normal');

  return (
    <div
      className="card-shine relative bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 border border-slate-200/80 overflow-hidden group"
      onClick={onClick}
    >
      <div
        className="absolute top-0 left-0 right-0 h-20 opacity-30 group-hover:opacity-50 transition-opacity duration-300"
        style={{
          background: `linear-gradient(180deg, ${primaryColor} 0%, transparent 100%)`,
        }}
      />
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleFavoriteClick}
          className="p-2 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white shadow-card transition-all duration-200 hover:scale-105"
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className={`w-5 h-5 transition-all duration-200 ${
              favorited
                ? 'fill-red-500 text-red-500'
                : 'fill-none text-slate-400 group-hover:text-red-400'
            }`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      <div className="relative p-4 pt-5">
        <div
          className="relative w-full h-44 sm:h-48 mb-4 rounded-xl flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${primaryColor}12 0%, ${primaryColor}06 50%, transparent 100%)`,
          }}
        >
          {pokemon.image ? (
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="object-contain transition-transform duration-300 group-hover:scale-110 max-w-full max-h-full drop-shadow-md"
            />
          ) : (
            <div className="text-slate-400 font-medium">No image</div>
          )}
        </div>

        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-800 capitalize mb-2.5">
            {pokemon.name}
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className="px-3 py-1 rounded-lg text-xs font-semibold text-white shadow-sm capitalize"
                style={{ backgroundColor: getTypeColor(type) }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
