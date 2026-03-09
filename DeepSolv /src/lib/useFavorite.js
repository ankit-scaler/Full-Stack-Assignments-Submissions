import { useSyncExternalStore } from 'react';
import { getFavorites } from './storage';

const listeners = new Set();

function subscribe(callback) {
  listeners.add(callback);
  window.addEventListener('storage', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot(pokemonId) {
  const favorites = getFavorites();
  return favorites.includes(pokemonId);
}

function getServerSnapshot() {
  return false;
}

export function notifyFavoritesChange() {
  listeners.forEach((callback) => callback());
}

export function useFavorite(pokemonId) {
  return useSyncExternalStore(subscribe, () => getSnapshot(pokemonId), getServerSnapshot);
}
