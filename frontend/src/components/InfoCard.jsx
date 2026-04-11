// src/components/InfoCard.jsx
import React from 'react';

const InfoCard = ({
  icon,
  title,
  description,
  color = 'primary',
  className = '',
  onClick,
}) => {
  const colorMap = {
    primary: 'from-primary/20 to-primary/5 border-primary/20 hover:border-primary/50',
    safe: 'from-safe/20 to-safe/5 border-safe/20 hover:border-safe/50',
    caution: 'from-caution/20 to-caution/5 border-caution/20 hover:border-caution/50',
    risk: 'from-risk/20 to-risk/5 border-risk/20 hover:border-risk/50',
    purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/20 hover:border-purple-500/50',
    cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/50',
  };

  const iconBg = {
    primary: 'bg-primary/20 text-primary-light',
    safe: 'bg-safe/20 text-safe',
    caution: 'bg-caution/20 text-caution',
    risk: 'bg-risk/20 text-risk',
    purple: 'bg-purple-500/20 text-purple-400',
    cyan: 'bg-cyan-500/20 text-cyan-400',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br ${colorMap[color]} border rounded-2xl p-6
        transition-all duration-300 ${onClick ? 'cursor-pointer card-hover' : ''} ${className}`}
    >
      {icon && (
        <div className={`w-12 h-12 rounded-xl ${iconBg[color]} flex items-center justify-center text-2xl mb-4`}>
          {icon}
        </div>
      )}
      <h3 className="text-text font-semibold text-lg mb-2">{title}</h3>
      {description && (
        <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
      )}
    </div>
  );
};

export default InfoCard;
