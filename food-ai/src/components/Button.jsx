// src/components/Button.jsx
import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  gold: 'bg-gold text-charcoal-900 hover:bg-gold-light shadow-gold hover:shadow-gold-hover',
  outline: 'border border-gold/50 text-gold hover:border-gold hover:bg-gold/5',
  ghost: 'text-gray-400 hover:text-white hover:bg-charcoal-700',
  dark: 'bg-charcoal-700 text-white border border-charcoal-600 hover:border-gold/30',
  danger: 'bg-risk/10 text-risk border border-risk/30 hover:bg-risk/20',
};
const sizes = {
  sm:  'px-4 py-2 text-xs rounded-lg',
  md:  'px-6 py-2.5 text-sm rounded-xl',
  lg:  'px-8 py-3.5 text-sm rounded-xl',
  xl:  'px-10 py-4 text-base rounded-xl',
};

const Button = ({
  children, variant = 'gold', size = 'md', icon, iconRight,
  loading = false, disabled = false, fullWidth = false,
  onClick, type = 'button', className = '',
}) => {
  const v = variants[variant] || variants.gold;
  const s = sizes[size];

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`
        font-medium tracking-wide inline-flex items-center justify-center gap-2
        transition-all duration-200
        disabled:opacity-40 disabled:cursor-not-allowed
        ${v} ${s} ${fullWidth ? 'w-full' : ''} ${className}
      `}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="10" />
        </svg>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
          {iconRight && <span>{iconRight}</span>}
        </>
      )}
    </motion.button>
  );
};

export default Button;
