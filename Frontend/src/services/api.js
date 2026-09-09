import axios from 'axios';

/**
 * Centralized Axios instance for the Mini Sales CRM frontend.
 * Pre-configured with base URL from environment variables.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
