import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProvider } from './src/providers/AppProvider';
import { RootNavigator } from './src/navigation/RootNavigator';

// Component
function App() {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaProvider>
            <AppProvider>
                <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    backgroundColor="#ef5350"
                />
                <RootNavigator />
            </AppProvider>
        </SafeAreaProvider>
    );
}

export default App;
