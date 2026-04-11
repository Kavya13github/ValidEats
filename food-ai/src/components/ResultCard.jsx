// src/components/ResultCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import RatingStars from './RatingStars';
import HealthBadge from './HealthBadge';
import NutritionChip from './NutritionChip';
import HealthBar from './HealthBar';
import GlassCard from './GlassCard';

const getStatus = (stars) => stars >= 4 ? 'safe' : stars >= 2.5 ? 'caution' : 'risk';
const getHealthPercent = (stars) => Math.round((stars / 5) * 100);
const getHealthColor = (stars) => stars >= 4 ? 'safe' : stars >= 2.5 ? 'caution' : 'risk';

const ResultCard = ({ product, rating, personalized = false, className = '' }) => {
  if (!product || !rating) return null;
  const { stars = 2.5, verdict, explanation, warnings = [], positives = [], frequency_label, notes = [], suggestion } = rating;

  const status  = rating.status?.color || getStatus(stars);
  const hPct    = getHealthPercent(stars);
  const hColor  = getHealthColor(stars);
  const borderColor = status === 'safe' ? 'green' : status === 'risk' ? 'red' : 'yellow';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <GlassCard color={borderColor} padding={false}>
        {/* Header */}
        <div className="px-6 py-5 border-b border-lab-border flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-lab-surface flex items-center justify-center text-3xl border border-lab-border">
              {product.emoji}
            </div>
            <div>
              <p className="hud-label mb-0.5">Analysis Result</p>
              <h3 className="text-white font-bold text-xl">{product.name}</h3>
              <p className="text-gray-500 text-xs font-mono">{product.brand} · {product.category}</p>
            </div>
          </div>
          <HealthBadge status={status} size="lg" />
        </div>

        <div className="p-6 space-y-5">
          {/* Rating Row */}
          <div className="flex flex-wrap items-center gap-6">
            <RatingStars stars={stars} size="lg" />
            <div className="flex-1 min-w-[180px]">
              <HealthBar
                value={hPct}
                label="Health Score"
                color={hColor}
              />
            </div>
          </div>

          {/* Verdict */}
          {(verdict || suggestion) && (
            <div className={`px-4 py-3 rounded-lg glass font-mono text-sm
              ${status === 'safe' ? 'border-safe/30 text-safe' :
                status === 'risk' ? 'border-risk/30 text-risk' : 'border-caution/30 text-caution'}
              border`}
              style={{ boxShadow: status === 'safe' ? '0 0 12px rgba(0,255,136,0.1)' : status === 'risk' ? '0 0 12px rgba(255,68,68,0.1)' : '0 0 12px rgba(255,215,0,0.1)' }}
            >
              ◈ {verdict || suggestion}
            </div>
          )}

          {/* Nutrition Grid */}
          <div>
            <p className="hud-label mb-3">Nutritional Analysis — per 100g</p>
            <div className="flex flex-wrap gap-2">
              <NutritionChip label="Cal" value={product.nutrition.calories} unit="kcal" nutritionKey="calories" delay={0.1} />
              <NutritionChip label="Fat" value={product.nutrition.fat} unit="g" nutritionKey="fat" delay={0.15} />
              <NutritionChip label="Sugar" value={product.nutrition.sugar} unit="g" nutritionKey="sugar" delay={0.2} />
              <NutritionChip label="Salt" value={product.nutrition.salt} unit="g" nutritionKey="salt" delay={0.25} />
              <NutritionChip label="Protein" value={product.nutrition.protein} unit="g" nutritionKey="protein" delay={0.3} />
            </div>
          </div>

          {/* Explanation */}
          {explanation && (
            <div className="bg-lab-surface border border-lab-border rounded-lg p-4">
              <p className="hud-label mb-2">AI Explanation</p>
              <p className="text-gray-400 text-sm font-mono leading-relaxed">{explanation}</p>
            </div>
          )}

          {/* Personalized Notes */}
          {personalized && notes.length > 0 && (
            <div className="space-y-2">
              {notes.map((note, i) => (
                <div key={i} className="bg-neon-blue/5 border border-neon-blue/20 rounded-lg px-4 py-3">
                  <p className="text-neon-blue text-xs font-mono">◈ {note}</p>
                </div>
              ))}
            </div>
          )}

          {/* Warnings & Positives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {warnings.length > 0 && (
              <div className="bg-risk/5 border border-risk/20 rounded-lg p-4">
                <p className="text-risk text-xs font-mono uppercase tracking-widest mb-2">⚠ Risk Factors</p>
                <ul className="space-y-1.5">
                  {warnings.map((w, i) => (
                    <li key={i} className="text-xs text-gray-400 font-mono flex items-start gap-2">
                      <span className="text-risk">›</span>{w}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {positives.length > 0 && (
              <div className="bg-safe/5 border border-safe/20 rounded-lg p-4">
                <p className="text-safe text-xs font-mono uppercase tracking-widest mb-2">◉ Positives</p>
                <ul className="space-y-1.5">
                  {positives.map((p, i) => (
                    <li key={i} className="text-xs text-gray-400 font-mono flex items-start gap-2">
                      <span className="text-safe">›</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Frequency */}
          {(frequency_label || suggestion) && (
            <div className="flex items-center gap-4 p-4 bg-lab-surface border border-lab-border rounded-lg">
              <span className="text-2xl">⏱</span>
              <div>
                <p className="hud-label">Suggested Frequency</p>
                <p className="text-gray-200 text-sm font-mono font-semibold mt-0.5">{frequency_label || suggestion}</p>
              </div>
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default ResultCard;
