import React from 'react';
import { FavoriteToggleIcon } from '../../favorites/components/FavoriteToggleIcon';

/**
 * Header right component containing the favorite toggle.
 */
export const DetailHeaderRight = ({ pokemonName }: { pokemonName: string }) => {
    return <FavoriteToggleIcon pokemonName={pokemonName} />;
};
