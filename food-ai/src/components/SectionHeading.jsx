// src/components/SectionHeading.jsx
import React from 'react';

const SectionHeading = ({
  label,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignClass = {
    center: 'text-center items-center',
    left: 'text-left items-start',
    right: 'text-right items-end',
  };

  return (
    <div className={`flex flex-col gap-3 ${alignClass[align]} ${className}`}>
      {label && (
        <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-widest">
          <span className="w-6 h-0.5 bg-primary rounded-full" />
          {label}
          <span className="w-6 h-0.5 bg-primary rounded-full" />
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-text leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
