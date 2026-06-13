import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../../../services/apiClient';

// Types
export interface PokemonListItem {
    name: string;
    url: string;
}

export interface FetchPokemonsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

export interface UseGetPokemonsParams {
    limit?: number;
}

// Query Keys
export const pokemonListKeys = {
    all: ['pokemons'] as const,
    list: (limit: number) => [...pokemonListKeys.all, { limit }] as const,
};

// API Call
const fetchPokemons = async (offset: number, limit: number): Promise<FetchPokemonsResponse> => {
    const { data } = await apiClient.get(`/pokemon?offset=${offset}&limit=${limit}`);
    return data;
};

// Hook
export const useGetPokemons = ({ limit = 20 }: UseGetPokemonsParams = {}) => {
    return useInfiniteQuery({
        queryKey: pokemonListKeys.list(limit),
        queryFn: ({ pageParam }) => fetchPokemons(pageParam as number, limit),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined;

            const url = new URL(lastPage.next);
            const offset = url.searchParams.get('offset');

            return offset ? Number(offset) : undefined;
        },
    });
};
