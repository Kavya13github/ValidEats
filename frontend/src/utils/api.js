// src/utils/api.js
// API utility — connected to backend

import axios from 'axios';

// Base URL — uses Vite proxy in dev, env variable in production
const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000, // 30s for AI calls
});

// ─── Response Transformers ────────────────────────────────────────────────────

/**
 * Transform backend analyze response → frontend rating format
 * Backend: { success, data: { product, rating: { score, verdict, recommendation }, health: { tags }, analysis: { ... } } }
 * Frontend expects: { stars, verdict, explanation, warnings, positives, frequency_label, notes }
 */
const transformAnalyzeToRating = (backendData) => {
  const { rating, health, analysis } = backendData;

  // Build warnings from health tags + AI data
  const warnings = [];
  const positives = [];
  const notes = [];

  if (health?.tags?.length) {
    health.tags.forEach((tag) => warnings.push(tag));
  }

  if (analysis) {
    // AI-generated ingredient risks
    if (analysis.ingredientAnalysis) {
      analysis.ingredientAnalysis.forEach((ing) => {
        if (ing.risk === 'high') warnings.push(`${ing.name}: ${ing.impact}`);
        else if (ing.risk === 'medium') warnings.push(`${ing.name}: ${ing.impact}`);
        else positives.push(`${ing.name}: ${ing.impact}`);
      });
    }

    // Health impact points
    if (analysis.healthImpact) {
      analysis.healthImpact.forEach((point) => warnings.push(point));
    }

    // Why low rating reasons
    if (analysis.whyLowRating) {
      analysis.whyLowRating.forEach((reason) => notes.push(reason));
    }

    // Tips as positives
    if (analysis.tips) {
      analysis.tips.forEach((tip) => positives.push(`💡 ${tip}`));
    }
  }

  return {
    stars: analysis?.personalizedRating || analysis?.generalRating || rating?.score || 2.5,
    verdict: rating?.verdict || 'Analysis complete',
    explanation: analysis?.summary || rating?.recommendation || '',
    warnings,
    positives,
    notes,
    frequency_label: rating?.recommendation || '',
  };
};

/**
 * Transform backend scan response → frontend scan result format
 * Backend now returns a comprehensive report from Gemini AI
 */
const transformScanToResult = (backendData) => {
  if (!backendData) return dummyScanResult;

  const { product, brand, nutrition, ingredients, additives, baseScore, tags, verdict, recommendation, report } = backendData;

  const stars = report?.overallRating || baseScore || 2.5;
  const status = stars >= 4 ? 'safe' : stars >= 2.5 ? 'caution' : 'risk';

  return {
    detected: product || 'Unknown Product',
    brand: brand || 'Detected by AI',
    confidence: 92,
    stars,
    status,
    verdict: verdict || 'Analysis complete',

    // Rich report data
    ratingExplanation: report?.ratingExplanation || '',
    productNote: report?.productNote || '',
    ingredientBreakdown: report?.ingredientBreakdown || [],
    nutritionAnalysis: report?.nutritionAnalysis || {},
    whyThisRating: report?.whyThisRating || [],
    healthTips: report?.healthTips || [],
    bottomLine: report?.bottomLine || recommendation || '',
    alternatives: report?.healthierAlternatives || [],

    // Nutrition values (extracted from image)
    nutrition: {
      calories: { value: nutrition?.calories || 0, unit: 'kcal' },
      fat: { value: nutrition?.fat || 0, unit: 'g' },
      saturatedFat: { value: nutrition?.saturatedFat || 0, unit: 'g' },
      transFat: { value: nutrition?.transFat || 0, unit: 'g' },
      sugar: { value: nutrition?.sugar || 0, unit: 'g' },
      sodium: { value: nutrition?.sodium || 0, unit: 'mg' },
      protein: { value: nutrition?.protein || 0, unit: 'g' },
      carbs: { value: nutrition?.carbs || 0, unit: 'g' },
      fiber: { value: nutrition?.fiber || 0, unit: 'g' },
    },

    // Tags and labels
    labels: report?.warningLabels || tags || [],
    ingredients: ingredients || [],
    additives: additives || [],

    // Legacy fields for backward compat
    warnings: report?.warningLabels || tags || [],
    positives: [],
    suggestion: report?.bottomLine || recommendation || '',
  };
};

