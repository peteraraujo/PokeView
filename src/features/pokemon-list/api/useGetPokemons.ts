import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../services/apiClient';

// Types
export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types: Array<{ type: { name: string } }>;
}

export interface FormattedPokemonDetails extends PokemonDetails {
    displayWeight: number;
    displayHeight: number;
    formattedName: string;
}

// Query Keys
export const pokemonKeys = {
    all: ['pokemon'] as const,
    detail: (name: string) => [...pokemonKeys.all, name] as const,
};

// API Call
const fetchPokemonDetails = async (name: string): Promise<PokemonDetails> => {
    const { data } = await apiClient.get(`/pokemon/${name}`);
    return data;
};

// Hook
export const useGetPokemonDetails = (name: string) => {
    return useQuery({
        queryKey: pokemonKeys.detail(name),
        queryFn: () => fetchPokemonDetails(name),
        enabled: !!name,
        staleTime: Infinity,
        select: (data): FormattedPokemonDetails => ({
            ...data,
            displayWeight: data.weight / 10,
            displayHeight: data.height / 10,
            formattedName: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        }),
    });
};
