const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.extractNutritionFromImage = async (imageBuffer) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Analyze this food product/label image thoroughly.

Extract ALL available information including ingredients and nutrition.

Return ONLY JSON:

{
  "product": "full product name",
  "brand": "brand name if visible",
  "servingSize": "serving size if visible",
  "calories": number (per 100g, estimate if needed),
  "sugar": number (grams per 100g),
  "sodium": number (mg per 100g),
  "fat": number (grams total fat per 100g),
  "saturatedFat": number (grams per 100g),
  "transFat": number (grams per 100g),
  "protein": number (grams per 100g),
  "carbs": number (grams per 100g),
  "fiber": number (grams per 100g),
  "ingredients": ["ingredient1", "ingredient2", "..."],
  "additives": ["additive name (INS code if visible)", "..."]
}

If any value is not visible, estimate based on the product type or use 0.
Extract as many ingredients as you can see on the label.
`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType: "image/jpeg"
        }
      },
      prompt
    ]);

    const text = result.response.text();

    let cleaned = text.replace(/```json|```/g, "").trim();

    return JSON.parse(cleaned);

  } catch (error) {
    console.error("Vision Error:", error);
    return null;
  }
};