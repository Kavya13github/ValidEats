export const getStatusFromStars = (stars) => {
  if (stars >= 4) return { label: "Safe", color: "safe", emoji: "✅" };
  if (stars >= 2.5) return { label: "Moderate", color: "caution", emoji: "⚠️" };
  return { label: "Risky", color: "risk", emoji: "🚫" };
};

export const generalRatings = {
  "1_kids": { stars: 1.5, verdict: "Not recommended for kids", frequency: "Avoid", explanation: "Lays are high in salt, fat, and have artificial flavors. For growing kids, these spike sodium intake and can harm developing kidneys and cause unhealthy snacking habits.", warnings: ["Very high sodium", "High saturated fat", "Artificial flavors", "No nutritional value"], positives: ["Tasty treat occasionally"], frequency_label: "Avoid or very rarely" },
  "1_teens": { stars: 2, verdict: "Consume sparingly", frequency: "Rarely", explanation: "Teens can handle Lays occasionally, but the high fat and salt content makes it a poor regular snack choice. It contributes to weight gain and poor diet patterns.", warnings: ["High salt", "High fat", "Low nutritional value"], positives: ["Okay as an occasional treat"], frequency_label: "Once a month" },
  "1_adults": { stars: 2, verdict: "Enjoy rarely", frequency: "Rarely", explanation: "Lays are a processed snack with high sodium and fat. For adults, occasional consumption is okay but regular eating increases cardiovascular risk.", warnings: ["High sodium", "Saturated fat"], positives: ["Low sugar", "Portion control is possible"], frequency_label: "Once a month" },
  "1_seniors": { stars: 1, verdict: "Best avoided for seniors", frequency: "Avoid", explanation: "Seniors are more sensitive to sodium and fat. High sodium in Lays can worsen blood pressure and put stress on the heart and kidneys.", warnings: ["Very high sodium", "Cardiovascular risk", "No fiber"], positives: [], frequency_label: "Avoid" },

  "2_kids": { stars: 1, verdict: "Avoid for children", frequency: "Avoid", explanation: "Kurkure contains artificial colors, high salt, and spices that are not suitable for children. Linked to hyperactivity and digestive issues in kids.", warnings: ["Artificial colors", "Extreme spice", "Very high salt", "No nutrients"], positives: ["Fun snack rarely"], frequency_label: "Avoid" },
  "2_teens": { stars: 1.5, verdict: "Very occasional only", frequency: "Rarely", explanation: "Kurkure's high sodium and artificial additives make it a poor choice for teens who snack regularly.", warnings: ["High sodium", "Artificial flavors", "High fat"], positives: ["Occasional snack"], frequency_label: "Rarely" },
  "2_adults": { stars: 2, verdict: "Occasional treat", frequency: "Rarely", explanation: "Adults can enjoy Kurkure very occasionally, but it's high in sodium and processed ingredients.", warnings: ["High salt", "Artificial colors"], positives: ["Low sugar"], frequency_label: "Once a month" },
  "2_seniors": { stars: 1, verdict: "Not recommended", frequency: "Avoid", explanation: "Too spicy and salty for seniors with age-related health concerns.", warnings: ["High salt", "Spice-related BP risk", "Artificial additives"], positives: [], frequency_label: "Avoid" },

  "3_kids": { stars: 2, verdict: "Limit frequency", frequency: "Rarely", explanation: "Maggi noodles have high sodium and MSG. For kids, occasional consumption is fine but it shouldn't be a regular meal replacement.", warnings: ["High sodium (MSG)", "Refined flour", "Low fiber"], positives: ["Quick energy", "Kids enjoy it"], frequency_label: "Once a week max" },
  "3_teens": { stars: 2.5, verdict: "Okay occasionally", frequency: "Occasionally", explanation: "Teens can have Maggi occasionally. Adding vegetables helps improve nutrition. The main concern is high sodium.", warnings: ["High sodium", "Low protein"], positives: ["Quick meal", "Affordable", "Can add veggies"], frequency_label: "2-3 times a month" },
  "3_adults": { stars: 2.5, verdict: "Occasional meal option", frequency: "Occasionally", explanation: "Maggi is a convenient meal but shouldn't replace proper nutrition. High sodium is the main concern for adults.", warnings: ["High sodium", "Refined carbs"], positives: ["Quick meal", "Affordable", "Add protein/veggies to improve"], frequency_label: "Occasionally" },
  "3_seniors": { stars: 1.5, verdict: "Health concern for seniors", frequency: "Rarely", explanation: "High sodium content in Maggi poses risks for seniors, especially those with blood pressure or kidney issues.", warnings: ["Very high sodium", "Refined flour", "Low fiber"], positives: ["Easy to make"], frequency_label: "Rarely and with low-sodium version" },

  "4_kids": { stars: 2, verdict: "Sweet treat, limit it", frequency: "Occasionally", explanation: "Oreos are high in sugar, which can cause tooth decay and blood sugar spikes in children. Occasional treats are fine.", warnings: ["Very high sugar", "Processed fat", "Low nutrients"], positives: ["Kids love it", "No artificial colors"], frequency_label: "2-3 biscuits occasionally" },
  "4_teens": { stars: 2.5, verdict: "Moderate consumption", frequency: "Occasionally", explanation: "Teenagers can enjoy Oreos occasionally. High sugar and fat make it a treat, not a regular snack.", warnings: ["High sugar", "High fat"], positives: ["Good taste", "Portion controlled"], frequency_label: "Once a week" },
  "4_adults": { stars: 2.5, verdict: "Enjoy as a treat", frequency: "Occasionally", explanation: "Oreos are fine as an occasional indulgence for adults who watch their sugar intake.", warnings: ["High sugar", "Processed fat"], positives: ["Small portions manageable", "Low sodium"], frequency_label: "Occasionally" },
  "4_seniors": { stars: 2, verdict: "Watch sugar intake", frequency: "Rarely", explanation: "High sugar in Oreos can affect blood sugar levels, which is a concern for older adults.", warnings: ["High sugar", "Low fiber", "Weight concerns"], positives: ["Small amount okay"], frequency_label: "Rarely" },

  "5_kids": { stars: 2.5, verdict: "A sweet treat", frequency: "Occasionally", explanation: "Dairy Milk provides some calcium but is very high in sugar. Limit to small portions as a treat.", warnings: ["Very high sugar", "High calories"], positives: ["Contains dairy", "Small piece is fine"], frequency_label: "Small piece occasionally" },
  "5_teens": { stars: 3, verdict: "Reasonable in moderation", frequency: "Occasionally", explanation: "Chocolate has health benefits in dark form but Dairy Milk is high in sugar. Moderate enjoyment is okay.", warnings: ["High sugar", "High fat"], positives: ["Mood booster", "Contains minerals"], frequency_label: "Occasionally" },
  "5_adults": { stars: 3, verdict: "Fine as an occasional indulgence", frequency: "Occasionally", explanation: "Adults can enjoy Dairy Milk occasionally. Just be mindful of the high sugar and calorie content.", warnings: ["High sugar", "High calories"], positives: ["Enjoyable treat", "Boosts mood", "Small amount fine"], frequency_label: "Occasionally" },
  "5_seniors": { stars: 2, verdict: "Limit for seniors", frequency: "Rarely", explanation: "High sugar and fat content makes Dairy Milk a concern for seniors, especially those monitoring weight or blood sugar.", warnings: ["High sugar", "High fat", "Calorie dense"], positives: ["Very small amount okay"], frequency_label: "Rarely and small amount" },

  "6_kids": { stars: 1, verdict: "Not for children", frequency: "Avoid", explanation: "Coca Cola has high sugar, caffeine, and is acidic. Children should avoid carbonated drinks entirely. It causes tooth decay and sugar addiction.", warnings: ["Very high sugar (44g per can)", "Caffeine", "Acidic", "No nutrients"], positives: [], frequency_label: "Avoid" },
  "6_teens": { stars: 1.5, verdict: "Very occasional only", frequency: "Rarely", explanation: "Teens often overconsume cola. High sugar leads to obesity, tooth decay, and poor nutrition. Best replaced with water or fresh juice.", warnings: ["High sugar", "Caffeine dependency", "Acidic to teeth"], positives: ["Occasional treat okay"], frequency_label: "Rarely (once a month)" },
  "6_adults": { stars: 2, verdict: "Occasional drink only", frequency: "Occasionally", explanation: "Adults can enjoy Coke occasionally but regular consumption is linked to weight gain, diabetes risk, and dental issues.", warnings: ["High sugar", "Empty calories", "Caffeine"], positives: ["Good taste", "Caffeine boost occasionally"], frequency_label: "Occasionally" },
  "6_seniors": { stars: 1, verdict: "Best avoided", frequency: "Avoid", explanation: "Carbonated drinks are harmful for seniors — high sugar affects blood sugar, caffeine affects sleep, and acidity affects bones.", warnings: ["High sugar", "Bone density risk", "Sleep disruption", "BP concerns"], positives: [], frequency_label: "Avoid" },

  "default": { stars: 2.5, verdict: "Moderate consumption advised", frequency: "Occasionally", explanation: "This is a processed food item. While it can be enjoyed occasionally, regular consumption may not be ideal for your health goals.", warnings: ["Check nutritional label", "Moderation is key"], positives: ["Enjoy as occasional treat"], frequency_label: "Occasionally" },
};

