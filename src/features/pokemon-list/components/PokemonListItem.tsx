import React, { memo } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { FavoriteToggleIcon } from '../../favorites/components/FavoriteToggleIcon';

interface Props {
    name: string;
    onPress: (pokemonName: string) => void;
}

const ListItem = ({ name, onPress }: Props) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed
            ]}
            onPress={() => onPress(name)}
        >
            <Text style={styles.title}>{name}</Text>
            <FavoriteToggleIcon pokemonName={name} />
        </Pressable>
    );
};

/**
 * List item displaying a Pokémon's name and favorite toggle.
 */
export const PokemonListItem = memo(ListItem);

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e0e0e0',
    },
    cardPressed: {
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 18,
        textTransform: 'capitalize',
        fontWeight: '500',
        color: '#333333',
    },
});
