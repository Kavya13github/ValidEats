// src/components/RatingStars.jsx
import React from 'react';
import { motion } from 'framer-motion';

const sizes = {
  xs: { star: 'text-sm',   num: 'text-xs',   gap: 'gap-0.5' },
  sm: { star: 'text-base',  num: 'text-xs',   gap: 'gap-1'   },
  md: { star: 'text-xl',    num: 'text-sm',   gap: 'gap-1'   },
  lg: { star: 'text-3xl',   num: 'text-lg',   gap: 'gap-1.5' },
};

const RatingStars = ({ stars = 0, size = 'md', showNumber = true, className = '' }) => {
  const s = sizes[size] || sizes.md;
  const full    = Math.floor(stars);
  const partial = stars - full;
  const empty   = 5 - Math.ceil(stars);

  const renderStar = (fill, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: i * 0.08, type: 'spring', stiffness: 350, damping: 16 }}
      className={`${s.star} inline-block`}
      style={{ filter: fill > 0 ? 'drop-shadow(0 0 4px rgba(212,175,55,0.5))' : 'none' }}
    >
      <span style={{ opacity: fill > 0 ? 1 : 0.2, color: fill > 0 ? '#D4AF37' : '#475569' }}>★</span>
    </motion.span>
  );

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      {Array.from({ length: full }, (_, i)  => renderStar(1, i))}
      {partial > 0 && renderStar(partial, full)}
      {Array.from({ length: empty }, (_, i) => renderStar(0, full + (partial > 0 ? 1 : 0) + i))}
      {showNumber && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`${s.num} text-gold font-bold ml-1.5`}
        >
          {stars.toFixed(1)}
        </motion.span>
      )}
    </div>
  );
};

export default RatingStars;
