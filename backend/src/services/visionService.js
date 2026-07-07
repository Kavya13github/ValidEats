const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function detectMimeType(buffer) {
  if (!buffer || buffer.length < 4) return "image/jpeg";
  const b = buffer;

  if (b[0] === 0xFF && b[1] === 0xD8 && b[2] === 0xFF)         return "image/jpeg";
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4E && b[3] === 0x47) return "image/png";
  if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46)         return "image/gif";
  if (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46) return "image/webp";
  return "image/jpeg";
}

function parseJsonSafe(text) {
  if (!text) return null;
  let cleaned = text
    .replace(/```json[\s\S]*?```/g, (m) => m.replace(/```json|```/g, ""))
    .replace(/```[\s\S]*?```/g, (m) => m.replace(/```/g, ""))
    .trim();

  const match = cleaned.match(/\{[\s\S]*\}/);
  if (match) cleaned = match[0];

  return JSON.parse(cleaned);
}

exports.extractNutritionFromImage = async (imageBuffer) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const mimeType = detectMimeType(imageBuffer);
    console.log("🔍 Vision: detected mimeType =", mimeType, "| buffer size =", imageBuffer.length);

    const prompt = `You are a food label reader. Analyze this food product/nutrition label image carefully.

Extract ALL visible information. If a value is not clearly visible, estimate it based on product type.

Return ONLY valid JSON (no markdown, no extra text):
{
  "product": "full product name",
  "brand": "brand name",
  "servingSize": "serving size string or null",
  "calories": <number per 100g>,
  "sugar": <number grams per 100g>,
  "sodium": <number mg per 100g>,
  "fat": <number grams per 100g>,
  "saturatedFat": <number grams per 100g>,
  "transFat": <number grams per 100g>,
  "protein": <number grams per 100g>,
  "carbs": <number grams per 100g>,
  "fiber": <number grams per 100g>,
  "ingredients": ["ingredient1", "ingredient2"],
  "additives": ["additive name (code)"]
}`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType,
              },
            },
            { text: prompt },
          ],
        },
      ],
    });

    const text = result.response.text();
    console.log("✅ Vision raw response:", text.substring(0, 300));

    const parsed = parseJsonSafe(text);
    console.log("✅ Vision parsed:", JSON.stringify(parsed).substring(0, 200));
    return parsed;

  } catch (error) {
    console.error("❌ Vision Error:", error?.message || error);

    return {
      product: "Food Product",
      brand: "Unknown Brand",
      servingSize: null,
      calories: 0, sugar: 0, sodium: 0, fat: 0,
      saturatedFat: 0, transFat: 0, protein: 0,
      carbs: 0, fiber: 0,
      ingredients: [],
      additives: [],
      _visionError: error?.message || "Vision extraction failed",
    };
  }
};
