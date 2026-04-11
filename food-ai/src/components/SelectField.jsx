// src/components/SelectField.jsx
import React from 'react';

const SelectField = ({ label, name, value, onChange, options = [], placeholder = 'Select...', helper, error, required, icon, className = '' }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && (
      <label htmlFor={name} className="hud-label flex items-center gap-1">
        {label}{required && <span className="text-risk">*</span>}
      </label>
    )}
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue/50 text-sm pointer-events-none z-10">{icon}</span>}
      <select
        id={name} name={name} value={value} onChange={onChange} required={required}
        className={`lab-input appearance-none cursor-pointer ${icon ? 'pl-9' : ''} ${error ? '!border-risk/50' : ''}`}
      >
        <option value="" disabled className="bg-lab-card">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-lab-card text-gray-200">{o.label}</option>
        ))}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neon-blue/50 pointer-events-none text-xs">▾</span>
    </div>
    {helper && !error && <p className="text-gray-600 text-xs font-mono">{helper}</p>}
    {error && <p className="text-risk text-xs font-mono flex items-center gap-1"><span>⚠</span>{error}</p>}
  </div>
);

export default SelectField;
