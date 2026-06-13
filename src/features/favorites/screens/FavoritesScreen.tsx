import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useFavoritesStore } from '../store/useFavoritesStore';
import { PokemonListItem } from '../../pokemon-list/components/PokemonListItem';
import { RootStackParamList } from '../../../navigation/RootNavigator';

// Types
type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

/**
 * Screen displaying the user's list of favorite Pokémon.
 */
export const FavoritesScreen = ({ navigation }: Props) => {
    const favoriteIds = useFavoritesStore((state) => state.favoriteIds);

    if (favoriteIds.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No favorites yet!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={favoriteIds}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <PokemonListItem
                        name={item}
                        onPress={(name) => navigation.navigate('Details', { pokemonName: name })}
                    />
                )}
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
    },
});
