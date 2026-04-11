// src/components/AlertBox.jsx
import React from 'react';
import { motion } from 'framer-motion';

const types = {
  info:    { border: 'border-neon-blue/40',   bg: 'bg-neon-blue/5',   text: 'text-neon-blue',   icon: '◈' },
  success: { border: 'border-safe/40',         bg: 'bg-safe/5',         text: 'text-safe',         icon: '◉' },
  warning: { border: 'border-caution/40',      bg: 'bg-caution/5',      text: 'text-caution',      icon: '⚠' },
  error:   { border: 'border-risk/40',         bg: 'bg-risk/5',         text: 'text-risk',         icon: '✕' },
};

const AlertBox = ({ type = 'info', title, message, onClose, className = '' }) => {
  const t = types[type] || types.info;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-start gap-3 p-4 rounded-lg border glass ${t.border} ${t.bg} ${className}`}
    >
      <span className={`text-lg ${t.text} flex-shrink-0 font-mono`}>{t.icon}</span>
      <div className="flex-1 min-w-0">
        {title   && <p className={`font-mono font-semibold text-xs uppercase tracking-widest ${t.text}`}>{title}</p>}
        {message && <p className="text-gray-400 text-xs mt-1 font-mono leading-relaxed">{message}</p>}
      </div>
      {onClose && (
        <button onClick={onClose} className="text-gray-600 hover:text-gray-300 transition-colors text-xs font-mono">
          [X]
        </button>
      )}
    </motion.div>
  );
};

export default AlertBox;
