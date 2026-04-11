// src/components/NutritionChip.jsx
import React from 'react';
import { motion } from 'framer-motion';

const thresholds = {
  calories: { low: 200, high: 400 },
  fat:      { low: 10,  high: 25 },
  sugar:    { low: 5,   high: 20 },
  salt:     { low: 0.5, high: 1.5 },
  protein:  { low: 5,   high: 10 },
};

const getLevel = (key, value) => {
  if (!thresholds[key]) return 'neutral';
  if (key === 'protein') {
    if (value >= thresholds[key].high) return 'low';
    if (value >= thresholds[key].low)  return 'medium';
    return 'high';
  }
  if (value <= thresholds[key].low)  return 'low';
  if (value <= thresholds[key].high) return 'medium';
  return 'high';
};

const levelStyle = {
  low:     { color: 'text-safe',    border: 'border-safe/30',    bg: 'bg-safe/5',    glow: '0 0 8px rgba(0,255,136,0.3)' },
  medium:  { color: 'text-caution', border: 'border-caution/30', bg: 'bg-caution/5', glow: '0 0 8px rgba(255,215,0,0.3)' },
  high:    { color: 'text-risk',    border: 'border-risk/30',    bg: 'bg-risk/5',    glow: '0 0 8px rgba(255,68,68,0.3)' },
  neutral: { color: 'text-neon-blue', border: 'border-neon-blue/20', bg: 'bg-neon-blue/5', glow: 'none' },
};

const NutritionChip = ({ label, value, unit = 'g', nutritionKey, level: forcedLevel, delay = 0, className = '' }) => {
  const lvl   = forcedLevel || getLevel(nutritionKey, value);
  const style = levelStyle[lvl];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`flex flex-col items-center border rounded-xl px-3 py-2.5 min-w-[80px]
        ${style.color} ${style.border} ${style.bg} ${className}`}
      style={{ boxShadow: style.glow }}
    >
      <span className="text-base font-mono font-bold leading-tight">
        {typeof value === 'number' ? value : value}
        <span className="text-xs font-normal opacity-70 ml-0.5">{unit}</span>
      </span>
      <span className="text-xs mt-1 opacity-60 font-mono uppercase tracking-wider">{label}</span>
    </motion.div>
  );
};

export default NutritionChip;
