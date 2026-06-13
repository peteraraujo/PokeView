import React from 'react';
import { Text, StyleSheet } from 'react-native';

/**
 * Header title component displaying the formatted Pokémon name.
 */
export const DetailHeaderTitle = ({ pokemonName }: { pokemonName: string }) => {
    const formattedTitle = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    return <Text style={styles.title}>{formattedTitle}</Text>;
};

const styles = StyleSheet.create({
    title: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
});
