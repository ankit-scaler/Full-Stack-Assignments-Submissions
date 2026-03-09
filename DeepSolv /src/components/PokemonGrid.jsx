import { useState, useEffect } from 'react';
import { fetchPokemonList, fetchPokemonDetails, fetchPokemonByType } from '../lib/api';
import PokemonCard from './PokemonCard';
import PokemonModal from './PokemonModal';
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const POKEMON_PER_PAGE = 20;

export default function PokemonGrid({
  initialPokemon,
  initialTypes,
  initialTotalCount,
  initialPokemonNames,
}) {
  const [pokemonList, setPokemonList] = useState(initialPokemon);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(initialTotalCount);

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true);
      setError(null);

      try {
        if (selectedTypes.length > 0) {
          const typeResults = await Promise.all(selectedTypes.map((type) => fetchPokemonByType(type)));
          const combined = typeResults.flat();
          const uniqueList = Array.from(new Map(combined.map((item) => [item.name, item])).values());

          const filtered = searchQuery
            ? uniqueList.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            : uniqueList;

          const start = currentPage * POKEMON_PER_PAGE;
          const paginated = filtered.slice(start, start + POKEMON_PER_PAGE);
          const pokemonDetails = await Promise.all(paginated.map((item) => fetchPokemonDetails(item.name)));

          setPokemonList(pokemonDetails);
          setTotalCount(filtered.length);
        } else if (searchQuery.trim()) {
          const filtered = initialPokemonNames.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          const start = currentPage * POKEMON_PER_PAGE;
          const paginated = filtered.slice(start, start + POKEMON_PER_PAGE);
          const pokemonDetails = await Promise.all(paginated.map((item) => fetchPokemonDetails(item.name)));

          setPokemonList(pokemonDetails);
          setTotalCount(filtered.length);
        } else {
          const response = await fetchPokemonList(POKEMON_PER_PAGE, currentPage * POKEMON_PER_PAGE);
          const pokemonDetails = await Promise.all(response.results.map((item) => fetchPokemonDetails(item.name)));

          setPokemonList(pokemonDetails);
          setTotalCount(response.count);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load Pokémon');
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, [selectedTypes, currentPage, searchQuery, initialPokemonNames]);

  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
    setCurrentPage(0);
  };

  const handlePokemonClick = async (pokemon) => {
    try {
      const fullDetails = await fetchPokemonDetails(pokemon.id);
      setSelectedPokemon(fullDetails);
      setIsModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Pokémon details');
    }
  };

  const totalPages = Math.ceil(totalCount / POKEMON_PER_PAGE);

  return (
    <>
      <div className="mb-8">
        <div className="max-w-2xl mx-auto mb-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <TypeFilter types={initialTypes} selectedTypes={selectedTypes} onTypeToggle={handleTypeToggle} />
      </div>

      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => {
            setError(null);
            setCurrentPage(0);
          }}
        />
      )}

      {loading && !error && <LoadingSpinner />}

      {!loading && !error && (
        <>
          <div className="mb-5 flex items-center justify-between flex-wrap gap-2">
            <p className="text-slate-600 font-semibold">
              Showing <span className="text-slate-800">{pokemonList.length}</span> of{' '}
              <span className="text-slate-800">{totalCount}</span> Pokémon
            </p>
          </div>
          {pokemonList.length === 0 ? (
            <div className="text-center py-16 rounded-2xl bg-slate-50/80 border border-slate-200/80">
              <p className="text-slate-500 text-lg font-medium">No Pokémon found matching your criteria.</p>
              <p className="text-slate-400 text-sm mt-1">Try a different search or clear type filters.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 mb-10 animate-slideUp">
                {pokemonList.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => handlePokemonClick(pokemon)} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 py-8">
                  <button
                    onClick={() => {
                      if (currentPage > 0) {
                        setCurrentPage(currentPage - 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    disabled={currentPage === 0}
                    className="px-5 py-2.5 font-semibold rounded-xl bg-slate-800 text-white hover:bg-slate-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-200 shadow-card hover:shadow-card-hover"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm">
                    Page {currentPage + 1} of {totalPages}
                  </span>
                  <button
                    onClick={() => {
                      if (currentPage < totalPages - 1) {
                        setCurrentPage(currentPage + 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    disabled={currentPage >= totalPages - 1}
                    className="px-5 py-2.5 font-semibold rounded-xl bg-slate-800 text-white hover:bg-slate-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-200 shadow-card hover:shadow-card-hover"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      <PokemonModal pokemon={selectedPokemon} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
