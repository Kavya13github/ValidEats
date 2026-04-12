// src/utils/api.js  —  LIVE backend connections
import axios from 'axios';

// Backend running on port 5000, routes under /api/v1
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000,   // 60s — vision AI can be slow
});

// ─── Product APIs (still local — no backend endpoint needed) ────────────────

export const searchProducts = async (query) => {
  const { products } = await import('../data/products.js');
  const q = query.toLowerCase();
  return products.filter((p) =>
    p.name.toLowerCase().includes(q)
    || p.brand.toLowerCase().includes(q)
    || p.category.toLowerCase().includes(q)
  );
};

export const getProductById = async (id) => {
  const { products } = await import('../data/products.js');
  return products.find((p) => p.id === id);
};

// ─── Rating APIs (local data — AI backend not wired for these yet) ──────────

export const fetchGeneralRating = async (productId, ageGroup) => {
  const { getGeneralRating } = await import('../data/ratings.js');
  return new Promise((resolve) => {
    setTimeout(() => resolve(getGeneralRating(productId, ageGroup)), 1200);
  });
};

export const fetchPersonalizedRating = async (product, userProfile) => {
  const { getPersonalizedRating } = await import('../data/ratings.js');
  return new Promise((resolve) => {
    setTimeout(() => resolve(getPersonalizedRating(product, userProfile)), 1500);
  });
};

// ─── Scan API — REAL backend call ──────────────────────────────────────────

/**
 * Scan image and get AI result from backend
 * Backend: POST /api/v1/scan  (multipart/form-data, field name: "image")
 */
export const scanImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  // Optional: pass user defaults (can be extended later)
  formData.append('age', '20');
  formData.append('disease', 'none');

  const response = await axios.post(`${BASE_URL}/scan`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 90000,  // 90s — vision + AI can take time
  });

  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Scan failed');
  }

  // Map backend response → frontend ScanRatePage format
  return mapScanResponse(response.data.data);
};

/**
 * Map backend scanFood response to the format ScanRatePage expects
 */
function mapScanResponse(data) {
  const report = data.report || {};
  const n      = data.nutrition || {};

  // Overall rating: prefer AI report, fallback to baseScore
  const rawStars = report.overallRating ?? (data.baseScore ? data.baseScore / 20 : 2.5);
  const stars    = Math.min(5, Math.max(1, parseFloat(rawStars.toFixed(1))));

  // Status from stars
  const status = stars >= 4 ? 'safe' : stars >= 2.5 ? 'caution' : 'risk';

  // Verdict
  const verdict =
    report.ratingExplanation ||
    (status === 'safe' ? 'Good Choice' : status === 'risk' ? 'Avoid Regularly' : 'Consume Occasionally');

  // Confidence — use AI rating certainty (just show 88% if not provided)
  const confidence = data.confidence || 88;

  // Pull warning labels from report or backend tags
  const labels = [
    ...(report.warningLabels || []),
    ...(data.tags || []),
  ].filter(Boolean).slice(0, 5);

  // Warnings from report.whyThisRating
  const warnings = (report.whyThisRating || []).filter(Boolean);

  // Positives from report.healthTips (first 3 as positives)
  const positives = (report.healthTips || []).filter(Boolean).slice(0, 3);

  // Healthier alternatives
  const alternatives = (report.healthierAlternatives || ['Whole foods', 'Fresh fruit']).slice(0, 4);

  // Suggestion / bottom line
  const suggestion = report.bottomLine || report.productNote || data.recommendation || 'Review nutritional content before consuming.';

  return {
    detected:   data.product  || 'Unknown Product',
    brand:      data.brand    || 'Unknown Brand',
    confidence,
    stars,
    status,
    verdict,
    suggestion,
    labels,
    warnings,
    positives,
    alternatives,
    // Nutrition in nested {value, unit, per} format for ScanRatePage chips
    nutrition: {
      calories: { value: n.calories   || 0, unit: 'kcal', per: '100g' },
      fat:      { value: n.fat        || 0, unit: 'g',    per: '100g' },
      sugar:    { value: n.sugar      || 0, unit: 'g',    per: '100g' },
      salt:     { value: (n.sodium ? +(n.sodium / 400).toFixed(2) : 0), unit: 'g', per: '100g' },
      protein:  { value: n.protein    || 0, unit: 'g',    per: '100g' },
      fiber:    { value: n.fiber      || 0, unit: 'g',    per: '100g' },
    },
    // Full AI report for any advanced display
    rawReport: report,
  };
}

export default api;
