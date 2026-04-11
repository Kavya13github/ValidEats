// src/components/InputField.jsx
import React from 'react';

const InputField = ({ label, name, type = 'text', value, onChange, placeholder, helper, error, required, icon, className = '', ...props }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && (
      <label htmlFor={name} className="hud-label flex items-center gap-1">
        {label}{required && <span className="text-risk">*</span>}
      </label>
    )}
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue/50 text-sm">{icon}</span>}
      <input
        id={name} name={name} type={type} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className={`lab-input ${icon ? 'pl-9' : ''} ${error ? '!border-risk/50 focus:!border-risk' : ''}`}
        {...props}
      />
    </div>
    {helper && !error && <p className="text-gray-600 text-xs font-mono">{helper}</p>}
    {error && <p className="text-risk text-xs font-mono flex items-center gap-1"><span>⚠</span>{error}</p>}
  </div>
);

export default InputField;
