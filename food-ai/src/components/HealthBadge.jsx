// src/components/HealthBadge.jsx
import React from 'react';
import { motion } from 'framer-motion';

const config = {
  safe: {
    bg:     'bg-safe-light',
    border: 'border-safe/30',
    text:   'text-safe',
    dot:    'bg-safe',
    label:  'Safe',
  },
  caution: {
    bg:     'bg-caution-light',
    border: 'border-caution/30',
    text:   'text-caution',
    dot:    'bg-caution',
    label:  'Moderate',
  },
  risk: {
    bg:     'bg-risk-light',
    border: 'border-risk/30',
    text:   'text-risk',
    dot:    'bg-risk',
    label:  'Risk',
  },
};

const sizes = {
  sm: 'text-xs px-2.5 py-1 gap-1.5',
  md: 'text-xs px-3.5 py-1.5 gap-2',
  lg: 'text-sm px-4 py-2 gap-2',
};

const HealthBadge = ({ status = 'caution', label, size = 'md', className = '' }) => {
  const c = config[status] || config.caution;
  const displayLabel = label || c.label;
  const s = sizes[size];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center rounded-full border font-medium ${c.bg} ${c.border} ${c.text} ${s} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
      {displayLabel}
    </motion.span>
  );
};

export default HealthBadge;
