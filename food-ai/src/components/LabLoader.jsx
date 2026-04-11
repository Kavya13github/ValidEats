// src/components/LabLoader.jsx
import React from 'react';
import { motion } from 'framer-motion';

const LabLoader = ({ label = 'Processing...', size = 'md' }) => {
  const s = { sm: 32, md: 48, lg: 64 };
  const d = s[size] || 48;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: d, height: d }}>
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: '2px solid rgba(0,212,255,0.3)', borderTopColor: '#00d4ff' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        {/* Inner ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            inset: 8,
            border: '2px solid rgba(139,92,246,0.3)', borderBottomColor: '#8b5cf6',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
        {/* Core dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="w-2 h-2 rounded-full bg-neon-blue shadow-neon-sm" />
        </motion.div>
      </div>
      {label && (
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1 h-3 bg-neon-blue/60 rounded-full"
                animate={{ scaleY: [1, 2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
          <span className="font-mono text-xs text-neon-blue/80 tracking-widest uppercase">{label}</span>
        </div>
      )}
    </div>
  );
};

export default LabLoader;
