// src/components/GlassCard.jsx
import React from 'react';

const GlassCard = ({
  children,
  className = '',
  neon = false,
  color = 'blue',
  hover = true,
  padding = true,
  onClick,
}) => {
  const colorBorder = {
    blue:   'border-neon-blue/20 hover:border-neon-blue/50',
    purple: 'border-neon-purple/20 hover:border-neon-purple/50',
    green:  'border-safe/20 hover:border-safe/50',
    yellow: 'border-caution/20 hover:border-caution/50',
    red:    'border-risk/20 hover:border-risk/50',
  };
  const colorGlow = {
    blue:   'hover:shadow-neon',
    purple: 'hover:shadow-neon-purple',
    green:  'hover:shadow-neon-green',
    yellow: '',
    red:    'hover:shadow-neon-red',
  };

  return (
    <div
      onClick={onClick}
      className={`
        glass rounded-xl border
        ${colorBorder[color] || colorBorder.blue}
        ${hover ? `${colorGlow[color] || ''} transition-all duration-300 ${onClick ? 'cursor-pointer lab-card-hover' : ''}` : ''}
        ${padding ? 'p-6' : ''}
        ${neon ? 'shadow-neon' : 'shadow-panel'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;
