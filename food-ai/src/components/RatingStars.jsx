// src/components/RatingStars.jsx
import React from 'react';
import { motion } from 'framer-motion';

const RatingStars = ({ stars = 0, maxStars = 5, size = 'md', showNumber = true, className = '' }) => {
  const sizeMap = { sm: 'text-lg gap-0.5', md: 'text-2xl gap-1', lg: 'text-4xl gap-1.5', xl: 'text-5xl gap-2' };
  const numSz  = { sm: 'text-sm', md: 'text-lg', lg: 'text-2xl', xl: 'text-3xl' };

  const getStarColor = (i) => {
    if (stars >= i)       return '#ffd700';
    if (stars >= i - 0.5) return '#ffd700';
    return '#1a3a5c';
  };

  const getStarOpacity = (i) => {
    if (stars >= i)       return 1;
    if (stars >= i - 0.5) return 0.6;
    return 0.3;
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`flex items-center ${sizeMap[size]}`}>
        {Array.from({ length: maxStars }, (_, i) => i + 1).map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: getStarOpacity(i), scale: 1 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
            style={{
              color: getStarColor(i),
              filter: stars >= i ? 'drop-shadow(0 0 6px rgba(255,215,0,0.8))' : 'none',
            }}
          >
            ★
          </motion.span>
        ))}
      </div>
      {showNumber && (
        <div className="flex items-baseline gap-1">
          <span className={`font-mono font-bold text-caution ${numSz[size]}`}
            style={{ textShadow: '0 0 10px rgba(255,215,0,0.6)' }}>
            {stars.toFixed(1)}
          </span>
          <span className="text-gray-500 font-mono text-xs">/ {maxStars}</span>
        </div>
      )}
    </div>
  );
};

export default RatingStars;
