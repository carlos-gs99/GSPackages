import { useState, useEffect, useCallback } from 'react';

/**
 * Favorite page item
 */
export interface FavoriteItem {
  /** Unique key/route */
  key: string;
  /** Display title */
  title: string;
  /** Route/URL */
  route: string;
  /** Icon name (MDI) */
  icon?: string;
  /** Timestamp when added */
  addedAt: number;
}

const STORAGE_KEY = 'gs-favorites';
const FAVORITES_CHANGE_EVENT = 'gs-favorites-changed';

/**
 * Disparar evento customizado quando favoritos mudam
 */
const dispatchFavoritesChange = () => {
  window.dispatchEvent(new CustomEvent(FAVORITES_CHANGE_EVENT));
};

/**
 * Carregar favoritos do localStorage
 */
const loadFavorites = (): FavoriteItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error('Error loading favorites:', error);
  }
  return [];
};

/**
 * Salvar favoritos no localStorage
 */
const saveFavorites = (favorites: FavoriteItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    dispatchFavoritesChange();
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

/**
 * Hook para gerir favoritos do utilizador
 * Persiste favoritos no localStorage e sincroniza entre componentes
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => loadFavorites());

  // Listener para sincronizar favoritos entre componentes
  useEffect(() => {
    const handleFavoritesChange = () => {
      setFavorites(loadFavorites());
    };

    // Escutar evento customizado
    window.addEventListener(FAVORITES_CHANGE_EVENT, handleFavoritesChange);

    return () => {
      window.removeEventListener(FAVORITES_CHANGE_EVENT, handleFavoritesChange);
    };
  }, []);

  /**
   * Adicionar favorito
   */
  const addFavorite = useCallback((item: Omit<FavoriteItem, 'addedAt'>) => {
    const newFavorites = loadFavorites();
    // Verificar se já existe
    if (newFavorites.some(f => f.key === item.key)) {
      return;
    }
    // Adicionar no FIM da lista
    const updated = [...newFavorites, { ...item, addedAt: Date.now() }];
    saveFavorites(updated);
    setFavorites(updated);
  }, []);

  /**
   * Remover favorito
   */
  const removeFavorite = useCallback((key: string) => {
    const newFavorites = loadFavorites();
    const updated = newFavorites.filter(f => f.key !== key);
    saveFavorites(updated);
    setFavorites(updated);
  }, []);

  /**
   * Toggle favorito (adicionar se não existe, remover se existe)
   */
  const toggleFavorite = useCallback((item: Omit<FavoriteItem, 'addedAt'>) => {
    const newFavorites = loadFavorites();
    const exists = newFavorites.some(f => f.key === item.key);
    
    let updated: FavoriteItem[];
    if (exists) {
      updated = newFavorites.filter(f => f.key !== item.key);
    } else {
      // Adicionar no FIM da lista
      updated = [...newFavorites, { ...item, addedAt: Date.now() }];
    }
    
    saveFavorites(updated);
    setFavorites(updated);
  }, []);

  /**
   * Verificar se é favorito
   */
  const isFavorite = useCallback((key: string) => {
    return favorites.some(f => f.key === key);
  }, [favorites]);

  /**
   * Limpar todos os favoritos
   */
  const clearFavorites = useCallback(() => {
    saveFavorites([]);
    setFavorites([]);
  }, []);

  /**
   * Reordenar favoritos
   */
  const reorderFavorites = useCallback((newOrder: FavoriteItem[]) => {
    saveFavorites(newOrder);
    setFavorites(newOrder);
  }, []);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    reorderFavorites,
    count: favorites.length
  };
};

export default useFavorites;

