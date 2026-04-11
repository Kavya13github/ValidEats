exports.getHealthTags = (nutrition) => {
  const tags = [];

  if (nutrition.sugar > 10) tags.push("High Sugar");
  if (nutrition.sodium > 500) tags.push("High Sodium");
  if (nutrition.fat > 10) tags.push("High Fat");
  if (nutrition.calories > 300) tags.push("High Calories");

  return tags;
};