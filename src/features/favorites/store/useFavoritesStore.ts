import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
interface FavoritesState {
    favoriteIds: string[];
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

// Store
export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favoriteIds: [],

            toggleFavorite: (id) =>
                set((state) => {
                    const exists = state.favoriteIds.includes(id);
                    return {
                        favoriteIds: exists
                            ? state.favoriteIds.filter((favId) => favId !== id)
                            : [...state.favoriteIds, id],
                    };
                }),

            isFavorite: (id) => get().favoriteIds.includes(id),
        }),
        {
            name: 'favorites-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
