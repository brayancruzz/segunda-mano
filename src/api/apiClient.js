const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

/**
 * Get the authorization token from localStorage
 */
const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Get headers with Authorization token if it exists
 */
const getHeaders = (customHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Parse error response from backend
 */
const parseErrorResponse = async (response) => {
  let errorMessage = `HTTP ${response.status}`;
  
  try {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const error = await response.json();
      errorMessage = error.message || error.error || errorMessage;
    } else {
      const text = await response.text();
      errorMessage = text || errorMessage;
    }
  } catch (e) {
    // If parsing fails, use the status code
    console.warn('Could not parse error response:', e);
  }
  
  return errorMessage;
};

/**
 * Base API client for all HTTP requests
 * Automatically handles Authorization header and error responses
 */
export const apiClient = {
  /**
   * GET request
   */
  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: getHeaders(),
      });

      if (!response.ok) {
        const errorMessage = await parseErrorResponse(response);
        console.error(`GET ${endpoint} failed:`, errorMessage);
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error(`GET ${endpoint}:`, error);
      throw error;
    }
  },

  /**
   * POST request
   */
  async post(endpoint, data = {}) {
    try {
      console.log(`POST ${endpoint}:`, data);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await parseErrorResponse(response);
        console.error(`POST ${endpoint} failed:`, errorMessage);
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error(`POST ${endpoint}:`, error);
      throw error;
    }
  },

  /**
   * PUT request
   */
  async put(endpoint, data = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await parseErrorResponse(response);
        console.error(`PUT ${endpoint} failed:`, errorMessage);
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error(`PUT ${endpoint}:`, error);
      throw error;
    }
  },

  /**
   * DELETE request
   */
  async delete(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });

      if (!response.ok) {
        const errorMessage = await parseErrorResponse(response);
        console.error(`DELETE ${endpoint} failed:`, errorMessage);
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error(`DELETE ${endpoint}:`, error);
      throw error;
    }
  },
};

/**
 * Get the base URL (useful for debugging)
 */
export const getApiBaseUrl = () => API_BASE_URL;

/**
 * Clear authentication (for logout)
 */
export const clearAuth = () => {
  localStorage.removeItem('token');
};
