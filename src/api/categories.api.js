import { apiClient } from './apiClient';

/**
 * Get all categories
 */
export const getCategories = async () => {
  return apiClient.get('/categories');
};

/**
 * Get a single category by ID
 */
export const getCategoryById = async (id) => {
  return apiClient.get(`/categories/${id}`);
};

/**
 * Get products by category
 */
export const getProductsByCategory = async (categoryId) => {
  return apiClient.get(`/categories/${categoryId}/products`);
};
