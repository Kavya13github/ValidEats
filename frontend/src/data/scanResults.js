// src/data/scanResults.js
// Dummy scan result — replace with AI API call later

export const dummyScanResult = {
  detected: "Maggi Masala Noodles",
  brand: "Nestlé",
  confidence: 94,
  nutrition: {
    calories: { value: 430, unit: "kcal", per: "100g" },
    fat: { value: 16, unit: "g", per: "100g", saturated: 8 },
    carbs: { value: 62, unit: "g", per: "100g" },
    sugar: { value: 1, unit: "g", per: "100g" },
    protein: { value: 8, unit: "g", per: "100g" },
    salt: { value: 2.5, unit: "g", per: "100g" },
    fiber: { value: 1.5, unit: "g", per: "100g" },
  },
  stars: 2.5,
  verdict: "Consume Occasionally",
  status: "caution",
  warnings: [
    "Very high sodium content (2.5g per 100g)",
    "Refined flour with low fiber",
    "Contains MSG and artificial flavor enhancers",
    "Not a nutritionally complete meal",
  ],
  positives: [
    "Contains some protein (8g per 100g)",
    "Quick energy source",
    "Can be improved by adding vegetables",
  ],
  suggestion:
    "Best consumed occasionally as a quick snack or meal. Add vegetables and reduce the taste-maker usage to lower sodium. Not suitable for daily consumption.",
  labels: ["Processed Food", "High Sodium", "Refined Carbs"],
  alternatives: ["Oats Noodles", "Millet Noodles", "Brown Rice Noodles"],
};

export const scanStages = [
  { id: 1, label: "Reading label...", icon: "📸", duration: 1500 },
  { id: 2, label: "Extracting nutrition data...", icon: "🔬", duration: 2000 },
  { id: 3, label: "Generating health score...", icon: "🧠", duration: 1500 },
  { id: 4, label: "Analysis complete!", icon: "✅", duration: 500 },
];
