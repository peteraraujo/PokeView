import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../../../services/apiClient';

// Types
export interface PokemonListItem {
    name: string;
    url: string;
}

interface PokeApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

// API Call
const fetchPokemons = async ({ pageParam = 0 }): Promise<PokeApiResponse> => {
    const { data } = await apiClient.get(`/pokemon?offset=${pageParam}&limit=20`);
    return data;
};

// Hook
export const useGetPokemons = () => {
    return useInfiniteQuery({
        queryKey: ['pokemons'],
        queryFn: fetchPokemons,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined;

            const url = new URL(lastPage.next);
            const offset = url.searchParams.get('offset');

            return offset ? Number(offset) : undefined;
        },
    });
};
