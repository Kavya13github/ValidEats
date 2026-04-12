const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ═══════════════════════════════════════════
// Used by POST /api/v1/analyze (manual input)
// ═══════════════════════════════════════════
exports.generateAIResponse = async (product, nutrition, user, baseScore) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a professional nutrition analyst.

Analyze this food product.

Product: ${product}
Base Score: ${baseScore}/5

Nutrition:
Calories: ${nutrition.calories}
Sugar: ${nutrition.sugar}
Sodium: ${nutrition.sodium}
Fat: ${nutrition.fat}

User:
Age: ${user.age}
Condition: ${user.disease}

⚠️ CRITICAL RULE: Keep EVERY text field to 7-8 words MAXIMUM. Be ultra-concise. No long sentences.

Return ONLY JSON:

{
  "generalRating": number,
  "personalizedRating": number,

  "ingredientAnalysis": [
    {
      "name": "ingredient name",
      "impact": "max 7-8 words impact",
      "risk": "low/medium/high"
    }
  ],
 
  "healthImpact": [
    "max 7-8 words each",
    "short crisp points only"
  ],

  "whyLowRating": [
    "max 7-8 words each",
    "short reason"
  ],

  "tips": [
    "max 7-8 words each",
    "short actionable tip"
  ],

  "summary": "max 12-15 words conclusion"
}

EXAMPLES of correct length:
- "High sodium may spike blood pressure"
- "Pair with fruits for better nutrition"
- "Contains excessive refined sugar content"
- "Not suitable for daily consumption"
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log("AI RAW RESPONSE:", text);

    return text;

  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

// ═══════════════════════════════════════════
// Used by POST /api/v1/scan (image scan)
// Generates a COMPREHENSIVE but CONCISE report
// ═══════════════════════════════════════════
exports.generateScanReport = async (productData, user) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const ingredientsList = (productData.ingredients || []).join(", ") || "Not available";
    const additivesList = (productData.additives || []).join(", ") || "None detected";

    const prompt = `
You are a professional food health analyst.

Product: ${productData.product || "Unknown"}
Brand: ${productData.brand || "Unknown"}

Nutrition (per 100g):
- Calories: ${productData.calories || 0} kcal
- Total Fat: ${productData.fat || 0}g (Saturated: ${productData.saturatedFat || 0}g, Trans: ${productData.transFat || 0}g)
- Carbohydrates: ${productData.carbs || 0}g
- Sugar: ${productData.sugar || 0}g
- Protein: ${productData.protein || 0}g
- Sodium: ${productData.sodium || 0}mg
- Fiber: ${productData.fiber || 0}g

Ingredients: ${ingredientsList}
Additives: ${additivesList}

Target User: Age ${user.age}, Condition: ${user.disease}

⚠️ CRITICAL RULE: Keep EVERY text field to 7-8 words MAXIMUM. Be ultra-concise. No long sentences anywhere.

Return ONLY JSON:

{
  "overallRating": number (1-5, decimals allowed),
  "ratingExplanation": "max 8-10 words",
  "productNote": "max 15 words about the product",

  "ingredientBreakdown": [
    {
      "name": "Ingredient",
      "purpose": "2-3 words (e.g. Main Ingredient, Flavor, Preservative)",
      "healthImpact": "max 7-8 words",
      "risk": "low/medium/high"
    }
  ],

  "nutritionAnalysis": {
    "calories": { "verdict": "High/Moderate/Low", "note": "max 6 words" },
    "fat": { "verdict": "High/Moderate/Low", "note": "max 6 words" },
    "sugar": { "verdict": "High/Moderate/Low", "note": "max 6 words" },
    "sodium": { "verdict": "High/Moderate/Low", "note": "max 6 words" },
    "protein": { "verdict": "High/Moderate/Low", "note": "max 6 words" },
    "fiber": { "verdict": "High/Moderate/Low", "note": "max 6 words" }
  },

  "whyThisRating": [
    "max 7-8 words per reason"
  ],

  "healthTips": [
    "max 7-8 words per tip"
  ],

  "bottomLine": "max 20-25 words total summary",

  "warningLabels": ["short tag", "short tag"],

  "healthierAlternatives": ["alt 1", "alt 2", "alt 3"]
}

EXAMPLES of correct length:
- healthImpact: "May raise cholesterol if eaten often"
- whyThisRating: "Too much sodium for daily intake"
- healthTips: "Pair with salad for balanced meal"
- note: "Exceeds daily recommended limit"
- productNote: "Ultra-processed snack with minimal nutritional value"
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log("SCAN REPORT RAW:", text);

    return text;

  } catch (error) {
    console.error("Scan Report AI Error:", error);
    return null;
  }
};