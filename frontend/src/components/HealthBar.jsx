import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HealthBar = ({ value = 70, label = 'Health Score', color = 'neon-blue', className = '' }) => {
  const colorMap = {
    'neon-blue':   { bar: 'from-neon-blue/80 to-neon-purple/80', glow: 'rgba(0,212,255,0.6)', text: 'text-neon-blue' },
    safe:          { bar: 'from-safe/80 to-neon-blue/80',         glow: 'rgba(0,255,136,0.6)', text: 'text-safe' },
    caution:       { bar: 'from-caution/80 to-yellow-500/80',     glow: 'rgba(255,215,0,0.6)', text: 'text-caution' },
    risk:          { bar: 'from-risk/80 to-red-600/80',           glow: 'rgba(255,68,68,0.6)', text: 'text-risk' },
  };

  const c = colorMap[color] || colorMap['neon-blue'];
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="hud-label">{label}</span>
        <span className={`text-xs font-mono font-bold ${c.text}`}>{clampedValue}%</span>
      </div>
      <div className="h-2 bg-lab-surface rounded-full overflow-hidden border border-lab-border">
        <motion.div
          className={`h-full bg-gradient-to-r ${c.bar} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
          style={{ boxShadow: `0 0 8px ${c.glow}` }}
        />
      </div>
    </div>
  );
};

export default HealthBar;
