import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useGetPokemonDetails } from '../api/useGetPokemonDetails';
import { RootStackParamList } from '../../../navigation/RootNavigator';

// Types
type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

// Component
export const DetailScreen = ({ route }: Props) => {
    const { pokemonName } = route.params;
    const { data, isLoading, isError } = useGetPokemonDetails(pokemonName);

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#ef5350" />
            </View>
        );
    }

    if (isError || !data) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Failed to load Pokémon details.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: data.sprites.other['official-artwork'].front_default }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.statsContainer}>
                <Text style={styles.name}>{data.formattedName}</Text>

                <View style={styles.typesRow}>
                    {data.types.map((t) => (
                        <View key={t.type.name} style={styles.typeBadge}>
                            <Text style={styles.typeText}>{t.type.name}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.measurements}>
                    <Text style={styles.statText}>Weight: {data.displayWeight} kg</Text>
                    <Text style={styles.statText}>Height: {data.displayHeight} m</Text>
                </View>
            </View>
        </ScrollView>
    );
};

// Styles
const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    imageContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    image: {
        width: 200,
        height: 200,
    },
    statsContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    typesRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    typeBadge: {
        backgroundColor: '#ef5350',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    typeText: {
        color: '#fff',
        fontWeight: '600',
        textTransform: 'uppercase',
        fontSize: 12,
    },
    measurements: {
        flexDirection: 'row',
        gap: 20,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        justifyContent: 'space-around',
    },
    statText: {
        fontSize: 16,
        color: '#555',
        fontWeight: '500',
    },
    errorText: {
        fontSize: 16,
        color: '#d32f2f',
    },
});
