// src/components/Button.jsx
import React from 'react';

const variants = {
  primary: 'bg-primary hover:bg-primary-dark text-white shadow-glow hover:shadow-glow',
  secondary: 'bg-card border border-border hover:border-primary/50 text-text-secondary hover:text-text',
  safe: 'bg-safe/10 border border-safe/30 hover:bg-safe/20 text-safe',
  caution: 'bg-caution/10 border border-caution/30 hover:bg-caution/20 text-caution',
  risk: 'bg-risk/10 border border-risk/30 hover:bg-risk/20 text-risk',
  ghost: 'hover:bg-card text-text-secondary hover:text-text',
  gradient: 'bg-primary-gradient text-white shadow-glow',
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
  xl: 'px-10 py-5 text-lg rounded-2xl',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconRight,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const base = 'font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {icon && <span className="text-lg">{icon}</span>}
          {children}
          {iconRight && <span className="text-lg">{iconRight}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
