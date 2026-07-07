const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  nutrition: {
    calories: Number,
    sugar: Number,
    sodium: Number,
    fat: Number,
    additives: String
  },
  user: {
    age: Number,
    disease: String
  },
  baseScore: Number,
  aiResponse: String
}, { timestamps: true });

module.exports = mongoose.model("Food", foodSchema);
