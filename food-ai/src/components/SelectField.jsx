// src/components/SelectField.jsx
import React from 'react';

const SelectField = ({ label, name, value, onChange, options = [], placeholder = 'Select...', helper, error, required, icon, className = '' }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && (
      <label htmlFor={name} className="text-xs font-medium text-gray-400 tracking-wide flex items-center gap-1">
        {label}{required && <span className="text-risk ml-0.5">*</span>}
      </label>
    )}
    <div className="relative">
      {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 text-sm pointer-events-none z-10">{icon}</span>}
      <select
        id={name} name={name} value={value} onChange={onChange} required={required}
        className={`premium-input appearance-none cursor-pointer ${icon ? 'pl-10' : ''} ${error ? '!border-risk/50' : ''}`}
      >
        <option value="" disabled className="bg-charcoal-800">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-charcoal-800">{o.label}</option>
        ))}
      </select>
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-400 pointer-events-none text-xs">▾</span>
    </div>
    {helper && !error && <p className="text-charcoal-400 text-xs">{helper}</p>}
    {error && <p className="text-risk text-xs flex items-center gap-1"><span>⚠</span>{error}</p>}
  </div>
);

export default SelectField;
