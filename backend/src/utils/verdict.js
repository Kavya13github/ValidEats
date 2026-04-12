exports.getVerdict = (score) => {
  if (score >= 4) return "Good choice";
  if (score === 3) return "Moderate consumption";
  if (score === 2) return "Limit intake";
  return "Not recommended";
};

exports.getRecommendation = (score) => {
  if (score >= 4) return "Can be consumed regularly";
  if (score === 3) return "Consume occasionally";
  if (score === 2) return "Rare consumption advised";
  return "Avoid if possible";
};
