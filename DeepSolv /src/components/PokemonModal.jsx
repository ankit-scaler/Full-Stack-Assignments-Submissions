import { useEffect } from 'react';
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

export default function PokemonModal({ pokemon, isOpen, onClose }) {
  const favorited = useFavorite(pokemon?.id ?? 0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !pokemon) return null;

  const handleFavoriteClick = () => {
    if (!pokemon) return;
    if (favorited) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon.id);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-hidden"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">{pokemon.name}</h2>
          <div className="flex gap-2">
            <button
              onClick={handleFavoriteClick}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg
                className={`w-6 h-6 transition-all duration-200 ${
                  favorited
                    ? 'fill-red-500 text-red-500'
                    : 'fill-none text-gray-400 hover:text-red-400'
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
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="shrink-0">
              <div className="relative w-full max-w-xs mx-auto bg-gradient-to-b from-gray-50 to-white rounded-lg p-8">
                {pokemon.image ? (
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="object-contain w-full h-auto"
                  />
                ) : (
                  <div className="text-gray-400 text-center">No image</div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Types</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className="px-4 py-2 rounded-full text-sm font-medium text-white capitalize"
                      style={{ backgroundColor: getTypeColor(type) }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">Height</h3>
                  <p className="text-lg font-medium text-gray-800">{pokemon.height} m</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">Weight</h3>
                  <p className="text-lg font-medium text-gray-800">{pokemon.weight} kg</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span key={ability} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 capitalize">
                      {ability}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Base Stats</h3>
            <div className="space-y-3">
              {Object.entries(pokemon.stats).map(([statName, value]) => (
                <div key={statName}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {statName === 'specialAttack'
                        ? 'Sp. Attack'
                        : statName === 'specialDefense'
                          ? 'Sp. Defense'
                          : statName}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">{value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((value / 255) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
