import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { useFavoritesStore } from '../store/useFavoritesStore';

// Types
interface FavoriteToggleIconProps {
    pokemonName: string;
    style?: ViewStyle;
}

// Component
export const FavoriteToggleIcon = ({ pokemonName, style }: FavoriteToggleIconProps) => {
    const isFavorite = useFavoritesStore((state) => state.favoriteIds.includes(pokemonName));
    const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

    return (
        <Pressable
            onPress={() => toggleFavorite(pokemonName)}
            style={[styles.container, style]}
            hitSlop={8}
        >
            <Text style={styles.icon}>{isFavorite ? '❤️' : '🤍'}</Text>
        </Pressable>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 24,
    },
});
