// src/components/NutritionChip.jsx
import React from 'react';
import { motion } from 'framer-motion';

const thresholds = {
  calories: { low: 200, high: 400 },
  fat:      { low: 10,  high: 25 },
  sugar:    { low: 5,   high: 20 },
  salt:     { low: 0.5, high: 1.5 },
  protein:  { low: 5,   high: 10, invert: true },
};

const getLevel = (key, val) => {
  if (!thresholds[key]) return 'neutral';
  const t = thresholds[key];
  if (t.invert) return val >= t.high ? 'good' : val >= t.low ? 'mid' : 'bad';
  return val <= t.low ? 'good' : val <= t.high ? 'mid' : 'bad';
};

const levelStyle = {
  good:    { bg: 'bg-safe-light',    border: 'border-safe/30',    text: 'text-safe',      val: 'text-safe' },
  mid:     { bg: 'bg-caution-light', border: 'border-caution/30', text: 'text-caution',   val: 'text-caution' },
  bad:     { bg: 'bg-risk-light',    border: 'border-risk/30',    text: 'text-risk',      val: 'text-risk' },
  neutral: { bg: 'bg-charcoal-800',  border: 'border-charcoal-600', text: 'text-gray-400', val: 'text-gray-200' },
};

const NutritionChip = ({ label, value, unit = 'g', nutritionKey, level: forcedLevel, delay = 0, className = '' }) => {
  const lvl   = forcedLevel || getLevel(nutritionKey, value);
  const style = levelStyle[lvl];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`flex flex-col items-center justify-center border rounded-xl px-4 py-3 min-w-[72px] text-center ${style.bg} ${style.border} ${className}`}
    >
      <span className={`font-semibold text-sm leading-tight ${style.val}`}>
        {value}<span className="text-xs font-normal opacity-70 ml-0.5">{unit}</span>
      </span>
      <span className={`text-xs mt-1 font-medium ${style.text} opacity-80`}>{label}</span>
    </motion.div>
  );
};

export default NutritionChip;
