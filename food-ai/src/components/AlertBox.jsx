// src/components/AlertBox.jsx
import React from 'react';
import { motion } from 'framer-motion';

const types = {
  info:    { bg: 'bg-charcoal-800', border: 'border-gold/20',     text: 'text-gold',    icon: 'ℹ' },
  success: { bg: 'bg-safe-light',   border: 'border-safe/30',     text: 'text-safe',    icon: '✓' },
  warning: { bg: 'bg-caution-light',border: 'border-caution/30',  text: 'text-caution', icon: '⚠' },
  error:   { bg: 'bg-risk-light',   border: 'border-risk/30',     text: 'text-risk',    icon: '✕' },
};

const AlertBox = ({ type = 'info', title, message, onClose, className = '' }) => {
  const t = types[type] || types.info;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 p-4 rounded-xl border ${t.bg} ${t.border} ${className}`}
    >
      <span className={`text-base flex-shrink-0 mt-0.5 ${t.text}`}>{t.icon}</span>
      <div className="flex-1 min-w-0">
        {title   && <p className={`font-semibold text-xs mb-0.5 ${t.text}`}>{title}</p>}
        {message && <p className="text-xs text-charcoal-500 leading-relaxed">{message}</p>}
      </div>
      {onClose && (
        <button onClick={onClose} className="text-charcoal-400 hover:text-charcoal-200 transition-colors text-sm flex-shrink-0">✕</button>
      )}
    </motion.div>
  );
};

export default AlertBox;