export const getGeneralRating = (productId, ageGroup) => {
  const key = `${productId}_${ageGroup}`;
  return generalRatings[key] || generalRatings["default"];
};

export const getPersonalizedRating = (product, userProfile) => {
  const { age, healthCondition, frequency } = userProfile;
  const nutrition = product.nutrition;

  let stars = 3; // start neutral
  const warnings = [];
  const positives = [];
  const notes = [];

  if (age < 12) { stars -= 0.5; warnings.push("Not ideal for young children"); }
  if (age > 60) { stars -= 0.5; warnings.push("Seniors should limit processed foods"); }

  if (healthCondition === "diabetes") {
    if (nutrition.sugar > 20) { stars -= 1.5; warnings.push("⚠️ High sugar is not ideal for diabetes"); notes.push("People with diabetes should strictly limit high-sugar foods."); }
    if (nutrition.sugar > 10) { stars -= 0.5; warnings.push("Moderate sugar — watch portions"); }
    else { positives.push("Lower sugar content is relatively safe"); }
  }

  if (healthCondition === "bp") {
    if (nutrition.salt > 1.5) { stars -= 1.5; warnings.push("⚠️ High sodium may significantly affect blood pressure"); notes.push("High sodium intake directly raises blood pressure. Limit to low-sodium foods."); }
    else if (nutrition.salt > 0.8) { stars -= 0.5; warnings.push("Moderate sodium — consume carefully"); }
    else { positives.push("Relatively lower sodium, better for BP"); }
  }

  if (healthCondition === "obesity") {
    if (nutrition.calories > 400) { stars -= 1; warnings.push("⚠️ High calories may not suit weight control goals"); notes.push("High-calorie processed foods can make it harder to maintain a healthy weight."); }
    if (nutrition.fat > 25) { stars -= 0.5; warnings.push("High fat content"); }
    else { positives.push("Lower fat content is relatively better"); }
  }

  if (healthCondition === "heart") {
    if (nutrition.fat > 20) { stars -= 1; warnings.push("⚠️ High fat is a concern for heart health"); notes.push("Saturated and trans fats raise bad cholesterol. Heart patients should avoid high-fat processed foods."); }
    if (nutrition.salt > 1.5) { stars -= 0.5; warnings.push("High sodium strains the heart"); }
    else { positives.push("Lower sodium is relatively heart-friendly"); }
  }

  if (healthCondition === "fitness") {
    if (nutrition.protein > 8) { positives.push("Moderate protein content"); }
    else { warnings.push("Low protein doesn't support muscle building"); }
    if (nutrition.calories > 500) { stars -= 0.5; warnings.push("High calorie density needs to fit your TDEE"); }
    if (nutrition.additives === "Low") { positives.push("Fewer artificial additives"); }
  }

  if (frequency === "daily") { stars -= 1; warnings.push("Daily consumption amplifies health risks significantly"); }
  if (frequency === "weekly") { stars -= 0.3; }
  if (frequency === "occasionally") { positives.push("Occasional consumption is manageable for most people"); }

  if (nutrition.protein > 8) positives.push("Good protein content for a packaged snack");
  if (nutrition.fat < 10) positives.push("Relatively low fat");
  if (nutrition.sugar < 5) positives.push("Low sugar content");

  stars = Math.max(0.5, Math.min(5, Math.round(stars * 2) / 2));

  const status = getStatusFromStars(stars);
  const suggestion = stars >= 4 ? "Generally safe to consume" : stars >= 3 ? "Consume occasionally" : stars >= 2 ? "Limit consumption" : "Avoid or replace with healthier option";

  return { stars, status, warnings, positives, notes, suggestion };
};
