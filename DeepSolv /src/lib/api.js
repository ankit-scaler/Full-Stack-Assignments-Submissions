const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(limit = 20, offset = 0) {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon list');
  }

  return response.json();
}

export async function fetchPokemonDetails(nameOrId) {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${nameOrId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon details for ${nameOrId}`);
  }

  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
    types: data.types.map((type) => type.type.name),
    stats: {
      hp: data.stats.find((stat) => stat.stat.name === 'hp')?.base_stat || 0,
      attack: data.stats.find((stat) => stat.stat.name === 'attack')?.base_stat || 0,
      defense: data.stats.find((stat) => stat.stat.name === 'defense')?.base_stat || 0,
      specialAttack: data.stats.find((stat) => stat.stat.name === 'special-attack')?.base_stat || 0,
      specialDefense: data.stats.find((stat) => stat.stat.name === 'special-defense')?.base_stat || 0,
      speed: data.stats.find((stat) => stat.stat.name === 'speed')?.base_stat || 0,
    },
    abilities: data.abilities.map((ability) => ability.ability.name),
    height: data.height / 10,
    weight: data.weight / 10,
  };
}

export async function fetchAllPokemonTypes() {
  const response = await fetch(`${POKEAPI_BASE_URL}/type`);

  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon types');
  }

  const data = await response.json();
  return data.results
    .map((type) => type.name)
    .filter((name) => !['shadow', 'unknown'].includes(name))
    .slice(0, 18);
}

export async function fetchPokemonByType(type) {
  const response = await fetch(`${POKEAPI_BASE_URL}/type/${type}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon by type: ${type}`);
  }

  const data = await response.json();
  return data.pokemon.map((item) => item.pokemon);
}
