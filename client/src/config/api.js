/**
 * Central API configuration
 * In local development, defaults to http://localhost:5000 if VITE_API_BASE_URL is not set.
 * In production (single Vercel deployment), defaults to '' (same-origin relative URL)
 * unless explicitly overridden via VITE_API_BASE_URL.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL !== undefined
  ? import.meta.env.VITE_API_BASE_URL
  : (import.meta.env.DEV ? 'http://localhost:5000' : '');
