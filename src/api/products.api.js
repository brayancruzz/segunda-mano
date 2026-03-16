import { apiClient } from './apiClient';

export const getProducts = async () => {
  return apiClient.get('/products');
};

export const getProductById = async (id) => {
  return apiClient.get(`/products/${id}`);
};

export const createProduct = async (productData) => {
  return apiClient.post('/products', productData);
};

export const updateProduct = async (id, productData) => {
  return apiClient.put(`/products/${id}`, productData);
};

export const deleteProduct = async (id) => {
  return apiClient.delete(`/products/${id}`);
};

export const getUserProducts = async () => {
  return apiClient.get('/products/me');
};

export const getMyProducts = async () => {
  return apiClient.get('/products/mine');
};
