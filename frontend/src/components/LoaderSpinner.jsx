import React from 'react';
import { motion } from 'framer-motion';

const sizes = {
  sm: { w: 'w-5 h-5', txt: 'text-xs' },
  md: { w: 'w-8 h-8', txt: 'text-sm' },
  lg: { w: 'w-12 h-12', txt: 'text-base' },
};

const LoaderSpinner = ({ label = 'Loading...', size = 'md' }) => {
  const s = sizes[size] || sizes.md;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className={`${s.w} rounded-full border-2 border-gold/20 border-t-gold`}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          className={`absolute inset-1 rounded-full border border-gold/10 border-b-gold/40`}
        />
      </div>
      {label && <p className={`text-slate-500 ${s.txt} font-medium`}>{label}</p>}
    </div>
  );
};

export default LoaderSpinner;
