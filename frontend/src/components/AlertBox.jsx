// src/components/AlertBox.jsx
import React from 'react';
import { motion } from 'framer-motion';

const styles = {
  error:   { bg: 'bg-risk/10',    border: 'border-risk/30',    text: 'text-risk',    icon: '✕' },
  warning: { bg: 'bg-caution/10', border: 'border-caution/30', text: 'text-caution', icon: '⚠' },
  success: { bg: 'bg-safe/10',    border: 'border-safe/30',    text: 'text-safe',    icon: '✓' },
  info:    { bg: 'bg-gold/10',    border: 'border-gold/30',    text: 'text-gold',    icon: 'ℹ' },
};

const AlertBox = ({ type = 'error', title, message, onClose, className = '' }) => {
  const s = styles[type] || styles.error;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={`flex items-start gap-3 px-4 py-3.5 rounded-2xl border ${s.bg} ${s.border} ${className}`}
    >
      <span className={`${s.text} text-base mt-0.5 flex-shrink-0`}>{s.icon}</span>
      <div className="flex-1">
        {title && <p className={`${s.text} text-sm font-bold mb-0.5`}>{title}</p>}
        <p className="text-slate-400 text-sm leading-relaxed">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-slate-600 hover:text-white text-sm transition-colors mt-0.5 flex-shrink-0">✕</button>
      )}
    </motion.div>
  );
};

export default AlertBox;
