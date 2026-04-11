// src/components/LoaderSpinner.jsx
import React from 'react';

const LoaderSpinner = ({
  size = 'md',
  color = 'primary',
  label,
  fullScreen = false,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4',
  };

  const colorMap = {
    primary: 'border-primary/30 border-t-primary',
    safe: 'border-safe/30 border-t-safe',
    caution: 'border-caution/30 border-t-caution',
    white: 'border-white/30 border-t-white',
  };

  const spinner = (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className={`rounded-full animate-spin ${sizeMap[size]} ${colorMap[color]}`} />
      {label && <p className="text-text-secondary text-sm font-medium">{label}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoaderSpinner;
