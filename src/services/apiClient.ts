import axios from 'axios';

// API Client Setup
export const apiClient = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Interceptors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (__DEV__) {
            console.error(
                `[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}:`,
                error.response?.data || error.message
            );
        }

        return Promise.reject(error);
    }
);
