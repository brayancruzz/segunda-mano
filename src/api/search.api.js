import { apiClient } from './apiClient';

/**
 * Search products by query
 */
export const searchProducts = async (query) => {
  return apiClient.get(`/search?q=${encodeURIComponent(query)}`);
};

/**
 * Search products by category
 */
export const searchByCategory = async (categoryId) => {
  return apiClient.get(`/search/category/${categoryId}`);
};

/**
 * Search products by location
 */
export const searchByLocation = async (location) => {
  return apiClient.get(`/search/location?loc=${encodeURIComponent(location)}`);
};
