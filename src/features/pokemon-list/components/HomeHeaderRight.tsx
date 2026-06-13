import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/RootNavigator';

/**
 * Navigation button displayed on the right side of the Home header.
 */
export const HomeHeaderRight = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <Pressable
            onPress={() => navigation.navigate('Favorites')}
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed,
            ]}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Go to Favorites"
        >
            <Text style={styles.text}>Favs</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    pressed: {
        opacity: 0.7,
    },
    text: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});
