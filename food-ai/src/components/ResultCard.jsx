// src/components/ResultCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import RatingStars from './RatingStars';
import HealthBadge from './HealthBadge';
import NutritionChip from './NutritionChip';

const getStatus = (stars) => stars >= 4 ? 'safe' : stars >= 2.5 ? 'caution' : 'risk';

const ResultCard = ({ product, rating, personalized = false, generalRating = null, className = '' }) => {
  if (!product || !rating) return null;

  const { stars = 2.5, verdict, explanation, warnings = [], positives = [], frequency_label, notes = [] } = rating;
  const status = getStatus(stars);
  const borderColor = status === 'safe' ? 'border-safe/20' : status === 'risk' ? 'border-risk/20' : 'border-caution/20';
  const headerBg    = status === 'safe' ? 'from-safe/5' : status === 'risk' ? 'from-risk/5' : 'from-caution/5';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl border ${borderColor} overflow-hidden bg-charcoal-900 ${className}`}
    >
      {/* Header */}
      <div className={`px-6 py-5 bg-gradient-to-r ${headerBg} to-transparent border-b border-charcoal-800 flex items-center gap-4`}>
        <div className="w-14 h-14 rounded-xl bg-charcoal-800 border border-charcoal-700 flex items-center justify-center text-3xl flex-shrink-0">
          {product.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-lg serif-heading truncate">{product.name}</h3>
          <p className="text-charcoal-400 text-xs mt-0.5">{product.brand} · {product.category}</p>
        </div>
        <HealthBadge status={status} size="md" />
      </div>

      <div className="p-6 space-y-5">
        {/* Rating */}
        <RatingStars stars={stars} size="lg" />

        {/* Comparison (personalized mode) */}
        {personalized && generalRating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="text-center p-3 bg-charcoal-800 rounded-xl border border-charcoal-700">
              <p className="text-charcoal-400 text-xs mb-1.5">General users</p>
              <RatingStars stars={generalRating.stars} size="sm" />
            </div>
            <div className={`text-center p-3 rounded-xl border ${status === 'safe' ? 'bg-safe-light border-safe/30' : status === 'risk' ? 'bg-risk-light border-risk/30' : 'bg-caution-light border-caution/30'}`}>
              <p className={`text-xs mb-1.5 font-medium ${status === 'safe' ? 'text-safe' : status === 'risk' ? 'text-risk' : 'text-caution'}`}>For you</p>
              <RatingStars stars={stars} size="sm" />
            </div>
          </motion.div>
        )}

        {/* Verdict */}
        {verdict && (
          <div className={`px-4 py-3 rounded-xl border text-sm font-medium
            ${status === 'safe'    ? 'bg-safe-light border-safe/30 text-safe' :
              status === 'risk'    ? 'bg-risk-light border-risk/30 text-risk' :
              'bg-caution-light border-caution/30 text-caution'}`}>
            {verdict}
          </div>
        )}

        {/* Nutrition */}
        <div>
          <p className="text-xs text-charcoal-400 font-medium uppercase tracking-wider mb-3">Nutrition · per 100g</p>
          <div className="flex flex-wrap gap-2">
            <NutritionChip label="Calories" value={product.nutrition.calories} unit="kcal" nutritionKey="calories" delay={0.1} />
            <NutritionChip label="Fat"      value={product.nutrition.fat}      unit="g"    nutritionKey="fat"      delay={0.15} />
            <NutritionChip label="Sugar"    value={product.nutrition.sugar}    unit="g"    nutritionKey="sugar"    delay={0.2} />
            <NutritionChip label="Salt"     value={product.nutrition.salt}     unit="g"    nutritionKey="salt"     delay={0.25} />
            <NutritionChip label="Protein"  value={product.nutrition.protein}  unit="g"    nutritionKey="protein"  delay={0.3} />
          </div>
        </div>

        {/* Explanation */}
        {explanation && (
          <div className="bg-charcoal-800 rounded-xl p-4 border border-charcoal-700">
            <p className="text-xs text-charcoal-400 uppercase tracking-wider font-medium mb-2">Analysis</p>
            <p className="text-gray-400 text-sm leading-relaxed">{explanation}</p>
          </div>
        )}

        {/* Personalized notes */}
        {personalized && notes.length > 0 && (
          <div className="space-y-2">
            {notes.map((note, i) => (
              <div key={i} className="flex items-start gap-2.5 px-4 py-3 bg-gold/5 border border-gold/15 rounded-xl">
                <span className="text-gold text-sm mt-0.5 flex-shrink-0">★</span>
                <p className="text-gray-400 text-sm leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        )}

        {/* Warnings + Positives */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {warnings.length > 0 && (
            <div className="bg-risk-light border border-risk/20 rounded-xl p-4">
              <p className="text-risk text-xs font-semibold uppercase tracking-wider mb-2">⚠ Risk Factors</p>
              <ul className="space-y-1.5">
                {warnings.map((w, i) => <li key={i} className="text-xs text-charcoal-600 flex items-start gap-2"><span className="text-risk mt-0.5">›</span>{w}</li>)}
              </ul>
            </div>
          )}
          {positives.length > 0 && (
            <div className="bg-safe-light border border-safe/20 rounded-xl p-4">
              <p className="text-safe text-xs font-semibold uppercase tracking-wider mb-2">✓ Positives</p>
              <ul className="space-y-1.5">
                {positives.map((p, i) => <li key={i} className="text-xs text-charcoal-600 flex items-start gap-2"><span className="text-safe mt-0.5">›</span>{p}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Frequency */}
        {frequency_label && (
          <div className="flex items-center gap-3 py-3 px-4 bg-charcoal-800 border border-charcoal-700 rounded-xl">
            <span className="text-xl">⏱</span>
            <div>
              <p className="text-charcoal-400 text-xs">Suggested frequency</p>
              <p className="text-gray-200 text-sm font-medium mt-0.5">{frequency_label}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResultCard;
