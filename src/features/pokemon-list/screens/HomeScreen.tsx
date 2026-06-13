import React, { useMemo, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useGetPokemons } from '../api/useGetPokemons';
import { PokemonListItem } from '../components/PokemonListItem';
import { SearchBar } from '../components/SearchBar';
import { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

/**
 * Main screen displaying a searchable, paginated list of Pokémon.
 */
export const HomeScreen = ({ navigation }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetPokemons();

    const flattenedData = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap((page) => page.results);
    }, [data]);

    const filteredData = useMemo(() => {
        if (!searchQuery) return flattenedData;
        return flattenedData.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [flattenedData, searchQuery]);

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#ef5350" />
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Failed to load Pokédex.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search loaded Pokémon..."
                onClear={() => setSearchQuery('')}
            />

            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <PokemonListItem
                        name={item.name}
                        onPress={(name) => navigation.navigate('Details', { pokemonName: name })}
                    />
                )}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (hasNextPage && !isFetchingNextPage && !searchQuery) {
                        fetchNextPage();
                    }
                }}
                ListFooterComponent={
                    isFetchingNextPage && !searchQuery ? (
                        <ActivityIndicator size="small" color="#ef5350" style={styles.footerSpinner} />
                    ) : null
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    errorText: {
        fontSize: 16,
        color: '#d32f2f',
    },
    footerSpinner: {
        marginVertical: 20,
    },
});
