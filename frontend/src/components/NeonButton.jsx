// src/components/NeonButton.jsx
import React from 'react';

const variants = {
  primary: {
    base: 'bg-transparent border border-neon-blue/60 text-neon-blue hover:bg-neon-blue/10 hover:shadow-neon',
  },
  purple: {
    base: 'bg-transparent border border-neon-purple/60 text-neon-purple hover:bg-neon-purple/10 hover:shadow-neon-purple',
  },
  green: {
    base: 'bg-transparent border border-safe/60 text-safe hover:bg-safe/10 hover:shadow-neon-green',
  },
  red: {
    base: 'bg-transparent border border-risk/60 text-risk hover:bg-risk/10 hover:shadow-neon-red',
  },
  solid: {
    base: 'bg-neon-gradient text-white shadow-neon hover:opacity-90',
  },
  ghost: {
    base: 'text-gray-400 hover:text-neon-blue border border-lab-border hover:border-neon-blue/40',
  },
};

const sizes = {
  sm:  'px-4 py-1.5 text-xs rounded-md',
  md:  'px-6 py-2.5 text-sm rounded-lg',
  lg:  'px-8 py-3.5 text-sm rounded-lg',
  xl:  'px-10 py-4 text-base rounded-xl',
};

const NeonButton = ({
  children, variant = 'primary', size = 'md',
  icon, iconRight, loading = false, disabled = false,
  fullWidth = false, onClick, type = 'button', className = '',
}) => {
  const v = variants[variant] || variants.primary;
  const s = sizes[size];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        font-mono font-medium tracking-wider uppercase inline-flex items-center justify-center gap-2
        transition-all duration-300 active:scale-95
        disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
        ${v.base} ${s} ${fullWidth ? 'w-full' : ''} ${className}
      `}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="10" />
          </svg>
          <span className="tracking-widest">Processing...</span>
        </>
      ) : (
        <>
          {icon && <span className="text-base">{icon}</span>}
          {children}
          {iconRight && <span className="text-base">{iconRight}</span>}
        </>
      )}
    </button>
  );
};

export default NeonButton;
