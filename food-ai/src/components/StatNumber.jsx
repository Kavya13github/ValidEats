import React from 'react';

/** Large stat figures — Italianno + soft gold gradient to match site headlines. */
const StatNumber = ({ value, className = '' }) => {
  const str = String(value ?? '');
  return (
    <span className={`stat-number ${className}`.trim()}>
      <span className="sr-only">{str}</span>
      <span className="stat-number-face" aria-hidden="true">
        {str}
      </span>
    </span>
  );
};

export default StatNumber;
