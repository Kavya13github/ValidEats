// src/components/HealthBadge.jsx
import React from 'react';
import { motion } from 'framer-motion';

const presets = {
  safe: {
    label: 'SAFE',
    bg: 'bg-safe/10',
    border: 'border-safe/40',
    text: 'text-safe',
    glow: '0 0 12px rgba(0,255,136,0.5)',
    dot: 'bg-safe',
  },
  caution: {
    label: 'MODERATE',
    bg: 'bg-caution/10',
    border: 'border-caution/40',
    text: 'text-caution',
    glow: '0 0 12px rgba(255,215,0,0.5)',
    dot: 'bg-caution',
  },
  risk: {
    label: 'RISK',
    bg: 'bg-risk/10',
    border: 'border-risk/40',
    text: 'text-risk',
    glow: '0 0 12px rgba(255,68,68,0.5)',
    dot: 'bg-risk',
  },
};

const HealthBadge = ({ status = 'caution', label, size = 'md', className = '' }) => {
  const p = presets[status] || presets.caution;
  const displayLabel = label || p.label;

  const sizeMap = {
    sm:  'text-xs px-2.5 py-1 gap-1.5',
    md:  'text-xs px-3.5 py-1.5 gap-2',
    lg:  'text-sm px-5 py-2.5 gap-2.5',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        inline-flex items-center rounded-full border font-mono font-semibold tracking-widest uppercase
        ${p.bg} ${p.border} ${p.text} ${sizeMap[size]} ${className}
      `}
      style={{ boxShadow: p.glow }}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${p.dot} animate-pulse`} />
      {displayLabel}
    </motion.span>
  );
};

export default HealthBadge;
