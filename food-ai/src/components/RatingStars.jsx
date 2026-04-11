// src/components/RatingStars.jsx
import React from 'react';
import { motion } from 'framer-motion';

const RatingStars = ({ stars = 0, maxStars = 5, size = 'md', showNumber = true, animate = true, label, className = '' }) => {
  const sizes = {
    xs:  { star: 'text-base', num: 'text-sm', gap: 'gap-0.5' },
    sm:  { star: 'text-xl',   num: 'text-base', gap: 'gap-0.5' },
    md:  { star: 'text-2xl',  num: 'text-lg', gap: 'gap-1' },
    lg:  { star: 'text-3xl',  num: 'text-2xl', gap: 'gap-1' },
    xl:  { star: 'text-4xl',  num: 'text-3xl', gap: 'gap-1.5' },
  };
  const s = sizes[size] || sizes.md;

  const filled  = Math.floor(stars);
  const partial = stars % 1;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`flex items-center ${s.gap}`}>
        {Array.from({ length: maxStars }, (_, i) => {
          const full    = i < filled;
          const part    = i === filled && partial > 0;
          const fillPct = part ? Math.round(partial * 100) : full ? 100 : 0;

          return (
            <motion.span
              key={i}
              initial={animate ? { opacity: 0, scale: 0 } : {}}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 250, damping: 15 }}
              className={`${s.star} relative inline-block`}
              style={{ color: fillPct > 0 ? '#D4AF37' : '#3e3e3e' }}
            >
              {part ? (
                <span className="relative">
                  <span className="text-charcoal-500">★</span>
                  <span
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${fillPct}%`, color: '#D4AF37' }}
                  >★</span>
                </span>
              ) : (
                <span style={{ filter: full ? 'drop-shadow(0 0 4px rgba(212,175,55,0.6))' : 'none' }}>★</span>
              )}
            </motion.span>
          );
        })}
      </div>

      {showNumber && (
        <div className="flex items-baseline gap-1">
          <span className={`font-serif font-bold ${s.num} text-gold`}>{stars.toFixed(1)}</span>
          <span className="text-charcoal-400 text-xs">/ {maxStars}</span>
        </div>
      )}
      {label && <span className="text-charcoal-400 text-xs ml-1">{label}</span>}
    </div>
  );
};

export default RatingStars;
