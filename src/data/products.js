// This file is deprecated - use src/api/products.api.js instead
// Kept for backward compatibility during migration
import { getProducts } from '../api/products.api';

export const products = async () => {
  try {
    const data = await getProducts();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};