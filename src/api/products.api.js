import { apiClient } from './apiClient';

/**
 * Get all products
 */
export const getProducts = async () => {
  return apiClient.get('/products');
};

/**
 * Get a single product by ID
 */
export const getProductById = async (id) => {
  return apiClient.get(`/products/${id}`);
};

/**
 * Create a new product
 */
export const createProduct = async (productData) => {
  return apiClient.post('/products', productData);
};

/**
 * Update a product by ID
 */
export const updateProduct = async (id, productData) => {
  return apiClient.put(`/products/${id}`, productData);
};

/**
 * Delete a product by ID
 */
export const deleteProduct = async (id) => {
  return apiClient.delete(`/products/${id}`);
};

/**
 * Get user's own products
 */
export const getUserProducts = async () => {
  return apiClient.get('/products/me');
};
