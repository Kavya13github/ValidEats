// src/utils/api.js
// API utility — ready for backend integration
// When backend is ready, uncomment the fetch calls and remove dummy data imports

import axios from 'axios';

// Base URL — change this when backend is ready
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// ─── Product APIs ─────────────────────────────────────────────────────────────

/**
 * Search products by name
 * Usage: await searchProducts("lays")
 */
export const searchProducts = async (query) => {
  // TODO: Replace with real API call
  // const response = await api.get(`/products/search?q=${query}`);
  // return response.data;

  // Dummy: filter from local data
  const { products } = await import('../data/products.js');
  return products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
};

/**
 * Get product by ID
 */
export const getProductById = async (id) => {
  // TODO: const response = await api.get(`/products/${id}`);
  const { products } = await import('../data/products.js');
  return products.find((p) => p.id === id);
};

// ─── Rating APIs ──────────────────────────────────────────────────────────────

/**
 * Get general product rating for age group
 * Usage: await getGeneralRating(productId, ageGroup)
 */
export const fetchGeneralRating = async (productId, ageGroup) => {
  // TODO: const response = await api.post('/ratings/general', { productId, ageGroup });
  const { getGeneralRating } = await import('../data/ratings.js');
  return new Promise((resolve) => {
    setTimeout(() => resolve(getGeneralRating(productId, ageGroup)), 1200);
  });
};

/**
 * Get personalized product rating
 * Usage: await fetchPersonalizedRating(product, userProfile)
 */
export const fetchPersonalizedRating = async (product, userProfile) => {
  // TODO: const response = await api.post('/ratings/personalized', { product, userProfile });
  const { getPersonalizedRating } = await import('../data/ratings.js');
  return new Promise((resolve) => {
    setTimeout(() => resolve(getPersonalizedRating(product, userProfile)), 1500);
  });
};

// ─── Scan API ─────────────────────────────────────────────────────────────────

/**
 * Scan image and get AI result
 * Usage: await scanImage(imageFile)
 */
export const scanImage = async (imageFile) => {
  // TODO: Real implementation:
  // const formData = new FormData();
  // formData.append('image', imageFile);
  // const response = await api.post('/scan', formData, {
  //   headers: { 'Content-Type': 'multipart/form-data' },
  // });
  // return response.data;

  // Dummy implementation
  const { dummyScanResult } = await import('../data/scanResults.js');
  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyScanResult), 5000);
  });
};

export default api;
