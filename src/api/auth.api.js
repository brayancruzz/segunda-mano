import { apiClient } from './apiClient';

/**
 * Login with email and password
 * Returns token and user data
 */
export const loginUser = async (email, password) => {
  return apiClient.post('/auth/login', { email, password });
};

/**
 * Register a new user
 * Returns token and user data
 */
export const registerUser = async (userData) => {
  return apiClient.post('/auth/register', userData);
};

/**
 * Get current authenticated user
 * Requires valid token in Authorization header
 */
export const getCurrentUser = async () => {
  return apiClient.get('/auth/me');
};

/**
 * Logout (backend endpoint if needed)
 */
export const logoutUser = async () => {
  try {
    return await apiClient.post('/auth/logout', {});
  } catch (error) {
    // Logout is often OK to fail on frontend, we just clear token
    console.warn('Logout error:', error);
    return { success: true };
  }
};
