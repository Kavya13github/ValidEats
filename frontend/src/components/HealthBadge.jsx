import React from 'react';
import { motion } from 'framer-motion';

const cfg = {
  safe:    { label: 'Safe',   bg: 'bg-safe/15',    border: 'border-safe/40',    text: 'text-safe',    dot: 'bg-safe'    },
  caution: { label: 'Moderate', bg: 'bg-caution/15', border: 'border-caution/40', text: 'text-caution', dot: 'bg-caution' },
  risk:    { label: 'Risk',   bg: 'bg-risk/15',    border: 'border-risk/40',    text: 'text-risk',    dot: 'bg-risk'    },
};
const sz = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-xs px-3 py-1',
  lg: 'text-sm px-3.5 py-1.5',
};

const HealthBadge = ({ status = 'caution', size = 'md', className = '' }) => {
  const c = cfg[status] || cfg.caution;
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 350, damping: 18 }}
      className={`inline-flex items-center gap-1.5 rounded-full font-bold border
        ${c.bg} ${c.border} ${c.text} ${sz[size]} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </motion.span>
  );
};

export default HealthBadge;
