import React from 'react';
import { motion } from 'framer-motion';
import RatingStars from './RatingStars';
import HealthBadge from './HealthBadge';

const getStatus = (stars) => stars >= 4 ? 'safe' : stars >= 2.5 ? 'caution' : 'risk';

const NutrientBar = ({ label, value, unit, max, color, delay = 0 }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="space-y-1"
    >
      <div className="flex justify-between items-center">
        <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{label}</span>
        <span className="text-[11px] font-bold" style={{ color }}>
          {value}{unit}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: delay + 0.1, duration: 0.7, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};

const ScoreRing = ({ stars, status }) => {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const pct = (stars / 5) * 100;
  const dash = (pct / 100) * circ;
  const color = status === 'safe' ? '#22c55e' : status === 'risk' ? '#ef4444' : '#f59e0b';
  const label = status === 'safe' ? 'SAFE' : status === 'risk' ? 'RISK' : 'CAUTION';

  return (
    <div className="relative flex items-center justify-center" style={{ width: 92, height: 92 }}>
      <svg width="92" height="92" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="46" cy="46" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <motion.circle
          cx="46" cy="46" r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${circ}`}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-black text-white leading-none">{stars.toFixed(1)}</span>
        <span className="text-[9px] font-bold tracking-widest mt-0.5" style={{ color }}>{label}</span>
      </div>
    </div>
  );
};

const Chip = ({ text, variant = 'risk' }) => {
  const styles = {
    risk:    'bg-risk/12 border-risk/30 text-risk',
    caution: 'bg-caution/12 border-caution/30 text-caution',
    safe:    'bg-safe/12 border-safe/30 text-safe',
    info:    'bg-blue-500/12 border-blue-500/25 text-blue-400',
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${styles[variant]}`}>
      {text}
    </span>
  );
};

const ResultCard = ({ product, rating, personalized = false, generalRating = null, className = '' }) => {
  if (!product || !rating) return null;

  const { stars = 2.5, verdict, explanation, warnings = [], positives = [], frequency_label, notes = [] } = rating;
  const status = getStatus(stars);
  const borderColor = status === 'safe' ? 'rgba(34,197,94,0.2)' : status === 'risk' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)';
  const accentColor = status === 'safe' ? '#22c55e' : status === 'risk' ? '#ef4444' : '#f59e0b';
  const accentBg    = status === 'safe' ? 'rgba(34,197,94,0.04)' : status === 'risk' ? 'rgba(239,68,68,0.04)' : 'rgba(245,158,11,0.04)';

  const n = product.nutrition || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-3xl overflow-hidden ${className}`}
      style={{ border: `1px solid ${borderColor}`, background: '#0D1020' }}
    >
      <div
        className="px-5 py-3 flex items-center justify-between gap-2"
        style={{ background: `linear-gradient(90deg, ${accentBg}, transparent)`, borderBottom: `1px solid rgba(255,255,255,0.05)` }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: accentColor }}>
            ● ANALYSIS REPORT
          </span>
        </div>
        <span className="text-[10px] text-slate-600 font-mono">ValidEats AI v2.0</span>
      </div>

      <div className="px-5 pt-5 pb-4 flex items-center gap-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {product.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-sans font-bold text-lg tracking-tight truncate">{product.name}</h3>
          <p className="text-slate-500 text-xs mt-0.5">{product.brand}  ·  {product.category}</p>
        </div>
        <HealthBadge status={status} size="md" />
      </div>

      <div className="p-5 space-y-5">

        <div className="flex items-center gap-5">
          <ScoreRing stars={stars} status={status} />
          <div className="flex-1 space-y-2">
            <RatingStars stars={stars} size="md" />
            {personalized && generalRating && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-slate-600 w-20 shrink-0">General avg</span>
                <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-slate-500" style={{ width: `${(generalRating.stars / 5) * 100}%` }} />
                </div>
                <span className="text-[10px] text-slate-500 w-8 text-right">{generalRating.stars}/5</span>
              </div>
            )}
            {personalized && generalRating && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold w-20 shrink-0" style={{ color: accentColor }}>For you</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: accentColor }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(stars / 5) * 100}%` }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
                  />
                </div>
                <span className="text-[10px] font-bold w-8 text-right" style={{ color: accentColor }}>{stars}/5</span>
              </div>
            )}
            {verdict && (
              <div
                className="inline-flex px-3 py-1.5 rounded-xl text-xs font-bold mt-1"
                style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}40`, color: accentColor }}
              >
                {verdict}
              </div>
            )}
          </div>
        </div>

        <div
          className="p-4 rounded-2xl space-y-3"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">
            Nutritional Profile · per 100g
          </p>
          <NutrientBar label="Calories" value={n.calories || 0} unit=" kcal" max={600} color="#f59e0b" delay={0.05} />
          <NutrientBar label="Fat"      value={n.fat     || 0} unit="g"    max={40}  color="#ef4444" delay={0.1} />
          <NutrientBar label="Sugar"    value={n.sugar   || 0} unit="g"    max={50}  color="#f97316" delay={0.15} />
          <NutrientBar label="Salt"     value={n.salt    || 0} unit="g"    max={5}   color="#eab308" delay={0.2} />
          <NutrientBar label="Protein"  value={n.protein || 0} unit="g"    max={30}  color="#22c55e" delay={0.25} />
        </div>

        {explanation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-base">🧠</span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">AI Expert Analysis</p>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{explanation}</p>
          </motion.div>
        )}

        {personalized && notes.length > 0 && (
          <div className="space-y-2">
            {notes.map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.07 }}
                className="flex items-start gap-2.5 px-4 py-3 rounded-xl"
                style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)' }}
              >
                <span className="text-yellow-400 text-sm mt-0.5 flex-shrink-0">★</span>
                <p className="text-slate-300 text-sm leading-relaxed">{note}</p>
              </motion.div>
            ))}
          </div>
        )}

        {(warnings.length > 0 || positives.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {warnings.length > 0 && (
              <div
                className="p-4 rounded-2xl"
                style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)' }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-2.5">⚠ Risk Factors</p>
                <ul className="space-y-1.5">
                  {warnings.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-red-500 mt-0.5 text-[10px] flex-shrink-0">●</span>{w}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {positives.length > 0 && (
              <div
                className="p-4 rounded-2xl"
                style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.18)' }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-400 mb-2.5">✓ Positives</p>
                <ul className="space-y-1.5">
                  {positives.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-green-500 mt-0.5 text-[10px] flex-shrink-0">●</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {n.additives && (
          <div className="flex flex-wrap gap-1.5">
            {n.additives === 'High' && <Chip text="High Additives" variant="risk" />}
            {(n.salt || 0) > 2 && <Chip text="High Sodium" variant="risk" />}
            {(n.sugar || 0) > 15 && <Chip text="High Sugar" variant="caution" />}
            {(n.fat || 0) > 20  && <Chip text="High Fat" variant="caution" />}
            {(n.protein || 0) > 10 && <Chip text="Good Protein" variant="safe" />}
          </div>
        )}

        {frequency_label && (
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <span className="text-xl">⏱</span>
            <div>
              <p className="text-slate-500 text-[11px]">Suggested Frequency</p>
              <p className="text-slate-200 text-sm font-bold mt-0.5">{frequency_label}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResultCard;
