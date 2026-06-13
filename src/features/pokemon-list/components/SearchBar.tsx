import React from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';

// Types
interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    onClear?: () => void;
}

/**
 * Reusable search input component with a clear button.
 */
export const SearchBar = ({
                              value,
                              onChangeText,
                              placeholder = 'Search...',
                              onClear
                          }: SearchBarProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#999"
                autoCorrect={false}
                autoCapitalize="none"
            />
            {value.length > 0 && (
                <Pressable onPress={onClear} style={styles.clearButton} hitSlop={8}>
                    <Text style={styles.clearText}>✕</Text>
                </Pressable>
            )}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginHorizontal: 20,
        marginVertical: 12,
        height: 48,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333333',
        height: '100%',
    },
    clearButton: {
        padding: 4,
        marginLeft: 8,
    },
    clearText: {
        fontSize: 16,
        color: '#999',
        fontWeight: 'bold',
    },
});
