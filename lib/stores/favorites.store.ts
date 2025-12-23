import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoritesState {
  // Normalized state: Store only product IDs
  favoriteIds: Set<string>;
  
  // Actions
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
  
  // Computed
  getFavoriteCount: () => number;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: new Set<string>(),

      addFavorite: (productId: string) =>
        set((state) => ({
          favoriteIds: new Set(state.favoriteIds).add(productId),
        })),

      removeFavorite: (productId: string) =>
        set((state) => {
          const newFavorites = new Set(state.favoriteIds);
          newFavorites.delete(productId);
          return { favoriteIds: newFavorites };
        }),

      toggleFavorite: (productId: string) => {
        const state = get();
        if (state.favoriteIds.has(productId)) {
          state.removeFavorite(productId);
        } else {
          state.addFavorite(productId);
        }
      },

      isFavorite: (productId: string) => get().favoriteIds.has(productId),

      clearFavorites: () => set({ favoriteIds: new Set<string>() }),

      getFavoriteCount: () => get().favoriteIds.size,
    }),
    {
      name: "pazaryeri-favorites",
      storage: createJSONStorage(() => localStorage),
      // Custom serialization for Set
      partialize: (state) => ({
        favoriteIds: Array.from(state.favoriteIds),
      }),
      // Custom deserialization for Set
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.favoriteIds = new Set(state.favoriteIds as unknown as string[]);
        }
      },
    }
  )
);
