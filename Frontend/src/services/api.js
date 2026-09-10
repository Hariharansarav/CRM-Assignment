import axios from 'axios';

/**
 * Centralized Axios instance for the Mini Sales CRM frontend.
 * Resolves API URL from VITE_API_URL (or VITE_API_BASE_URL for backward compatibility),
 * and normalizes the path to ensure it cleanly points to the API root without duplicates (/api/api).
 */
const rawUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  '/api';

// Strip trailing slash if present
const trimmedUrl = rawUrl.replace(/\/+$/, '');

// Ensure base URL ends with /api once, avoiding /api/api
const baseURL = trimmedUrl.endsWith('/api') ? trimmedUrl : `${trimmedUrl}/api`;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export default api;
