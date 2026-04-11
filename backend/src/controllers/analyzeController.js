const { calculateScore } = require("../utils/scoring");
const { getHealthTags } = require("../utils/healthTags");
const { generateAIResponse, generateScanReport } = require("../services/aiService");
const { getVerdict, getRecommendation } = require("../utils/verdict");
const { extractNutritionFromImage } = require("../services/visionService");

const Food = require("../models/Food");

exports.analyzeFood = async (req, res) => {
  try {
    const { product, nutrition, user } = req.body;

    if (!product || !nutrition || !user) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const baseScore = calculateScore(nutrition);
    const tags = getHealthTags(nutrition);
    const verdict = getVerdict(baseScore);
    const recommendation = getRecommendation(baseScore);

    // 🔥 Gemini AI Call
    let aiData = null;

    if (process.env.GEMINI_API_KEY) {
      const aiRaw = await generateAIResponse(
        product,
        nutrition,
        user,
        baseScore
      );

      try {
  let cleaned = aiRaw;

  // remove ```json and ```
  cleaned = cleaned.replace(/```json/g, "");
  cleaned = cleaned.replace(/```/g, "");
  cleaned = cleaned.trim();

  aiData = JSON.parse(cleaned);

} catch (err) {
  console.log("PARSE ERROR:", aiRaw);
  aiData = { raw: aiRaw };
}
    }

    res.json({
  success: true,
  data: {
    product,
    
    rating: {
      score: baseScore,
      verdict,
      recommendation
    },

    health: {
      tags
    },

    analysis: aiData
  }
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

exports.scanFood = async (req, res) => {
  try {
    const image = req.file;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded"
      });
    }

    // 🔥 Step 1: Extract from image (enhanced — gets ingredients too)
    const visionData = await extractNutritionFromImage(image.buffer);

    if (!visionData) {
      return res.status(500).json({
        success: false,
        message: "Failed to extract nutrition from image"
      });
    }

    // User info (from FormData or defaults)
    const user = {
      age: req.body.age ? parseInt(req.body.age) : 20,
      disease: req.body.disease || "none"
    };

    // 🔥 Step 2: Base scoring
    const nutrition = {
      calories: visionData.calories || 0,
      sugar: visionData.sugar || 0,
      sodium: visionData.sodium || 0,
      fat: visionData.fat || 0
    };

    const baseScore = calculateScore(nutrition);
    const tags = getHealthTags(nutrition);
    const verdict = getVerdict(baseScore);
    const recommendation = getRecommendation(baseScore);

    // 🔥 Step 3: Comprehensive AI Report
    const aiRaw = await generateScanReport(visionData, user);

    let report = null;
    try {
      let cleaned = aiRaw.replace(/```json|```/g, "").trim();
      report = JSON.parse(cleaned);
    } catch (err) {
      console.log("SCAN REPORT PARSE ERROR:", aiRaw);
      report = { raw: aiRaw };
    }

    res.json({
      success: true,
      data: {
        product: visionData.product || "Unknown Product",
        brand: visionData.brand || "Unknown",
        nutrition: {
          calories: visionData.calories || 0,
          sugar: visionData.sugar || 0,
          sodium: visionData.sodium || 0,
          fat: visionData.fat || 0,
          saturatedFat: visionData.saturatedFat || 0,
          transFat: visionData.transFat || 0,
          protein: visionData.protein || 0,
          carbs: visionData.carbs || 0,
          fiber: visionData.fiber || 0
        },
        ingredients: visionData.ingredients || [],
        additives: visionData.additives || [],
        baseScore,
        tags,
        verdict,
        recommendation,
        report
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Scan failed"
    });
  }
};