import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../features/pokemon-list/screens/HomeScreen';
import { DetailScreen } from '../features/pokemon-details/screens/DetailScreen';
import { FavoritesScreen } from '../features/favorites/screens/FavoritesScreen';
import { DetailHeaderRight } from '../features/pokemon-details/components/DetailHeaderRight';
import { DetailHeaderTitle } from '../features/pokemon-details/components/DetailHeaderTitle';
import { HomeHeaderRight } from '../features/pokemon-list/components/HomeHeaderRight';

export type RootStackParamList = {
    Home: undefined;
    Details: { pokemonName: string };
    Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Main navigation stack for the application.
 */
export const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: { backgroundColor: '#ef5350' },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: { fontWeight: '600' },
                    headerBackTitle: '',
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'Pokédex',
                        headerRight: HomeHeaderRight
                    }}
                />

                <Stack.Screen
                    name="Details"
                    component={DetailScreen}
                    options={({ route }) => ({
                        headerTitle: () => <DetailHeaderTitle pokemonName={route.params.pokemonName} />,
                        headerRight: () => <DetailHeaderRight pokemonName={route.params.pokemonName} />
                    })}
                />

                <Stack.Screen
                    name="Favorites"
                    component={FavoritesScreen}
                    options={{ title: 'My Favorites' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
