import { useState, useEffect } from 'react';
import { fetchPokemonList, fetchPokemonDetails, fetchAllPokemonTypes } from '../lib/api';
import PokemonGrid from '../components/PokemonGrid';
import LoadingSpinner from '../components/LoadingSpinner';

const POKEMON_PER_PAGE = 20;

export default function Home() {
  const [initialPokemon, setInitialPokemon] = useState([]);
  const [initialTypes, setInitialTypes] = useState([]);
  const [initialTotalCount, setInitialTotalCount] = useState(0);
  const [initialPokemonNames, setInitialPokemonNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [initialPokemonResponse, availableTypes] = await Promise.all([
          fetchPokemonList(POKEMON_PER_PAGE, 0),
          fetchAllPokemonTypes(),
        ]);

        const pokemonDetails = await Promise.all(
          initialPokemonResponse.results.slice(0, POKEMON_PER_PAGE).map((item) => fetchPokemonDetails(item.name))
        );

        const searchPokemonResponse = await fetchPokemonList(1000, 0);

        setInitialPokemon(pokemonDetails);
        setInitialTypes(availableTypes);
        setInitialTotalCount(initialPokemonResponse.count);
        setInitialPokemonNames(searchPokemonResponse.results);
      } catch (err) {
        console.error('Failed to load initial data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <LoadingSpinner />
        <p className="mt-4 text-slate-500 font-medium">Loading your Pokédex…</p>
      </main>
    );
  }

  return (
    <main>
      <section className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-3">
            Discover Pokémon
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto font-medium">
            Search, filter by type, and save your favorites. Click any card for details.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <PokemonGrid
          initialPokemon={initialPokemon}
          initialTypes={initialTypes}
          initialTotalCount={initialTotalCount}
          initialPokemonNames={initialPokemonNames}
        />
      </div>
    </main>
  );
}
