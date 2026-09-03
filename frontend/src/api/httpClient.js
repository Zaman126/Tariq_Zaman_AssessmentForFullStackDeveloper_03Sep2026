import axios from 'axios';

// Centralized axios instance so the base URL and error shape only live in one place.
export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Unexpected error while calling the API';
    return Promise.reject(new Error(message));
  },
);
