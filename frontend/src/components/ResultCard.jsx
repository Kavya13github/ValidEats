// src/components/ResultCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import RatingStars from './RatingStars';
import HealthBadge from './HealthBadge';

const getStatus = (stars) => stars >= 4 ? 'safe' : stars >= 2.5 ? 'caution' : 'risk';

const ResultCard = ({ product, rating, personalized = false, generalRating = null, className = '' }) => {
  if (!product || !rating) return null;

  const { stars = 2.5, verdict, explanation, warnings = [], positives = [], frequency_label, notes = [] } = rating;
  const status = getStatus(stars);
  const borderColor = status === 'safe' ? 'border-safe/20' : status === 'risk' ? 'border-risk/20' : 'border-caution/20';
  const headerBg    = status === 'safe' ? 'from-safe/5' : status === 'risk' ? 'from-risk/5' : 'from-caution/5';
  const statusColor = status === 'safe' ? 'text-safe' : status === 'risk' ? 'text-risk' : 'text-caution';
  const statusBg    = status === 'safe' ? 'bg-safe/10 border-safe/30' : status === 'risk' ? 'bg-risk/10 border-risk/30' : 'bg-caution/10 border-caution/30';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-3xl border ${borderColor} overflow-hidden bg-brand-card ${className}`}
    >
      {/* ── Header ── */}
      <div className={`px-5 py-4 bg-gradient-to-r ${headerBg} to-transparent border-b border-white/5 flex items-center gap-4`}>
        <div className="w-12 h-12 rounded-xl bg-brand-bg border border-white/5 flex items-center justify-center text-2xl flex-shrink-0">
          {product.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-base serif truncate">{product.name}</h3>
          <p className="text-slate-500 text-xs">{product.brand} · {product.category}</p>
        </div>
        <HealthBadge status={status} size="md" />
      </div>

      <div className="p-5 space-y-4">

        {/* ── Rating + Verdict Row ── */}
        <div className="flex items-center justify-between gap-4">
          <RatingStars stars={stars} size="lg" />
          <div className={`w-16 h-16 rounded-xl border flex flex-col items-center justify-center flex-shrink-0 ${statusBg}`}>
            <span className={`text-xl font-black leading-none ${statusColor}`}>{stars}</span>
            <span className={`text-[10px] font-bold ${statusColor} opacity-60`}>/5</span>
          </div>
        </div>

        {/* Comparison (personalized mode) */}
        {personalized && generalRating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-2">
            <div className="text-center p-3 bg-brand-bg rounded-xl border border-white/5">
              <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5">General</p>
              <RatingStars stars={generalRating.stars} size="sm" />
            </div>
            <div className={`text-center p-3 rounded-xl border ${statusBg}`}>
              <p className={`text-[10px] uppercase tracking-wider mb-1.5 font-semibold ${statusColor}`}>For You</p>
              <RatingStars stars={stars} size="sm" />
            </div>
          </motion.div>
        )}

        {/* Verdict */}
        {verdict && (
          <div className={`px-3.5 py-2.5 rounded-xl border text-sm font-semibold ${statusBg} ${statusColor}`}>
            {verdict}
          </div>
        )}

        {/* ── Nutrition Chips (compact) ── */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { l: 'Cal', v: product.nutrition.calories, u: 'kcal' },
            { l: 'Fat', v: product.nutrition.fat, u: 'g' },
            { l: 'Sugar', v: product.nutrition.sugar, u: 'g' },
            { l: 'Salt', v: product.nutrition.salt, u: 'g' },
            { l: 'Protein', v: product.nutrition.protein, u: 'g' },
          ].map((n) => (
            <div key={n.l} className="bg-brand-bg border border-white/5 rounded-lg px-2.5 py-1.5 text-center">
              <p className="text-slate-600 text-[9px] uppercase tracking-wider">{n.l}</p>
              <p className="text-white text-xs font-bold">{n.v}<span className="text-slate-600 font-normal text-[9px] ml-0.5">{n.u}</span></p>
            </div>
          ))}
        </div>

        {/* ── Explanation ── */}
        {explanation && (
          <div className="bg-brand-bg rounded-xl p-3.5 border border-white/5">
            <p className="text-slate-300 text-sm leading-relaxed">{explanation}</p>
          </div>
        )}

        {/* Personalized notes */}
        {personalized && notes.length > 0 && (
          <div className="space-y-1.5">
            {notes.map((note, i) => (
              <div key={i} className="flex items-start gap-2 px-3 py-2 bg-gold/5 border border-gold/15 rounded-xl">
                <span className="text-gold text-xs mt-0.5 flex-shrink-0">★</span>
                <p className="text-slate-300 text-xs leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Warnings + Positives ── */}
        {(warnings.length > 0 || positives.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {warnings.length > 0 && (
              <div className="bg-risk/8 border border-risk/20 rounded-xl p-3">
                <p className="text-risk text-[10px] font-bold uppercase tracking-wider mb-2">⚠ Risks</p>
                <ul className="space-y-1">
                  {warnings.map((w, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start gap-1.5">
                      <span className="text-risk mt-0.5 text-[8px]">●</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {positives.length > 0 && (
              <div className="bg-safe/8 border border-safe/20 rounded-xl p-3">
                <p className="text-safe text-[10px] font-bold uppercase tracking-wider mb-2">✓ Positives</p>
                <ul className="space-y-1">
                  {positives.map((p, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start gap-1.5">
                      <span className="text-safe mt-0.5 text-[8px]">●</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Frequency */}
        {frequency_label && (
          <div className="flex items-center gap-2.5 py-2.5 px-3.5 bg-brand-bg border border-white/5 rounded-xl">
            <span className="text-lg">⏱</span>
            <div>
              <p className="text-slate-600 text-[10px] uppercase tracking-wider">Frequency</p>
              <p className="text-slate-200 text-xs font-bold">{frequency_label}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResultCard;
