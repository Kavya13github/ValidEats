// src/components/Button.jsx
import React from 'react';
import { motion } from 'framer-motion';

const styles = {
  gold:    'btn-gold text-brand-bg rounded-2xl',
  outline: 'btn-outline-gold rounded-2xl',
  ghost:   'text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-200',
  dark:    'bg-brand-card border border-white/10 text-slate-300 hover:border-gold/30 hover:text-white rounded-2xl transition-all duration-200',
  danger:  'bg-risk/10 text-risk border border-risk/30 hover:bg-risk/20 rounded-2xl transition-all duration-200',
};
const sizes = {
  xs:  'px-3 py-1.5 text-xs gap-1.5',
  sm:  'px-4 py-2 text-sm gap-2',
  md:  'px-5 py-2.5 text-sm gap-2',
  lg:  'px-7 py-3.5 text-base gap-2.5',
  xl:  'px-9 py-4 text-lg gap-3',
};

const Button = ({
  children, variant = 'gold', size = 'md', icon, iconRight,
  loading = false, disabled = false, fullWidth = false,
  onClick, type = 'button', className = '',
}) => (
  <motion.button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    whileHover={!disabled && !loading ? { scale: 1.03 } : {}}
    whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    className={`
      font-semibold inline-flex items-center justify-center
      disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
      ${styles[variant] || styles.gold}
      ${sizes[size]}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `}
  >
    {loading ? (
      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="10" />
      </svg>
    ) : (
      <>
        {icon && <span className="text-base leading-none">{icon}</span>}
        <span>{children}</span>
        {iconRight && <span className="text-base leading-none">{iconRight}</span>}
      </>
    )}
  </motion.button>
);

export default Button;
