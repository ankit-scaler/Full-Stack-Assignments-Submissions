import { notifyFavoritesChange } from './useFavorite';

const FAVORITES_KEY = 'pokedex-favorites';

export function getFavorites() {
  if (typeof window === 'undefined') return [];

  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
}

export function addFavorite(pokemonId) {
  if (typeof window === 'undefined') return;

  const favorites = getFavorites();
  if (!favorites.includes(pokemonId)) {
    favorites.push(pokemonId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    notifyFavoritesChange();
  }
}

export function removeFavorite(pokemonId) {
  if (typeof window === 'undefined') return;

  const favorites = getFavorites();
  const updated = favorites.filter((id) => id !== pokemonId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  notifyFavoritesChange();
}

export function isFavorite(pokemonId) {
  if (typeof window === 'undefined') return false;

  const favorites = getFavorites();
  return favorites.includes(pokemonId);
}
