exports.calculateScore = (nutrition) => {
  let score = 5;

  if (nutrition.sugar > 10) score -= 1;
  if (nutrition.sodium > 500) score -= 1;
  if (nutrition.fat > 10) score -= 1;
  if (nutrition.calories > 300) score -= 1;

  return score < 1 ? 1 : score;
};