// ─── Product APIs ─────────────────────────────────────────────────────────────

/**
 * Search products by name (local data — no backend API for this)
 */
export const searchProducts = async (query) => {
  const { products } = await import('../data/products.js');
  return products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
};

/**
 * Get product by ID (local data)
 */
export const getProductById = async (id) => {
  const { products } = await import('../data/products.js');
  return products.find((p) => p.id === id);
};

// ─── Rating APIs ──────────────────────────────────────────────────────────────

/**
 * Get general product rating for age group
 * Sends product nutrition to backend → Gemini AI analysis
 */
export const fetchGeneralRating = async (productId, ageGroup) => {
  const { products } = await import('../data/products.js');
  const product = products.find((p) => p.id === productId);

  if (!product) throw new Error('Product not found');

  // Map ageGroup to approximate age for backend
  const ageMap = { kids: 10, teens: 16, adults: 30, seniors: 55 };
  const age = ageMap[ageGroup] || 25;

  try {
    const response = await api.post('/analyze', {
      product: product.name,
      nutrition: {
        calories: product.nutrition.calories,
        sugar: product.nutrition.sugar,
        sodium: product.nutrition.salt * 1000, // convert g → mg for backend
        fat: product.nutrition.fat,
      },
      user: {
        age,
        disease: 'none',
      },
    });

    if (response.data.success) {
      return transformAnalyzeToRating(response.data.data);
    }
    throw new Error(response.data.message || 'Analysis failed');
  } catch (error) {
    console.error('General rating API error:', error);
    // Fallback to local rating data
    const { getGeneralRating } = await import('../data/ratings.js');
    return getGeneralRating(productId, ageGroup);
  }
};

/**
 * Get personalized product rating
 * Sends product nutrition + user health profile to backend → Gemini AI analysis
 */
export const fetchPersonalizedRating = async (product, userProfile) => {
  const { age, healthCondition, frequency } = userProfile;

  // Map health condition to disease string for backend
  const diseaseMap = {
    none: 'none',
    diabetes: 'diabetes',
    bp: 'high blood pressure',
    obesity: 'obesity',
    heart: 'heart disease',
    fitness: 'fitness goals',
  };

  try {
    const response = await api.post('/analyze', {
      product: product.name,
      nutrition: {
        calories: product.nutrition.calories,
        sugar: product.nutrition.sugar,
        sodium: product.nutrition.salt * 1000, // convert g → mg for backend
        fat: product.nutrition.fat,
      },
      user: {
        age: age || 25,
        disease: diseaseMap[healthCondition] || healthCondition || 'none',
      },
    });

    if (response.data.success) {
      return transformAnalyzeToRating(response.data.data);
    }
    throw new Error(response.data.message || 'Analysis failed');
  } catch (error) {
    console.error('Personalized rating API error:', error);
    // Fallback to local rating logic
    const { getPersonalizedRating } = await import('../data/ratings.js');
    return getPersonalizedRating(product, userProfile);
  }
};

// ─── Scan API ─────────────────────────────────────────────────────────────────

/**
 * Scan image and get AI result
 * Sends image to backend → Gemini Vision → AI analysis
 */
export const scanImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await api.post('/scan', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000, // 60s for vision + analysis
    });

    if (response.data.success) {
      return transformScanToResult(response.data.data);
    }
    throw new Error(response.data.message || 'Scan failed');
  } catch (error) {
    console.error('Scan API error:', error);
    // Fallback to dummy scan result
    const { dummyScanResult } = await import('../data/scanResults.js');
    return new Promise((resolve) => {
      setTimeout(() => resolve(dummyScanResult), 2000);
    });
  }
};

export default api;
