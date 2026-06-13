// Number Formatters
export const formatPokemonWeight = (weightInHectograms: number): number => {
    return weightInHectograms / 10;
};

export const formatPokemonHeight = (heightInDecimeters: number): number => {
    return heightInDecimeters / 10;
};

// String Formatters
export const capitalizeFirstLetter = (text: string): string => {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
