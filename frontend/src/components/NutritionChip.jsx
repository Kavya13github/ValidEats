// src/components/NutritionChip.jsx
import React from 'react';
import { motion } from 'framer-motion';

const thresholds = {
  calories: { low: 200, high: 400 },
  fat:      { low: 5,   high: 15  },
  sugar:    { low: 5,   high: 15  },
  salt:     { low: 1,   high: 2   },
  protein:  { low: 5,   high: 15  },
};

const levelStyles = {
  good: { bg: 'bg-safe/12', border: 'border-safe/30', text: 'text-safe' },
  mid:  { bg: 'bg-caution/12', border: 'border-caution/30', text: 'text-caution' },
  bad:  { bg: 'bg-risk/12', border: 'border-risk/30', text: 'text-risk' },
};

const NutritionChip = ({ label, value, unit, nutritionKey, level: forcedLevel, delay = 0 }) => {
  let level = forcedLevel;
  if (!level && nutritionKey && thresholds[nutritionKey]) {
    const t = thresholds[nutritionKey];
    const v = parseFloat(value) || 0;
    if (nutritionKey === 'protein') {
      level = v >= t.high ? 'good' : v >= t.low ? 'mid' : 'bad';
    } else {
      level = v <= t.low ? 'good' : v <= t.high ? 'mid' : 'bad';
    }
  }
  const s = levelStyles[level] || levelStyles.mid;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 18 }}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border ${s.bg} ${s.border}`}
    >
      <span className="text-slate-400 text-xs font-medium">{label}</span>
      <span className={`${s.text} font-bold text-sm`}>{value}{unit && <span className="text-xs font-normal ml-0.5 opacity-70">{unit}</span>}</span>
    </motion.div>
  );
};

export default NutritionChip;
