// src/components/LoaderSpinner.jsx
import React from 'react';
import { motion } from 'framer-motion';

const LoaderSpinner = ({ label = 'Loading...', size = 'md' }) => {
  const s = { sm: 32, md: 48, lg: 64 }[size] || 48;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: s, height: s }}>
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: '2px solid rgba(212,175,55,0.15)', borderTopColor: '#D4AF37' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ inset: 8, border: '1px solid rgba(212,175,55,0.1)', borderBottomColor: 'rgba(212,175,55,0.5)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-gold opacity-80" />
        </div>
      </div>
      {label && <p className="text-charcoal-400 text-xs font-medium tracking-wide">{label}</p>}
    </div>
  );
};

export default LoaderSpinner;
